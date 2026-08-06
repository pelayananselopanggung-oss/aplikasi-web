//======================================================
// SURAT KETERANGAN KEPEMILIKAN V2
// BAGIAN 1
//======================================================


//======================================================
// SAAT HALAMAN DIBUKA
//======================================================

document.addEventListener("DOMContentLoaded", async function(){

    cekLogin();
    cekAksesDashboard();

    inisialisasiSurat();

    //--------------------------------------------------
    // EDIT DARI HISTORY
    //--------------------------------------------------

    if(localStorage.getItem("dataSurat")){

        loadSuratHistory();

        return;

    }

    //--------------------------------------------------
    // KEMBALI DARI PREVIEW
    //--------------------------------------------------

    if(localStorage.getItem("modePreview")=="1"){

        loadPreview();

    }else{

        await loadPenduduk();

    }

});


//======================================================
// LOAD DATA SURAT DARI HISTORY
//======================================================

function loadSuratHistory(){

    const json = localStorage.getItem("dataSurat");

    if(!json){

        return;

    }

    try{

        const data = JSON.parse(json);

        for(const key in data){

            localStorage.setItem(

                key,

                data[key]

            );

        }

    }

    catch(err){

        console.log(

            "Data history rusak.",

            err

        );

    }

    localStorage.removeItem(

        "dataSurat"

    );

    loadPreview();

}

//======================================================
// INISIALISASI SURAT
//======================================================

function inisialisasiSurat(){

    //--------------------------------------------------
    // Jika membuat surat baru
    //--------------------------------------------------

    if(localStorage.getItem("modePreview")!="1"){

        localStorage.removeItem("nomorAgenda");

        localStorage.removeItem("kodeVerifikasi");

    }

}


//======================================================
// LOAD DATA PENDUDUK
//======================================================

async function loadPenduduk(){

    const nik = localStorage.getItem("nikLuar");

    if(!nik){

        return;

    }

    //--------------------------------------------------
    // NIK SELALU DITAMPILKAN
    //--------------------------------------------------

    document.getElementById("nik").value = nik;

    showLoading();

    try{

        const response = await fetch(

            URL +

            "?aksi=getdata" +

            "&token=" + TOKEN +

            "&nik=" +

            encodeURIComponent(nik)

        );

        const hasil = await response.text();

        if(

            hasil=="" ||

            hasil=="DATA TIDAK DITEMUKAN"

        ){

            hideLoading();

            //--------------------------------------------------
            // NIK tetap tampil, data lainnya diisi manual
            //--------------------------------------------------

            document.getElementById("nama").focus();

            return;

        }

        isiFormPenduduk(

            hasil.split("#")

        );

    }

    catch(err){

        console.log(err);

        alert(

            "Gagal mengambil data penduduk."

        );

    }

    finally{

        hideLoading();

    }

}

/*======================================================
ISI FORM DARI DATABASE
======================================================*/

function isiFormPenduduk(data){

    document.getElementById("nik").value =
        data[0] || "";

    document.getElementById("nama").value =
        data[1] || "";

    document.getElementById("tempatlahir").value =
        data[2] || "";

    document.getElementById("tanggallahir").value =
        ubahTanggalInput(data[3]);

    document.getElementById("jk").value =
        data[4] || "";

    document.getElementById("alamat").value =
        data[7] || "";

    document.getElementById("sp").value =
        data[14] || "";

}


/*======================================================
FORMAT TANGGAL INPUT
DD/MM/YYYY -> YYYY-MM-DD
======================================================*/

function ubahTanggalInput(tanggal){

    if(!tanggal){

        return "";

    }

    const p = tanggal.split("/");

    if(p.length!=3){

        return "";

    }

    return (

        p[2] +

        "-" +

        p[1] +

        "-" +

        p[0]

    );

}


/*======================================================
RESET FORM
======================================================*/

function resetForm(){

    if(

        !confirm(

            "Yakin ingin mengosongkan data surat?"

        )

    ){

        return;

    }

    //--------------------------------------------------
    // DATA SURAT
    //--------------------------------------------------

    document.getElementById("keperluan").value = "";

    //--------------------------------------------------
    // DATA KENDARAAN
    //--------------------------------------------------

    document.getElementById("nopol").value = "";
    document.getElementById("namaPemilik").value = "";
    document.getElementById("alamatPemilik").value = "";
    document.getElementById("merk").value = "";
    document.getElementById("type").value = "";
    document.getElementById("jenis").value = "";
    document.getElementById("model").value = "";
    document.getElementById("tahunPembuatan").value = "";
    document.getElementById("isiSilinder").value = "";
    document.getElementById("nomorRangka").value = "";
    document.getElementById("nomorMesin").value = "";

}


/*======================================================
VALIDASI FORM
======================================================*/

function validasiForm(){

    const wajib=[

        ["nik","NIK"],
        ["nama","Nama Pemohon"],
        ["tempatlahir","Tempat Lahir"],
        ["tanggallahir","Tanggal Lahir"],
        ["jk","Jenis Kelamin"],
        ["alamat","Alamat"],

        ["nopol","Nomor Polisi"],
        ["namaPemilik","Nama Pemilik"],
        ["alamatPemilik","Alamat Pemilik"],
        ["merk","Merk"],
        ["type","Type"],
        ["jenis","Jenis"],
        ["model","Model"],
        ["tahunPembuatan","Tahun Pembuatan"],
        ["isiSilinder","Isi Silinder"],
        ["nomorRangka","Nomor Rangka"],
        ["nomorMesin","Nomor Mesin"],

        ["keperluan","Keperluan Surat"]

    ];

    for(const item of wajib){

        const obj = document.getElementById(item[0]);

        if(!obj){

            continue;

        }

        if(obj.value.trim()==""){

            alert(

                item[1] +

                " belum diisi."

            );

            obj.focus();

            return false;

        }

    }

    return true;

}

//======================================================
// PREVIEW SURAT
//======================================================

function previewSurat(){

    //--------------------------------------------------
    // VALIDASI
    //--------------------------------------------------

    if(!validasiForm()){

        return;

    }

    //--------------------------------------------------
    // SIMPAN KE LOCAL STORAGE
    //--------------------------------------------------

    simpanLocalStorage();

    //--------------------------------------------------
    // SURAT BARU
    //--------------------------------------------------

    if(suratBaru()){

        localStorage.removeItem("nomorAgenda");

        localStorage.removeItem("kodeVerifikasi");

    }

    //--------------------------------------------------
    // BUKA PREVIEW
    //--------------------------------------------------

    window.location.href="preview_ranmor.html";

}


//======================================================
// SIMPAN KE LOCAL STORAGE
//======================================================

function simpanLocalStorage(){

    //--------------------------------------------------
    // DATA PEMOHON
    //--------------------------------------------------

    localStorage.setItem("nik", nilai("nik"));
    localStorage.setItem("nama", nilai("nama"));
    localStorage.setItem("tempatlahir", nilai("tempatlahir"));
    localStorage.setItem("tanggallahir", nilai("tanggallahir"));
    localStorage.setItem("jk", nilai("jk"));
    localStorage.setItem("alamat", nilai("alamat"));
    localStorage.setItem("sp", nilai("sp"));

    //--------------------------------------------------
    // DATA KENDARAAN
    //--------------------------------------------------

    localStorage.setItem("nopol", nilai("nopol"));
    localStorage.setItem("namaPemilik", nilai("namaPemilik"));
    localStorage.setItem("alamatPemilik", nilai("alamatPemilik"));
    localStorage.setItem("merk", nilai("merk"));
    localStorage.setItem("type", nilai("type"));
    localStorage.setItem("jenis", nilai("jenis"));
    localStorage.setItem("model", nilai("model"));
    localStorage.setItem("tahunPembuatan", nilai("tahunPembuatan"));
    localStorage.setItem("isiSilinder", nilai("isiSilinder"));
    localStorage.setItem("nomorRangka", nilai("nomorRangka"));
    localStorage.setItem("nomorMesin", nilai("nomorMesin"));

    //--------------------------------------------------
    // DATA SURAT
    //--------------------------------------------------

    localStorage.setItem("keperluan", nilai("keperluan"));

    //--------------------------------------------------
    // MODE PREVIEW
    //--------------------------------------------------

    localStorage.setItem("modePreview","1");

}


//======================================================
// LOAD DATA DARI PREVIEW
//======================================================

function loadPreview(){

    //--------------------------------------------------
    // BUKAN MODE PREVIEW
    //--------------------------------------------------

    if(localStorage.getItem("modePreview")!="1"){

        return;

    }

    //--------------------------------------------------
    // DATA PEMOHON
    //--------------------------------------------------

    isi("nik");
    isi("nama");
    isi("tempatlahir");
    isi("tanggallahir");
    isi("jk");
    isi("alamat");
    isi("sp");

    //--------------------------------------------------
    // DATA KENDARAAN
    //--------------------------------------------------

    isi("nopol");
    isi("namaPemilik");
    isi("alamatPemilik");
    isi("merk");
    isi("type");
    isi("jenis");
    isi("model");
    isi("tahunPembuatan");
    isi("isiSilinder");
    isi("nomorRangka");
    isi("nomorMesin");

    //--------------------------------------------------
    // DATA SURAT
    //--------------------------------------------------

    isi("keperluan");

}

//======================================================
// AMBIL NILAI KOMPONEN
//======================================================

function nilai(id){

    const obj =

        document.getElementById(id);

    return obj

        ? obj.value.trim()

        : "";

}


//======================================================
// ISI KOMPONEN DARI LOCAL STORAGE
//======================================================

function isi(id){

    const obj =

        document.getElementById(id);

    if(!obj){

        return;

    }

    obj.value =

        localStorage.getItem(id) || "";

}


//======================================================
// MODE SURAT
//======================================================

function suratBaru(){

    return !localStorage.getItem(

        "nomorAgenda"

    );

}


function suratEdit(){

    return !!localStorage.getItem(

        "nomorAgenda"

    );

}


//======================================================
// SELESAI EDIT
//======================================================

function selesaiEdit(){

    localStorage.removeItem(

        "modePreview"

    );

}


//======================================================
// LOADING
//======================================================

function showLoading(){

    const loading =

        document.getElementById("loading");

    if(loading){

        loading.style.display = "flex";

    }

}


function hideLoading(){

    const loading =

        document.getElementById("loading");

    if(loading){

        loading.style.display = "none";

    }

}


//======================================================
// KEMBALI
//======================================================

function kembali(){

    localStorage.removeItem(

        "modePreview"

    );

    window.location.href =

        "jenissurat.html";

}

//======================================================
// CLEAR DATA SURAT
//======================================================

function clearSurat(){

    const nikLuar =

        localStorage.getItem("nikLuar");

    const login =

        localStorage.getItem("login");

    localStorage.clear();

    if(login){

        localStorage.setItem(

            "login",

            login

        );

    }

    if(nikLuar){

        localStorage.setItem(

            "nikLuar",

            nikLuar

        );

    }

}


//======================================================
// LOGOUT
//======================================================

function logout(){

    if(

        !confirm(

            "Apakah Anda yakin ingin logout?"

        )

    ){

        return;

    }

    localStorage.clear();

    window.location.href =

        "index.html";

}


//======================================================
// FORMAT TANGGAL
// YYYY-MM-DD -> DD/MM/YYYY
//======================================================

function formatTanggal(tanggal){

    if(!tanggal){

        return "";

    }

    const p = tanggal.split("-");

    if(p.length!=3){

        return tanggal;

    }

    return (

        p[2] +

        "/" +

        p[1] +

        "/" +

        p[0]

    );

}


//======================================================
// DEBUG
//======================================================

function debugStorage(){

    console.log({

        nik              : localStorage.getItem("nik"),

        nama             : localStorage.getItem("nama"),

        nopol            : localStorage.getItem("nopol"),

        namaPemilik      : localStorage.getItem("namaPemilik"),

        nomorAgenda      : localStorage.getItem("nomorAgenda"),

        kodeVerifikasi   : localStorage.getItem("kodeVerifikasi"),

        modePreview      : localStorage.getItem("modePreview"),

        statusSync       : localStorage.getItem("statusSync")

    });

}

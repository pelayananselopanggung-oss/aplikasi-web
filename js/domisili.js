//======================================================
// SURAT DOMISILI V2
// BAGIAN 1
//======================================================


//======================================================
// SURAT DOMISILI
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

    }catch(err){

        console.log("Data history rusak.",err);

    }

    localStorage.removeItem("dataSurat");

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

//======================================================
// LOAD DATA PENDUDUK
//======================================================

async function loadPenduduk(){

    //--------------------------------------------------
    // AMBIL NIK AKTIF
    //--------------------------------------------------

    const nik =

        localStorage.getItem("nikLuar") ||

        localStorage.getItem("nik") ||

        "";

    if(!nik){

        return;

    }

    //--------------------------------------------------
    // LANGSUNG TAMPILKAN NIK
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

        //--------------------------------------------------
        // DATA TIDAK DITEMUKAN
        //--------------------------------------------------

        if(

            hasil=="" ||

            hasil=="DATA TIDAK DITEMUKAN"

        ){

            document.getElementById("nik").value = nik;

            document.getElementById("nama").focus();

            return;

        }

        //--------------------------------------------------
        // DATA DITEMUKAN
        //--------------------------------------------------

        isiFormPenduduk(

            hasil.split("#")

        );

    }

    catch(err){

        console.log(err);

        alert("Gagal mengambil data penduduk.");

    }

    finally{

        hideLoading();

    }

}

//======================================================
// ISI FORM PENDUDUK
//======================================================

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

    document.getElementById("agama").value =
        data[5] || "";

    document.getElementById("pekerjaan").value =
        data[6] || "";

    document.getElementById("alamat").value =
        data[7] || "";

    document.getElementById("rt").value =
        data[8] || "";

    document.getElementById("rw").value =
        data[9] || "";

    document.getElementById("desa").value =
        data[10] || "";

    document.getElementById("kecamatan").value =
        data[11] || "";

    document.getElementById("kabupaten").value =
        data[12] || "";

    document.getElementById("provinsi").value =
        data[13] || "";

    document.getElementById("sp").value =
        data[14] || "";

}


//======================================================
// FORMAT TANGGAL INPUT
// DD/MM/YYYY -> YYYY-MM-DD
//======================================================

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
// VALIDASI FORM
//======================================================

function validasiForm(){

    if(
        document.getElementById("bertempat").value.trim()==""
    ){

        alert(
            "Tempat domisili sementara belum diisi."
        );

        document.getElementById(
            "bertempat"
        ).focus();

        return false;

    }

    if(
        document.getElementById("keperluan").value.trim()==""
    ){

        alert(
            "Keperluan surat belum diisi."
        );

        document.getElementById(
            "keperluan"
        ).focus();

        return false;

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

        localStorage.removeItem(
            "nomorAgenda"
        );

        localStorage.removeItem(
            "kodeVerifikasi"
        );

    }

    //--------------------------------------------------
    // BUKA PREVIEW
    //--------------------------------------------------

    window.location.href =
        "preview_domisili.html";

}


//======================================================
// SIMPAN KE LOCAL STORAGE
//======================================================

function simpanLocalStorage(){

    //--------------------------------------------------
    // DATA PENDUDUK
    //--------------------------------------------------

    localStorage.setItem(
        "nik",
        nilai("nik")
    );

    localStorage.setItem(
        "nama",
        nilai("nama")
    );

    localStorage.setItem(
        "tempatlahir",
        nilai("tempatlahir")
    );

    localStorage.setItem(
        "tanggallahir",
        nilai("tanggallahir")
    );

    localStorage.setItem(
        "jk",
        nilai("jk")
    );

    localStorage.setItem(
        "agama",
        nilai("agama")
    );

    localStorage.setItem(
        "pekerjaan",
        nilai("pekerjaan")
    );

    localStorage.setItem(
        "alamat",
        nilai("alamat")
    );

    localStorage.setItem(
        "rt",
        nilai("rt")
    );

    localStorage.setItem(
        "rw",
        nilai("rw")
    );

    localStorage.setItem(
        "desa",
        nilai("desa")
    );

    localStorage.setItem(
        "kecamatan",
        nilai("kecamatan")
    );

    localStorage.setItem(
        "kabupaten",
        nilai("kabupaten")
    );

    localStorage.setItem(
        "provinsi",
        nilai("provinsi")
    );

    localStorage.setItem(
        "sp",
        nilai("sp")
    );

    //--------------------------------------------------
    // DATA SURAT
    //--------------------------------------------------

    localStorage.setItem(
        "bertempat",
        nilai("bertempat")
    );

    localStorage.setItem(
        "keperluan",
        nilai("keperluan")
    );

    //--------------------------------------------------
    // MODE PREVIEW
    //--------------------------------------------------

    localStorage.setItem(
        "modePreview",
        "1"
    );

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
    // DATA PENDUDUK
    //--------------------------------------------------

    isi("nik");
    isi("nama");
    isi("tempatlahir");
    isi("tanggallahir");
    isi("jk");
    isi("agama");
    isi("pekerjaan");
    isi("alamat");
    isi("rt");
    isi("rw");
    isi("desa");
    isi("kecamatan");
    isi("kabupaten");
    isi("provinsi");
    isi("sp");

    //--------------------------------------------------
    // DATA SURAT
    //--------------------------------------------------

    isi("bertempat");
    isi("keperluan");

}


//======================================================
// ISI KOMPONEN DARI LOCAL STORAGE
//======================================================

function isi(id){

    const obj = document.getElementById(id);

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
// RESET DATA SURAT
//======================================================

function resetForm(){

    if(

        !confirm(

            "Yakin ingin mengosongkan data surat?"

        )

    ){

        return;

    }

    //--------------------------------------------------
    // HAPUS DATA SURAT
    //--------------------------------------------------

    document.getElementById("bertempat").value = "";

    document.getElementById("keperluan").value = "";

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

        bertempat        : localStorage.getItem("bertempat"),

        keperluan        : localStorage.getItem("keperluan"),

        nomorAgenda      : localStorage.getItem("nomorAgenda"),

        kodeVerifikasi   : localStorage.getItem("kodeVerifikasi"),

        modePreview      : localStorage.getItem("modePreview"),

        statusSync       : localStorage.getItem("statusSync")

    });

}



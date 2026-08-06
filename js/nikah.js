/*======================================================
  LOAD HALAMAN
======================================================*/

document.addEventListener("DOMContentLoaded", function(){

    cekLogin();
    cekAksesNikah();
    loadDataNikah();

});

/*======================================================
  LOGIN
======================================================*/

function cekLogin() {

    const username = localStorage.getItem("username");

    if (username == null) {

        window.location.href = "index.html";

    }

}

function loadDataNikah(){

    console.log("namaSuami =", localStorage.getItem("namaSuami"));
console.log("namaIstri =", localStorage.getItem("namaIstri"));
console.log("tanggalAkad =", localStorage.getItem("tanggalAkad"));
    //--------------------------------------------------
    // SUAMI
    //--------------------------------------------------

    isiField("nikSuami");
    isiField("namaSuami");
    isiField("tempatLahirSuami");
    isiField("tanggalLahirSuami");
    isiField("jenisKelaminSuami");
    isiField("kewarganegaraanSuami");
    isiField("agamaSuami");
    isiField("pekerjaanSuami");
    isiField("alamatSuami");
    isiField("statusKawinSuami");

    //--------------------------------------------------
    // AYAH SUAMI
    //--------------------------------------------------

    isiField("nikAyahSuami");
    isiField("namaAyahSuami");
    isiField("tempatLahirAyahSuami");
    isiField("tanggalLahirAyahSuami");
    isiField("agamaAyahSuami");
    isiField("pekerjaanAyahSuami");
    isiField("alamatAyahSuami");

    //--------------------------------------------------
    // IBU SUAMI
    //--------------------------------------------------

    isiField("nikIbuSuami");
    isiField("namaIbuSuami");
    isiField("tempatLahirIbuSuami");
    isiField("tanggalLahirIbuSuami");
    isiField("agamaIbuSuami");
    isiField("pekerjaanIbuSuami");
    isiField("alamatIbuSuami");

    //--------------------------------------------------
    // ISTRI
    //--------------------------------------------------

    isiField("nikIstri");
    isiField("namaIstri");
    isiField("tempatLahirIstri");
    isiField("tanggalLahirIstri");
    isiField("jenisKelaminIstri");
    isiField("kewarganegaraanIstri");
    isiField("agamaIstri");
    isiField("pekerjaanIstri");
    isiField("alamatIstri");
    isiField("statusKawinIstri");

    //--------------------------------------------------
    // AYAH ISTRI
    //--------------------------------------------------

    isiField("nikAyahIstri");
    isiField("namaAyahIstri");
    isiField("tempatLahirAyahIstri");
    isiField("tanggalLahirAyahIstri");
    isiField("agamaAyahIstri");
    isiField("pekerjaanAyahIstri");
    isiField("alamatAyahIstri");

    //--------------------------------------------------
    // IBU ISTRI
    //--------------------------------------------------

    isiField("nikIbuIstri");
    isiField("namaIbuIstri");
    isiField("tempatLahirIbuIstri");
    isiField("tanggalLahirIbuIstri");
    isiField("agamaIbuIstri");
    isiField("pekerjaanIbuIstri");
    isiField("alamatIbuIstri");

    //--------------------------------------------------
    // AKAD
    //--------------------------------------------------

    isiField("hariAkad");
    isiField("tanggalAkad");
    isiField("jamAkad");
    isiField("tempatAkad");
    isiField("maskawin");
    isiField("namaKua");
    isiField("kecamatanKua");
    isiField("kabupatenKua");


   
}




/*======================================================
  LOADING
======================================================*/

function showLoading() {

    const loading = document.getElementById("loading");

    if (loading) {

        loading.style.display = "flex";

    }

}

function hideLoading() {

    const loading = document.getElementById("loading");

    if (loading) {

        loading.style.display = "none";

    }

}

/*======================================================
  AMBIL NILAI
======================================================*/

function nilai(id) {

    const obj = document.getElementById(id);

    if (!obj) return "";

    return obj.value.trim();

}

/*======================================================
  CARI PENDUDUK
======================================================*/

async function cariPenduduk(prefix){

    const nik = nilai("nik" + prefix);

    if(nik==""){

        alert("NIK belum diisi.");

        return;

    }

    //--------------------------------------------------
    // MODE OFFLINE
    //--------------------------------------------------

    if(localStorage.getItem("offline")=="true"){

        cariPendudukOffline(prefix,nik);

        return;

    }

    //--------------------------------------------------
    // MODE ONLINE
    //--------------------------------------------------

    showLoading();

    try{

        const response = await fetch(

            URL +
            "?aksi=getpendudukJson" +
            "&token=" + TOKEN +
            "&nik=" + encodeURIComponent(nik)

        );

        const hasil = await response.json();

        if(hasil.status){

            isiData(prefix,hasil.data);

        }else{

            alert("Data tidak ditemukan.\nSilakan isi secara manual.");

            kosongkanData(prefix);

            document.getElementById("nik"+prefix).value = nik;

        }

    }catch(err){

        console.log(err);

        //--------------------------------------------------
        // JIKA ONLINE GAGAL COBA OFFLINE
        //--------------------------------------------------

        cariPendudukOffline(prefix,nik);

    }

    hideLoading();

}

/*======================================================
  CARI OFFLINE
======================================================*/

function cariPendudukOffline(prefix,nik){

    try{

        const dataPenduduk = JSON.parse(

            localStorage.getItem("penduduk") || "[]"

        );

        const data = dataPenduduk.find(function(item){

            return item.nik == nik;

        });

        if(data){

            isiData(prefix,data);

        }else{

            alert("Data tidak ditemukan.");

            kosongkanData(prefix);

            document.getElementById("nik"+prefix).value = nik;

        }

    }catch(err){

        console.log(err);

        alert("Data offline tidak tersedia.");

    }

}

/*======================================================
  ISI DATA
======================================================*/

function isiData(prefix,data){

    if(document.getElementById("nama"+prefix))
        document.getElementById("nama"+prefix).value =
        data.nama || "";

    if(document.getElementById("tempatLahir"+prefix))
        document.getElementById("tempatLahir"+prefix).value =
        data.tempatlahir || "";

    if(document.getElementById("tanggalLahir"+prefix))
        document.getElementById("tanggalLahir"+prefix).value =
        data.tanggallahir || "";

    if(document.getElementById("jenisKelamin"+prefix))
        document.getElementById("jenisKelamin"+prefix).value =
        data.jk || "";

    if(document.getElementById("kewarganegaraan"+prefix))
        document.getElementById("kewarganegaraan"+prefix).value =
        data.kewarganegaraan || "WNI";

    if(document.getElementById("agama"+prefix))
        document.getElementById("agama"+prefix).value =
        data.agama || "";

    if(document.getElementById("pekerjaan"+prefix))
        document.getElementById("pekerjaan"+prefix).value =
        data.pekerjaan || "";

    if(document.getElementById("statusKawin"+prefix))
        document.getElementById("statusKawin"+prefix).value =
        data.sp || "";

    if(document.getElementById("alamat"+prefix))
        document.getElementById("alamat"+prefix).value =
        alamatLengkap(data);

}

/*======================================================
  FORMAT ALAMAT
======================================================*/

function alamatLengkap(data){

    return [

        data.alamat,

        data.rt ? "RT " + data.rt : "",

        data.rw ? "RW " + data.rw : "",

        data.desa ? "Desa " + data.desa : "",

        data.kecamatan ? "Kecamatan " + data.kecamatan : "",

        data.kabupaten ? "Kabupaten " + data.kabupaten : "",

        data.provinsi ? "Provinsi " + data.provinsi : ""

    ].filter(Boolean).join(" ");

}

/*======================================================
  KOSONGKAN DATA
======================================================*/

function kosongkanData(prefix){

    const fields=[

        "nama",
        "tempatLahir",
        "tanggalLahir",
        "jenisKelamin",
        "kewarganegaraan",
        "agama",
        "pekerjaan",
        "statusKawin",
        "alamat"

    ];

    fields.forEach(function(field){

        const obj=document.getElementById(field+prefix);

        if(obj){

            if(field=="kewarganegaraan"){

                obj.value="WNI";

            }else{

                obj.value="";

            }

        }

    });

}


/*======================================================
  VALIDASI FORM
======================================================*/

function validasiForm(){

    const wajib = [

        {
            id:"nikSuami",
            pesan:"NIK Calon Suami belum diisi."
        },

        {
            id:"namaSuami",
            pesan:"Nama Calon Suami belum diisi."
        },

        {
            id:"nikIstri",
            pesan:"NIK Calon Istri belum diisi."
        },

        {
            id:"namaIstri",
            pesan:"Nama Calon Istri belum diisi."
        },

        {
            id:"tanggalAkad",
            pesan:"Tanggal Akad belum diisi."
        },

        {
            id:"tempatAkad",
            pesan:"Tempat Akad belum diisi."
        },

        {
            id:"namaKua",
            pesan:"Nama KUA belum diisi."
        }

    ];

    for(const item of wajib){

        if(nilai(item.id)==""){

            alert(item.pesan);

            document.getElementById(item.id).focus();

            return false;

        }

    }

    return true;

}

/*======================================================
  SIMPAN LOCAL STORAGE
======================================================*/

function simpanLocalStorage(){

    const fields=[

        //--------------------------------------------------
        // SUAMI
        //--------------------------------------------------

        "nikSuami",
        "namaSuami",
        "tempatLahirSuami",
        "tanggalLahirSuami",
        "jenisKelaminSuami",
        "kewarganegaraanSuami",
        "agamaSuami",
        "pekerjaanSuami",
        "alamatSuami",
        "statusKawinSuami",

        //--------------------------------------------------
        // AYAH SUAMI
        //--------------------------------------------------

        "nikAyahSuami",
        "namaAyahSuami",
        "tempatLahirAyahSuami",
        "tanggalLahirAyahSuami",
        "agamaAyahSuami",
        "pekerjaanAyahSuami",
        "alamatAyahSuami",

        //--------------------------------------------------
        // IBU SUAMI
        //--------------------------------------------------

        "nikIbuSuami",
        "namaIbuSuami",
        "tempatLahirIbuSuami",
        "tanggalLahirIbuSuami",
        "agamaIbuSuami",
        "pekerjaanIbuSuami",
        "alamatIbuSuami",

        //--------------------------------------------------
        // ISTRI
        //--------------------------------------------------

        "nikIstri",
        "namaIstri",
        "tempatLahirIstri",
        "tanggalLahirIstri",
        "jenisKelaminIstri",
        "kewarganegaraanIstri",
        "agamaIstri",
        "pekerjaanIstri",
        "alamatIstri",
        "statusKawinIstri",

        //--------------------------------------------------
        // AYAH ISTRI
        //--------------------------------------------------

        "nikAyahIstri",
        "namaAyahIstri",
        "tempatLahirAyahIstri",
        "tanggalLahirAyahIstri",
        "agamaAyahIstri",
        "pekerjaanAyahIstri",
        "alamatAyahIstri",

        //--------------------------------------------------
        // IBU ISTRI
        //--------------------------------------------------

        "nikIbuIstri",
        "namaIbuIstri",
        "tempatLahirIbuIstri",
        "tanggalLahirIbuIstri",
        "agamaIbuIstri",
        "pekerjaanIbuIstri",
        "alamatIbuIstri",

        //--------------------------------------------------
        // DATA AKAD
        //--------------------------------------------------

        "hariAkad",
        "tanggalAkad",
        "jamAkad",
        "tempatAkad",
        "maskawin",
        "namaKua",
        "kecamatanKua",
        "kabupatenKua"

    ];

    fields.forEach(function(id){

        localStorage.setItem(id,nilai(id));

    });

}

/*======================================================
  LOAD LOCAL STORAGE
======================================================*/

function loadData(){

    const fields=[

        "nikSuami",
        "namaSuami",
        "tempatLahirSuami",
        "tanggalLahirSuami",
        "jenisKelaminSuami",
        "kewarganegaraanSuami",
        "agamaSuami",
        "pekerjaanSuami",
        "alamatSuami",
        "statusKawinSuami",

        "nikAyahSuami",
        "namaAyahSuami",
        "tempatLahirAyahSuami",
        "tanggalLahirAyahSuami",
        "agamaAyahSuami",
        "pekerjaanAyahSuami",
        "alamatAyahSuami",

        "nikIbuSuami",
        "namaIbuSuami",
        "tempatLahirIbuSuami",
        "tanggalLahirIbuSuami",
        "agamaIbuSuami",
        "pekerjaanIbuSuami",
        "alamatIbuSuami",

        "nikIstri",
        "namaIstri",
        "tempatLahirIstri",
        "tanggalLahirIstri",
        "jenisKelaminIstri",
        "kewarganegaraanIstri",
        "agamaIstri",
        "pekerjaanIstri",
        "alamatIstri",
        "statusKawinIstri",

        "nikAyahIstri",
        "namaAyahIstri",
        "tempatLahirAyahIstri",
        "tanggalLahirAyahIstri",
        "agamaAyahIstri",
        "pekerjaanAyahIstri",
        "alamatAyahIstri",

        "nikIbuIstri",
        "namaIbuIstri",
        "tempatLahirIbuIstri",
        "tanggalLahirIbuIstri",
        "agamaIbuIstri",
        "pekerjaanIbuIstri",
        "alamatIbuIstri",

        "hariAkad",
        "tanggalAkad",
        "jamAkad",
        "tempatAkad",
        "maskawin",
        "namaKua",
        "kecamatanKua",
        "kabupatenKua"

    ];

    fields.forEach(function(id){

        const obj=document.getElementById(id);

        if(obj){

            obj.value=localStorage.getItem(id) || "";

        }

    });

}

/*======================================================
  ISI FIELD DARI LOCAL STORAGE
======================================================*/

function isiField(id){

    const obj = document.getElementById(id);

    if(obj){

        obj.value = localStorage.getItem(id) || "";

    }

}


/*======================================================
  AUTO HARI AKAD
======================================================*/

function setHariAkad(){

    const tanggal = document.getElementById("tanggalAkad").value;

    if(!tanggal){

        document.getElementById("hariAkad").value = "";

        return;

    }


    const hari = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu"
    ];


    const tgl = new Date(tanggal);


    document.getElementById("hariAkad").value =
        hari[tgl.getDay()];

}


/*======================================================
  PREVIEW
======================================================*/

function previewNikah(){

    if(!validasiForm()) return;

    simpanLocalStorage();

    window.location.href = "preview_nikah.html";

}


/*======================================================
  EDIT
======================================================*/

function editSurat(){

    localStorage.setItem("modeSurat","edit");

    window.location.href = "nikah.html";

}


/*======================================================
  HALAMAN BARU
======================================================*/
function suratBaru(){

    return localStorage.getItem("modeSurat") != "edit";

}



/*======================================================
  KEMBALI
======================================================*/

function kembali(){

    window.location.href = "dashboard_nikah.html";

}


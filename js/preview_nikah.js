/*======================================================
  LOAD HALAMAN
======================================================*/

document.addEventListener("DOMContentLoaded", function(){

    cekLogin();

    cekAksesNikah();

    console.log("modeSurat =", localStorage.getItem("modeSurat"));

    loadPreview();

    updateTombol();

});


/*======================================================
  UPDATE TOMBOL
======================================================*/

function updateTombol(){

    if(localStorage.getItem("modeSurat") == "edit"){

        document.getElementById("btnSimpan").style.display = "none";
        document.getElementById("btnUpdate").style.display = "";
        document.getElementById("btnCetak").style.display = "";

    }else{

        document.getElementById("btnSimpan").style.display = "";
        document.getElementById("btnUpdate").style.display = "none";
        document.getElementById("btnCetak").style.display = "none";

    }

}


/*======================================================
  CEK LOGIN
======================================================*/

function cekLogin(){

    const username = localStorage.getItem("username");

    if(username==null){

        window.location.href="index.html";

    }

}

/*======================================================
  LOAD PREVIEW
======================================================*/

function loadPreview(){

    //--------------------------------------------------
    // STATUS OFFLINE
    //--------------------------------------------------

    if(localStorage.getItem("offline")=="true"){

        document.getElementById("btnSimpan").innerHTML=

            '<i class="fas fa-save"></i> Simpan Offline';

    }

    //--------------------------------------------------
    // DATA SUAMI
    //--------------------------------------------------

    isi("nikSuami");
    isi("namaSuami");

    document.getElementById("ttlSuami").innerHTML=

        localStorage.getItem("tempatLahirSuami")+

        ", "+

        formatTanggal(

            localStorage.getItem("tanggalLahirSuami")

        );

    isi("agamaSuami");

    isi("pekerjaanSuami");

    isi("alamatSuami");

    isi("statusKawinSuami");

    //--------------------------------------------------
    // DATA ISTRI
    //--------------------------------------------------

    isi("nikIstri");

    isi("namaIstri");

    document.getElementById("ttlIstri").innerHTML=

        localStorage.getItem("tempatLahirIstri")+

        ", "+

        formatTanggal(

            localStorage.getItem("tanggalLahirIstri")

        );

    isi("agamaIstri");

    isi("pekerjaanIstri");

    isi("alamatIstri");

    isi("statusKawinIstri");

    //--------------------------------------------------
    // DATA AKAD
    //--------------------------------------------------

    isi("hariAkad");

    document.getElementById("tanggalAkad").innerHTML=

        formatTanggal(

            localStorage.getItem("tanggalAkad")

        );

    isi("jamAkad");

    isi("tempatAkad");

    isi("maskawin");

    document.getElementById("kua").innerHTML=

        localStorage.getItem("namaKua")+

        "<br>"+

        localStorage.getItem("kecamatanKua")+

        "<br>"+

        localStorage.getItem("kabupatenKua");

    //--------------------------------------------------
    // NOMOR SURAT
    //--------------------------------------------------

    if(localStorage.getItem("nomorAgenda")){

        document.getElementById("btnCetak").disabled=false;

    }

}

/*======================================================
  TAMPILKAN DATA
======================================================*/

function isi(id){

    const obj=document.getElementById(id);

    if(obj){

        obj.innerHTML=

            localStorage.getItem(id)||"";

    }

}

/*======================================================
  EDIT SURAT
======================================================*/

function editSurat(){

    localStorage.setItem("modeSurat","edit");

    window.location.href = "nikah.html";

}

/*======================================================
  SURAT BARU
======================================================*/

function suratBaru(){

    return localStorage.getItem("nomorAgenda")==null;

}

/*======================================================
  MODE OFFLINE
======================================================*/

function modeOffline(){

    return localStorage.getItem("offline")=="true";

}

/*======================================================
  SHOW LOADING
======================================================*/

function showLoading(){

    document.getElementById("loading").style.display="flex";

}

/*======================================================
  HIDE LOADING
======================================================*/

function hideLoading(){

    document.getElementById("loading").style.display="none";

}

/*======================================================
  FORMAT TANGGAL
======================================================*/

function formatTanggal(tanggal){

    if(

        tanggal==null ||

        tanggal==""

    ){

        return "";

    }

    const bulan=[

        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"

    ];

    const t=new Date(tanggal);

    return(

        t.getDate()+" "+bulan[t.getMonth()]+" "+t.getFullYear()

    );

}

/*======================================================
  NILAI LOCAL STORAGE
======================================================*/

function ls(key){

    return localStorage.getItem(key)||"";

}

/*======================================================
  SIMPAN SURAT
======================================================*/

async function simpanSurat(){

    //--------------------------------------------------
    // MODE OFFLINE
    //--------------------------------------------------

    if(modeOffline()){

        simpanOffline();

        return;

    }

    showLoading();

    try{

        //--------------------------------------------------
        // SURAT BARU
        //--------------------------------------------------

        if(suratBaru()){

            await simpanAgenda();

            await simpanNikah();

            //--------------------------------------------------
            // UBAH KE MODE EDIT
            //--------------------------------------------------

            localStorage.setItem("modeSurat","edit");

            updateTombol();

        }else{

            await updateNikah();

        }

        alert("Data berhasil disimpan.");

    }catch(err){

        console.log(err);

        alert("Data gagal disimpan.");

    }

    hideLoading();

}


/*======================================================
  SIMPAN AGENDA
======================================================*/

async function simpanAgenda(){

    let url =

        URL +

        "?aksi=simpanagenda" +

        "&token=" + TOKEN +

        "&nik=" + encodeURIComponent(ls("nikSuami")) +

        "&nama=" + encodeURIComponent(ls("namaSuami")) +

        "&jenis=" + encodeURIComponent("PERMOHONAN NIKAH");

    const response = await fetch(url);

    const hasil = await response.json();

    if(!hasil.status){

        throw new Error(hasil.pesan);

    }

    localStorage.setItem(
        "nomorAgenda",
        hasil.nomor
    );

    localStorage.setItem(
        "kodeVerifikasi",
        hasil.kodeVerifikasi
    );

}


/*======================================================
  SIMPAN NIKAH
======================================================*/

async function simpanNikah(){

    let url =

        URL +

        "?aksi=simpanNikah" +

        "&token=" + TOKEN +

        //--------------------------------------------------
        // NOMOR AGENDA
        //--------------------------------------------------

        "&nomor=" + encodeURIComponent(ls("nomorAgenda")) +

        //--------------------------------------------------
        // CALON SUAMI
        //--------------------------------------------------

        "&nikSuami=" + encodeURIComponent(ls("nikSuami")) +
        "&namaSuami=" + encodeURIComponent(ls("namaSuami")) +
        "&tempatLahirSuami=" + encodeURIComponent(ls("tempatLahirSuami")) +
        "&tanggalLahirSuami=" + encodeURIComponent(ls("tanggalLahirSuami")) +
        "&jenisKelaminSuami=" + encodeURIComponent(ls("jenisKelaminSuami")) +
        "&kewarganegaraanSuami=" + encodeURIComponent(ls("kewarganegaraanSuami")) +
        "&agamaSuami=" + encodeURIComponent(ls("agamaSuami")) +
        "&pekerjaanSuami=" + encodeURIComponent(ls("pekerjaanSuami")) +
        "&alamatSuami=" + encodeURIComponent(ls("alamatSuami")) +
        "&statusKawinSuami=" + encodeURIComponent(ls("statusKawinSuami")) +

        //--------------------------------------------------
        // AYAH SUAMI
        //--------------------------------------------------

        "&nikAyahSuami=" + encodeURIComponent(ls("nikAyahSuami")) +
        "&namaAyahSuami=" + encodeURIComponent(ls("namaAyahSuami")) +
        "&tempatLahirAyahSuami=" + encodeURIComponent(ls("tempatLahirAyahSuami")) +
        "&tanggalLahirAyahSuami=" + encodeURIComponent(ls("tanggalLahirAyahSuami")) +
        "&agamaAyahSuami=" + encodeURIComponent(ls("agamaAyahSuami")) +
        "&pekerjaanAyahSuami=" + encodeURIComponent(ls("pekerjaanAyahSuami")) +
        "&alamatAyahSuami=" + encodeURIComponent(ls("alamatAyahSuami")) +

        //--------------------------------------------------
        // IBU SUAMI
        //--------------------------------------------------

        "&nikIbuSuami=" + encodeURIComponent(ls("nikIbuSuami")) +
        "&namaIbuSuami=" + encodeURIComponent(ls("namaIbuSuami")) +
        "&tempatLahirIbuSuami=" + encodeURIComponent(ls("tempatLahirIbuSuami")) +
        "&tanggalLahirIbuSuami=" + encodeURIComponent(ls("tanggalLahirIbuSuami")) +
        "&agamaIbuSuami=" + encodeURIComponent(ls("agamaIbuSuami")) +
        "&pekerjaanIbuSuami=" + encodeURIComponent(ls("pekerjaanIbuSuami")) +
        "&alamatIbuSuami=" + encodeURIComponent(ls("alamatIbuSuami")) +

        //--------------------------------------------------
        // CALON ISTRI
        //--------------------------------------------------

        "&nikIstri=" + encodeURIComponent(ls("nikIstri")) +
        "&namaIstri=" + encodeURIComponent(ls("namaIstri")) +
        "&tempatLahirIstri=" + encodeURIComponent(ls("tempatLahirIstri")) +
        "&tanggalLahirIstri=" + encodeURIComponent(ls("tanggalLahirIstri")) +
        "&jenisKelaminIstri=" + encodeURIComponent(ls("jenisKelaminIstri")) +
        "&kewarganegaraanIstri=" + encodeURIComponent(ls("kewarganegaraanIstri")) +
        "&agamaIstri=" + encodeURIComponent(ls("agamaIstri")) +
        "&pekerjaanIstri=" + encodeURIComponent(ls("pekerjaanIstri")) +
        "&alamatIstri=" + encodeURIComponent(ls("alamatIstri")) +
        "&statusKawinIstri=" + encodeURIComponent(ls("statusKawinIstri")) +

        //--------------------------------------------------
        // AYAH ISTRI
        //--------------------------------------------------

        "&nikAyahIstri=" + encodeURIComponent(ls("nikAyahIstri")) +
        "&namaAyahIstri=" + encodeURIComponent(ls("namaAyahIstri")) +
        "&tempatLahirAyahIstri=" + encodeURIComponent(ls("tempatLahirAyahIstri")) +
        "&tanggalLahirAyahIstri=" + encodeURIComponent(ls("tanggalLahirAyahIstri")) +
        "&agamaAyahIstri=" + encodeURIComponent(ls("agamaAyahIstri")) +
        "&pekerjaanAyahIstri=" + encodeURIComponent(ls("pekerjaanAyahIstri")) +
        "&alamatAyahIstri=" + encodeURIComponent(ls("alamatAyahIstri")) +

        //--------------------------------------------------
        // IBU ISTRI
        //--------------------------------------------------

        "&nikIbuIstri=" + encodeURIComponent(ls("nikIbuIstri")) +
        "&namaIbuIstri=" + encodeURIComponent(ls("namaIbuIstri")) +
        "&tempatLahirIbuIstri=" + encodeURIComponent(ls("tempatLahirIbuIstri")) +
        "&tanggalLahirIbuIstri=" + encodeURIComponent(ls("tanggalLahirIbuIstri")) +
        "&agamaIbuIstri=" + encodeURIComponent(ls("agamaIbuIstri")) +
        "&pekerjaanIbuIstri=" + encodeURIComponent(ls("pekerjaanIbuIstri")) +
        "&alamatIbuIstri=" + encodeURIComponent(ls("alamatIbuIstri")) +

        //--------------------------------------------------
        // DATA AKAD
        //--------------------------------------------------

        "&hariAkad=" + encodeURIComponent(ls("hariAkad")) +
        "&tanggalAkad=" + encodeURIComponent(ls("tanggalAkad")) +
        "&jamAkad=" + encodeURIComponent(ls("jamAkad")) +
        "&tempatAkad=" + encodeURIComponent(ls("tempatAkad")) +
        "&maskawin=" + encodeURIComponent(ls("maskawin")) +
        "&namaKua=" + encodeURIComponent(ls("namaKua")) +
        "&kecamatanKua=" + encodeURIComponent(ls("kecamatanKua")) +
        "&kabupatenKua=" + encodeURIComponent(ls("kabupatenKua"));

    const response = await fetch(url);

    const hasil = (await response.text()).trim();

    if(hasil != "DATA BERHASIL DISIMPAN"){

        throw new Error(hasil);

    }

}



/*======================================================
  UPDATE SURAT
======================================================*/

async function updateSurat(){

    //--------------------------------------------------
    // MODE OFFLINE
    //--------------------------------------------------

    if(modeOffline()){

        alert("Update tidak tersedia pada mode offline.");

        return;

    }

    showLoading();

    try{

        //--------------------------------------------------
        // UPDATE AGENDA
        //--------------------------------------------------

        await updateAgenda();

        //--------------------------------------------------
        // UPDATE DATA NIKAH
        //--------------------------------------------------

        await updateNikah();

        //--------------------------------------------------
        // MODE EDIT
        //--------------------------------------------------

        localStorage.setItem("modeSurat","edit");

        //--------------------------------------------------
        // UPDATE TOMBOL
        //--------------------------------------------------

        updateTombol();

        //--------------------------------------------------
        // CETAK
        //--------------------------------------------------

        document.getElementById("btnCetak").disabled = false;

        alert("Data berhasil diupdate.");

    }catch(err){

        alert(err.message || "Data gagal diupdate.");

    }

    hideLoading();

}

/*======================================================
  UPDATE NIKAH
======================================================*/

async function updateNikah(){


    //--------------------------------------------------
    // UPDATE DATA NIKAH
    //--------------------------------------------------

    let url =

        URL +

        "?aksi=updateNikah" +

        "&token=" + TOKEN +

        "&nomor=" + encodeURIComponent(ls("nomorAgenda")) +

        //--------------------------------------------------
        // CALON SUAMI
        //--------------------------------------------------

        "&nikSuami=" + encodeURIComponent(ls("nikSuami")) +
        "&namaSuami=" + encodeURIComponent(ls("namaSuami")) +
        "&tempatLahirSuami=" + encodeURIComponent(ls("tempatLahirSuami")) +
        "&tanggalLahirSuami=" + encodeURIComponent(ls("tanggalLahirSuami")) +
        "&jenisKelaminSuami=" + encodeURIComponent(ls("jenisKelaminSuami")) +
        "&kewarganegaraanSuami=" + encodeURIComponent(ls("kewarganegaraanSuami")) +
        "&agamaSuami=" + encodeURIComponent(ls("agamaSuami")) +
        "&pekerjaanSuami=" + encodeURIComponent(ls("pekerjaanSuami")) +
        "&alamatSuami=" + encodeURIComponent(ls("alamatSuami")) +
        "&statusKawinSuami=" + encodeURIComponent(ls("statusKawinSuami")) +

        //--------------------------------------------------
        // AYAH SUAMI
        //--------------------------------------------------

        "&nikAyahSuami=" + encodeURIComponent(ls("nikAyahSuami")) +
        "&namaAyahSuami=" + encodeURIComponent(ls("namaAyahSuami")) +
        "&tempatLahirAyahSuami=" + encodeURIComponent(ls("tempatLahirAyahSuami")) +
        "&tanggalLahirAyahSuami=" + encodeURIComponent(ls("tanggalLahirAyahSuami")) +
        "&agamaAyahSuami=" + encodeURIComponent(ls("agamaAyahSuami")) +
        "&pekerjaanAyahSuami=" + encodeURIComponent(ls("pekerjaanAyahSuami")) +
        "&alamatAyahSuami=" + encodeURIComponent(ls("alamatAyahSuami")) +

        //--------------------------------------------------
        // IBU SUAMI
        //--------------------------------------------------

        "&nikIbuSuami=" + encodeURIComponent(ls("nikIbuSuami")) +
        "&namaIbuSuami=" + encodeURIComponent(ls("namaIbuSuami")) +
        "&tempatLahirIbuSuami=" + encodeURIComponent(ls("tempatLahirIbuSuami")) +
        "&tanggalLahirIbuSuami=" + encodeURIComponent(ls("tanggalLahirIbuSuami")) +
        "&agamaIbuSuami=" + encodeURIComponent(ls("agamaIbuSuami")) +
        "&pekerjaanIbuSuami=" + encodeURIComponent(ls("pekerjaanIbuSuami")) +
        "&alamatIbuSuami=" + encodeURIComponent(ls("alamatIbuSuami")) +

        //--------------------------------------------------
        // CALON ISTRI
        //--------------------------------------------------

        "&nikIstri=" + encodeURIComponent(ls("nikIstri")) +
        "&namaIstri=" + encodeURIComponent(ls("namaIstri")) +
        "&tempatLahirIstri=" + encodeURIComponent(ls("tempatLahirIstri")) +
        "&tanggalLahirIstri=" + encodeURIComponent(ls("tanggalLahirIstri")) +
        "&jenisKelaminIstri=" + encodeURIComponent(ls("jenisKelaminIstri")) +
        "&kewarganegaraanIstri=" + encodeURIComponent(ls("kewarganegaraanIstri")) +
        "&agamaIstri=" + encodeURIComponent(ls("agamaIstri")) +
        "&pekerjaanIstri=" + encodeURIComponent(ls("pekerjaanIstri")) +
        "&alamatIstri=" + encodeURIComponent(ls("alamatIstri")) +
        "&statusKawinIstri=" + encodeURIComponent(ls("statusKawinIstri")) +

        //--------------------------------------------------
        // AYAH ISTRI
        //--------------------------------------------------

        "&nikAyahIstri=" + encodeURIComponent(ls("nikAyahIstri")) +
        "&namaAyahIstri=" + encodeURIComponent(ls("namaAyahIstri")) +
        "&tempatLahirAyahIstri=" + encodeURIComponent(ls("tempatLahirAyahIstri")) +
        "&tanggalLahirAyahIstri=" + encodeURIComponent(ls("tanggalLahirAyahIstri")) +
        "&agamaAyahIstri=" + encodeURIComponent(ls("agamaAyahIstri")) +
        "&pekerjaanAyahIstri=" + encodeURIComponent(ls("pekerjaanAyahIstri")) +
        "&alamatAyahIstri=" + encodeURIComponent(ls("alamatAyahIstri")) +

        //--------------------------------------------------
        // IBU ISTRI
        //--------------------------------------------------

        "&nikIbuIstri=" + encodeURIComponent(ls("nikIbuIstri")) +
        "&namaIbuIstri=" + encodeURIComponent(ls("namaIbuIstri")) +
        "&tempatLahirIbuIstri=" + encodeURIComponent(ls("tempatLahirIbuIstri")) +
        "&tanggalLahirIbuIstri=" + encodeURIComponent(ls("tanggalLahirIbuIstri")) +
        "&agamaIbuIstri=" + encodeURIComponent(ls("agamaIbuIstri")) +
        "&pekerjaanIbuIstri=" + encodeURIComponent(ls("pekerjaanIbuIstri")) +
        "&alamatIbuIstri=" + encodeURIComponent(ls("alamatIbuIstri")) +

        //--------------------------------------------------
        // DATA AKAD
        //--------------------------------------------------

        "&hariAkad=" + encodeURIComponent(ls("hariAkad")) +
        "&tanggalAkad=" + encodeURIComponent(ls("tanggalAkad")) +
        "&jamAkad=" + encodeURIComponent(ls("jamAkad")) +
        "&tempatAkad=" + encodeURIComponent(ls("tempatAkad")) +
        "&maskawin=" + encodeURIComponent(ls("maskawin")) +
        "&namaKua=" + encodeURIComponent(ls("namaKua")) +
        "&kecamatanKua=" + encodeURIComponent(ls("kecamatanKua")) +
        "&kabupatenKua=" + encodeURIComponent(ls("kabupatenKua"));

    const response = await fetch(url);

    const hasil = (await response.text()).trim();

    if(hasil.toUpperCase().indexOf("BERHASIL") == -1){

        throw new Error(hasil);

    }

}


/*======================================================
  UPDATE AGENDA
======================================================*/

async function updateAgenda(){

    //--------------------------------------------------
    // DATA JSON
    //--------------------------------------------------

    const data = {};

    for(let i=0;i<localStorage.length;i++){

        const key = localStorage.key(i);

        if(
            key == "username" ||
            key == "password" ||
            key == "token" ||
            key == "offline"
        ){
            continue;
        }

        data[key] = localStorage.getItem(key);

    }

    //--------------------------------------------------
    // URL
    //--------------------------------------------------

    let url =

    URL +

    "?aksi=updateagenda" +

    "&token=" + TOKEN +

    "&nomor=" + encodeURIComponent(ls("nomorAgenda")) +

    "&nik=" + encodeURIComponent(ls("nikSuami")) +

    "&nama=" + encodeURIComponent(ls("namaSuami")) +

    "&jenis=" + encodeURIComponent("PERMOHONAN NIKAH") +

    "&dataJSON=" + encodeURIComponent(JSON.stringify(data));

}

/*======================================================
  SIMPAN OFFLINE
======================================================*/

function simpanOffline(){

    let daftar=JSON.parse(

        localStorage.getItem("nikahOffline") ||

        "[]"

    );

    daftar.push({

        nomor:ls("nomorAgenda"),

        tanggal:new Date().toISOString(),

        data:ambilDataOffline()

    });

    localStorage.setItem(

        "nikahOffline",

        JSON.stringify(daftar)

    );

    alert(

        "Data berhasil disimpan secara OFFLINE."

    );

    document.getElementById("btnCetak").disabled=false;

}

/*======================================================
  AMBIL DATA OFFLINE
======================================================*/

function ambilDataOffline(){

    const hasil={};

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
        "kabupatenKua",

        "nomorAgenda",
        "kodeVerifikasi"

    ];

    fields.forEach(function(field){

        hasil[field]=ls(field);

    });

    return hasil;

}

/*======================================================
  CETAK SURAT
======================================================*/

function cetakSurat(){

    //--------------------------------------------------
    // CEK ADA SURAT YANG DIPILIH
    //--------------------------------------------------

    if(!adaSuratDipilih()){

        alert("Pilih minimal satu surat yang akan dicetak.");

        return;

    }

    //--------------------------------------------------
    // N1 SUAMI
    //--------------------------------------------------

    if(document.getElementById("n1Suami").checked){

        localStorage.setItem("jenisN1","suami");

        window.open(

            "cetak_nikah.html",

            "_blank"

        );

    }

    //--------------------------------------------------
    // N1 ISTRI
    //--------------------------------------------------

    if(document.getElementById("n1Istri").checked){

        localStorage.setItem("jenisN1","istri");

        window.open(

            "cetak_nikah.html",

            "_blank"

        );

    }

//--------------------------------------------------
// N2
//--------------------------------------------------

if(document.getElementById("n2").checked){

    window.open(

        "cetak_n2.html",

        "_blank"

    );

}



    //--------------------------------------------------
    // N4
    //--------------------------------------------------

    if(document.getElementById("n4").checked){

        window.open(

            "cetak_n4.html",

            "_blank"

        );

    }

    //--------------------------------------------------
    // N5 SUAMI
    //--------------------------------------------------

    if(document.getElementById("n5Suami").checked){

        localStorage.setItem("jenisN5","suami");

        window.open(

            "cetak_n5.html",

            "_blank"

        );

    }

    //--------------------------------------------------
    // N5 ISTRI
    //--------------------------------------------------

    if(document.getElementById("n5Istri").checked){

        localStorage.setItem("jenisN5","istri");

        window.open(

            "cetak_n5.html",

            "_blank"

        );

    }

//--------------------------------------------------
// N6
//--------------------------------------------------

if(document.getElementById("n6").checked){

    window.open(

        "preview_n6.html",

        "_blank"

    );

}

}

/*======================================================
  ADA SURAT DIPILIH
======================================================*/

function adaSuratDipilih(){

    return(

        document.getElementById("n1Suami").checked ||

        document.getElementById("n1Istri").checked ||

        document.getElementById("n2").checked ||

        document.getElementById("n4").checked ||

        document.getElementById("n5Suami").checked ||

        document.getElementById("n5Istri").checked ||

        document.getElementById("n6").checked

    );

}

/*======================================================
  KEMBALI
======================================================*/

function kembali(){

    window.location.href="dashboard.html";

}

/*======================================================
  BERSIHKAN DATA NIKAH
======================================================*/

function clearDataNikah(){

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
        "kabupatenKua",

        "nomorAgenda",
        "kodeVerifikasi",

        "jenisN1",
        "jenisN5"

    ];

    fields.forEach(function(item){

        localStorage.removeItem(item);

    });

}

/*======================================================
  LOAD STATUS
======================================================*/

function loadStatus(){

    if(localStorage.getItem("nomorAgenda")){

        enableCetak();

    }else{

        disableCetak();

    }

}

/*======================================================
  ENABLE CETAK
======================================================*/

function enableCetak(){

    document.getElementById("btnCetak").disabled=false;

}

/*======================================================
  DISABLE CETAK
======================================================*/

function disableCetak(){

    document.getElementById("btnCetak").disabled=true;

}

/*======================================================
  VALIDASI CETAK
======================================================*/

function validasiCetak(){

    if(!adaSuratDipilih()){

        alert("Pilih minimal satu surat yang akan dicetak.");

        return false;

    }

    return true;

}

/*======================================================
  RESET PILIHAN CETAK
======================================================*/

function resetPilihanCetak(){

    const list=[

        "n1Suami",
        "n1Istri",
        "n2",
        "n4",
        "n5Suami",
        "n5Istri",
        "n6"

    ];

    list.forEach(function(id){

        const obj=document.getElementById(id);

        if(obj){

            obj.checked=false;

        }

    });

}


/*======================================================
  SET JENIS SURAT
======================================================*/

function setJenisSurat(jenis){

    localStorage.setItem(

        "jenisSuratCetak",

        jenis

    );

}

/*======================================================
  LOAD PREVIEW
======================================================*/

function loadPreview(){

    //--------------------------------------------------
    // DATA SUAMI
    //--------------------------------------------------

    isi("nikSuami");
    isi("namaSuami");

    document.getElementById("ttlSuami").innerHTML =

        ls("tempatLahirSuami") +

        ", " +

        formatTanggal(ls("tanggalLahirSuami"));

    isi("jenisKelaminSuami");
    isi("kewarganegaraanSuami");
    isi("agamaSuami");
    isi("pekerjaanSuami");
    isi("statusKawinSuami");
    isi("alamatSuami");

    //--------------------------------------------------
    // AYAH SUAMI
    //--------------------------------------------------

    isi("nikAyahSuami");
    isi("namaAyahSuami");

    document.getElementById("ttlAyahSuami").innerHTML =

        ls("tempatLahirAyahSuami") +

        ", " +

        formatTanggal(ls("tanggalLahirAyahSuami"));

    isi("agamaAyahSuami");
    isi("pekerjaanAyahSuami");
    isi("alamatAyahSuami");

    //--------------------------------------------------
    // IBU SUAMI
    //--------------------------------------------------

    isi("nikIbuSuami");
    isi("namaIbuSuami");

    document.getElementById("ttlIbuSuami").innerHTML =

        ls("tempatLahirIbuSuami") +

        ", " +

        formatTanggal(ls("tanggalLahirIbuSuami"));

    isi("agamaIbuSuami");
    isi("pekerjaanIbuSuami");
    isi("alamatIbuSuami");

    //--------------------------------------------------
    // DATA ISTRI
    //--------------------------------------------------

    isi("nikIstri");
    isi("namaIstri");

    document.getElementById("ttlIstri").innerHTML =

        ls("tempatLahirIstri") +

        ", " +

        formatTanggal(ls("tanggalLahirIstri"));

    isi("jenisKelaminIstri");
    isi("kewarganegaraanIstri");
    isi("agamaIstri");
    isi("pekerjaanIstri");
    isi("statusKawinIstri");
    isi("alamatIstri");

    //--------------------------------------------------
    // AYAH ISTRI
    //--------------------------------------------------

    isi("nikAyahIstri");
    isi("namaAyahIstri");

    document.getElementById("ttlAyahIstri").innerHTML =

        ls("tempatLahirAyahIstri") +

        ", " +

        formatTanggal(ls("tanggalLahirAyahIstri"));

    isi("agamaAyahIstri");
    isi("pekerjaanAyahIstri");
    isi("alamatAyahIstri");

    //--------------------------------------------------
    // IBU ISTRI
    //--------------------------------------------------

    isi("nikIbuIstri");
    isi("namaIbuIstri");

    document.getElementById("ttlIbuIstri").innerHTML =

        ls("tempatLahirIbuIstri") +

        ", " +

        formatTanggal(ls("tanggalLahirIbuIstri"));

    isi("agamaIbuIstri");
    isi("pekerjaanIbuIstri");
    isi("alamatIbuIstri");

    //--------------------------------------------------
    // DATA AKAD
    //--------------------------------------------------

    isi("hariAkad");

    document.getElementById("tanggalAkad").innerHTML =

        formatTanggal(ls("tanggalAkad"));

    isi("jamAkad");
    isi("tempatAkad");
    isi("maskawin");

    document.getElementById("namaKua").innerHTML =

        ls("namaKua");

    document.getElementById("kecamatanKua").innerHTML =

        ls("kecamatanKua");

    document.getElementById("kabupatenKua").innerHTML =

        ls("kabupatenKua");

    //--------------------------------------------------
    // STATUS TOMBOL
    //--------------------------------------------------

    loadStatus();

}

/*======================================================
  ISI DATA
======================================================*/

function isi(id){

    const obj = document.getElementById(id);

    if(obj){

        obj.innerHTML = ls(id);

    }

}



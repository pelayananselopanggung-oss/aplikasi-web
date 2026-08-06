/*======================================================
  LOAD HALAMAN
======================================================*/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        cekLogin();
        cekAksesNikah();

        loadDashboard();

         document
        .getElementById("menuNikah")
        .addEventListener("click", buatNikah);



    }

);

/*======================================================
  LOADING
======================================================*/

function showLoading(){

    const loading = document.getElementById("loading");

    if(loading){

        loading.style.display = "flex";

    }

}

function hideLoading(){

    const loading = document.getElementById("loading");

    if(loading){

        loading.style.display = "none";

    }

}

/*======================================================
  LOGIN
======================================================*/

function cekLogin(){

    const username = localStorage.getItem("username");

    if(username==null){

        window.location.href="index.html";

        return;

    }

}

/*======================================================
  LOAD DASHBOARD
======================================================*/

function loadDashboard(){

    //--------------------------------------------------
    // NAMA USER
    //--------------------------------------------------

   const namaUser = document.getElementById("namaUser");

if(namaUser){

    namaUser.innerHTML =
        localStorage.getItem("username") || "";

}
    //--------------------------------------------------
    // STATUS KONEKSI
    //--------------------------------------------------

    updateStatusInternet();

    //--------------------------------------------------
    // LOAD DATA
    //--------------------------------------------------

    if(navigator.onLine){

        loadDashboardOnline();

    }

    else{

        loadDashboardOffline();

    }

}

/*======================================================
  DASHBOARD ONLINE
======================================================*/

async function loadDashboardOnline(){

    try{

        showLoading();

        //--------------------------------------------------
        // SEMENTARA
        //--------------------------------------------------

        document.getElementById("hariIni").innerHTML="0";

        document.getElementById("bulanIni").innerHTML="0";

        document.getElementById("tahunIni").innerHTML="0";

    }

    catch(err){

        console.log(err);

    }

    finally{

        hideLoading();

    }

}

/*======================================================
  DASHBOARD OFFLINE
======================================================*/

function loadDashboardOffline(){

    document.getElementById("hariIni").innerHTML="0";

    document.getElementById("bulanIni").innerHTML="0";

    document.getElementById("tahunIni").innerHTML="0";

}

/*======================================================
  STATUS INTERNET
======================================================*/

function updateStatusInternet(){

    const status = document.getElementById("statusInternet");

    if(!status) return;

    if(navigator.onLine){

        status.innerHTML =

            '<i class="fa fa-circle text-success"></i> Online';

    }

    else{

        status.innerHTML =

            '<i class="fa fa-circle text-danger"></i> Offline';

    }

}

window.addEventListener(

    "online",

    function(){

        updateStatusInternet();

        loadDashboardOnline();

    }

);

window.addEventListener(

    "offline",

    function(){

        updateStatusInternet();

        loadDashboardOffline();

    }

);

/*======================================================
  MENU
======================================================*/

function permohonan(){

    window.location.href="nikah.html";

}

function riwayat(){

    window.location.href="riwayat_nikah.html";

}


function pengaturan(){

    window.location.href = "pengaturan.html";

}


function tandatangan(){

    window.location.href = "pengaturan_ttd.html";

}


/*======================================================
  LOGOUT
======================================================*/

function logout(){

    if(!confirm("Keluar dari aplikasi?")){

        return;

    }

    localStorage.clear();

    window.location.href="index.html";

}



function buatNikah(){

    //--------------------------------------------------
    // MODE SURAT BARU
    //--------------------------------------------------

    localStorage.setItem(
        "modeSurat",
        "baru"
    );


    //--------------------------------------------------
    // HAPUS DATA SURAT LAMA
    //--------------------------------------------------

    localStorage.removeItem("nomorAgenda");
    localStorage.removeItem("kodeVerifikasi");


    //--------------------------------------------------
    // HAPUS SEMUA DATA NIKAH LAMA
    //--------------------------------------------------

    const dataNikah = [

        // SUAMI
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

        // AYAH SUAMI
        "nikAyahSuami",
        "namaAyahSuami",
        "tempatLahirAyahSuami",
        "tanggalLahirAyahSuami",
        "agamaAyahSuami",
        "pekerjaanAyahSuami",
        "alamatAyahSuami",

        // IBU SUAMI
        "nikIbuSuami",
        "namaIbuSuami",
        "tempatLahirIbuSuami",
        "tanggalLahirIbuSuami",
        "agamaIbuSuami",
        "pekerjaanIbuSuami",
        "alamatIbuSuami",

        // ISTRI
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

        // AYAH ISTRI
        "nikAyahIstri",
        "namaAyahIstri",
        "tempatLahirAyahIstri",
        "tanggalLahirAyahIstri",
        "agamaAyahIstri",
        "pekerjaanAyahIstri",
        "alamatAyahIstri",

        // IBU ISTRI
        "nikIbuIstri",
        "namaIbuIstri",
        "tempatLahirIbuIstri",
        "tanggalLahirIbuIstri",
        "agamaIbuIstri",
        "pekerjaanIbuIstri",
        "alamatIbuIstri",

        // AKAD
        "hariAkad",
        "tanggalAkad",
        "jamAkad",
        "tempatAkad",
        "maskawin",
        "namaKua",
        "kecamatanKua",
        "kabupatenKua"

    ];


    dataNikah.forEach(function(key){

        localStorage.removeItem(key);

    });


    //--------------------------------------------------
    // MENUJU HALAMAN NIKAH
    //--------------------------------------------------

    window.location.href="nikah.html";

}
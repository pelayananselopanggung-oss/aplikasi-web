
//======================================================
// KONFIGURASI
//======================================================

// URL Google Apps Script
const URL = "https://script.google.com/macros/s/AKfycbw24mrUE8XAhoabeOUnRju0zuj1D8vLS8s5ply6r4kxAl2UMnd4HHCjoaHlC_gGZNwAGg/exec";

// Token (samakan dengan yang ada di Kodular)
const TOKEN = "RHS_SLPG_2004";

/*======================================================
  LOGIN
======================================================*/

async function login(){

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    if(username==""){

        alert("Username belum diisi");

        return;

    }

    if(password==""){

        alert("Password belum diisi");

        return;

    }

    try{

        showLoading("Sedang Login...");

        //--------------------------------------------------
        // URL
        //--------------------------------------------------

        const requestURL =

            URL +

            "?aksi=login" +

            "&token=" + encodeURIComponent(TOKEN) +

            "&username=" + encodeURIComponent(username) +

            "&password=" + encodeURIComponent(password);

        //--------------------------------------------------
        // REQUEST
        //--------------------------------------------------

        const response = await fetch(requestURL);

        if(!response.ok){

            throw new Error("HTTP Error : " + response.status);

        }

        //--------------------------------------------------
        // HASIL
        //--------------------------------------------------

        const hasil = await response.text();

        console.log(hasil);

        //--------------------------------------------------
        // LOGIN BERHASIL
        //--------------------------------------------------

        if(hasil.includes("SUKSES")){

            const data = hasil.split("#");

            const role = data[1];

            //--------------------------------------------------
            // SIMPAN LOGIN
            //--------------------------------------------------

            localStorage.setItem("username", username);

            localStorage.setItem("role", role);

            localStorage.removeItem("modeAdmin");

            //--------------------------------------------------
            // LOGIN SESUAI ROLE
            //--------------------------------------------------

            switch(role){

                case "ADMIN":

                    hideLoading();

                    document.getElementById("popupRole").style.display="flex";

                    return;

                case "OPERATOR":

                    window.location.href="dashboard.html";

                    return;

                case "OPERATOR NIKAH":

                    window.location.href="dashboard_nikah.html";

                    return;

                default:

                    alert("Role tidak dikenali");

                    localStorage.clear();

                    return;

            }

        }

        //--------------------------------------------------
        // LOGIN GAGAL
        //--------------------------------------------------

        else{

            alert("Login Gagal\nPeriksa Username atau Password");

        }

    }

    catch(err){

        console.error(err);

        alert("Tidak dapat terhubung ke server.");

    }

    finally{

        hideLoading();

    }

}

/*======================================================
  ADMIN MASUK OPERATOR
======================================================*/

function masukOperator(){

    localStorage.setItem(

        "modeAdmin",

        "OPERATOR"

    );

    window.location.href="dashboard.html";

}

/*======================================================
  ADMIN MASUK NIKAH
======================================================*/

function masukNikah(){

    localStorage.setItem(

        "modeAdmin",

        "OPERATOR NIKAH"

    );

    window.location.href="dashboard_nikah.html";

}

/*======================================================
  CEK LOGIN
======================================================*/

function cekLogin(){

    const username =

        localStorage.getItem("username");

    if(username==null){

        window.location.href="index.html";

    }

}

/*======================================================
  CEK AKSES DASHBOARD UMUM
======================================================*/

function cekAksesDashboard(){

    const role =

        localStorage.getItem("role");

    const mode =

        localStorage.getItem("modeAdmin");

    if(role=="OPERATOR"){

        return;

    }

    if(

        role=="ADMIN" &&

        (mode=="OPERATOR" || mode==null)

    ){

        return;

    }

    window.location.href="dashboard_nikah.html";

}

/*======================================================
  CEK AKSES DASHBOARD NIKAH
======================================================*/

function cekAksesNikah(){

    const role =

        localStorage.getItem("role");

    const mode =

        localStorage.getItem("modeAdmin");

    if(role=="OPERATOR NIKAH"){

        return;

    }

    if(

        role=="ADMIN" &&

        mode=="OPERATOR NIKAH"

    ){

        return;

    }

    window.location.href="dashboard.html";

}

/*======================================================
  LOGOUT
======================================================*/

function logout(){

    if(!confirm("Yakin ingin logout?")){

        return;

    }

    localStorage.clear();

    window.location.href="index.html";

}

/*======================================================
  LOADING
======================================================*/

function showLoading(pesan="Memproses..."){

    const overlay =

        document.getElementById("loadingOverlay");

    if(!overlay) return;

    overlay.style.display="flex";

    const text =

        document.getElementById("loadingText");

    if(text){

        text.innerHTML=pesan;

    }

}

function hideLoading(){

    const overlay =

        document.getElementById("loadingOverlay");

    if(!overlay) return;

    overlay.style.display="none";

}

/*======================================================
  TANGGAL INDONESIA
======================================================*/

function tanggalIndonesia(tanggal){

    if(!tanggal) return "";

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

    return tanggal.getDate()+" "+

           bulan[tanggal.getMonth()]+" "+

           tanggal.getFullYear();

}
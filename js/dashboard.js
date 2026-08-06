

//=====================================================
// SAAT DASHBOARD DIBUKA
//=====================================================

window.onload = async function(){

    cekLogin();
    cekAksesDashboard();

    tampilOperator();

    loadDashboard();

    eventMenu();

    await updateStatusSinkron();

    const modal = new bootstrap.Modal(
        document.getElementById("modalSinkron")
    );

    modal.show();

}


//=====================================================
// TAMPILKAN NAMA OPERATOR
//=====================================================

function tampilOperator() {

    const username = localStorage.getItem("username");

    document.getElementById("namaOperator").innerHTML = username;

    document.getElementById("nama").innerHTML = username;

}

//=====================================================
// CEK LOGIN
//=====================================================

function cekLogin() {

    const username = localStorage.getItem("username");

    if (!username) {

        window.location.href = "index.html";

    }

}

//=====================================================
// AMBIL DATA DASHBOARD
//=====================================================

async function loadDashboard() {

    try {

        const response = await fetch(

            URL +
            "?aksi=dashboard" +
            "&token=" + encodeURIComponent(TOKEN)

        );

        if (!response.ok) {

            throw new Error("HTTP Error : " + response.status);

        }

        const hasil = await response.text();

        console.log("Dashboard :", hasil);

        /*
            Contoh response

            1250|450
        */

        const data = hasil.split("|");

        document.getElementById("jmlPenduduk").innerHTML = data[0];

        document.getElementById("jmlKK").innerHTML = data[1];

    }

    catch (error) {

        console.log(error);

        alert("Gagal mengambil data dashboard.");

    }

}

//=====================================================
// LOGOUT
//=====================================================

function logout() {

    if (confirm("Apakah Anda yakin ingin logout ?")) {

        localStorage.clear();

        window.location.href = "index.html";

    }

}

//=====================================================
// MENU
//=====================================================

function eventMenu() {

    document.getElementById("menuPenduduk").onclick = function () {

        window.location.href = "caridata.html";

    };

    document.getElementById("menuKK").onclick = function () {

        window.location.href = "kk.html";

    };

    document.getElementById("menuPermohonan").onclick = function () {

        window.location.href = "permohonan.html";

    };

    document.getElementById("menuPreview").onclick = function () {

        window.location.href = "data_penduduk.html";

    };

    document.getElementById("menuRiwayat").onclick = function () {

        window.location.href = "history.html";

    };

    document.getElementById("menuCetak").onclick = function () {

        window.location.href = "form_dispenduk.html";

    };

    document.getElementById("menuTTD").onclick = function () {

        window.location.href = "pengaturan_ttd.html";

    };

    document.getElementById("menuPengaturan").onclick = function () {

        window.location.href = "pengaturan.html";

    };

    document.getElementById("menuPertanahan").onclick = function () {

        window.location.href = "pertanahan.html";

    };


}





/*======================================================
STATUS SINKRONISASI
======================================================*/

async function updateStatusSinkron(){

    const jumlah = await jumlahOffline();

    document.getElementById("jumlahBelumSync").innerHTML =
        jumlah;

    //--------------------------------------------------
    // OFFLINE
    //--------------------------------------------------

    if(!navigator.onLine){

        document.getElementById("iconSinkron").className =
            "fa-solid fa-cloud-slash fa-4x text-danger mb-3";

        document.getElementById("statusInternet").innerHTML =
            "Offline";

        document.getElementById("pesanSinkron").innerHTML =
            "Tidak ada koneksi internet. Data baru akan disimpan ke antrean offline.";

    }

    //--------------------------------------------------
    // ONLINE + MASIH ADA ANTREAN
    //--------------------------------------------------

    else if(jumlah>0){

        document.getElementById("iconSinkron").className =
            "fa-solid fa-cloud-arrow-up fa-4x text-warning mb-3";

        document.getElementById("statusInternet").innerHTML =
            "Online";

        document.getElementById("pesanSinkron").innerHTML =
            "Terdapat "+jumlah+" data yang sedang menunggu sinkronisasi otomatis.";

    }

    //--------------------------------------------------
    // ONLINE + TIDAK ADA ANTREAN
    //--------------------------------------------------

    else{

        document.getElementById("iconSinkron").className =
            "fa-solid fa-cloud-check fa-4x text-success mb-3";

        document.getElementById("statusInternet").innerHTML =
            "Online";

        document.getElementById("pesanSinkron").innerHTML =
            "Semua data telah berhasil tersinkron.";

    }

}


//--------------------------------------------------
// SAAT ONLINE
//--------------------------------------------------

window.addEventListener("internetOnline", async function(){

    await replayQueue();

    await updateStatusSinkron();

});


//--------------------------------------------------
// SAAT OFFLINE
//--------------------------------------------------

window.addEventListener("internetOffline", function(){

    updateStatusSinkron();

});
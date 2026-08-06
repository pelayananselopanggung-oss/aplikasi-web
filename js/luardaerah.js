//======================================================
// PENDUDUK LUAR DAERAH
//======================================================



//======================================================
// SAAT HALAMAN DIBUKA
//======================================================

document.addEventListener("DOMContentLoaded", function(){

    cekLogin();
    cekAksesDashboard();

    loadNik();

});


//======================================================
// CEK LOGIN
//======================================================

function cekLogin(){

    if(localStorage.getItem("username")==null){

        window.location.href="index.html";

    }

}


//======================================================
// LOAD NIK
//======================================================

function loadNik(){

    const nik = localStorage.getItem("nikLuar");

    console.log("NIK =", nik);

    if(nik){

        document.getElementById("nik").value = nik;

    }

}


//======================================================
// BERSIHKAN DATA SURAT
//======================================================

function clearDataSurat(){

    const nik = localStorage.getItem("nikLuar");

    // Hapus data surat
    localStorage.removeItem("nomorAgenda");
    localStorage.removeItem("kodeVerifikasi");
    localStorage.removeItem("modePreview");
    localStorage.removeItem("modeSurat");

    localStorage.removeItem("nik");
    localStorage.removeItem("nama");
    localStorage.removeItem("tempatlahir");
    localStorage.removeItem("tanggallahir");
    localStorage.removeItem("jk");
    localStorage.removeItem("agama");
    localStorage.removeItem("pekerjaan");
    localStorage.removeItem("alamat");
    localStorage.removeItem("rt");
    localStorage.removeItem("rw");
    localStorage.removeItem("desa");
    localStorage.removeItem("kecamatan");
    localStorage.removeItem("kabupaten");
    localStorage.removeItem("provinsi");
    localStorage.removeItem("sp");
    localStorage.removeItem("bertempat");
    localStorage.removeItem("keperluan");

    // Kembalikan NIK yang dipilih
    if(nik){

        localStorage.setItem("nikLuar", nik);

    }

}

//======================================================
// SURAT DOMISILI
//======================================================

function domisili(){

    const nik = document.getElementById("nik").value.trim();

    if(nik==""){

        alert("Masukkan NIK terlebih dahulu.");
        return;

    }

    clearDataSurat();

    localStorage.setItem("nikLuar", nik);
    localStorage.setItem("modeSurat", "baru");

    window.location.href = "domisili.html";

}

//======================================================
// SURAT KENDARAAN
//======================================================

function kendaraan(){

    const nik = document.getElementById("nik").value.trim();

    if(nik==""){

        alert("Masukkan NIK terlebih dahulu.");

        return;

    }

    localStorage.setItem("nikLuar", nik);

    clearDataSurat();

    window.location.href = "ranmor.html";

}

//======================================================
// KEMBALI
//======================================================

function kembali(){

    window.location.href="permohonan.html";

}


//======================================================
// LOGOUT
//======================================================

function logout(){

    if(confirm("Keluar dari aplikasi?")){

        localStorage.clear();

        window.location.href="index.html";

    }

}
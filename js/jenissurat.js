//======================================================
// JENIS SURAT
//======================================================

//======================================================
// SAAT HALAMAN DIBUKA
//======================================================

document.addEventListener("DOMContentLoaded", function(){

    cekLogin();
    cekAksesDashboard();

    loadPemohon();

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
// KEMBALI
//======================================================

function kembali(){

    window.location.href="permohonan.html";

}


//======================================================
// LOADING
//======================================================

function showLoading(){

    document.getElementById("loading").style.display="flex";

}

function hideLoading(){

    document.getElementById("loading").style.display="none";

}


//======================================================
// AMBIL DATA PEMOHON
//======================================================

async function loadPemohon(){

    const nik = localStorage.getItem("nik");

    console.log("NIK =", nik);

    if(nik==null){

        alert("Data pemohon belum dipilih.");

        kembali();

        return;

    }

    showLoading();

    try{

        const response = await fetch(

            URL +
            "?aksi=getdata" +
            "&token=" + TOKEN +
            "&nik=" + encodeURIComponent(nik)

        );

        const hasil = await response.text();

        console.log("HASIL =", hasil);

        hideLoading();

        if(
            hasil=="DATA TIDAK DITEMUKAN" ||
            hasil=="NOTFOUND"
        ){

            alert("Data penduduk tidak ditemukan.");

            kembali();

            return;

        }

        tampilPemohon(hasil);

    }

    catch(err){

        hideLoading();

        console.log(err);

        alert("Gagal mengambil data.");

    }

}


//======================================================
// TAMPILKAN DATA
//======================================================

function tampilPemohon(hasil){

    console.log("Data :", hasil);

    const d = hasil.split("#");

    console.log(d);

    document.getElementById("nikPemohon").innerHTML = d[0];
    document.getElementById("namaPemohon").innerHTML = d[1];
    document.getElementById("jkPemohon").innerHTML = d[5];
    document.getElementById("pekerjaanPemohon").innerHTML = d[7];

    document.getElementById("alamatPemohon").innerHTML =
        d[8] +
        " RT " + d[9] +
        " RW " + d[10] +
        ", " + d[11] +
        ", " + d[12] +
        ", " + d[13];

    // Simpan ke localStorage
    localStorage.setItem("nik", d[0]);
    localStorage.setItem("nama", d[1]);
    localStorage.setItem("nokk", d[2]);
    localStorage.setItem("tempatlahir", d[3]);
    localStorage.setItem("tanggallahir", d[4]);
    localStorage.setItem("jk", d[5]);
    localStorage.setItem("agama", d[6]);
    localStorage.setItem("pekerjaan", d[7]);
    localStorage.setItem("alamat", d[8]);
    localStorage.setItem("rt", d[9]);
    localStorage.setItem("rw", d[10]);
    localStorage.setItem("desa", d[11]);
    localStorage.setItem("kecamatan", d[12]);
    localStorage.setItem("kabupaten", d[13]);
    localStorage.setItem("provinsi", d[14]);
    localStorage.setItem("sp", d[15]);
    localStorage.setItem("sdhk", d[16]);
    localStorage.setItem("pendidikan", d[17]);

}


//======================================================
// PILIH SURAT
//======================================================

function pilihSurat(template, jenis){

    //--------------------------------------------------
    // SURAT BARU
    //--------------------------------------------------

    localStorage.removeItem("nomorAgenda");
    localStorage.removeItem("kodeVerifikasi");

    localStorage.removeItem("keperluan");
    localStorage.removeItem("bertempat");

    localStorage.removeItem("desil");

    localStorage.removeItem("jenisUsaha");
    localStorage.removeItem("letakUsaha");

    localStorage.removeItem("penghasilan");

    localStorage.removeItem("tempatHilang");
    localStorage.removeItem("tanggalHilang");
    localStorage.removeItem("barangHilang");
    localStorage.removeItem("isiKeterangan");

    localStorage.setItem("modeSurat","baru");

    //--------------------------------------------------
    // TEMPLATE
    //--------------------------------------------------

    localStorage.setItem("templateSurat", template);

    localStorage.setItem("jenisSurat", jenis);

    switch(template){

        case "SKCK":
            window.location.href="skck.html";
            break;

        case "DOMISILI":
            window.location.href="domisili.html";
            break;

        case "KETERANGAN":
            window.location.href="keterangan.html";
            break;

        case "KENDARAAN":
            window.location.href="ranmor.html";
            break;

        case "SKTM SISWA":
            window.location.href="sktm_siswa.html";
            break;

        case "KEMATIAN":
            window.location.href="kematian.html";
            break;

        default:
            alert("Template surat belum tersedia.");

    }

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
/*======================================================
  LOAD HALAMAN
======================================================*/


document.addEventListener(

    "DOMContentLoaded",

    async function(){

        cekLogin();

        showLoading();

        try{

            tampilkanNomor();

            const data = await getDataCetakSKTMSiswa();

if(data){

    tampilkanSurat(data);

}

            tampilkanJudulHalaman();

            await loadTandaTangan();

            buatQRCode(
                localStorage.getItem("kodeVerifikasi")
            );

            document.getElementById(
                "tanggalSurat"
            ).innerHTML =
                formatTanggal(new Date());

        }

        finally{

            hideLoading();

        }

    }

);

/*======================================================
  LOGIN
======================================================*/

function cekLogin(){

    if(localStorage.getItem("username")==null){

        window.location.href="index.html";

    }

}

/*======================================================
  LOADING
======================================================*/

function showLoading(){

    document.getElementById("loading").style.display="flex";

}

function hideLoading(){

    document.getElementById("loading").style.display="none";

}



/*======================================================
  JUDUL HALAMAN
======================================================*/

function tampilkanJudulHalaman(){

    const namaFile = (

        localStorage.getItem("namaSiswa") || "Siswa"

    )

    .replace(/[\\/:*?"<>|]/g, "")

    .trim();

    document.title =

        "Cetak SKTM Siswa (" +

        namaFile +

        ")";

}



/*======================================================
  NOMOR SURAT
======================================================*/

function tampilkanNomor(){

    const tahun =

        new Date().getFullYear();

    document.getElementById(

        "nomorSurat"

    ).innerHTML =

        "470/" +

        localStorage.getItem("nomorAgenda") +

        "/418.60.04/" +

        tahun;

}


//--------------------------------------------------
// TAMPILKAN SURAT
//--------------------------------------------------

async function getDataCetakSKTMSiswa(){

    try{

        const nomor = new URLSearchParams(
            window.location.search
        ).get("nomor");

        const response = await fetch(

            URL +

            "?aksi=cetakSKTMSiswa" +

            "&token=" + TOKEN +

            "&nomor=" +

            encodeURIComponent(nomor)

        );

        const hasil = await response.json();

        console.log("CETAK SKTM SISWA :", hasil);

        if(!hasil.status){

            alert(hasil.pesan);

            return null;

        }

        return hasil.data;

    }

    catch(err){

        console.error(err);

        return null;

    }

}



function tampilkanSurat(data){

    //--------------------------------------------------
    // ORANG TUA
    //--------------------------------------------------

    document.getElementById("namaOrtu").innerHTML =
        data.namaOrtu || "";

    document.getElementById("nikOrtu").innerHTML =
        data.nikOrtu || "";

    document.getElementById("ttlOrtu").innerHTML =
        (data.tempatlahirOrtu || "") +
        ", " +
        formatTanggal(data.tanggallahirOrtu);

    document.getElementById("jkOrtu").innerHTML =
        data.jkOrtu || "";

    document.getElementById("agamaOrtu").innerHTML =
        data.agamaOrtu || "";

    document.getElementById("pekerjaanOrtu").innerHTML =
        data.pekerjaanOrtu || "";

    document.getElementById("alamatOrtu").innerHTML =
        data.alamatOrtu || "";

    //--------------------------------------------------
    // SISWA
    //--------------------------------------------------

    document.getElementById("namaSiswa").innerHTML =
        data.namaSiswa || "";

    document.getElementById("nikSiswa").innerHTML =
        data.nikSiswa || "";

    document.getElementById("ttlSiswa").innerHTML =
        (data.tempatLahirSiswa || "") +
        ", " +
        formatTanggal(data.tanggallahirSiswa);

    document.getElementById("jkSiswa").innerHTML =
        data.jkSiswa || "";

    //--------------------------------------------------
    // DATA SURAT
    //--------------------------------------------------

    document.getElementById("sekolah").innerHTML =
        data.sekolah || "";

    document.getElementById("kelas").innerHTML =
        data.kelas || "";

    document.getElementById("nisn").innerHTML =
        data.nisn || "";

    document.getElementById("desil").innerHTML =
        data.desil || "";

    document.getElementById("keperluan").innerHTML =
        data.keperluan || "";

    //--------------------------------------------------
    // TANDA TANGAN
    //--------------------------------------------------

    document.getElementById("namaTtd").innerHTML =
        data.namaOrtu || "";

}




/*======================================================
  DATA JSON
======================================================*/

function dataJSONSKTM(){

    return{

        pemohon :
            localStorage.getItem("pemohon") || "",

        nisn :
            localStorage.getItem("nisn") || "",

        kelas :
            localStorage.getItem("kelas") || "",

        sekolah :
            localStorage.getItem("sekolah") || "",

        desil :
            localStorage.getItem("desil") || "",

        keperluan :
            localStorage.getItem("keperluan") || ""

    };

}

/*======================================================
  FORMAT TANGGAL
======================================================*/

function formatTanggal(tanggal){

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

    let t;

    if(tanggal instanceof Date){

        t = tanggal;

    }else{

        if(tanggal.includes("/")){

            const p = tanggal.split("/");

            t = new Date(
                p[2],
                p[1]-1,
                p[0]
            );

        }else{

            t = new Date(tanggal);

        }

    }

    return (
        t.getDate() + " " +
        bulan[t.getMonth()] + " " +
        t.getFullYear()
    );

}

/*======================================================
  LOAD TANDA TANGAN
======================================================*/

async function loadTandaTangan(){

    const ttd = await getTandaTangan();

    if(!ttd) return;

    const jabatan = document.getElementById("jabatanTtd");
    const nama     = document.getElementById("namaPejabat");
    const nip      = document.getElementById("nipPejabat");

    if(!jabatan || !nama || !nip){

        console.warn("Elemen tanda tangan tidak ditemukan.");

        return;

    }

    if(ttd.statusJabatan=="KADES"){

        jabatan.innerHTML =
            "KEPALA DESA SELOPANGGUNG";

        nama.innerHTML =
            ttd.namaKades;

        nip.innerHTML =
            ttd.nipKades;

    }else{

        jabatan.innerHTML =
            "a.n. KEPALA DESA SELOPANGGUNG<br>SEKRETARIS DESA";

        nama.innerHTML =
            ttd.namaSekdes;

        nip.innerHTML =
            ttd.nipSekdes;

    }

}



//======================================================
// QR CODE
//======================================================

function buatQRCode(kodeVerifikasi){

    //--------------------------------------------------
    // MODE OFFLINE
    //--------------------------------------------------

    if(!kodeVerifikasi){

        buatQRCodeOffline();

        return;

    }

    //--------------------------------------------------
    // MODE ONLINE
    //--------------------------------------------------

    const urlVerifikasi =

        URL +

        "?aksi=verifikasi" +

        "&kode=" +

        encodeURIComponent(kodeVerifikasi);

    document.getElementById("offlineQR").style.display =
        "none";

    document.getElementById("imgQR").style.display =
        "block";

    document.getElementById("imgQR").src =

        "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=" +

        encodeURIComponent(urlVerifikasi);

}

/*======================================================
QR OFFLINE
======================================================*/

function buatQRCodeOffline(){

    const img  = document.getElementById("imgQR");
    const qr   = document.getElementById("offlineQR");
    const info = document.getElementById("offlineInfo");

    if(img){

        img.style.display = "none";

    }

    if(!qr){

        return;

    }

    qr.style.display = "block";
    qr.innerHTML = "";

    //--------------------------------------------------
    // TEKS QR
    //--------------------------------------------------

    const teks =

`PEMERINTAH DESA SELOPANGGUNG
STATUS : SURAT OFFLINE

Nama : ${localStorage.getItem("nama") || ""}

Jenis Surat : SKTM SISWA

Tanggal : ${new Date().toLocaleString("id-ID")}

Nomor surat resmi diterbikan saat Online.

Silahkan mengajukan cetakUlang
untuk mendapatkan QR resmi.`;

    console.log("Panjang QR :", teks.length);

    new QRCode(qr,{

        text   : teks,
        width  : 130,
        height : 130

    });

    if(info){

        info.innerHTML =

            "<b>QR OFFLINE</b><br>" +

            "QR dibuat offline.<br>" 

    }

}



/*======================================================
  CETAK
======================================================*/

function cetakSurat(){

    window.print();

}

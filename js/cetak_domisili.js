//======================================================
// CETAK SURAT DOMISILI
//======================================================

document.addEventListener("DOMContentLoaded", async function(){

    if(!cekData()){

        return;

    }

    await loadSurat();

});


//======================================================
// LOAD DATA SURAT
//======================================================

async function loadSurat(){

    //--------------------------------------------------
    // CEK NOMOR DARI URL
    //--------------------------------------------------

    const nomor = new URLSearchParams(
        window.location.search
    ).get("nomor");

    //--------------------------------------------------
    // MODE OFFLINE
    //--------------------------------------------------

    if(!nomor){

        console.log("MODE OFFLINE");

        tampilkanSuratOffline();

        return;

    }

    //--------------------------------------------------
    // MODE ONLINE
    //--------------------------------------------------

    console.log("MODE ONLINE");
    console.log("NOMOR :", nomor);

    showLoading();

    try{

        const response = await fetch(

            URL +

            "?aksi=cetakdomisili" +

            "&token=" + TOKEN +

            "&nomor=" + encodeURIComponent(nomor)

        );

        const hasil = await response.text();

        hideLoading();

        console.log("DATA DOMISILI :", hasil);

        if(

            hasil=="DATA TIDAK DITEMUKAN" ||

            hasil==""

        ){

            alert("Data surat tidak ditemukan.");

            return;

        }

        const data = hasil.split("#");

        tampilkanSurat(data);

    }

    catch(err){

        hideLoading();

        console.error(err);

        alert("Gagal mengambil data surat.");

    }

}


//======================================================
// CEK DATA
//======================================================

function cekData(){

    const nomor = new URLSearchParams(
        window.location.search
    ).get("nomor");

    //--------------------------------------------------
    // OFFLINE
    //--------------------------------------------------

    if(!nomor){

        return true;

    }

    //--------------------------------------------------
    // ONLINE
    //--------------------------------------------------

    return true;

}

//======================================================
// LOADING
//======================================================

function showLoading(){

    const loading =
        document.getElementById("loading");

    if(loading){

        loading.style.display="flex";

    }

}

function hideLoading(){

    const loading =
        document.getElementById("loading");

    if(loading){

        loading.style.display="none";

    }

}


//======================================================
// TAMPILKAN SURAT
//======================================================

function tampilkanSurat(data){

    //--------------------------------------------------
    // JUDUL HALAMAN
    //--------------------------------------------------

    const namaFile = (

        data[1] || "Penduduk"

    )

    .replace(/[\\/:*?"<>|]/g, "")

    .trim();

    document.title =

        "Cetak Surat Domisili (" +

        namaFile +

        ")";

    //--------------------------------------------------
    // NOMOR SURAT
    //--------------------------------------------------

    const tahun = new Date().getFullYear();

    const nomorSurat =

        "450/" +

        data[17] +

        "/418.60.04/" +

        tahun;

    document.getElementById("nomorSurat").innerHTML =
        nomorSurat;


    //--------------------------------------------------
    // IDENTITAS
    //--------------------------------------------------

    document.getElementById("nama").innerHTML =
        data[1];

    document.getElementById("nik").innerHTML =
        data[0];

    document.getElementById("ttl").innerHTML =

        data[2] +

        ", " +

        (data[3]);

    document.getElementById("jk").innerHTML =
        data[4];

    document.getElementById("agama").innerHTML =
        data[5];

    document.getElementById("pekerjaan").innerHTML =
        data[6];

    document.getElementById("sp").innerHTML =
        data[14];


    //--------------------------------------------------
    // ALAMAT
    //--------------------------------------------------

    document.getElementById("alamat").innerHTML =

        data[7] +

        " RT " +

        data[8] +

        " RW " +

        data[9] +

        ", " +

        data[10] +

        ", " +

        data[11] +

        ", " +

        data[12];


    //--------------------------------------------------
    // KETERANGAN
    //--------------------------------------------------

    document.getElementById("bertempat").innerHTML =
        data[15];

    document.getElementById("keperluan").innerHTML =
        data[16];

    document.getElementById("namaPemohon").innerHTML =
        data[1];


    //--------------------------------------------------
    // TANGGAL SURAT
    //--------------------------------------------------

    document.getElementById("tanggalSurat").innerHTML =
        tanggalIndonesia(new Date());


    //--------------------------------------------------
    // BERLAKU 90 HARI
    //--------------------------------------------------

    const berlaku = new Date();

    berlaku.setDate(

        berlaku.getDate()+90

    );

    document.getElementById("berlaku").innerHTML =

        tanggalIndonesia(berlaku);


    //--------------------------------------------------
    // QR CODE
    //--------------------------------------------------

    buatQRCode(
    data[18]
);

}

//======================================================
// TAMPILKAN SURAT OFFLINE
//======================================================

function tampilkanSuratOffline(){

    //--------------------------------------------------
    // JUDUL HALAMAN
    //--------------------------------------------------

    const namaFile = (

        localStorage.getItem("nama") || "Penduduk"

    )

    .replace(/[\\/:*?"<>|]/g, "")

    .trim();

    document.title =

        "Cetak Surat Domisili (" +

        namaFile +

        ")";

    //--------------------------------------------------
    // NOMOR SURAT
    //--------------------------------------------------

    document.getElementById("nomorSurat").innerHTML =

        "470/........../418.60.04/" +

        new Date().getFullYear();

    //--------------------------------------------------
    // IDENTITAS
    //--------------------------------------------------

    document.getElementById("nama").innerHTML =
        localStorage.getItem("nama") || "";

    document.getElementById("nik").innerHTML =
        localStorage.getItem("nik") || "";

    document.getElementById("ttl").innerHTML =

        (localStorage.getItem("tempatlahir") || "") +

        ", " +

        formatTanggal(

            localStorage.getItem("tanggallahir")

        );

    document.getElementById("jk").innerHTML =
        localStorage.getItem("jk") || "";

    document.getElementById("agama").innerHTML =
        localStorage.getItem("agama") || "";

    document.getElementById("pekerjaan").innerHTML =
        localStorage.getItem("pekerjaan") || "";

    document.getElementById("sp").innerHTML =
        localStorage.getItem("sp") || "";

    //--------------------------------------------------
    // ALAMAT
    //--------------------------------------------------

    document.getElementById("alamat").innerHTML =

        (localStorage.getItem("alamat") || "") +

        " RT " +

        (localStorage.getItem("rt") || "") +

        " RW " +

        (localStorage.getItem("rw") || "") +

        ", " +

        (localStorage.getItem("desa") || "") +

        ", " +

        (localStorage.getItem("kecamatan") || "") +

        ", " +

        (localStorage.getItem("kabupaten") || "");

    //--------------------------------------------------
    // KETERANGAN
    //--------------------------------------------------

    document.getElementById("bertempat").innerHTML =
        localStorage.getItem("bertempat") || "";

    document.getElementById("keperluan").innerHTML =
        localStorage.getItem("keperluan") || "";

    document.getElementById("namaPemohon").innerHTML =
        localStorage.getItem("nama") || "";

    //--------------------------------------------------
    // TANGGAL SURAT
    //--------------------------------------------------

    document.getElementById("tanggalSurat").innerHTML =
        tanggalIndonesia(new Date());

    //--------------------------------------------------
    // BERLAKU
    //--------------------------------------------------

    const berlaku = new Date();

    berlaku.setDate(

        berlaku.getDate()+90

    );

    document.getElementById("berlaku").innerHTML =

        tanggalIndonesia(berlaku);

    //--------------------------------------------------
    // QR OFFLINE
    //--------------------------------------------------

    if(localStorage.getItem("statusSync")=="0"){

    buatQRCodeOffline();

    return;

}

}


//======================================================
// FORMAT TANGGAL
//======================================================

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

    const t=new Date(tanggal);

    return ("0"+t.getDate()).slice(-2)

        +" "+

        bulan[t.getMonth()]

        +" "+

        t.getFullYear();

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

Jenis Surat : SURAT DOMISILI

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

//======================================================
// CETAK
//======================================================

function cetakSurat(){

    window.print();

}



//======================================================
// TANGGAL INDONESIA
//======================================================

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

    return ("0"+tanggal.getDate()).slice(-2)

        +" "+

        bulan[tanggal.getMonth()]

        +" "+

        tanggal.getFullYear();

}





//======================================================
// ERROR QR
//======================================================

document.addEventListener("error",function(e){

    if(

        e.target.id=="imgQR" ||

        e.target.id=="offlineQR"

    ){

        console.log("QR Code gagal dimuat.");

    }

},true);
//======================================================
// CETAK SURAT KEPEMILIKAN RANMOR
//======================================================

document.addEventListener("DOMContentLoaded", function(){

    if(!cekData()) return;

    loadSurat();

});


//======================================================
// LOAD DATA SURAT
//======================================================

//======================================================
// LOAD SURAT
//======================================================

//======================================================
// LOAD SURAT
//======================================================

async function loadSurat(){

    //--------------------------------------------------
    // CEK NOMOR DARI URL
    //--------------------------------------------------

    const nomor = new URLSearchParams(
        window.location.search
    ).get("nomor");

    console.log("===== LOAD CETAK RANMOR =====");
    console.log("NOMOR URL :", nomor);

    //--------------------------------------------------
    // MODE OFFLINE
    //--------------------------------------------------

    if(!nomor){

        console.log("MODE OFFLINE");

        tampilkanSurat({

            nomor          : "",
            namaPembeli    : localStorage.getItem("nama"),
            nikPembeli     : localStorage.getItem("nik"),
            ttlPembeli     :
                (localStorage.getItem("tempatlahir") || "") +
                ", " +
                formatTanggal(localStorage.getItem("tanggallahir")),

            jkPembeli      : localStorage.getItem("jk"),
            alamatPembeli  : localStorage.getItem("alamat"),

            nopol          : localStorage.getItem("nopol"),
            namaPemilik    : localStorage.getItem("namaPemilik"),
            alamatPemilik  : localStorage.getItem("alamatPemilik"),
            merk           : localStorage.getItem("merk"),
            type           : localStorage.getItem("type"),
            jenis          : localStorage.getItem("jenis"),
            model          : localStorage.getItem("model"),
            tahunPembuatan : localStorage.getItem("tahunPembuatan"),
            isiSilinder    : localStorage.getItem("isiSilinder"),
            nomorRangka    : localStorage.getItem("nomorRangka"),
            nomorMesin     : localStorage.getItem("nomorMesin"),
            keperluan      : localStorage.getItem("keperluan")

        });

        return;

    }

    //--------------------------------------------------
    // MODE ONLINE
    //--------------------------------------------------

    console.log("MODE ONLINE");

    showLoading();

    try{

        const response = await fetch(

            URL +

            "?aksi=cetakkendaraan" +

            "&token=" + TOKEN +

            "&nomor=" + encodeURIComponent(nomor)

        );

        const hasil = await response.json();

        hideLoading();

        console.log("DATA RANMOR :", hasil);

        if(!hasil.status){

            alert(hasil.pesan || "Data surat tidak ditemukan.");

            return;

        }

        tampilkanSurat(hasil);

    }catch(err){

        hideLoading();

        console.error(err);

        alert(err.message);

    }

}



//======================================================
// CEK DATA
//======================================================

function cekData(){

    return true;

}


//======================================================
// LOADING
//======================================================

function showLoading(){

    //--------------------------------------------------
    // OFFLINE
    //--------------------------------------------------

    if(localStorage.getItem("statusSync")=="0"){

        return;

    }

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

    console.log("DATA RANMOR :", data);
console.log("KODE VERIFIKASI :", data.kodeVerifikasi);
    //--------------------------------------------------
    // JUDUL HALAMAN
    //--------------------------------------------------

    const namaFile =

        (data.namaPembeli || "Penduduk")

        .replace(/[\\/:*?"<>|]/g,"")

        .trim();

    document.title =
        "Cetak Surat Ranmor (" +
        namaFile +
        ")";

   //--------------------------------------------------
// NOMOR SURAT
//--------------------------------------------------

const tahun = new Date().getFullYear();

if(data.nomor){

    document.getElementById("nomorSurat").innerHTML =

        "450/" +

        data.nomor +

        "/418.60.04/" +

        tahun;

}
else{

    document.getElementById("nomorSurat").innerHTML =

        "450/........../418.60.04/" +

        tahun;

}

    //--------------------------------------------------
    // IDENTITAS PEMBELI
    //--------------------------------------------------

    document.getElementById("nama").innerHTML =
        data.namaPembeli || "";

    document.getElementById("nik").innerHTML =
        data.nikPembeli || "";

    document.getElementById("ttl").innerHTML =
        data.ttlPembeli || "";

    document.getElementById("jk").innerHTML =
        data.jkPembeli || "";

    document.getElementById("alamat").innerHTML =
        data.alamatPembeli || "";

    //--------------------------------------------------
    // DATA KENDARAAN
    //--------------------------------------------------

    document.getElementById("nopol").innerHTML =
        data.nopol || "";

    document.getElementById("namaPemilik").innerHTML =
        data.namaPemilik || "";

    document.getElementById("alamatPemilik").innerHTML =
        data.alamatPemilik || "";

    document.getElementById("merk").innerHTML =
        data.merk || "";

    document.getElementById("type").innerHTML =
        data.type || "";

    document.getElementById("jenis").innerHTML =
        data.jenis || "";

    document.getElementById("model").innerHTML =
        data.model || "";

    document.getElementById("tahunPembuatan").innerHTML =
        data.tahunPembuatan || "";

    document.getElementById("isiSilinder").innerHTML =
        data.isiSilinder || "";

    document.getElementById("nomorRangka").innerHTML =
        data.nomorRangka || "";

    document.getElementById("nomorMesin").innerHTML =
        data.nomorMesin || "";

    //--------------------------------------------------
    // KETERANGAN
    //--------------------------------------------------

    document.getElementById("keperluan").innerHTML =
        data.keperluan || "";

    document.getElementById("namaPemohon").innerHTML =
        data.namaPembeli || "";

    //--------------------------------------------------
    // TANGGAL SURAT
    //--------------------------------------------------

    document.getElementById("tanggalSurat").innerHTML =
        tanggalIndonesia(new Date());

    //--------------------------------------------------
    // QR CODE
    //--------------------------------------------------

    buatQRCode(
    data.kodeVerifikasi
);

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

    const t = new Date(tanggal);

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

Jenis Surat : SURAT KETERANGAN KEPEMILIKAN

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

    if(e.target.id=="imgQR"){

        console.log("QR Code gagal dimuat.");

    }

},true);
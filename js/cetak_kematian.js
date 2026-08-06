/*======================================================
  LOAD HALAMAN
======================================================*/

document.addEventListener(

    "DOMContentLoaded",

    async function(){

        cekLogin();

        await loadTandaTangan();

        await loadSurat();

       buatQRCode(
                localStorage.getItem("kodeVerifikasi")
            );

    }

);

/*======================================================
  CEK LOGIN
======================================================*/

function cekLogin(){

    const username = localStorage.getItem("username");

    if(username == null){

        window.location.href = "index.html";

    }

}

/*======================================================
  LOAD SURAT
======================================================*/

async function loadSurat(){

    try{

        const response = await fetch(

            URL +

            "?aksi=cetakKematian" +

            "&token=" + TOKEN +

            "&nomor=" +

            encodeURIComponent(

                localStorage.getItem("nomorAgenda")

            )

        );

        const hasil = await response.json();

        if(!hasil.status){

            alert(hasil.pesan);

            return;

        }

        tampilkanSurat(hasil);

    }

    catch(err){

        alert(err.message);

    }

}

/*======================================================
  TAMPILKAN SURAT
======================================================*/

function tampilkanSurat(data){

    const tahun = new Date().getFullYear();

    document.getElementById("nomorsurat").innerHTML =

        "Nomor : 472/" +

        data.nomor +

        "/418.60.04/" +

        tahun;

    document.getElementById("nama").innerHTML =
        data.nama;

    document.getElementById("jk").innerHTML =
        data.jk;

    document.getElementById("alamat").innerHTML =

        data.alamat +

        ", RT " + data.rt +

        " RW " + data.rw +

        ", Desa " + data.desa +

        ", Kecamatan " + data.kecamatan;

    document.getElementById("harikematian").innerHTML =
        data.harikematian;

    document.getElementById("tanggalkematian").innerHTML =
        data.tanggalkematian;

    document.getElementById("tempatkematian").innerHTML =
        data.tempatkematian;

    document.getElementById("sebabkematian").innerHTML =
        data.sebabkematian;

    document.getElementById("tanggalSurat").innerHTML =

        "Selopanggung, " +

        tanggalIndonesia(new Date());

}

/*======================================================
  LOAD TANDA TANGAN
======================================================*/

async function loadTandaTangan(){

    const ttd = await getTandaTangan();

    if(!ttd) return;

    const jabatan =
        document.getElementById("jabatanTtd");

    const nama =
        document.getElementById("namaPejabat");

    const nip =
        document.getElementById("nipPejabat");

    if(!jabatan || !nama || !nip){

        console.warn(

            "Elemen tanda tangan tidak ditemukan."

        );

        return;

    }

    if(ttd.statusJabatan == "KADES"){

        jabatan.innerHTML =

            "KEPALA DESA SELOPANGGUNG";

        nama.innerHTML =

            ttd.namaKades;

        nip.innerHTML =

            ttd.nipKades;

    }

    else{

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

Jenis Surat : SURAT KEMATIAN

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

/*======================================================
  TUTUP
======================================================*/

function kembali(){

    window.close();

}
//======================================================
// CETAK SURAT KETERANGAN
//======================================================

document.addEventListener("DOMContentLoaded", async function(){

    cekLogin();
    cekAksesDashboard();

    await loadSurat();
    await loadTandaTangan();
    

});


//======================================================
// LOADING
//======================================================

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


//======================================================
// GET DATA SURAT (AGENDA SURAT)
//======================================================

//======================================================
// GET DATA SURAT (AGENDA SURAT)
//======================================================

async function getKeterangan(){

    const nomor = new URLSearchParams(location.search).get("nomor");

    if(!nomor){

        alert("Nomor agenda tidak ditemukan.");

        return null;

    }

    try{

        const response = await fetch(

            URL +
            "?aksi=cetakketerangan" +
            "&token=" + TOKEN +
            "&nomor=" + encodeURIComponent(nomor)

        );

        const hasil = await response.json();

        console.log("AGENDA SURAT :", hasil);

        if(!hasil.status){

            alert(hasil.pesan || "Data surat tidak ditemukan.");

            return null;

        }

        //--------------------------------------------------
        // AMBIL OBJECT SURAT
        //--------------------------------------------------

        const surat = hasil.data || hasil;

        //--------------------------------------------------
        // PARSE DATA JSON
        //--------------------------------------------------

        if(surat.data && typeof surat.data === "string"){

            try{

                surat.data = JSON.parse(surat.data);

            }catch(err){

                console.log("Data JSON gagal diparse.");

                surat.data = {};

            }

        }

        if(surat.dataJSON && typeof surat.dataJSON === "string"){

            try{

                surat.dataJSON = JSON.parse(surat.dataJSON);

            }catch(err){

                console.log("DataJSON gagal diparse.");

                surat.dataJSON = {};

            }

        }

        console.log("SURAT FINAL :", surat);

        return surat;

    }catch(err){

        console.error(err);

        alert(err.message);

        return null;

    }

}
//======================================================
// GET DATA PENDUDUK
//======================================================

async function getPenduduk(nik){

    try{

        const response = await fetch(

            URL +

            "?aksi=getpendudukJson" +

            "&token=" + TOKEN +

            "&nik=" + encodeURIComponent(nik)

        );

        const hasil = await response.json();

        console.log("DATA PENDUDUK :", hasil);

        if(!hasil.status){

            alert("Data penduduk tidak ditemukan.");

            return null;

        }

        return hasil.data;

    }catch(err){

        console.error(err);

        alert(err.message);

        return null;

    }

}


//======================================================
// LOAD SURAT
//======================================================

async function loadSurat(){

    showLoading();

    //--------------------------------------------------
    // CEK NOMOR AGENDA DARI URL
    //--------------------------------------------------

    const nomor = new URLSearchParams(
        window.location.search
    ).get("nomor");

    //--------------------------------------------------
    // OFFLINE
    //--------------------------------------------------

    if(!nomor){

        console.log("MODE OFFLINE");

        const data = JSON.parse(

            localStorage.getItem("dataSurat") || "{}"

        );

        tampilkanSuratOffline(data);

        hideLoading();

        return;

    }

    //--------------------------------------------------
    // ONLINE
    //--------------------------------------------------

    console.log("MODE ONLINE");
    console.log("NOMOR :", nomor);

    const surat = await getKeterangan();

    if(!surat){

        hideLoading();

        return;

    }

    console.log("SURAT :", surat);

    //--------------------------------------------------
    // CEK NIK
    //--------------------------------------------------

    if(!surat.nik){

        alert("NIK pada data surat tidak ditemukan.");

        hideLoading();

        return;

    }

    //--------------------------------------------------
    // AMBIL DATA PENDUDUK
    //--------------------------------------------------

    const penduduk = await getPenduduk(
        surat.nik
    );

    if(!penduduk){

        hideLoading();

        return;

    }

    console.log("PENDUDUK :", penduduk);

    //--------------------------------------------------
    // TAMPILKAN SURAT
    //--------------------------------------------------

    tampilkanSurat(
        penduduk,
        surat
    );

    hideLoading();

}

//======================================================
// TAMPILKAN SURAT
//======================================================

function tampilkanSurat(penduduk,surat){

    
    //--------------------------------------------------
    // DATA SURAT
    //--------------------------------------------------

    let data = surat.dataJSON || {};

    if(typeof data === "string"){

        try{

            data = JSON.parse(data);

        }catch(err){

            console.error("DataJSON tidak valid :", err);

            data = {};

        }

    }

    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    console.log("===== TAMPILKAN SURAT =====");
    console.log("SURAT :", surat);
    console.log("PENDUDUK :", penduduk);
    console.log("DATA JSON :", data);



    
//--------------------------------------------------
// JUDUL HALAMAN
//--------------------------------------------------

     const namaFile = (penduduk.nama || "Penduduk")
    .replace(/[\\/:*?"<>|]/g, "")
    .trim();

     document.title =
    "Cetak Surat Keterangan (" +
    namaFile +
    ")";


    //--------------------------------------------------
    // IDENTITAS
    //--------------------------------------------------


    document.getElementById("nama").innerHTML =
        penduduk.nama || "";

    document.getElementById("nik").innerHTML =
        penduduk.nik || "";

    document.getElementById("ttl").innerHTML =
        (penduduk.tempatlahir || "") +
        ", " +
        formatTanggal(penduduk.tanggallahir);

    document.getElementById("jk").innerHTML =
        penduduk.jk || "";

    document.getElementById("agama").innerHTML =
        penduduk.agama || "";

    document.getElementById("sp").innerHTML =
        penduduk.sp || "";

    document.getElementById("pekerjaan").innerHTML =
        penduduk.pekerjaan || "";

    document.getElementById("alamat").innerHTML =
        (penduduk.alamat || "") +
        ", RT " + (penduduk.rt || "") +
        " RW " + (penduduk.rw || "") +
        ", Desa " + (penduduk.desa || "") +
        ", Kecamatan " + (penduduk.kecamatan || "") +
        ", Kabupaten " + (penduduk.kabupaten || "") +
        ", Provinsi " + (penduduk.provinsi || "");

    document.getElementById("namaTtd").innerHTML =
        penduduk.nama || "";

    document.getElementById("tanggalSurat").innerHTML =
        surat.tanggal || "";

    document.getElementById("judulSurat").innerHTML =
        judulSurat(surat.jenis);

    document.getElementById("nomorSurat").innerHTML =
        "470/" +
        surat.nomor +
        "/418.60.04/" +
        new Date().getFullYear();

    document.getElementById("keperluan").innerHTML =
        data.keperluan || "";

    if((surat.jenis || "").toUpperCase()=="KETERANGAN"){

    document.querySelector("ol").style.display="none";

    const div=document.getElementById("keteranganDinamis");

    div.style.display="block";

    const daftar=(data.isiKeterangan || "")
        .split(/\r?\n/)
        .filter(item=>item.trim()!="");

    let html="<ol>";

    daftar.forEach(function(item){

        html+="<li>"+item+"</li>";

    });

    html+="</ol>";

    div.innerHTML=html;

}else{

    document.querySelector("ol").style.display="block";

    document.getElementById("keteranganDinamis").style.display="none";

    document.getElementById("keterangan").innerHTML=
        buatIsiSurat(
            surat.jenis,
            data
        );

}

    //--------------------------------------------------
    // QR
    //--------------------------------------------------

    buatQRCodeOnline(
        surat.kodeVerifikasi
    );

}



/*======================================================
TAMPILKAN SURAT OFFLINE
======================================================*/

function tampilkanSuratOffline(data){

    if(!data) return;

    //--------------------------------------------------
    // DATA SURAT
    //--------------------------------------------------

    let surat = data.dataJSON || {};

    if(typeof surat === "string"){

        try{

            surat = JSON.parse(surat);

        }catch(err){

            console.log("Data JSON Offline tidak valid.");

            surat = {};

        }

    }

    //--------------------------------------------------
    // JUDUL HALAMAN
    //--------------------------------------------------

    const namaFile = (data.nama || "Penduduk")
        .replace(/[\\/:*?"<>|]/g, "")
        .trim();

    document.title =
        "Cetak Surat Keterangan (" +
        namaFile +
        ")";

    //--------------------------------------------------
    // NOMOR
    //--------------------------------------------------

    document.getElementById("nomorSurat").innerHTML =
        "470/........../418.60.04/" +
        new Date().getFullYear();

    //--------------------------------------------------
    // JUDUL
    //--------------------------------------------------

    document.getElementById("judulSurat").innerHTML =
        judulSurat(data.jenisSurat);

    //--------------------------------------------------
    // IDENTITAS
    //--------------------------------------------------

    document.getElementById("nama").innerHTML =
        data.nama || "";

    document.getElementById("nik").innerHTML =
        data.nik || "";

    document.getElementById("ttl").innerHTML =
        (data.tempatlahir || "") +
        ", " +
        formatTanggal(data.tanggallahir);

    document.getElementById("jk").innerHTML =
        data.jk || "";

    document.getElementById("agama").innerHTML =
        data.agama || "";

    document.getElementById("sp").innerHTML =
        data.sp || "";

    document.getElementById("pekerjaan").innerHTML =
        data.pekerjaan || "";

    document.getElementById("alamat").innerHTML =
        (data.alamat || "") +
        ", RT " + (data.rt || "") +
        " RW " + (data.rw || "") +
        ", Desa " + (data.desa || "") +
        ", Kecamatan " + (data.kecamatan || "") +
        ", Kabupaten " + (data.kabupaten || "") +
        ", Provinsi " + (data.provinsi || "");

    //--------------------------------------------------
    // TANDA TANGAN
    //--------------------------------------------------

    document.getElementById("namaTtd").innerHTML =
        data.nama || "";

    //--------------------------------------------------
    // TANGGAL
    //--------------------------------------------------

    document.getElementById("tanggalSurat").innerHTML =
        formatTanggal(new Date());

    //--------------------------------------------------
    // DATA SURAT
    //--------------------------------------------------

    document.getElementById("keperluan").innerHTML =
        surat.keperluan || "";

    if((data.jenisSurat || "").toUpperCase()=="KETERANGAN"){

    document.querySelector("ol").style.display="none";

    const div=document.getElementById("keteranganDinamis");

    div.style.display="block";

    const daftar=(surat.isiKeterangan || "")
        .split(/\r?\n/)
        .filter(item=>item.trim()!="");

    let html="<ol>";

    daftar.forEach(function(item){

        html+="<li>"+item+"</li>";

    });

    html+="</ol>";

    div.innerHTML=html;

}else{

    document.querySelector("ol").style.display="block";

    document.getElementById("keteranganDinamis").style.display="none";

    document.getElementById("keterangan").innerHTML=
        buatIsiSurat(
            data.jenisSurat,
            surat
        );

}

    //--------------------------------------------------
    // QR OFFLINE
    //--------------------------------------------------

    buatQRCodeOffline();

}


/*======================================================
JUDUL SURAT
======================================================*/

function judulSurat(jenis){

    switch((jenis || "").toUpperCase()){

        case "SKTM":
            return "SURAT KETERANGAN TIDAK MAMPU";

        case "SKCK":
            return "SURAT KETERANGAN CATATAN KEPOLISIAN";

        case "USAHA":
            return "SURAT KETERANGAN USAHA";

        case "PENGHASILAN":
            return "SURAT KETERANGAN PENGHASILAN";

        case "KEHILANGAN":
            return "SURAT KETERANGAN KEHILANGAN";

        default:
            return "SURAT KETERANGAN";

        case "KETERANGAN":
            return "SURAT KETERANGAN";

    }

}


/*======================================================
MEMBUAT ISI SURAT
======================================================*/

function buatIsiSurat(jenis,data){

    switch((jenis || "").toUpperCase()){

        case "SKTM":

            return "Orang tersebut termasuk keluarga tidak mampu (Desil " +
                (data.desil || "-") +
                ") berdasarkan Data Tunggal Sosial dan Ekonomi (DTSEN).";

        case "SKCK":

            return "Orang tersebut berkelakuan baik dan belum pernah tersangkut masalah hukum.";

        case "USAHA":

            return "Nama tersebut benar memiliki usaha " +
                (data.jenisUsaha || "-") +
                " yang berlokasi di " +
                (data.letakUsaha || "-") +
                ".";

        case "PENGHASILAN":

            return "Nama tersebut benar mempunyai penghasilan sebesar " +
                (data.penghasilan || "-") +
                " setiap bulan.";

        case "KEHILANGAN":

            return "Nama tersebut benar telah kehilangan " +
                ((data.barangHilang || []).join(", ")) +
                " di " +
                (data.tempatHilang || "-") +
                " pada tanggal " +
                formatTanggal(data.tanggalHilang) +
                ".";

        case "KETERANGAN":

            return data.isiKeterangan || "";

           break;

        default:

            return "";

    }

}


/*======================================================
FORMAT TANGGAL
======================================================*/

function formatTanggal(tanggal){

    if(!tanggal) return "";

    const t = new Date(tanggal);

    if(isNaN(t.getTime())){

        const p = String(tanggal).split("/");

        if(p.length === 3){

            return tanggal;

        }

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

    return (
        t.getDate() +
        " " +
        bulan[t.getMonth()] +
        " " +
        t.getFullYear()
    );

}


/*======================================================
QR ONLINE
======================================================*/

function buatQRCodeOnline(kode){

    const img  = document.getElementById("imgQR");
    const qr   = document.getElementById("offlineQR");
    const info = document.getElementById("offlineInfo");

    if(!img) return;

    //--------------------------------------------------
    // SEMBUNYIKAN QR OFFLINE
    //--------------------------------------------------

    if(qr){

        qr.style.display = "none";
        qr.innerHTML = "";

    }

    //--------------------------------------------------
    // TAMPILKAN QR ONLINE
    //--------------------------------------------------

    img.style.display = "block";

    if(info){

        info.innerHTML = "";

    }

    //--------------------------------------------------
    // TIDAK ADA KODE
    //--------------------------------------------------

    if(!kode){

        img.style.display = "none";

        return;

    }

    //--------------------------------------------------
    // URL VERIFIKASI
    //--------------------------------------------------

    const urlVerifikasi =

        URL +

        "?aksi=verifikasi" +

        "&kode=" +

        encodeURIComponent(kode);

    //--------------------------------------------------
    // QR SERVER
    //--------------------------------------------------

    img.src =

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

Nama : ${localStorage.getItem("nama")}

Jenis Surat : ${localStorage.getItem("jenisSurat")}

Tanggal : ${new Date().toLocaleString("id-ID")}

Nomor surat resmi diterbikan saat Online.

Silahkan mengajukan cetakUlang
untuk mendapatkan QR resmi.`;

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


/*======================================================
CETAK
======================================================*/

function cetakSurat(){

    window.print();

}


/*======================================================
AUTO PRINT
======================================================*/

const AUTO_PRINT = false;

if(AUTO_PRINT){

    window.addEventListener("load",function(){

        setTimeout(function(){

            window.print();

        },500);

    });

}


/*======================================================
ERROR QR
======================================================*/

document.addEventListener(

    "error",

    function(e){

        if(e.target.id=="imgQR"){

            console.log("QR Code gagal dimuat.");

            e.target.style.display="none";

        }

    },

    true

);




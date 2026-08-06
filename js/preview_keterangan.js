//======================================================
// LOAD PREVIEW
//======================================================

function previewSurat(){

    if(!validasiForm()) return;

    simpanLocalStorage();

    localStorage.setItem(
        "modePreview",
        "1"
    );

    localStorage.setItem(
        "modeSurat",
        suratEdit() ? "edit" : "baru"
    );

    //--------------------------------------------------
    // Hanya surat baru yang statusnya belum sinkron
    //--------------------------------------------------

    if(!suratEdit()){

        localStorage.setItem(
            "statusSync",
            "0"
        );

        localStorage.removeItem("nomorAgenda");
        localStorage.removeItem("kodeVerifikasi");

    }

    window.location.href =
        "preview_keterangan.html";

}


//======================================================
// LOAD PREVIEW
//======================================================

function loadPreview(){

    
    //--------------------------------------------------
    // MODE SURAT
    //--------------------------------------------------

    const modeSurat =
        localStorage.getItem("modeSurat") || "baru";

    document.getElementById("btnSimpan").style.display =
        modeSurat=="baru" ? "inline-block" : "none";

    document.getElementById("btnUpdate").style.display =
        modeSurat=="edit" ? "inline-block" : "none";

    document.getElementById("btnCetak").style.display =
        modeSurat=="edit" ? "inline-block" : "none";

    console.log("Mode :",modeSurat);

    //--------------------------------------------------
    // JUDUL SURAT
    //--------------------------------------------------

    const jenis = localStorage.getItem("jenisSurat");

    switch(jenis){

        case "SKTM":
            document.getElementById("judulSurat").innerHTML =
                "SURAT KETERANGAN TIDAK MAMPU";
        break;

        case "SKCK":
            document.getElementById("judulSurat").innerHTML =
                "SURAT KETERANGAN CATATAN KEPOLISIAN";
        break;

        case "USAHA":
            document.getElementById("judulSurat").innerHTML =
                "SURAT KETERANGAN USAHA";
        break;

        case "PENGHASILAN":
            document.getElementById("judulSurat").innerHTML =
                "SURAT KETERANGAN PENGHASILAN";
        break;

        case "KEHILANGAN":
            document.getElementById("judulSurat").innerHTML =
                "SURAT KETERANGAN KEHILANGAN";
        break;

        case "KETERANGAN":

            document.getElementById("judulSurat").innerHTML =
               "SURAT KETERANGAN";

        break;

          }

    //--------------------------------------------------
// NOMOR SURAT
//--------------------------------------------------

const nomor = localStorage.getItem("nomorAgenda");

if(nomor){

    document.getElementById("nomorSurat").innerHTML =
        "470/" +
        nomor +
        "/418.60.04/" +
        new Date().getFullYear();

}else{

    document.getElementById("nomorSurat").innerHTML =
        "470/........../418.60.04/" +
        new Date().getFullYear();

}

    //--------------------------------------------------
    // TAMPILKAN SURAT
    //--------------------------------------------------

    tampilkanSurat();

    refreshStatusSinkron();

}


/*======================================================
TAMPILKAN SURAT OFFLINE
======================================================*/

function tampilkanSuratOffline(data){

    
    if(!data) return;

    const surat = data.dataJSON || {};

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
    // DATA PENDUDUK
    //--------------------------------------------------

    document.getElementById("nik").innerHTML =
        data.nik || "";

    document.getElementById("nama").innerHTML =
        data.nama || "";

    document.getElementById("namaTtd").innerHTML =
        data.nama || "";

    document.getElementById("ttl").innerHTML =
        (data.tempatlahir || "") +
        ", " +
        formatTanggal(data.tanggallahir);

    document.getElementById("jk").innerHTML =
        data.jk || "";

    document.getElementById("agama").innerHTML =
        data.agama || "";

    document.getElementById("pekerjaan").innerHTML =
        data.pekerjaan || "";

    document.getElementById("sp").innerHTML =
        data.sp || "";

    document.getElementById("alamat").innerHTML =
        (data.alamat || "") +
        ", RT " + (data.rt || "") +
        " RW " + (data.rw || "") +
        ", Desa " + (data.desa || "") +
        ", Kecamatan " + (data.kecamatan || "") +
        ", Kabupaten " + (data.kabupaten || "") +
        ", Provinsi " + (data.provinsi || "");

    //--------------------------------------------------
    // DATA SURAT
    //--------------------------------------------------

    document.getElementById("keperluan").innerHTML =
        surat.keperluan || "";

    document.getElementById("keterangan").innerHTML =
        buatIsiSuratOffline(
            data.jenisSurat,
            surat
        );

    //--------------------------------------------------
    // QR OFFLINE
    //--------------------------------------------------

    if(typeof buatQRCodeOffline==="function"){

        buatQRCodeOffline();

    }

}

/*======================================================
ISI SURAT OFFLINE
======================================================*/

function buatIsiSuratOffline(jenis,data){

    switch((jenis || "").toUpperCase()){

        case "SKTM":

            return "Orang tersebut termasuk keluarga tidak mampu (Desil " +
                (data.desil || "-") +
                ") berdasarkan Data Tunggal Sosial dan Ekonomi (DTSEN).";

        case "SKCK":

            return "Orang tersebut berkelakuan baik dan belum pernah tersangkut masalah hukum.";

        case "USAHA":

            return "Orang tersebut benar memiliki usaha " +
                (data.jenisUsaha || "-") +
                " yang beralamat di " +
                (data.letakUsaha || "-") +
                ".";

        case "PENGHASILAN":

            return "Orang tersebut mempunyai penghasilan sebesar " +
                (data.penghasilan || "-") +
                " per bulan.";

        case "KEHILANGAN":

            return "Orang tersebut benar telah kehilangan " +
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
            return "";

    }

}

/*======================================================
REFRESH STATUS SINKRON
======================================================*/

function refreshStatusSinkron(){

    const nomorAgenda =
        localStorage.getItem("nomorAgenda");

    if(nomorAgenda){

        document.getElementById("nomorSurat").innerHTML =
            "470/" +
            nomorAgenda +
            "/418.60.04/" +
            new Date().getFullYear();

    }else{

        document.getElementById("nomorSurat").innerHTML =
            "470/........../418.60.04/" +
            new Date().getFullYear();

    }

}

/*======================================================
DATA JSON KETERANGAN
======================================================*/

function dataJSONKeterangan(){

    const jenis =
        localStorage.getItem("jenisSurat");

    let data={

        keperluan:
            localStorage.getItem("keperluan") || ""

    };

    switch(jenis){

        case "SKTM":

            data.desil =
                localStorage.getItem("desil") || "";

        break;

        case "USAHA":

            data.jenisUsaha =
                localStorage.getItem("jenisUsaha") || "";

            data.letakUsaha =
                localStorage.getItem("letakUsaha") || "";

        break;

        case "PENGHASILAN":

            data.penghasilan =
                localStorage.getItem("penghasilan") || "";

        break;

        case "KEHILANGAN":

            data.tempatHilang =
                localStorage.getItem("tempatHilang") || "";

            data.tanggalHilang =
                localStorage.getItem("tanggalHilang") || "";

            data.barangHilang =
                JSON.parse(
                    localStorage.getItem("barangHilang") || "[]"
                );

        break;

        case "KETERANGAN":

         data.isiKeterangan =
              localStorage.getItem("isiKeterangan") || "";

        break;

    }

    return data;

}


/*======================================================
TAMPILKAN SURAT
======================================================*/

function tampilkanSurat(){

    const penduduk =
        dataPenduduk();

    const surat =
        dataJSONKeterangan();

    //--------------------------------------------------
    // DATA PENDUDUK
    //--------------------------------------------------

    document.getElementById("nik").innerHTML =
        penduduk.nik;

    document.getElementById("nama").innerHTML =
        penduduk.nama;

    document.getElementById("namaTtd").innerHTML =
        penduduk.nama;

    document.getElementById("ttl").innerHTML =
        penduduk.tempatlahir +
        ", " +
        formatTanggal(
            penduduk.tanggallahir
        );

    document.getElementById("jk").innerHTML =
        penduduk.jk;

    document.getElementById("agama").innerHTML =
        penduduk.agama;

    document.getElementById("pekerjaan").innerHTML =
        penduduk.pekerjaan;

    document.getElementById("sp").innerHTML =
        penduduk.sp;

    document.getElementById("alamat").innerHTML =
        penduduk.alamat +
        ", RT " + penduduk.rt +
        " RW " + penduduk.rw +
        ", Desa " + penduduk.desa +
        ", Kecamatan " + penduduk.kecamatan +
        ", Kabupaten " + penduduk.kabupaten +
        ", Provinsi " + penduduk.provinsi;

    //--------------------------------------------------
    // DATA SURAT
    //--------------------------------------------------

    document.getElementById("keperluan").innerHTML =
        surat.keperluan;

    const jenis = localStorage.getItem("jenisSurat");

if(jenis=="KETERANGAN"){

    document.querySelector("ol").style.display="none";

    const div =
        document.getElementById("keteranganDinamis");

    div.style.display="block";

    const baris =
        (surat.isiKeterangan || "")
        .split(/\r?\n/)
        .filter(item => item.trim()!="");

    let html="<ol>";

    baris.forEach(function(item){

        html += "<li>" + item + "</li>";

    });

    html += "</ol>";

    div.innerHTML = html;

}else{

    document.querySelector("ol").style.display="block";

    document.getElementById("keteranganDinamis").style.display="none";

    document.getElementById("keterangan").innerHTML =
        buatIsiSurat(surat);

}

}

/*======================================================
MEMBUAT ISI SURAT
======================================================*/

function buatIsiSurat(data){

    switch(localStorage.getItem("jenisSurat")){

        case "SKTM":

            return "Orang tersebut termasuk keluarga tidak mampu (Desil " +
                (data.desil || "-") +
                ") berdasarkan Data Tunggal Sosial dan Ekonomi (DTSEN).";

        case "SKCK":

            return "Orang tersebut berkelakuan baik dan belum pernah tersangkut masalah hukum.";

        case "USAHA":

            return "Orang tersebut benar memiliki usaha " +
                (data.jenisUsaha || "-") +
                " yang beralamat di " +
                (data.letakUsaha || "-") +
                ".";

        case "PENGHASILAN":

            return "Orang tersebut mempunyai penghasilan sebesar " +
                (data.penghasilan || "-") +
                " per bulan.";

        case "KEHILANGAN":

            return "Orang tersebut benar telah kehilangan " +
                ((data.barangHilang || []).join(", ")) +
                " di " +
                (data.tempatHilang || "-") +
                " pada tanggal " +
                formatTanggal(data.tanggalHilang) +
                ".";

        case "KETERANGAN":

            return data.isiKeterangan || "";

        default:

            return "";

    }

}


/*======================================================
PREVIEW DATA PENDUDUK
======================================================*/

async function getPenduduk(nik){

    const response = await fetch(

        URL +
        "?aksi=getpendudukJason" +
        "&token=" + TOKEN +
        "&nik=" + encodeURIComponent(nik)

    );

    const hasil = await response.json();

    if(!hasil.status){

        return null;

    }

    return hasil.data;

}


/*======================================================
DATA PENDUDUK
======================================================*/

function dataPenduduk(){

    return{

        nik          : localStorage.getItem("nik") || "",
        nama         : localStorage.getItem("nama") || "",
        tempatlahir  : localStorage.getItem("tempatlahir") || "",
        tanggallahir : localStorage.getItem("tanggallahir") || "",
        jk           : localStorage.getItem("jk") || "",
        agama        : localStorage.getItem("agama") || "",
        pekerjaan    : localStorage.getItem("pekerjaan") || "",
        alamat       : localStorage.getItem("alamat") || "",
        rt           : localStorage.getItem("rt") || "",
        rw           : localStorage.getItem("rw") || "",
        desa         : localStorage.getItem("desa") || "",
        kecamatan    : localStorage.getItem("kecamatan") || "",
        kabupaten    : localStorage.getItem("kabupaten") || "",
        provinsi     : localStorage.getItem("provinsi") || "",
        sp           : localStorage.getItem("sp") || ""

    };

}

/*======================================================
  EDIT SURAT
======================================================*/

function editSurat(){

    localStorage.setItem(
        "modePreview",
        "1"
    );

    localStorage.setItem(
        "modeSurat",
        "edit"
    );

    window.location.href =
        "keterangan.html";

}


/*======================================================
  LOADING
======================================================*/

function showLoading(){

    const loading =
        document.getElementById("loading");

    if(loading){

        loading.style.display = "flex";

    }

}

function hideLoading(){

    const loading =
        document.getElementById("loading");

    if(loading){

        loading.style.display = "none";

    }

}


/*======================================================
  SIMPAN AGENDA
======================================================*/

async function simpanAgenda(){

    try{

        const json = JSON.stringify(
            dataJSONKeterangan()
        );

        console.log("JSON SIMPAN");
        console.log(json);

        const response = await fetch(

            URL +
            "?aksi=simpanagenda" +
            "&token=" + TOKEN +
            "&nik=" +
            encodeURIComponent(
                localStorage.getItem("nik")
            ) +
            "&nama=" +
            encodeURIComponent(
                localStorage.getItem("nama")
            ) +
            "&jenis=" +
            encodeURIComponent(
                localStorage.getItem("jenisSurat")
            ) +
            "&dataJSON=" +
            encodeURIComponent(json)

        );

        const hasil =
            await response.json();

        console.log("AGENDA :", hasil);

        if(!hasil.status){

            return{

                status:false,
                pesan:hasil.pesan

            };

        }

        //--------------------------------------------------
        // SIMPAN NOMOR AGENDA
        //--------------------------------------------------

        localStorage.setItem(
            "nomorAgenda",
            hasil.nomor
        );

        localStorage.setItem(
            "kodeVerifikasi",
            hasil.kodeVerifikasi
        );

        //--------------------------------------------------
        // STATUS SUDAH SINKRON
        //--------------------------------------------------

        localStorage.setItem(
            "statusSync",
            "1"
        );

        //--------------------------------------------------
        // UPDATE NOMOR SURAT
        //--------------------------------------------------

        document.getElementById(
            "nomorSurat"
        ).innerHTML =

            "470/" +
            hasil.nomor +
            "/418.60.04/" +
            new Date().getFullYear();

        //--------------------------------------------------
        // REFRESH QR
        //--------------------------------------------------

        if(typeof tampilQRCode==="function"){

            tampilQRCode();

        }

        return{

            status:true,
            nomor:hasil.nomor,
            kodeVerifikasi:hasil.kodeVerifikasi

        };

    }catch(err){

        console.error(err);

        return{

            status:false,
            pesan:err.message

        };

    }

}


/*======================================================
  SIMPAN SURAT
======================================================*/

async function simpanSurat(){

    //--------------------------------------------------
    // OFFLINE
    //--------------------------------------------------

    if(!navigator.onLine){

        showLoading();

        const offlineData={

            nik          : localStorage.getItem("nik"),
            nama         : localStorage.getItem("nama"),
            tempatlahir  : localStorage.getItem("tempatlahir"),
            tanggallahir : localStorage.getItem("tanggallahir"),
            jk           : localStorage.getItem("jk"),
            agama        : localStorage.getItem("agama"),
            pekerjaan    : localStorage.getItem("pekerjaan"),
            alamat       : localStorage.getItem("alamat"),
            rt           : localStorage.getItem("rt"),
            rw           : localStorage.getItem("rw"),
            desa         : localStorage.getItem("desa"),
            kecamatan    : localStorage.getItem("kecamatan"),
            kabupaten    : localStorage.getItem("kabupaten"),
            provinsi     : localStorage.getItem("provinsi"),
            sp           : localStorage.getItem("sp"),

            jenisSurat   :
                localStorage.getItem("jenisSurat"),

            dataJSON     :
                dataJSONKeterangan()

        };

        const idOffline =
            await simpanOffline(
                "KETERANGAN",
                offlineData
            );

        localStorage.setItem(
            "dataSurat",
            JSON.stringify(offlineData)
        );

        localStorage.setItem(
            "offlineID",
            idOffline
        );

        localStorage.setItem(
            "statusSync",
            "0"
        );

        localStorage.removeItem("nomorAgenda");
        localStorage.removeItem("kodeVerifikasi");

        localStorage.setItem(
            "modeSurat",
            "edit"
        );

        hideLoading();

        alert(
            "Tidak ada koneksi internet.\n\n" +
            "Surat berhasil disimpan ke Antrian Offline."
        );

        loadPreview();

        return;

    }

    //--------------------------------------------------
    // ONLINE
    //--------------------------------------------------

    showLoading();

    const hasil =
        await simpanAgenda();

    hideLoading();

    if(!hasil.status){

        alert(hasil.pesan);

        return;

    }

    localStorage.setItem(
        "modeSurat",
        "edit"
    );

    const onlineData={

        nik          : localStorage.getItem("nik"),
        nama         : localStorage.getItem("nama"),
        tempatlahir  : localStorage.getItem("tempatlahir"),
        tanggallahir : localStorage.getItem("tanggallahir"),
        jk           : localStorage.getItem("jk"),
        agama        : localStorage.getItem("agama"),
        pekerjaan    : localStorage.getItem("pekerjaan"),
        alamat       : localStorage.getItem("alamat"),
        rt           : localStorage.getItem("rt"),
        rw           : localStorage.getItem("rw"),
        desa         : localStorage.getItem("desa"),
        kecamatan    : localStorage.getItem("kecamatan"),
        kabupaten    : localStorage.getItem("kabupaten"),
        provinsi     : localStorage.getItem("provinsi"),
        sp           : localStorage.getItem("sp"),

        jenisSurat   :
            localStorage.getItem("jenisSurat"),

        dataJSON     :
            dataJSONKeterangan()

    };

    localStorage.setItem(
        "dataSurat",
        JSON.stringify(onlineData)
    );

    refreshStatusSinkron();

    alert("Data berhasil disimpan.");

    loadPreview();

}

/*======================================================
  UPDATE AGENDA
======================================================*/

async function updateAgenda(){

    try{

        //--------------------------------------------------
        // DATA PENDUDUK
        //--------------------------------------------------

        const penduduk = JSON.parse(

            localStorage.getItem("penduduk") || "{}"

        );

        //--------------------------------------------------
        // DATA SURAT
        //--------------------------------------------------

        const dataSurat = dataJSONKeterangan();

        const json = JSON.stringify(dataSurat);

        //--------------------------------------------------
        // DEBUG
        //--------------------------------------------------

        console.log("===== UPDATE AGENDA =====");
        console.log("Nomor :", localStorage.getItem("nomorAgenda"));
        console.log("NIK :", penduduk.nik || localStorage.getItem("nik"));
        console.log("Jenis :", localStorage.getItem("jenisSurat"));
        console.log("JSON :", json);

        //--------------------------------------------------
        // REQUEST
        //--------------------------------------------------

        const response = await fetch(

            URL +
            "?aksi=updateagenda" +
            "&token=" + TOKEN +
            "&nomor=" +
            encodeURIComponent(
                localStorage.getItem("nomorAgenda")
            ) +
            "&nik=" +
            encodeURIComponent(
                penduduk.nik ||
                localStorage.getItem("nik")
            ) +
            "&nama=" +
            encodeURIComponent(
                penduduk.nama ||
                localStorage.getItem("nama")
            ) +
            "&jenis=" +
            encodeURIComponent(
                localStorage.getItem("jenisSurat")
            ) +
            "&dataJSON=" +
            encodeURIComponent(json)

        );

        const hasil = await response.json();

        console.log("HASIL UPDATE :", hasil);

        if(hasil.status){

            refreshStatusSinkron();

            if(typeof tampilQRCode==="function"){

                tampilQRCode();

            }

        }

        return hasil;

    }catch(err){

        console.error(err);

        return{

            status:false,
            pesan:err.message

        };

    }

}


/*======================================================
  UPDATE SURAT
======================================================*/

async function updateSurat(){

    //--------------------------------------------------
    // OFFLINE
    //--------------------------------------------------

    if(localStorage.getItem("statusSync")=="0"){

        showLoading();

        const berhasil = await updateOffline(

            Number(
                localStorage.getItem("offlineID")
            ),

            {

                nik :
                    localStorage.getItem("nik"),

                nama :
                    localStorage.getItem("nama"),

                jenisSurat :
                    localStorage.getItem("jenisSurat"),

                dataJSON :
                    dataJSONKeterangan()

            }

        );

        hideLoading();

        if(!berhasil){

            alert(
                "Data offline gagal diperbarui."
            );

            return;

        }

        //--------------------------------------------------
        // REFRESH PREVIEW
        //--------------------------------------------------

        tampilkanSurat();

        alert(
            "Perubahan berhasil disimpan (Offline)."
        );

        return;

    }

    //--------------------------------------------------
    // ONLINE
    //--------------------------------------------------

    showLoading();

    const hasil =
        await updateAgenda();

    hideLoading();

    if(!hasil.status){

        alert(hasil.pesan);

        return;

    }

    //--------------------------------------------------
    // REFRESH PREVIEW
    //--------------------------------------------------

    tampilkanSurat();

    refreshStatusSinkron();

    alert(
        "Data berhasil diperbarui."
    );

}

/*======================================================
BUKA HALAMAN CETAK
======================================================*/

function bukaCetak(){

    const nomor = localStorage.getItem("nomorAgenda");

    //--------------------------------------------------
    // JIKA BELUM ADA NOMOR -> OFFLINE
    //--------------------------------------------------

    if(!nomor){

        window.open(
            "cetak_keterangan.html",
            "_blank"
        );

        return;

    }

    //--------------------------------------------------
    // SUDAH ADA NOMOR -> ONLINE
    //--------------------------------------------------

    window.open(

        "cetak_keterangan.html?nomor=" +

        encodeURIComponent(nomor),

        "_blank"

    );

}


/*======================================================
  CETAK SURAT
======================================================*/

function cetakSurat(){

    const nomor =
        localStorage.getItem("nomorAgenda");

    if(!nomor){

        alert("Nomor agenda tidak ditemukan.");

        return;

    }

    window.open(

        "cetak_keterangan.html?nomor=" +
        encodeURIComponent(nomor),

        "_blank"

    );

}


/*======================================================
  KEMBALI KE FORM
======================================================*/

function kembali(){

    localStorage.setItem(
        "modePreview",
        "1"
    );

    window.location.href =
        "keterangan.html";

}


/*======================================================
  SELESAI EDIT
======================================================*/

function selesaiEdit(){

    localStorage.removeItem("modePreview");
    localStorage.removeItem("modeSurat");

}


/*======================================================
  FORMAT TANGGAL
======================================================*/

function formatTanggal(tanggal){

    if(!tanggal) return "";

    const t = new Date(tanggal);

    if(isNaN(t.getTime())){

        const p = tanggal.split("/");

        if(p.length==3){

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
  LOAD HALAMAN
======================================================*/

document.addEventListener(

    "DOMContentLoaded",

    async function(){

        cekLogin();
        cekAksesDashboard();

        loadPreview();

        await loadTandaTangan();

    }

);

/*======================================================
  REFRESH STATUS SURAT
======================================================*/

function refreshStatusSurat(){

    if(localStorage.getItem("statusSync")!="1"){

        return;

    }

    const nomor =
        localStorage.getItem("nomorAgenda");

    if(!nomor){

        return;

    }

    document.getElementById("nomorSurat").innerHTML =

        "470/" +

        nomor +

        "/418.60.04/" +

        new Date().getFullYear();

}


/*======================================================
  REFRESH MODE
======================================================*/

function refreshMode(){

    if(localStorage.getItem("statusSync")!="1"){

        return;

    }

    document.getElementById("btnSimpan").style.display =
        "none";

    document.getElementById("btnUpdate").style.display =
        "inline-block";

    document.getElementById("btnCetak").style.display =
        "inline-block";

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
  REFRESH QR
======================================================*/

function refreshQRCode(){

    if(localStorage.getItem("statusSync")!="1"){

        return;

    }

    if(typeof tampilQRCode==="function"){

        tampilQRCode();

    }

}


/*======================================================
  EVENT SINKRON BERHASIL
======================================================*/

window.addEventListener(

    "sinkronBerhasil",

    function(e){

        console.log(
            "Sinkron selesai",
            e.detail
        );

        refreshStatusSurat();

        refreshMode();

        refreshQRCode();

    }

);


/*======================================================
  DEBUG
======================================================*/

function debugPreview(){

    console.log(
        "===== PREVIEW KETERANGAN ====="
    );

    console.log(
        dataJSONKeterangan()
    );

}
//======================================================
// PREVIEW SURAT DOMISILI
//======================================================

//======================================================
// MODE
//======================================================

let modeSurat = "baru";

//======================================================
// DATA JSON SURAT
//======================================================

function dataJSONDomisili(){

    return {

        nik             : localStorage.getItem("nik") || "",
        nama            : localStorage.getItem("nama") || "",
        tempatlahir     : localStorage.getItem("tempatlahir") || "",
        tanggallahir    : localStorage.getItem("tanggallahir") || "",
        jk              : localStorage.getItem("jk") || "",
        agama           : localStorage.getItem("agama") || "",
        pekerjaan       : localStorage.getItem("pekerjaan") || "",
        alamat          : localStorage.getItem("alamat") || "",
        rt              : localStorage.getItem("rt") || "",
        rw              : localStorage.getItem("rw") || "",
        desa            : localStorage.getItem("desa") || "",
        kecamatan       : localStorage.getItem("kecamatan") || "",
        kabupaten       : localStorage.getItem("kabupaten") || "",
        provinsi        : localStorage.getItem("provinsi") || "",
        sp              : localStorage.getItem("sp") || "",
        bertempat       : localStorage.getItem("bertempat") || "",
        keperluan       : localStorage.getItem("keperluan") || ""

    };

}

//======================================================
// SAAT HALAMAN DIBUKA
//======================================================

document.addEventListener("DOMContentLoaded", () => {

    loadPreview();

});


//======================================================
// LOAD PREVIEW
//======================================================

function loadPreview(){

    //--------------------------------------------------
    // MODE TOMBOL
    //--------------------------------------------------

    const mode = localStorage.getItem("modeSurat") || "baru";

    modeSurat = mode;

    if(mode==="baru"){

        document.getElementById("btnSimpan").style.display="inline-block";

        document.getElementById("btnUpdate").style.display="none";

        document.getElementById("btnCetak").style.display="none";

    }else{

        document.getElementById("btnSimpan").style.display="none";

        document.getElementById("btnUpdate").style.display="inline-block";

        document.getElementById("btnCetak").style.display="inline-block";

    }


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

        formatTanggal(localStorage.getItem("tanggallahir"));

    document.getElementById("jk").innerHTML =
        localStorage.getItem("jk") || "";

    document.getElementById("agama").innerHTML =
        localStorage.getItem("agama") || "";

    document.getElementById("pekerjaan").innerHTML =
        localStorage.getItem("pekerjaan") || "";

    document.getElementById("sp").innerHTML =
        localStorage.getItem("sp") || "";

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

    document.getElementById("bertempat").innerHTML =
        localStorage.getItem("bertempat") || "";

    document.getElementById("keperluan").innerHTML =
        localStorage.getItem("keperluan") || "";

    document.getElementById("namaTtd").innerHTML =
        localStorage.getItem("nama") || "";

    document.getElementById("tanggalSurat").innerHTML =
        tanggalIndonesia(new Date());

    //--------------------------------------------------
    // NOMOR SURAT
    //--------------------------------------------------

    if(localStorage.getItem("nomorAgenda")){

        document.getElementById("nomorSurat").innerHTML =

            "450/" +

            localStorage.getItem("nomorAgenda") +

            "/418.60.04/" +

            new Date().getFullYear();

    }else{

        document.getElementById("nomorSurat").innerHTML =

            "Akan dibuat setelah surat disimpan";

    }

}



//======================================================
// EDIT DATA
//======================================================

function kembali(){

    // kembali ke form dalam mode edit
    localStorage.setItem("modePreview","1");

    localStorage.setItem("modeSurat",modeSurat);

    // simpan kembali data preview ke localStorage

    localStorage.setItem("nik",
        document.getElementById("nik").innerHTML);

    localStorage.setItem("nama",
        document.getElementById("nama").innerHTML);

    //--------------------------------------------------
    // TTL
    //--------------------------------------------------

    const ttl =
        document.getElementById("ttl").innerHTML.split(",");

    localStorage.setItem(
        "tempatlahir",
        ttl[0].trim()
    );

    if(ttl.length>1){

        localStorage.setItem(

            "tanggallahir",

            ubahTanggalDatabase(
                ttl[1].trim()
            )

        );

    }

    //--------------------------------------------------
    // DATA LAIN
    //--------------------------------------------------

    localStorage.setItem(
        "jk",
        document.getElementById("jk").innerHTML
    );

    localStorage.setItem(
        "agama",
        document.getElementById("agama").innerHTML
    );

    localStorage.setItem(
        "pekerjaan",
        document.getElementById("pekerjaan").innerHTML
    );

    localStorage.setItem(
        "sp",
        document.getElementById("sp").innerHTML
    );

    localStorage.setItem(
        "bertempat",
        document.getElementById("bertempat").innerHTML
    );

    localStorage.setItem(
        "keperluan",
        document.getElementById("keperluan").innerHTML
    );

    window.location.href="domisili.html";

}



//======================================================
// UBAH FORMAT TANGGAL
//======================================================

function ubahTanggalDatabase(tanggal){

    if(!tanggal) return "";

    const bulan={

        "Januari":"01",
        "Februari":"02",
        "Maret":"03",
        "April":"04",
        "Mei":"05",
        "Juni":"06",
        "Juli":"07",
        "Agustus":"08",
        "September":"09",
        "Oktober":"10",
        "November":"11",
        "Desember":"12"

    };

    const p=tanggal.split(" ");

    return p[2]+"-"+bulan[p[1]]+"-"+("0"+p[0]).slice(-2);

}



//======================================================
// LOADING
//======================================================

function showLoading(){

    const loading=document.getElementById("loading");

    if(loading){

        loading.style.display="flex";

    }

}

function hideLoading(){

    const loading=document.getElementById("loading");

    if(loading){

        loading.style.display="none";

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

        const id = await simpanOffline(

            "DOMISILI",

            {

                nik           : localStorage.getItem("nikLuar") || localStorage.getItem("nik"),
                nama          : localStorage.getItem("nama"),
                tempatlahir   : localStorage.getItem("tempatlahir"),
                tanggallahir  : localStorage.getItem("tanggallahir"),
                jk            : localStorage.getItem("jk"),
                agama         : localStorage.getItem("agama"),
                pekerjaan     : localStorage.getItem("pekerjaan"),
                alamat        : localStorage.getItem("alamat"),
                rt            : localStorage.getItem("rt"),
                rw            : localStorage.getItem("rw"),
                desa          : localStorage.getItem("desa"),
                kecamatan     : localStorage.getItem("kecamatan"),
                kabupaten     : localStorage.getItem("kabupaten"),
                provinsi      : localStorage.getItem("provinsi"),
                sp            : localStorage.getItem("sp"),

                bertempat     : localStorage.getItem("bertempat"),
                keperluan     : localStorage.getItem("keperluan"),

                jenisSurat    : "SURAT DOMISILI",

                dataJSON      : dataJSONDomisili()

            }

        );

        //--------------------------------------------------
        // STATUS
        //--------------------------------------------------

        localStorage.setItem("offlineID",id);

        localStorage.setItem("statusSync","0");

        localStorage.setItem("modeSurat","edit");

        localStorage.removeItem("kodeVerifikasi");

        //--------------------------------------------------
        // TAMPILKAN MODE EDIT
        //--------------------------------------------------

        modeSurat="edit";

        document.getElementById("btnSimpan").style.display="none";

        document.getElementById("btnUpdate").style.display="inline-block";

        document.getElementById("btnCetak").style.display="inline-block";

        document.getElementById("nomorSurat").innerHTML=

            "MENUNGGU SINKRONISASI";

        alert(

            "Tidak ada koneksi internet.\n\nData disimpan ke Antrian Offline."

        );

        return;

    }

    //--------------------------------------------------
    // ONLINE
    //--------------------------------------------------

    showLoading();

    try{

        //--------------------------------------------------
        // 1. SIMPAN AGENDA
        //--------------------------------------------------

        const responseAgenda = await fetch(

            URL +
            "?aksi=simpanagenda" +
            "&token=" + TOKEN +
            "&nik=" + encodeURIComponent(localStorage.getItem("nik")) +
            "&nama=" + encodeURIComponent(localStorage.getItem("nama")) +
            "&jenis=" + encodeURIComponent("SURAT DOMISILI") +
            "&dataJSON=" +
            encodeURIComponent(
                JSON.stringify(dataJSONDomisili())
            )

        );

        const hasilAgenda = await responseAgenda.json();

        console.log("AGENDA :", hasilAgenda);

        if(!hasilAgenda.status){

            hideLoading();

            alert(hasilAgenda.pesan);

            return;

        }

        localStorage.setItem("nomorAgenda", hasilAgenda.nomor);
        localStorage.setItem("kodeVerifikasi", hasilAgenda.kodeVerifikasi);

        document.getElementById("nomorSurat").innerHTML =

            "450/" +

            hasilAgenda.nomor +

            "/418.60.04/" +

            new Date().getFullYear();

        //--------------------------------------------------
        // 2. SIMPAN DOMISILI
        //--------------------------------------------------

        let url =

            URL +
            "?aksi=simpandomisili" +
            "&token=" + TOKEN +

            "&nomor=" + encodeURIComponent(hasilAgenda.nomor) +

            "&nik=" + encodeURIComponent(localStorage.getItem("nik")) +
            "&nama=" + encodeURIComponent(localStorage.getItem("nama")) +
            "&tempatlahir=" + encodeURIComponent(localStorage.getItem("tempatlahir")) +
            "&tanggallahir=" + encodeURIComponent(localStorage.getItem("tanggallahir")) +
            "&jk=" + encodeURIComponent(localStorage.getItem("jk")) +
            "&agama=" + encodeURIComponent(localStorage.getItem("agama")) +
            "&pekerjaan=" + encodeURIComponent(localStorage.getItem("pekerjaan")) +
            "&alamat=" + encodeURIComponent(localStorage.getItem("alamat")) +
            "&ert=" + encodeURIComponent(localStorage.getItem("rt")) +
            "&rw=" + encodeURIComponent(localStorage.getItem("rw")) +
            "&desa=" + encodeURIComponent(localStorage.getItem("desa")) +
            "&kecamatan=" + encodeURIComponent(localStorage.getItem("kecamatan")) +
            "&kabupaten=" + encodeURIComponent(localStorage.getItem("kabupaten")) +
            "&provinsi=" + encodeURIComponent(localStorage.getItem("provinsi")) +
            "&sp=" + encodeURIComponent(localStorage.getItem("sp")) +
            "&bertempat=" + encodeURIComponent(localStorage.getItem("bertempat")) +
            "&keperluan=" + encodeURIComponent(localStorage.getItem("keperluan"));

        const responseDomisili = await fetch(url);

        const hasilDomisili = (await responseDomisili.text()).trim();

        console.log("DOMISILI :", hasilDomisili);

        if(
            hasilDomisili !== "DATA DOMISILI BERHASIL DISIMPAN"
        ){

            hideLoading();

            alert("Data domisili gagal disimpan.");

            return;

        }

        //--------------------------------------------------
        // MODE EDIT
        //--------------------------------------------------

        modeSurat = "edit";

        localStorage.setItem("modeSurat","edit");

        //--------------------------------------------------
        // UBAH TOMBOL
        //--------------------------------------------------

        document.getElementById("btnSimpan").style.display="none";

        document.getElementById("btnUpdate").style.display="inline-block";

        document.getElementById("btnCetak").style.display="inline-block";

        hideLoading();

        alert("Data berhasil disimpan.");

    }

    catch(err){

        hideLoading();

        console.log(err);

        alert("Terjadi kesalahan saat menyimpan.");

    }

}

//======================================================
// UPDATE SURAT
//======================================================

async function updateSurat(){

    showLoading();

    //--------------------------------------------------
    // UPDATE OFFLINE
    //--------------------------------------------------

    if(!navigator.onLine){

        const id=localStorage.getItem("offlineID");

        if(id){

            await updateOffline(

                Number(id),

                {

                    nik           : localStorage.getItem("nikLuar") || localStorage.getItem("nik"),
                    nama          : localStorage.getItem("nama"),
                    tempatlahir   : localStorage.getItem("tempatlahir"),
                    tanggallahir  : localStorage.getItem("tanggallahir"),
                    jk            : localStorage.getItem("jk"),
                    agama         : localStorage.getItem("agama"),
                    pekerjaan     : localStorage.getItem("pekerjaan"),
                    alamat        : localStorage.getItem("alamat"),
                    rt            : localStorage.getItem("rt"),
                    rw            : localStorage.getItem("rw"),
                    desa          : localStorage.getItem("desa"),
                    kecamatan     : localStorage.getItem("kecamatan"),
                    kabupaten     : localStorage.getItem("kabupaten"),
                    provinsi      : localStorage.getItem("provinsi"),
                    sp            : localStorage.getItem("sp"),

                    bertempat     : localStorage.getItem("bertempat"),
                    keperluan     : localStorage.getItem("keperluan"),

                    jenisSurat    : "SURAT DOMISILI",

                    dataJSON      : dataJSONDomisili()

                }

            );

            hideLoading();

            alert(

                "Perubahan disimpan di perangkat.\n\nAkan disinkronkan saat internet tersedia."

            );

            return;

        }

    }

    //--------------------------------------------------
    // UPDATE ONLINE
    //--------------------------------------------------

    try{

        const nomorAgenda = localStorage.getItem("nomorAgenda");

        let url =

            URL +
            "?aksi=updatedomisili" +
            "&token=" + TOKEN +

            "&nomor=" + encodeURIComponent(nomorAgenda) +
            "&nik=" + encodeURIComponent(localStorage.getItem("nik")) +
            "&nama=" + encodeURIComponent(localStorage.getItem("nama")) +
            "&tempatlahir=" + encodeURIComponent(localStorage.getItem("tempatlahir")) +
            "&tanggallahir=" + encodeURIComponent(localStorage.getItem("tanggallahir")) +
            "&jk=" + encodeURIComponent(localStorage.getItem("jk")) +
            "&agama=" + encodeURIComponent(localStorage.getItem("agama")) +
            "&pekerjaan=" + encodeURIComponent(localStorage.getItem("pekerjaan")) +
            "&alamat=" + encodeURIComponent(localStorage.getItem("alamat")) +
            "&ert=" + encodeURIComponent(localStorage.getItem("rt")) +
            "&rw=" + encodeURIComponent(localStorage.getItem("rw")) +
            "&desa=" + encodeURIComponent(localStorage.getItem("desa")) +
            "&kecamatan=" + encodeURIComponent(localStorage.getItem("kecamatan")) +
            "&kabupaten=" + encodeURIComponent(localStorage.getItem("kabupaten")) +
            "&provinsi=" + encodeURIComponent(localStorage.getItem("provinsi")) +
            "&sp=" + encodeURIComponent(localStorage.getItem("sp")) +
            "&bertempat=" + encodeURIComponent(localStorage.getItem("bertempat")) +
            "&keperluan=" + encodeURIComponent(localStorage.getItem("keperluan"));

        const response = await fetch(url);

const hasil = (await response.text()).trim();

console.log("UPDATE DOMISILI :", hasil);

if(
    !hasil.startsWith("SUKSES") &&
    !hasil.includes("BERHASIL")
){

    hideLoading();

    alert(hasil);

    return;

}

//==================================================
// UPDATE AGENDA SURAT
//==================================================


const responseAgenda = await fetch(

    URL +
    "?aksi=updateagenda" +
    "&token=" + TOKEN +

    "&nomor=" + encodeURIComponent(nomorAgenda) +
    "&nik=" + encodeURIComponent(localStorage.getItem("nik")) +
    "&nama=" + encodeURIComponent(localStorage.getItem("nama")) +
    "&jenis=" + encodeURIComponent("SURAT DOMISILI") +

    "&dataJSON=" +
    encodeURIComponent(
        JSON.stringify(dataJSONDomisili())
    )

);

const hasilAgenda = (await responseAgenda.text()).trim();

console.log("UPDATE AGENDA :", hasilAgenda);

hideLoading();

if(
    hasilAgenda.startsWith("SUKSES") ||
    hasilAgenda.includes("BERHASIL")
){

    alert("Data berhasil diperbarui.");

}else{

    alert(
        "Domisili berhasil diupdate, tetapi Agenda Surat gagal diupdate.\n\n" +
        hasilAgenda
    );

}

}

catch(err){

    hideLoading();

    console.log(err);

    alert("Terjadi kesalahan saat memperbarui.");

}
}

//======================================================
// CETAK SURAT
//======================================================

function bukaCetak(){

    const nomor = localStorage.getItem("nomorAgenda");

    if(nomor){

        window.open(

            "cetak_domisili.html?nomor=" +

            encodeURIComponent(nomor),

            "_blank"

        );

    }else{

        window.open(

            "cetak_domisili.html",

            "_blank"

        );

    }

}

//======================================================
// FORMAT TANGGAL
//======================================================

function formatTanggal(tanggal){

    if(!tanggal) return "";

    const bulan = [

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

    return t.getDate() +
        " " +
        bulan[t.getMonth()] +
        " " +
        t.getFullYear();

}

//======================================================
// TANGGAL HARI INI
//======================================================

function tanggalIndonesia(tanggal){

    const bulan = [

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

    return tanggal.getDate() +

        " " +

        bulan[tanggal.getMonth()] +

        " " +

        tanggal.getFullYear();

}

//======================================================
// LOGOUT
//======================================================

function logout(){

    if(confirm("Keluar dari aplikasi?")){

        localStorage.clear();

        window.location.href = "index.html";

    }

}
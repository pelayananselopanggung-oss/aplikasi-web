
//======================================================
// RANMOR
//======================================================

let modeSurat = "baru";

//======================================================
// DATA JSON SURAT RANMOR
//======================================================

function dataJSONRanmor(){

    return {

        //--------------------------------------------------
        // DATA PEMBELI
        //--------------------------------------------------

        nik            : localStorage.getItem("nik") || "",
        nama           : localStorage.getItem("nama") || "",
        tempatlahir    : localStorage.getItem("tempatlahir") || "",
        tanggallahir   : localStorage.getItem("tanggallahir") || "",
        ttl            : localStorage.getItem("ttl") || "",
        jk             : localStorage.getItem("jk") || "",
        agama          : localStorage.getItem("agama") || "",
        pekerjaan      : localStorage.getItem("pekerjaan") || "",
        alamat         : localStorage.getItem("alamat") || "",
        rt             : localStorage.getItem("rt") || "",
        rw             : localStorage.getItem("rw") || "",
        desa           : localStorage.getItem("desa") || "",
        kecamatan      : localStorage.getItem("kecamatan") || "",
        kabupaten      : localStorage.getItem("kabupaten") || "",
        provinsi       : localStorage.getItem("provinsi") || "",
        sp             : localStorage.getItem("sp") || "",

        //--------------------------------------------------
        // DATA KENDARAAN
        //--------------------------------------------------

        nopol          : localStorage.getItem("nopol") || "",
        namaPemilik    : localStorage.getItem("namaPemilik") || "",
        alamatPemilik  : localStorage.getItem("alamatPemilik") || "",
        merk           : localStorage.getItem("merk") || "",
        type           : localStorage.getItem("type") || "",
        jenis          : localStorage.getItem("jenis") || "",
        model          : localStorage.getItem("model") || "",
        tahunPembuatan : localStorage.getItem("tahunPembuatan") || "",
        isiSilinder    : localStorage.getItem("isiSilinder") || "",
        nomorRangka    : localStorage.getItem("nomorRangka") || "",
        nomorMesin     : localStorage.getItem("nomorMesin") || "",

        //--------------------------------------------------
        // DATA SURAT
        //--------------------------------------------------

        keperluan      : localStorage.getItem("keperluan") || ""

    };

}

//======================================================
// SAAT HALAMAN DIBUKA
//======================================================

document.addEventListener("DOMContentLoaded", function(){

    loadPreview();

});


//======================================================
// LOAD PREVIEW
//======================================================

function loadPreview(){

    //--------------------------------------------------
    // MODE TOMBOL
    //--------------------------------------------------

    modeSurat =

        localStorage.getItem("modeSurat") ||

        "baru";

    //--------------------------------------------------
    // MODE BARU
    //--------------------------------------------------

    if(modeSurat=="baru"){

        document.getElementById("btnSimpan").style.display="inline-block";

        document.getElementById("btnUpdate").style.display="none";

        document.getElementById("btnCetak").style.display="none";

    }

    //--------------------------------------------------
    // MODE EDIT
    //--------------------------------------------------

    else{

        document.getElementById("btnSimpan").style.display="none";

        document.getElementById("btnUpdate").style.display="inline-block";

        document.getElementById("btnCetak").style.display="inline-block";

    }

    //--------------------------------------------------
    // IDENTITAS PEMBELI
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

    document.getElementById("alamat").innerHTML =
        localStorage.getItem("alamat") || "";

    //--------------------------------------------------
    // DATA KENDARAAN
    //--------------------------------------------------

    document.getElementById("nopol").innerHTML =
        localStorage.getItem("nopol") || "";

    document.getElementById("namaPemilik").innerHTML =
        localStorage.getItem("namaPemilik") || "";

    document.getElementById("alamatPemilik").innerHTML =
        localStorage.getItem("alamatPemilik") || "";

    document.getElementById("merk").innerHTML =
        localStorage.getItem("merk") || "";

    document.getElementById("type").innerHTML =
        localStorage.getItem("type") || "";

    document.getElementById("jenis").innerHTML =
        localStorage.getItem("jenis") || "";

    document.getElementById("model").innerHTML =
        localStorage.getItem("model") || "";

    document.getElementById("tahunPembuatan").innerHTML =
        localStorage.getItem("tahunPembuatan") || "";

    document.getElementById("isiSilinder").innerHTML =
        localStorage.getItem("isiSilinder") || "";

    document.getElementById("nomorMesin").innerHTML =
        localStorage.getItem("nomorMesin") || "";

    document.getElementById("nomorRangka").innerHTML =
        localStorage.getItem("nomorRangka") || "";

    //--------------------------------------------------
    // DATA SURAT
    //--------------------------------------------------

    document.getElementById("keperluan").innerHTML =
        localStorage.getItem("keperluan") || "";

    document.getElementById("namaTtd").innerHTML =
        localStorage.getItem("nama") || "";

    document.getElementById("tanggalSurat").innerHTML =
        tanggalIndonesia(new Date());

    //--------------------------------------------------
    // STATUS SINKRON
    //--------------------------------------------------

    if(localStorage.getItem("statusSync")=="0"){

        document.getElementById("nomorSurat").innerHTML =

            "<span class='text-danger'>BELUM TERSINKRON</span>";

    }

       //--------------------------------------------------
    // NOMOR SURAT
    //--------------------------------------------------

    const nomorAgenda =
        localStorage.getItem("nomorAgenda");

    if(nomorAgenda){

        //--------------------------------------------------
        // SUDAH MEMILIKI NOMOR SURAT
        //--------------------------------------------------

        document.getElementById("nomorSurat").innerHTML =

            "450/" +

            nomorAgenda +

            "/418.60.04/" +

            new Date().getFullYear();

    }

    //--------------------------------------------------
    // BELUM MEMILIKI NOMOR
    //--------------------------------------------------

    else{

        document.getElementById("nomorSurat").innerHTML =

            "Akan dibuat setelah surat disimpan";

    }

}

//======================================================
// KEMBALI KE FORM
//======================================================

function kembali(){

    //--------------------------------------------------
    // Kembali dalam mode Preview/Edit
    //--------------------------------------------------

    localStorage.setItem("modePreview","1");

    localStorage.setItem(
        "modeSurat",
        modeSurat
    );

    //--------------------------------------------------
    // DATA PEMOHON
    //--------------------------------------------------

    localStorage.setItem(
        "nik",
        document.getElementById("nik").innerHTML
    );

    localStorage.setItem(
        "nama",
        document.getElementById("nama").innerHTML
    );

    const ttl =
        document.getElementById("ttl")
        .innerHTML
        .split(",");

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

    localStorage.setItem(
        "jk",
        document.getElementById("jk").innerHTML
    );

    localStorage.setItem(
        "alamat",
        document.getElementById("alamat").innerHTML
    );

    //--------------------------------------------------
    // DATA KENDARAAN
    //--------------------------------------------------

    localStorage.setItem(
        "nopol",
        document.getElementById("nopol").innerHTML
    );

    localStorage.setItem(
        "namaPemilik",
        document.getElementById("namaPemilik").innerHTML
    );

    localStorage.setItem(
        "alamatPemilik",
        document.getElementById("alamatPemilik").innerHTML
    );

    localStorage.setItem(
        "merk",
        document.getElementById("merk").innerHTML
    );

    localStorage.setItem(
        "type",
        document.getElementById("type").innerHTML
    );

    localStorage.setItem(
        "jenis",
        document.getElementById("jenis").innerHTML
    );

    localStorage.setItem(
        "model",
        document.getElementById("model").innerHTML
    );

    localStorage.setItem(
        "tahunPembuatan",
        document.getElementById("tahunPembuatan").innerHTML
    );

    localStorage.setItem(
        "isiSilinder",
        document.getElementById("isiSilinder").innerHTML
    );

    localStorage.setItem(
        "nomorMesin",
        document.getElementById("nomorMesin").innerHTML
    );

    localStorage.setItem(
        "nomorRangka",
        document.getElementById("nomorRangka").innerHTML
    );

    //--------------------------------------------------
    // DATA SURAT
    //--------------------------------------------------

    localStorage.setItem(
        "keperluan",
        document.getElementById("keperluan").innerHTML
    );

    window.location.href="ranmor.html";

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




//======================================================
// SIMPAN SURAT
//======================================================

async function simpanSurat(){

    //--------------------------------------------------
    // OFFLINE
    //--------------------------------------------------

    if(!navigator.onLine){


        await simpanOffline(

    "RANMOR",

    {

        //--------------------------------------------------
        // IDENTITAS
        //--------------------------------------------------

        nik            : localStorage.getItem("nik"),
        nama           : localStorage.getItem("nama"),
        tempatlahir    : localStorage.getItem("tempatlahir"),
        tanggallahir   : localStorage.getItem("tanggallahir"),
        jk             : localStorage.getItem("jk"),
        agama          : localStorage.getItem("agama"),
        pekerjaan      : localStorage.getItem("pekerjaan"),
        alamat         : localStorage.getItem("alamat"),
        rt             : localStorage.getItem("rt"),
        rw             : localStorage.getItem("rw"),
        desa           : localStorage.getItem("desa"),
        kecamatan      : localStorage.getItem("kecamatan"),
        kabupaten      : localStorage.getItem("kabupaten"),
        provinsi       : localStorage.getItem("provinsi"),
        sp             : localStorage.getItem("sp"),

        //--------------------------------------------------
        // DATA KENDARAAN
        //--------------------------------------------------

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

        //--------------------------------------------------
        // PEMBELI
        //--------------------------------------------------

        namaPembeli    : localStorage.getItem("nama"),
        nikPembeli     : localStorage.getItem("nik"),
        ttlPembeli     : localStorage.getItem("ttl"),
        jkPembeli      : localStorage.getItem("jk"),
        alamatPembeli  : localStorage.getItem("alamat"),

        keperluan      : localStorage.getItem("keperluan"),

        jenisSurat     : "SURAT KETERANGAN RANMOR",

        dataJSON       : dataJSONRanmor()

    }

);

//==================================================
// MODE EDIT OFFLINE
//==================================================

modeSurat = "edit";

localStorage.setItem("modeSurat","edit");

localStorage.setItem("statusSync","0");

// nomor sementara
if(!localStorage.getItem("nomorAgenda")){

    localStorage.setItem(
        "nomorAgenda",
        "OFF-" + Date.now()
    );

}

// ubah nomor surat preview
document.getElementById("nomorSurat").innerHTML =
    "OFFLINE / MENUNGGU SINKRONISASI";

// ubah tombol
document.getElementById("btnSimpan").style.display = "none";
document.getElementById("btnUpdate").style.display = "inline-block";
document.getElementById("btnCetak").style.display = "inline-block";

alert(

    "Tidak ada koneksi internet.\n\n" +
    "Data disimpan ke Antrian Offline."

);

return;

    }

    
    //--------------------------------------------------
    // ONLINE
    //--------------------------------------------------

    showLoading();

    try{

        //--------------------------------------------------
        // SIMPAN AGENDA
        //--------------------------------------------------

        const responseAgenda = await fetch(

            URL +

            "?aksi=simpanagenda" +

            "&token=" + TOKEN +

            "&nik=" +

            encodeURIComponent(localStorage.getItem("nik")) +

            "&nama=" +

            encodeURIComponent(localStorage.getItem("nama")) +

            "&jenis=" +

            encodeURIComponent("SURAT KETERANGAN RANMOR") +

            "&dataJSON=" +

            encodeURIComponent(

                JSON.stringify(dataJSONRanmor())

            )

        );

        const hasilAgenda = await responseAgenda.json();

        console.log("AGENDA :",hasilAgenda);

        if(!hasilAgenda.status){

            hideLoading();

            alert(hasilAgenda.pesan);

            return;

        }

        //--------------------------------------------------
        // SIMPAN NOMOR
        //--------------------------------------------------

        localStorage.setItem(

            "nomorAgenda",

            hasilAgenda.nomor

        );

        localStorage.setItem(

            "kodeVerifikasi",

            hasilAgenda.kodeVerifikasi

        );

        localStorage.setItem(

            "statusSync",

            "1"

        );

        document.getElementById("nomorSurat").innerHTML =

            "450/" +

            hasilAgenda.nomor +

            "/418.60.04/" +

            new Date().getFullYear();

        //--------------------------------------------------
        // SIMPAN KENDARAAN
        //--------------------------------------------------

        const url =

            URL +

            "?aksi=simpanKendaraan" +

            "&token=" + TOKEN +

            "&nomor=" +

            encodeURIComponent(hasilAgenda.nomor) +

            "&nopol=" +

            encodeURIComponent(localStorage.getItem("nopol")) +

            "&namaPemilik=" +

            encodeURIComponent(localStorage.getItem("namaPemilik")) +

            "&alamatPemilik=" +

            encodeURIComponent(localStorage.getItem("alamatPemilik")) +

            "&merk=" +

            encodeURIComponent(localStorage.getItem("merk")) +

            "&type=" +

            encodeURIComponent(localStorage.getItem("type")) +

            "&jenis=" +

            encodeURIComponent(localStorage.getItem("jenis")) +

            "&model=" +

            encodeURIComponent(localStorage.getItem("model")) +

            "&tahunPembuatan=" +

            encodeURIComponent(localStorage.getItem("tahunPembuatan")) +

            "&isiSilinder=" +

            encodeURIComponent(localStorage.getItem("isiSilinder")) +

            "&nomorRangka=" +

            encodeURIComponent(localStorage.getItem("nomorRangka")) +

            "&nomorMesin=" +

            encodeURIComponent(localStorage.getItem("nomorMesin")) +

            "&namaPembeli=" +

            encodeURIComponent(localStorage.getItem("nama")) +

            "&nikPembeli=" +

            encodeURIComponent(localStorage.getItem("nik")) +

            "&ttlPembeli=" +

            encodeURIComponent(localStorage.getItem("ttl")) +

            "&jkPembeli=" +

            encodeURIComponent(localStorage.getItem("jk")) +

            "&alamatPembeli=" +

            encodeURIComponent(localStorage.getItem("alamat")) +

            "&keperluan=" +

            encodeURIComponent(localStorage.getItem("keperluan"));

        const responseKendaraan = await fetch(url);

        const hasilKendaraan = await responseKendaraan.json();

        console.log("KENDARAAN :",hasilKendaraan);

        if(!hasilKendaraan.status){

            hideLoading();

            alert(hasilKendaraan.pesan);

            return;

        }

        //--------------------------------------------------
        // MODE EDIT
        //--------------------------------------------------

        modeSurat = "edit";

        localStorage.setItem(

            "modeSurat",

            "edit"

        );

        //--------------------------------------------------
        // TOMBOL
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

    //--------------------------------------------------
    // OFFLINE
    //--------------------------------------------------

    if(!navigator.onLine){

        await updateOffline(

            "RANMOR",

            localStorage.getItem("nomorAgenda"),

            {

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

                namaPembeli    : localStorage.getItem("nama"),
                nikPembeli     : localStorage.getItem("nik"),
                ttlPembeli     : localStorage.getItem("ttl"),
                jkPembeli      : localStorage.getItem("jk"),
                alamatPembeli  : localStorage.getItem("alamat"),
                keperluan      : localStorage.getItem("keperluan"),

                jenisSurat     : "SURAT KETERANGAN RANMOR",

                dataJSON       : dataJSONRanmor()

            }

        );

        localStorage.setItem("statusSync","0");

        alert(

            "Tidak ada koneksi internet.\n\n" +

            "Perubahan disimpan ke Antrian Offline."

        );

        return;

    }

    //--------------------------------------------------
    // ONLINE
    //--------------------------------------------------

    showLoading();

    try{

        const nomorAgenda =

            localStorage.getItem("nomorAgenda");

        //--------------------------------------------------
        // UPDATE RANMOR
        //--------------------------------------------------

        const url =

            URL +

            "?aksi=editkendaraan" +

            "&token=" + TOKEN +

            "&nomor=" +

            encodeURIComponent(nomorAgenda) +

            "&nopol=" +

            encodeURIComponent(localStorage.getItem("nopol")) +

            "&namaPemilik=" +

            encodeURIComponent(localStorage.getItem("namaPemilik")) +

            "&alamatPemilik=" +

            encodeURIComponent(localStorage.getItem("alamatPemilik")) +

            "&merk=" +

            encodeURIComponent(localStorage.getItem("merk")) +

            "&type=" +

            encodeURIComponent(localStorage.getItem("type")) +

            "&jenis=" +

            encodeURIComponent(localStorage.getItem("jenis")) +

            "&model=" +

            encodeURIComponent(localStorage.getItem("model")) +

            "&tahunPembuatan=" +

            encodeURIComponent(localStorage.getItem("tahunPembuatan")) +

            "&isiSilinder=" +

            encodeURIComponent(localStorage.getItem("isiSilinder")) +

            "&nomorRangka=" +

            encodeURIComponent(localStorage.getItem("nomorRangka")) +

            "&nomorMesin=" +

            encodeURIComponent(localStorage.getItem("nomorMesin")) +

            "&namaPembeli=" +

            encodeURIComponent(localStorage.getItem("nama")) +

            "&nikPembeli=" +

            encodeURIComponent(localStorage.getItem("nik")) +

            "&ttlPembeli=" +

            encodeURIComponent(localStorage.getItem("ttl")) +

            "&jkPembeli=" +

            encodeURIComponent(localStorage.getItem("jk")) +

            "&alamatPembeli=" +

            encodeURIComponent(localStorage.getItem("alamat")) +

            "&keperluan=" +

            encodeURIComponent(localStorage.getItem("keperluan"));

        const response = await fetch(url);

        const hasil = await response.json();

        console.log("UPDATE RANMOR :",hasil);

        if(!hasil.status){

            hideLoading();

            alert(hasil.pesan);

            return;

        }

        //--------------------------------------------------
        // UPDATE AGENDA
        //--------------------------------------------------

        const responseAgenda = await fetch(

            URL +

            "?aksi=updateagenda" +

            "&token=" + TOKEN +

            "&nomor=" +

            encodeURIComponent(nomorAgenda) +

            "&nik=" +

            encodeURIComponent(localStorage.getItem("nik")) +

            "&nama=" +

            encodeURIComponent(localStorage.getItem("nama")) +

            "&jenis=" +

            encodeURIComponent("SURAT KETERANGAN RANMOR") +

            "&dataJSON=" +

            encodeURIComponent(

                JSON.stringify(dataJSONRanmor())

            )

        );

        const hasilAgenda =

            (await responseAgenda.text()).trim();

        console.log(

            "UPDATE AGENDA :",

            hasilAgenda

        );

        //--------------------------------------------------
        // STATUS SYNC
        //--------------------------------------------------

        localStorage.setItem(

            "statusSync",

            "1"

        );

        hideLoading();

        if(

            hasilAgenda.startsWith("SUKSES") ||

            hasilAgenda.includes("BERHASIL")

        ){

            alert("Data berhasil diperbarui.");

        }else{

            alert(

                "Ranmor berhasil diperbarui, tetapi Agenda Surat gagal diperbarui.\n\n" +

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

            "cetak_ranmor.html?nomor=" +

            encodeURIComponent(nomor),

            "_blank"

        );

    }else{

        window.open(

            "cetak_ranmor.html",

            "_blank"

        );

    }

}


//======================================================
// FORMAT TANGGAL
//======================================================

function formatTanggal(tanggal){

    if(!tanggal){

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

    const t=new Date(tanggal);

    return ("0"+t.getDate()).slice(-2)

        +" "+

        bulan[t.getMonth()]

        +" "+

        t.getFullYear();

}


//======================================================
// TANGGAL INDONESIA
//======================================================

function tanggalIndonesia(tanggal){

    if(!tanggal){

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

    return ("0"+tanggal.getDate()).slice(-2)

        +" "+

        bulan[tanggal.getMonth()]

        +" "+

        tanggal.getFullYear();

}


//======================================================
// LOGOUT
//======================================================

function logout(){

    if(

        !confirm(

            "Apakah Anda yakin ingin logout?"

        )

    ){

        return;

    }

    localStorage.clear();

    window.location.href =

        "index.html";

}


//======================================================
// DEBUG
//======================================================

function debugStorage(){

    console.log({

        nik              : localStorage.getItem("nik"),

        nama             : localStorage.getItem("nama"),

        nomorAgenda      : localStorage.getItem("nomorAgenda"),

        kodeVerifikasi   : localStorage.getItem("kodeVerifikasi"),

        modePreview      : localStorage.getItem("modePreview"),

        modeSurat        : localStorage.getItem("modeSurat"),

        statusSync       : localStorage.getItem("statusSync")

    });

}
/*======================================================
  PREVIEW SKTM SISWA
======================================================*/

let dataCetak = null;


/*======================================================
  LOAD HALAMAN
======================================================*/

document.addEventListener(

    "DOMContentLoaded",

    async function(){

        cekLogin();

        showLoading();

        try{

            await loadPreview();

            refreshNomorSurat();

            refreshStatusSinkron();

            refreshMode();

            await loadTandaTangan();

            refreshTanggalSurat();

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
  MODE EDIT
======================================================*/

function suratEdit(){

    return(

        localStorage.getItem("nomorAgenda")!=null

    );

}


/*======================================================
  LOADING
======================================================*/

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
  DATA JSON SKTM SISWA
======================================================*/

function dataJSONSKTM(){

    return{

        //--------------------------------------------------
        // SISWA
        //--------------------------------------------------

        nikSiswa :
            localStorage.getItem("nikSiswa") || "",

        //--------------------------------------------------
        // SURAT
        //--------------------------------------------------

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
  TANGGAL INDONESIA
======================================================*/

function tanggalIndonesia(tanggal){

    if(!tanggal) return "";

    const t = new Date(tanggal);

    if(isNaN(t.getTime())){

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

    return(

        t.getDate() +

        " " +

        bulan[t.getMonth()] +

        " " +

        t.getFullYear()

    );

}


/*======================================================
  FORMAT TANGGAL
======================================================*/

function formatTanggal(tanggal){

    if(!tanggal) return "";

    if(tanggal.includes("/")){

        const p=tanggal.split("/");

        return tanggalIndonesia(

            new Date(

                Number(p[2]),

                Number(p[1])-1,

                Number(p[0])

            )

        );

    }

    return tanggalIndonesia(

        new Date(tanggal)

    );

}


/*======================================================
  LOAD PREVIEW
======================================================*/

async function loadPreview(){

    showLoading();

    try{


        //--------------------------------------------------
        // MODE HISTORY AGENDA
        //--------------------------------------------------

        const mode = localStorage.getItem("modeSurat");


        if(mode === "history"){

            dataCetak = await getDataCetakSKTMSiswa();


            if(!dataCetak){

                alert("Data surat tidak ditemukan.");

                return;

            }


            tampilkanSurat(dataCetak);


        }else{


            //--------------------------------------------------
            // MODE BARU / EDIT
            // AMBIL DARI LOCAL STORAGE
            //--------------------------------------------------

            tampilkanSurat();


        }



    }
    catch(err){

        console.error(err);

        alert(err.message);

    }
    finally{

        hideLoading();

    }

}

/*======================================================
  GET DATA CETAK SKTM SISWA
======================================================*/

async function getDataCetakSKTMSiswa(){

    try{

        const response = await fetch(

            URL +

            "?aksi=cetakSKTMSiswa" +

            "&token=" + TOKEN +

            "&nomor=" +

            encodeURIComponent(

                localStorage.getItem("nomorAgenda")

            )

        );

        const hasil = await response.json();

        console.log("CETAK SKTM SISWA :", hasil);

        if(!hasil.status){

            return null;

        }

        return hasil.data;

    }

    catch(err){

        console.error(err);

        return null;

    }

}

/*======================================================
  TAMPILKAN SURAT
======================================================*/

function tampilkanSurat(data=null){

    //--------------------------------------------------
    // MODE BARU
    //--------------------------------------------------

    if(data==null){

        data={

            //--------------------------------------------------
            // ORANG TUA
            //--------------------------------------------------

            namaOrtu :
                localStorage.getItem("namaOrtu") || "",

            nikOrtu :
                localStorage.getItem("nikOrtu") || "",

            tempatlahirOrtu :
                localStorage.getItem("tempatLahirOrtu") || "",

            tanggallahirOrtu :
                localStorage.getItem("tanggalLahirOrtu") || "",

            jkOrtu :
                localStorage.getItem("jkOrtu") || "",

            agamaOrtu :
                localStorage.getItem("agamaOrtu") || "",

            pekerjaanOrtu :
                localStorage.getItem("pekerjaanOrtu") || "",

            alamatOrtu :
                localStorage.getItem("alamatOrtu") || "",


            //--------------------------------------------------
            // SISWA
            //--------------------------------------------------

namaSiswa :
    localStorage.getItem("namaSiswa") || "",

nikSiswa :
    localStorage.getItem("nikSiswa") || "",

tempatLahirSiswa :
    localStorage.getItem("tempatLahirSiswa") || "",

tanggalLahirSiswa :
    localStorage.getItem("tanggalLahirSiswa") || "",

jkSiswa :
    localStorage.getItem("jkSiswa") || "",

            //--------------------------------------------------
            // DATA SURAT
            //--------------------------------------------------

            sekolah :
                localStorage.getItem("sekolah") || "",

            kelas :
                localStorage.getItem("kelas") || "",

            nisn :
                localStorage.getItem("nisn") || "",

            desil :
                localStorage.getItem("desil") || "",

            keperluan :
                localStorage.getItem("keperluan") || ""

        };

    }


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

        formatTanggal(
            data.tanggallahirOrtu
        );

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

    formatTanggal(
        data.tanggalLahirSiswa
    );

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
    // TTD PEMOHON
    //--------------------------------------------------

    document.getElementById("namaTtd").innerHTML =
        data.namaOrtu || "";

}


/*======================================================
  SIMPAN AGENDA
======================================================*/

async function simpanAgenda(){

    try{

        const response = await fetch(

            URL +

            "?aksi=simpanagenda" +

            "&token=" + TOKEN +

            "&nik=" +

            encodeURIComponent(

                localStorage.getItem("nikOrtu")

            ) +

            "&nama=" +

            encodeURIComponent(

                localStorage.getItem("namaOrtu")

            ) +

            "&jenis=SKTM SISWA" +

            "&dataJSON=" +

            encodeURIComponent(

                JSON.stringify(
                    dataJSONSKTM()
                )

            )

        );

        const hasil = await response.json();

        console.log("SIMPAN AGENDA :", hasil);

        if(!hasil.status){

            return hasil;

        }

        //--------------------------------------------------
        // SIMPAN NOMOR
        //--------------------------------------------------

        localStorage.setItem(

            "nomorAgenda",

            hasil.nomor

        );

        localStorage.setItem(

            "kodeVerifikasi",

            hasil.kodeVerifikasi

        );

        localStorage.setItem(

            "statusSync",

            "1"

        );

        localStorage.setItem(

            "modeSurat",

            "edit"

        );

        refreshNomorSurat();

        refreshStatusSinkron();

        refreshQRCode();

        return hasil;

    }

    catch(err){

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
    // MODE OFFLINE
    //--------------------------------------------------

    if(!navigator.onLine){

        showLoading();

        try{

            const offlineID = await simpanOffline(

                "SKTM_SISWA",

                {

                    jenisSurat :

                        "SKTM SISWA",

                    dataJSON :

                        dataJSONSKTM()

                }

            );

            localStorage.setItem(

                "offlineID",

                offlineID

            );

            localStorage.setItem(

                "statusSync",

                "0"

            );

            localStorage.setItem(

                "modeSurat",

                "edit"

            );

            localStorage.removeItem(

                "nomorAgenda"

            );

            localStorage.removeItem(

                "kodeVerifikasi"

            );

            refreshStatusSinkron();

            alert(

                "Tidak ada koneksi internet.\n\n" +

                "Surat berhasil disimpan ke Antrian Offline."

            );

        }

        finally{

            hideLoading();

        }

        return;

    }


    //--------------------------------------------------
    // MODE ONLINE
    //--------------------------------------------------

    showLoading();

    try{

        const hasil = await simpanAgenda();

        if(!hasil.status){

            alert(

                hasil.pesan ||

                "Gagal menyimpan."

            );

            return;

        }

        //--------------------------------------------------
        // SIMPAN DATA TERAKHIR
        //--------------------------------------------------

        localStorage.setItem(

            "dataSurat",

            JSON.stringify({

                jenisSurat :

                    "SKTM SISWA",

                dataJSON :

                    dataJSONSKTM()

            })

        );

        tampilkanSurat();

        refreshStatusSinkron();

        refreshMode();

        alert(

            "Data berhasil disimpan."

        );

    }

    finally{

        hideLoading();

    }

}

/*======================================================
  UPDATE AGENDA
======================================================*/

async function updateAgenda(){

    try{

        const dataJSON = dataJSONSKTM();

        console.log(dataJSON);

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
                localStorage.getItem("nikOrtu")
            ) +

            "&nama=" +

            encodeURIComponent(
                localStorage.getItem("namaOrtu")
            ) +

            "&jenis=SKTM SISWA" +

            "&dataJSON=" +

            encodeURIComponent(
                JSON.stringify(dataJSON)
            )

        );

        const hasil = await response.json();

        console.log("UPDATE DATA JSON :", dataJSON);
        console.log("UPDATE SKTM SISWA :", hasil);

        return hasil;

    }

    catch(err){

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
    // MODE OFFLINE
    //--------------------------------------------------

    if(localStorage.getItem("statusSync")=="0"){

        showLoading();

        try{

            const berhasil = await updateOffline(

                Number(

                    localStorage.getItem("offlineID")

                ),

                {

                    jenisSurat :

                        "SKTM SISWA",

                    dataJSON :

                        dataJSONSKTM()

                }

            );

            if(!berhasil){

                alert(

                    "Data offline gagal diperbarui."

                );

                return;

            }

            tampilkanSurat();

            alert(

                "Perubahan berhasil disimpan (Offline)."

            );

        }

        finally{

            hideLoading();

        }

        return;

    }


    //--------------------------------------------------
    // MODE ONLINE
    //--------------------------------------------------

    showLoading();

    try{

        const hasil = await updateAgenda();

        if(!hasil.status){

            alert(

                hasil.pesan ||

                "Update gagal."

            );

            return;

        }

        //--------------------------------------------------
        // AMBIL DATA TERBARU DARI SERVER
        //--------------------------------------------------

        dataCetak = await getDataCetakSKTMSiswa();

        if(dataCetak){

            tampilkanSurat(

                dataCetak

            );

        }

        refreshNomorSurat();

        refreshStatusSinkron();

        refreshMode();

        refreshQRCode();

        alert(

            "Data berhasil diperbarui."

        );

    }

    finally{

        hideLoading();

    }

}


/*======================================================
  REFRESH STATUS SINKRON
======================================================*/

function refreshStatusSinkron(){

    const btnSimpan =
        document.getElementById("btnSimpan");

    const btnUpdate =
        document.getElementById("btnUpdate");

    const btnCetak =
        document.getElementById("btnCetak");

    const nomor =
        localStorage.getItem("nomorAgenda");

    const status =
        localStorage.getItem("statusSync") || "0";


    //--------------------------------------------------
    // BELUM PERNAH DISIMPAN
    //--------------------------------------------------

    if(!nomor){

        btnSimpan.style.display = "inline-block";

        btnUpdate.style.display = "none";

        btnCetak.style.display = "none";

        return;

    }


    //--------------------------------------------------
    // SUDAH TERSIMPAN
    //--------------------------------------------------

    btnSimpan.style.display = "none";

    btnUpdate.style.display = "inline-block";

    btnCetak.style.display =

        status == "1"

        ? "inline-block"

        : "none";

}

/*======================================================
  REFRESH MODE
======================================================*/

function refreshMode(){

    refreshStatusSinkron();

}


/*======================================================
  REFRESH NOMOR SURAT
======================================================*/

function refreshNomorSurat(){

    const nomor =

        localStorage.getItem("nomorAgenda");

    const tahun =

        new Date().getFullYear();

    document.getElementById(

        "nomorSurat"

    ).innerHTML =

        nomor

        ?

        "470/" +

        nomor +

        "/418.60.04/" +

        tahun

        :

        "470/........../418.60.04/" +

        tahun;

}


/*======================================================
  REFRESH TANGGAL SURAT
======================================================*/

function refreshTanggalSurat(){

    document.getElementById(

        "tanggalSurat"

    ).innerHTML =

        tanggalIndonesia(

            new Date()

        );

}


/*======================================================
  LOAD TANDA TANGAN
======================================================*/

async function loadTandaTangan(){

    const ttd = await getTandaTangan();

    if(!ttd){

        return;

    }


    const jabatan =

        document.getElementById("jabatanTtd");

    const nama =

        document.getElementById("namaPejabat");

    const nip =

        document.getElementById("nipPejabat");


    if(ttd.statusJabatan=="KADES"){

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


/*======================================================
  REFRESH QR
======================================================*/

function refreshQRCode(){

    //--------------------------------------------------
    // BELUM TERSINKRON
    //--------------------------------------------------

    if(

        localStorage.getItem("statusSync")!="1"

    ){

        return;

    }

    //--------------------------------------------------
    // QR
    //--------------------------------------------------

    if(

        typeof tampilQRCode=="function"

    ){

        tampilQRCode();

    }

}



/*======================================================
  CETAK
======================================================*/

function bukaCetak(){

    //--------------------------------------------------
    // HARUS SUDAH TERSIMPAN
    //--------------------------------------------------

    const nomor = localStorage.getItem("nomorAgenda");

    if(!nomor){

        alert("Surat belum disimpan.");

        return;

    }

    //--------------------------------------------------
    // BUKA HALAMAN CETAK
    //--------------------------------------------------

    window.open(

        "cetak_sktm_siswa.html?nomor=" +

        encodeURIComponent(nomor),

        "_blank"

    );

}


/*======================================================
  KEMBALI EDIT
======================================================*/

function kembali(){

    localStorage.setItem(
        "modePreview",
        "1"
    );

    const data = {

        namaSiswa :
            document.getElementById("namaSiswa").innerHTML,

        nikSiswa :
            document.getElementById("nikSiswa").innerHTML,

        //--------------------------------------------------
        // AMBIL DARI LOCALSTORAGE, JANGAN DARI PREVIEW
        //--------------------------------------------------

        tempatLahirSiswa :
            localStorage.getItem("tempatLahirSiswa") || "",

        tanggalLahirSiswa :
            localStorage.getItem("tanggalLahirSiswa") || "",

        jkSiswa :
            localStorage.getItem("jkSiswa") || "",

        //--------------------------------------------------
        // DATA SURAT
        //--------------------------------------------------

        sekolah :
            document.getElementById("sekolah").innerHTML,

        kelas :
            document.getElementById("kelas").innerHTML,

        nisn :
            document.getElementById("nisn").innerHTML,

        desil :
            document.getElementById("desil").innerHTML,

        keperluan :
            document.getElementById("keperluan").innerHTML,

        //--------------------------------------------------
        // ORANG TUA
        //--------------------------------------------------

        namaOrtu :
            document.getElementById("namaOrtu").innerHTML,

        nikOrtu :
            document.getElementById("nikOrtu").innerHTML,

        tempatLahirOrtu :
            localStorage.getItem("tempatLahirOrtu") || "",

        tanggalLahirOrtu :
            localStorage.getItem("tanggalLahirOrtu") || "",

        jkOrtu :
            localStorage.getItem("jkOrtu") || "",

        agamaOrtu :
            localStorage.getItem("agamaOrtu") || "",

        pekerjaanOrtu :
            localStorage.getItem("pekerjaanOrtu") || "",

        alamatOrtu :
            localStorage.getItem("alamatOrtu") || ""

    };


    Object.keys(data).forEach(function(key){

        localStorage.setItem(
            key,
            data[key]
        );

    });


    window.location.href =
        "sktm_siswa.html";

}

/*======================================================
  CLEAR DATA SURAT
======================================================*/

function clearDataSurat(){

    [

        "nomorAgenda",

        "kodeVerifikasi",

        "statusSync",

        "modeSurat",

        "offlineID"

    ].forEach(function(item){

        localStorage.removeItem(item);

    });

}


/*======================================================
  RESET MODE
======================================================*/

function resetMode(){

    localStorage.setItem(

        "modeSurat",

        "baru"

    );

    localStorage.setItem(

        "statusSync",

        "0"

    );

}


/*======================================================
  EVENT SINKRON BERHASIL
======================================================*/

window.addEventListener(

    "sinkronBerhasil",

    async function(){

        refreshStatusSinkron();

        refreshQRCode();

        //--------------------------------------------------
        // JIKA SUDAH ONLINE
        //--------------------------------------------------

        if(localStorage.getItem("nomorAgenda")){

            dataCetak = await getDataCetakSKTMSiswa();

            if(dataCetak){

                tampilkanSurat(dataCetak);

            }

        }

    }

);


/*======================================================
  EVENT ONLINE
======================================================*/

window.addEventListener(

    "online",

    async function(){

        console.log("Koneksi kembali.");

        //--------------------------------------------------
        // REPLAY OFFLINE
        //--------------------------------------------------

        if(typeof replayQueue=="function"){

            await replayQueue();

        }

        //--------------------------------------------------
        // REFRESH STATUS
        //--------------------------------------------------

        refreshStatusSinkron();

    }

);


/*======================================================
  EVENT OFFLINE
======================================================*/

window.addEventListener(

    "offline",

    function(){

        console.log("Mode Offline");

        refreshStatusSinkron();

    }

);
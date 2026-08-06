document.addEventListener(

    "DOMContentLoaded",

    async function(){

        cekLogin();

        await loadPreview();

        tampilTanggalSurat();

        await loadTandaTangan();

    }

);

/*======================================================
  LOADING
======================================================*/

function showLoading(){

    document.getElementById("loading").style.display = "flex";

}

function hideLoading(){

    document.getElementById("loading").style.display = "none";

}

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
  LOAD PREVIEW
======================================================*/

async function loadPreview(){

    await tampilkanSurat();

    statusTombol();

}



/*======================================================
  TAMPILKAN SURAT
======================================================*/

async function tampilkanSurat(){

    //--------------------------------------------------
    // NOMOR SURAT
    //--------------------------------------------------

    const nomorAgenda = localStorage.getItem("nomorAgenda");

    if(nomorAgenda){

        document.getElementById("nomorsurat").innerHTML =

            "Nomor : 472/" +

            nomorAgenda +

            "/418.60.04/" +

            new Date().getFullYear();

    }

    //--------------------------------------------------
    // IDENTITAS
    //--------------------------------------------------

    let data;

    //--------------------------------------------------
    // MODE EDIT
    //--------------------------------------------------

    if((localStorage.getItem("modeSurat") || "").toLowerCase() == "edit"){

        const response = await fetch(

            URL +

            "?aksi=getKematian" +

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

        data = hasil.data;

    }

    //--------------------------------------------------
    // MODE BARU
    //--------------------------------------------------

    else{

        data = await getPenduduk(

            localStorage.getItem("nik")

        );

        if(!data) return;

    }

    //--------------------------------------------------
    // TAMPILKAN IDENTITAS
    //--------------------------------------------------

    document.getElementById("nama").textContent =
        data.nama;

    document.getElementById("jk").textContent =
        data.jk;

    document.getElementById("alamat").textContent =

        data.alamat +

        " RT " + data.rt +

        " RW " + data.rw +

        " Desa " + data.desa +

        " Kecamatan " + data.kecamatan;

    //--------------------------------------------------
    // DATA KEMATIAN
    //--------------------------------------------------

    document.getElementById("harikematian").textContent =

        data.harikematian ||

        localStorage.getItem("harikematian") ||

        "";

    document.getElementById("tanggalkematian").textContent =

        data.tanggalkematian ||

        localStorage.getItem("tanggalkematian") ||

        "";

    document.getElementById("tempatkematian").textContent =

        data.tempatkematian ||

        localStorage.getItem("tempatkematian") ||

        "";

    document.getElementById("sebabkematian").textContent =

        data.sebabkematian ||

        localStorage.getItem("sebabkematian") ||

        "";

    //--------------------------------------------------
    // TANDA TANGAN
    //--------------------------------------------------

    if(typeof tandatangan == "function"){

        tandatangan();

    }

}

/*======================================================
  EDIT SURAT
======================================================*/

function editSurat(){

    localStorage.setItem(

        "modeSurat",

        "EDIT"

    );

    window.location.href =
        "kematian.html";

}


/*======================================================
  SIMPAN
======================================================*/

async function simpanSurat(){

    showLoading();

    try{

        //--------------------------------------------------
        // MODE OFFLINE
        //--------------------------------------------------

        if(!navigator.onLine){

            localStorage.setItem(
                "statusSinkron",
                "0"
            );

            alert(
                "Data disimpan sementara (Offline)."
            );

            hideLoading();

            return;

        }

        //--------------------------------------------------
        // SIMPAN AGENDA
        //--------------------------------------------------

        const hasilAgenda =
            await simpanAgenda();

        if(!hasilAgenda){

            hideLoading();

            return;

        }


        //--------------------------------------------------
        // PINDAH KE SHEET KEMATIAN
        //--------------------------------------------------

        const hasilPindah =
            await pindahKeKematian();

        if(!hasilPindah){

            hideLoading();

            return;

        }

        //--------------------------------------------------
        // STATUS
        //--------------------------------------------------

        localStorage.setItem(
            "statusSinkron",
            "1"
        );

        document.getElementById(
            "btnSimpan"
        ).style.display = "none";

        document.getElementById(
            "btnUpdate"
        ).style.display = "";

        document.getElementById(
            "btnCetak"
        ).style.display = "";

        alert(
            "Surat kematian berhasil disimpan."
        );

    }

    catch(err){

        console.error(err);

        alert(
            "Terjadi kesalahan : " +
            err.message
        );

    }

    finally{

        hideLoading();

    }

}




/*======================================================
  UPDATE SURAT
======================================================*/

async function updateSurat(){

    if(!navigator.onLine){

        alert(
            "Update hanya dapat dilakukan saat online."
        );

        return;

    }

    showLoading();

    try{

        const response = await fetch(

            URL +

            "?aksi=updateKematian" +

            "&token=" + TOKEN +

            "&nomor=" +

            encodeURIComponent(
                localStorage.getItem("nomorAgenda")
            ) +

            "&harikematian=" +

            encodeURIComponent(
                localStorage.getItem("harikematian")
            ) +

            "&tanggalkematian=" +

            encodeURIComponent(
                localStorage.getItem("tanggalkematian")
            ) +

            "&tempatkematian=" +

            encodeURIComponent(
                localStorage.getItem("tempatkematian")
            ) +

            "&sebabkematian=" +

            encodeURIComponent(
                localStorage.getItem("sebabkematian")
            )

        );

        const hasil = await response.json();

        if(!hasil.status){

            alert(hasil.pesan);

            return;

        }

        alert(
            "Data berhasil diperbarui."
        );

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
  CETAK SURAT
======================================================*/

function cetakSurat(){

    const nomor = localStorage.getItem("nomorAgenda");

    if(!nomor){

        alert("Nomor agenda tidak ditemukan.");

        return;

    }

    window.open(

        "cetak_kematian.html?nomor=" +

        encodeURIComponent(nomor),

        "_blank"

    );

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

            "&nik=" + encodeURIComponent(localStorage.getItem("nik")) +

            "&jenis=" + encodeURIComponent("SURAT KEMATIAN")

        );

        const hasil = await response.json();

        console.log("HASIL AGENDA :", hasil);

        if(!hasil.status){

            alert(hasil.pesan);

            return false;

        }

        localStorage.setItem(
            "nomorAgenda",
            hasil.nomor
        );

        localStorage.setItem(
            "kodeVerifikasi",
            hasil.kodeVerifikasi
        );

        return true;

    }

    catch(err){

        console.error(err);

        alert(err.message);

        return false;

    }

}


/*======================================================
  PINDAH KE SHEET KEMATIAN
======================================================*/

async function pindahKeKematian(){

    try{

        const response = await fetch(

            URL +

            "?aksi=pindahKeKematian" +

            "&token=" + TOKEN +

            "&nik=" +

            encodeURIComponent(
                localStorage.getItem("nik")
            ) +

            "&nomor=" +

            encodeURIComponent(
                localStorage.getItem("nomorAgenda")
            ) +

            "&harikematian=" +

            encodeURIComponent(
                localStorage.getItem("harikematian")
            ) +

            "&tanggalkematian=" +

            encodeURIComponent(
                localStorage.getItem("tanggalkematian")
            ) +

            "&tempatkematian=" +

            encodeURIComponent(
                localStorage.getItem("tempatkematian")
            ) +

            "&sebabkematian=" +

            encodeURIComponent(
                localStorage.getItem("sebabkematian")
            )

        );

        const hasil = (await response.text()).trim();

        console.log("PINDAH KE KEMATIAN :", hasil);

        if(
            hasil.toUpperCase().indexOf("BERHASIL") >= 0
        ){

            return true;

        }

        alert(hasil);

        return false;

    }

    catch(err){

        console.error(err);

        alert(err.message);

        return false;

    }

}

/*======================================================
  UPDATE
======================================================*/

async function updateKematian(){

    try{

        const response = await fetch(

            URL +

            "?aksi=updatekematian" +

            "&token=" + TOKEN +

            "&nomor=" + encodeURIComponent(localStorage.getItem("nomorAgenda")) +

            "&harikematian=" + encodeURIComponent(localStorage.getItem("harikematian")) +

            "&tanggalkematian=" + encodeURIComponent(localStorage.getItem("tanggalkematian")) +

            "&tempatkematian=" + encodeURIComponent(localStorage.getItem("tempatkematian")) +

            "&sebabkematian=" + encodeURIComponent(localStorage.getItem("sebabkematian"))

        );

        const hasil = await response.text();

        if(hasil != "SUKSES"){

            alert(hasil);

            return false;

        }

        return true;

    }

    catch(err){

        alert(err.message);

        return false;

    }

}

/*======================================================
  STATUS TOMBOL
======================================================*/

function statusTombol(){

    const nomorAgenda = localStorage.getItem("nomorAgenda");

    if(nomorAgenda == null || nomorAgenda == ""){

        document.getElementById("btnSimpan").style.display = "";

        document.getElementById("btnUpdate").style.display = "none";

        document.getElementById("btnCetak").style.display = "none";

    }

    else{

        document.getElementById("btnSimpan").style.display = "none";

        document.getElementById("btnUpdate").style.display = "";

        document.getElementById("btnCetak").style.display = "";

    }

}

/*======================================================
  FORMAT TANGGAL
======================================================*/

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

    const tgl = new Date(tanggal);

    return (

        tgl.getDate() +

        " " +

        bulan[tgl.getMonth()] +

        " " +

        tgl.getFullYear()

    );

}


/*======================================================
  TANGGAL SURAT
======================================================*/

function tampilTanggalSurat(){

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

    const tgl = new Date();

    document.getElementById("tanggalSurat").innerHTML =

        "Selopanggung, " +

        tgl.getDate() +

        " " +

        bulan[tgl.getMonth()] +

        " " +

        tgl.getFullYear();

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

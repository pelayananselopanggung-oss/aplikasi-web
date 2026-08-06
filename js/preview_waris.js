/*======================================================
SAAT HALAMAN DIBUKA
======================================================*/

window.onload = function(){

    cekLogin();

    tampilkanData();

    setMode();

    eventMenu();

    // Load tanda tangan di background
    loadTandaTangan();

}


/*======================================================
CEK LOGIN
======================================================*/

function cekLogin(){

    if(!localStorage.getItem("username")){

        window.location.href =
            "index.html";

    }

}


/*======================================================
SURAT BARU
======================================================*/

function suratBaru(){

    return localStorage.getItem("modeSurat") == "BARU";

}


/*======================================================
MODE
======================================================*/

function setMode(){

    const btnSimpan =
        document.getElementById("btnSimpan");

    const btnUpdate =
        document.getElementById("btnUpdate");

    const btnCetak =
        document.getElementById("btnCetak");

    if(suratBaru()){

        //--------------------------------------------------
        // SURAT BARU
        //--------------------------------------------------

        btnSimpan.style.display = "";

        btnUpdate.style.display = "none";

        btnCetak.style.display = "none";

    }

    else{

        //--------------------------------------------------
        // MODE EDIT
        //--------------------------------------------------

        btnSimpan.style.display = "none";

        btnUpdate.style.display = "";

        btnCetak.style.display = "";

    }

}

/*======================================================
LOADING
======================================================*/

function showLoading(){

    document.getElementById("loading").style.display =
        "flex";

}


function hideLoading(){

    document.getElementById("loading").style.display =
        "none";

}


/*======================================================
EVENT
======================================================*/

function eventMenu(){

    document.getElementById("btnEdit").onclick =
        editSurat;

    document.getElementById("btnSimpan").onclick =
        simpanSurat;

    document.getElementById("btnUpdate").onclick =
        updateSurat;

    document.getElementById("btnCetak").onclick =
        cetakSurat;

}

/*======================================================
TAMPILKAN DATA
======================================================*/

function tampilkanData(){

//--------------------------------------------------
// NOMOR SURAT
//--------------------------------------------------

const nomorSuratFooter =
    document.getElementById("nomorSuratFooter");

if(nomorSuratFooter){

    if(suratBaru()){

        nomorSuratFooter.innerHTML =

            "590/......./418.60.04/" +

            new Date().getFullYear();

    }

    else{

        nomorSuratFooter.innerHTML =

            "590/" +

            (localStorage.getItem("nomorAgenda") || ".......") +

            "/418.60.04/" +

            new Date().getFullYear();

    }

}

    //--------------------------------------------------
    // PEWARIS
    //--------------------------------------------------

    const namaPewaris =
        localStorage.getItem("waris_nama") || "";

    const pasangan =
        localStorage.getItem("waris_pasangan") || "";

    const tanggalMeninggal =
        localStorage.getItem("waris_tanggalMeninggal") || "";

    const statusPasangan =
        localStorage.getItem("waris_statusPasangan") || "";

    const tahunMeninggal =
        localStorage.getItem("waris_tahunMeninggal") || "";

    const ahliWaris = JSON.parse(

        localStorage.getItem("waris_ahliwaris") ||

        "[]"

    );


    document.getElementById("namaPewaris").innerHTML =
        namaPewaris;

    document.getElementById("namaPewaris2").innerHTML =
        namaPewaris;

    document.getElementById("namaPewaris3").innerHTML =
        namaPewaris;

    document.getElementById("namaPewaris4").innerHTML =
        namaPewaris;

    document.getElementById("tanggalMeninggal").innerHTML =

    formatTanggal(tanggalMeninggal);

    document.getElementById("namaPasangan").innerHTML =
        pasangan;

    //--------------------------------------------------
    // STATUS PASANGAN
    //--------------------------------------------------

    if(statusPasangan=="HIDUP"){

        document.getElementById("kalimatPasangan").innerHTML =

            "yang kini masih hidup";

    }

    else{

        document.getElementById("kalimatPasangan").innerHTML =

            "yang telah meninggal dunia pada tahun " +

            tahunMeninggal;

    }

    //--------------------------------------------------
    // JUMLAH AHLI WARIS
    //--------------------------------------------------

    document.getElementById("jumlahAhliWaris").innerHTML =

        ahliWaris.length;

    //--------------------------------------------------
    // HARTA
    //--------------------------------------------------

    document.getElementById("hartaWarisan").innerHTML =

    "<strong>" +

    localStorage.getItem("waris_harta") +

    "</strong>" +

    "<br><br>dengan nomor atau identitas harta warisan :<br>" +

    "<strong>" +

    localStorage.getItem("waris_identitas") +

    "</strong>";

    //--------------------------------------------------
    // SAKSI 1
    //--------------------------------------------------

    document.getElementById("namaSaksi1").innerHTML =
        localStorage.getItem("waris_saksi1_nama");

    document.getElementById("umurSaksi1").innerHTML =
        localStorage.getItem("waris_saksi1_umur");

    document.getElementById("pekerjaanSaksi1").innerHTML =
        localStorage.getItem("waris_saksi1_pekerjaan");

    document.getElementById("alamatSaksi1").innerHTML =
        localStorage.getItem("waris_saksi1_alamat");

    //--------------------------------------------------
    // SAKSI 2
    //--------------------------------------------------

    document.getElementById("namaSaksi2").innerHTML =
        localStorage.getItem("waris_saksi2_nama");

    document.getElementById("umurSaksi2").innerHTML =
        localStorage.getItem("waris_saksi2_umur");

    document.getElementById("pekerjaanSaksi2").innerHTML =
        localStorage.getItem("waris_saksi2_pekerjaan");

    document.getElementById("alamatSaksi2").innerHTML =
        localStorage.getItem("waris_saksi2_alamat");

    //--------------------------------------------------
    // AHLI WARIS
    //--------------------------------------------------

    tampilAhliWaris();

    tampilTTDAhliWaris();

}


/*======================================================
TAMPIL TTD AHLI WARIS
======================================================*/

function tampilTTDAhliWaris(){

    const div =
        document.getElementById("ttdAhliWaris");

    if(!div){

        return;

    }

    div.innerHTML = "";

    const data = JSON.parse(

        localStorage.getItem("waris_ahliwaris") ||

        "[]"

    );

    data.forEach(function(item,index){

        div.innerHTML += `

            <div class="item-ahli-waris d-flex align-items-center mb-4">

                <div style="width:35px;">

                    ${index+1}.

                </div>

                <div style="width:220px;font-weight:bold;">

                    ${item.nama}

                </div>

                <div>

                    (.....................)

                </div>

            </div>

        `;

    });

}

/*======================================================
TAMPIL AHLI WARIS
======================================================*/

function tampilAhliWaris(){

    const tbody1 =
        document.getElementById("bodyAhliWaris");

    const tbody2 =
        document.getElementById("bodyAhliWaris2");

    if(!tbody1 || !tbody2){

        return;

    }

    tbody1.innerHTML = "";

    tbody2.innerHTML = "";

    const data = JSON.parse(

        localStorage.getItem("waris_ahliwaris") ||

        "[]"

    );

    data.forEach(function(item,index){

        const baris = `

            <tr>

                <td class="text-center">

                    ${index + 1}

                </td>

                <td>

                    ${item.nama}

                </td>

                <td>

                    ${item.nik}

                </td>

                <td>

                    ${item.ttl}

                </td>

                <td>

                    ${item.alamat}

                </td>

            </tr>

        `;

        tbody1.innerHTML += baris;

        tbody2.innerHTML += baris;

    });

}

/*======================================================
EDIT SURAT
======================================================*/

function editSurat(){

    window.location.href =
        "waris_tanah.html";

}




/*======================================================
SIMPAN SURAT
======================================================*/

async function simpanSurat(){

    if(!navigator.onLine){

        alert("Tidak ada koneksi internet.");

        return;

    }

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
            encodeURIComponent(localStorage.getItem("waris_nik")) +

            "&nama=" +
            encodeURIComponent(localStorage.getItem("waris_nama")) +

            "&jenis=" +
            encodeURIComponent("SURAT KETERANGAN AHLI WARIS")

        );

        const agenda =
            await responseAgenda.json();

        if(!agenda.status){

            alert(agenda.pesan);

            return;

        }

        //--------------------------------------------------
        // SIMPAN NOMOR AGENDA
        //--------------------------------------------------

        localStorage.setItem(
            "nomorAgenda",
            agenda.nomor
        );

        localStorage.setItem(
            "kodeVerifikasi",
            agenda.kodeVerifikasi
        );

        //--------------------------------------------------
        // SIMPAN SURAT AHLI WARIS
        //--------------------------------------------------

        const response = await fetch(

            URL +

            "?aksi=simpanAhliWaris" +

            "&token=" + TOKEN +

            "&nomor=" +
            encodeURIComponent(localStorage.getItem("nomorAgenda")) +

            "&nik=" +
            encodeURIComponent(localStorage.getItem("waris_nik")) +

            "&nama=" +
            encodeURIComponent(localStorage.getItem("waris_nama")) +

            "&tanggalMeninggal=" +
            encodeURIComponent(localStorage.getItem("waris_tanggalMeninggal")) +

            "&pasangan=" +
            encodeURIComponent(localStorage.getItem("waris_pasangan")) +

            "&statusPasangan=" +
            encodeURIComponent(localStorage.getItem("waris_statusPasangan")) +

            "&tahunMeninggal=" +
            encodeURIComponent(localStorage.getItem("waris_tahunMeninggal")) +

            "&hartaWarisan=" +
            encodeURIComponent(localStorage.getItem("waris_harta")) +

            "&identitasWarisan=" +
            encodeURIComponent(localStorage.getItem("waris_identitas")) +

            "&namaSaksi1=" +
            encodeURIComponent(localStorage.getItem("waris_saksi1_nama")) +

            "&umurSaksi1=" +
            encodeURIComponent(localStorage.getItem("waris_saksi1_umur")) +

            "&pekerjaanSaksi1=" +
            encodeURIComponent(localStorage.getItem("waris_saksi1_pekerjaan")) +

            "&alamatSaksi1=" +
            encodeURIComponent(localStorage.getItem("waris_saksi1_alamat")) +

            "&namaSaksi2=" +
            encodeURIComponent(localStorage.getItem("waris_saksi2_nama")) +

            "&umurSaksi2=" +
            encodeURIComponent(localStorage.getItem("waris_saksi2_umur")) +

            "&pekerjaanSaksi2=" +
            encodeURIComponent(localStorage.getItem("waris_saksi2_pekerjaan")) +

            "&alamatSaksi2=" +
            encodeURIComponent(localStorage.getItem("waris_saksi2_alamat")) +

            "&detail=" +
            encodeURIComponent(localStorage.getItem("waris_ahliwaris"))

        );

        const hasil =
            await response.json();

        if(!hasil.status){

            alert(hasil.pesan);

            return;

        }

        //--------------------------------------------------
        // MODE EDIT
        //--------------------------------------------------

        localStorage.setItem(
            "modeSurat",
            "EDIT"
        );

        //--------------------------------------------------
        // REFRESH PREVIEW
        //--------------------------------------------------

        tampilkanData();

        setMode();

        alert("Data berhasil disimpan.");

    }

    catch(err){

        alert(err.message);

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

        alert("Tidak ada koneksi internet.");

        return;

    }

    showLoading();

    try{

        //--------------------------------------------------
        // UPDATE AGENDA
        //--------------------------------------------------

        let response = await fetch(

    URL +

    "?aksi=updateagenda" +

    "&token=" + TOKEN +

    "&nomor=" + encodeURIComponent(localStorage.getItem("nomorAgenda")) +

    "&nik=" + encodeURIComponent(localStorage.getItem("waris_nik")) +

    "&nama=" + encodeURIComponent(localStorage.getItem("waris_nama")) +

    "&jenis=" + encodeURIComponent("SURAT KETERANGAN AHLI WARIS")

);

let hasil = await response.json();

if(!hasil.status){

    alert(hasil.pesan);

    return;

}

        //--------------------------------------------------
        // UPDATE AHLI WARIS
        //--------------------------------------------------

        response = await fetch(

            URL +

            "?aksi=updateAhliWaris" +

            "&token=" + TOKEN +

            "&nomor=" + encodeURIComponent(localStorage.getItem("nomorAgenda")) +

            "&nik=" + encodeURIComponent(localStorage.getItem("waris_nik")) +

            "&nama=" + encodeURIComponent(localStorage.getItem("waris_nama")) +

            "&tanggalMeninggal=" + encodeURIComponent(localStorage.getItem("waris_tanggalMeninggal")) +

            "&pasangan=" + encodeURIComponent(localStorage.getItem("waris_pasangan")) +

            "&statusPasangan=" + encodeURIComponent(localStorage.getItem("waris_statusPasangan")) +

            "&tahunMeninggal=" + encodeURIComponent(localStorage.getItem("waris_tahunMeninggal")) +

            "&hartaWarisan=" + encodeURIComponent(localStorage.getItem("waris_harta")) +

            "&identitasWarisan=" + encodeURIComponent(localStorage.getItem("waris_identitas")) +

            "&namaSaksi1=" + encodeURIComponent(localStorage.getItem("waris_saksi1_nama")) +

            "&umurSaksi1=" + encodeURIComponent(localStorage.getItem("waris_saksi1_umur")) +

            "&pekerjaanSaksi1=" + encodeURIComponent(localStorage.getItem("waris_saksi1_pekerjaan")) +

            "&alamatSaksi1=" + encodeURIComponent(localStorage.getItem("waris_saksi1_alamat")) +

            "&namaSaksi2=" + encodeURIComponent(localStorage.getItem("waris_saksi2_nama")) +

            "&umurSaksi2=" + encodeURIComponent(localStorage.getItem("waris_saksi2_umur")) +

            "&pekerjaanSaksi2=" + encodeURIComponent(localStorage.getItem("waris_saksi2_pekerjaan")) +

            "&alamatSaksi2=" + encodeURIComponent(localStorage.getItem("waris_saksi2_alamat")) +

            "&detail=" + encodeURIComponent(localStorage.getItem("waris_ahliwaris"))

        );

        hasil = await response.json();

        if(!hasil.status){

            alert(hasil.pesan);

            return;

        }

        alert("Data berhasil diperbarui.");

    }

    catch(err){

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

    window.open(

        "cetak_waris.html",

        "_blank"

    );

}




//--------------------------------------------------
// TANGGAL SURAT
//--------------------------------------------------

document.getElementById("tanggalSurat").innerHTML =

    tanggalIndonesia(new Date());

/*======================================================
FORMAT TANGGAL INDONESIA
======================================================*/

function formatTanggal(tanggal){

    if(!tanggal){

        return "";

    }

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

    if(isNaN(tgl)){

        return tanggal;

    }

    return (

        tgl.getDate() +

        " " +

        bulan[tgl.getMonth()] +

        " " +

        tgl.getFullYear()

    );

}


/*======================================================
KEMBALI
======================================================*/

function kembali(){

    window.location.href =
        "waris_tanah.html";

}


/*======================================================
TAMPILKAN TOMBOL
======================================================*/

function tampilkanTombol(){

    const nomor =
        localStorage.getItem("nomorAgenda");

    if(nomor==null || nomor==""){

        document.getElementById("btnUpdate").style.display =
            "none";

       
    }

    else{

        document.getElementById("btnSimpan").style.display =
            "none";

    }

}



/*======================================================
LOAD TANDA TANGAN
======================================================*/

async function loadTandaTangan(){

    //--------------------------------------------------
    // TAMPILKAN DATA CACHE DULU
    //--------------------------------------------------

    const cache = localStorage.getItem("tandaTangan");

    if(cache){

        tampilTandaTangan(
            JSON.parse(cache)
        );

    }

    //--------------------------------------------------
    // UPDATE DARI SERVER
    //--------------------------------------------------

    try{

        const ttd = await getTandaTangan();

        if(!ttd){

            return;

        }

        localStorage.setItem(

            "tandaTangan",

            JSON.stringify(ttd)

        );

        tampilTandaTangan(ttd);

    }

    catch(err){

        console.log(err);

    }

}


/*======================================================
TAMPILKAN TANDA TANGAN
======================================================*/

function tampilTandaTangan(ttd){

    const jabatan =
        document.getElementById("jabatanTtd");

    const nama =
        document.getElementById("namaPejabat");

    const nip =
        document.getElementById("nipPejabat");

    if(!jabatan || !nama || !nip){

        return;

    }

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
/*======================================================
VARIABEL GLOBAL
======================================================*/

let daftarAhliWaris = [];

let indexEdit = -1;

let modeSurat = "baru";


/*======================================================
SAAT HALAMAN DIBUKA
======================================================*/

window.onload = async function(){

    cekLogin();

    tampilOperator();

    loadLocalStorage();

    eventMenu();

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
GET PENDUDUK
======================================================*/

async function getPenduduk(nik){

    try{

        const response = await fetch(

            URL +
            "?aksi=getpendudukJson" +
            "&token=" + TOKEN +
            "&nik=" + encodeURIComponent(nik)

        );

        const hasil = await response.json();

        if(!hasil.status){

            alert("Data penduduk tidak ditemukan.");

            return null;

        }

        return hasil.data;

    }

    catch(err){

        alert(err.message);

        return null;

    }

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
TAMPILKAN OPERATOR
======================================================*/

function tampilOperator(){

    document.getElementById("namaOperator").innerHTML =
        localStorage.getItem("username");

}


/*======================================================
EVENT
======================================================*/

function eventMenu(){

    document.getElementById("btnCari").onclick =
        cariPewaris;

    document.getElementById("cariAhliWaris").onclick =
        cariAhliWaris;

    document.getElementById("tambahAhliWaris").onclick =
        tambahAhliWaris;

    document.getElementById("btnPreview").onclick =
        previewSurat;

    document.getElementById("btnKembali").onclick =
        kembali;

}


/*======================================================
STATUS PASANGAN
======================================================*/

function eventStatusPasangan(){

    document.getElementById("statusHidup").onchange =
        tampilStatusPasangan;

    document.getElementById("statusMeninggal").onchange =
        tampilStatusPasangan;

    tampilStatusPasangan();

}


function tampilStatusPasangan(){

    document.getElementById("panelTahunMeninggal").style.display =

        document.getElementById("statusMeninggal").checked ?

        "flex"

        :

        "none";

}


/*======================================================
KEMBALI
======================================================*/

function kembali(){

    window.location.href =
        "pertanahan.html";

}

/*======================================================
CARI PEWARIS
======================================================*/

async function cariPewaris(){

    if(navigator.onLine){

        await cariPewarisOnline();

    }

    else{

        await cariPewarisOffline();

    }

}


/*======================================================
CARI PEWARIS ONLINE
======================================================*/

async function cariPewarisOnline(){

    const nik =
        document.getElementById("nik").value.trim();

    if(nik==""){

        alert("NIK Pewaris masih kosong.");

        return;

    }

    showLoading();

    try{

        const data =
            await getPenduduk(nik);

        if(data==null){

            return;

        }

        isiDataPewaris(data);

    }

    catch(err){

        alert(err.message);

    }

    finally{

        hideLoading();

    }

}


/*======================================================
CARI PEWARIS OFFLINE
======================================================*/

async function cariPewarisOffline(){

    const nik =
        document.getElementById("nik").value.trim();

    if(nik==""){

        alert("NIK Pewaris masih kosong.");

        return;

    }

    showLoading();

    try{

        const data =
            await getPendudukOffline(nik);

        if(data==null){

            alert("Data tidak ditemukan.");

            return;

        }

        isiDataPewaris(data);

    }

    catch(err){

        alert(err.message);

    }

    finally{

        hideLoading();

    }

}


/*======================================================
ISI DATA PEWARIS
======================================================*/

function isiDataPewaris(data){

    document.getElementById("nama").value =
        data.nama;

}

/*======================================================
CARI AHLI WARIS
======================================================*/

async function cariAhliWaris(){

    if(navigator.onLine){

        await cariAhliWarisOnline();

    }

    else{

        await cariAhliWarisOffline();

    }

}


/*======================================================
CARI AHLI WARIS ONLINE
======================================================*/

async function cariAhliWarisOnline(){

    const nik =
        document.getElementById("nikAhliWaris").value.trim();

    if(nik==""){

        alert("NIK Ahli Waris masih kosong.");

        return;

    }

    showLoading();

    try{

        const data =
            await getPenduduk(nik);

        if(data==null){

            return;

        }

        isiDataAhliWaris(data);

    }

    catch(err){

        alert(err.message);

    }

    finally{

        hideLoading();

    }

}


/*======================================================
CARI AHLI WARIS OFFLINE
======================================================*/

async function cariAhliWarisOffline(){

    const nik =
        document.getElementById("nikAhliWaris").value.trim();

    if(nik==""){

        alert("NIK Ahli Waris masih kosong.");

        return;

    }

    showLoading();

    try{

        const data =
            await getPendudukOffline(nik);

        if(data==null){

            alert("Data tidak ditemukan.");

            return;

        }

        isiDataAhliWaris(data);

    }

    catch(err){

        alert(err.message);

    }

    finally{

        hideLoading();

    }

}


/*======================================================
ISI DATA AHLI WARIS
======================================================*/

function isiDataAhliWaris(data){

    document.getElementById("namaAhliWaris").value =
        data.nama;

    document.getElementById("ttlAhliWaris").value =

    formatTTL(

        data.tempatlahir,

        data.tanggallahir

    );

    document.getElementById("alamatAhliWaris").value =
        data.alamat +
        " RT " + data.rt +
        " RW " + data.rw +
        " Desa " + data.desa;

}

/*======================================================
TAMBAH AHLI WARIS
======================================================*/

function tambahAhliWaris(){

    const nama =
        document.getElementById("namaAhliWaris").value.trim();

    const nik =
        document.getElementById("nikAhliWaris").value.trim();

    const ttl =
        document.getElementById("ttlAhliWaris").value.trim();

    const alamat =
        document.getElementById("alamatAhliWaris").value.trim();

    if(nama==""){

        alert("Nama Ahli Waris masih kosong.");

        return;

    }

    const data = {

        nama : nama,

        nik : nik,

        ttl : ttl,

        alamat : alamat

    };

    if(indexEdit==-1){

        daftarAhliWaris.push(data);

    }

    else{

        daftarAhliWaris[indexEdit] = data;

        indexEdit = -1;

    }

    renderAhliWaris();

    resetAhliWaris();

}


/*======================================================
RENDER AHLI WARIS
======================================================*/

function renderAhliWaris(){

    const tbody =
        document.getElementById("bodyAhliWaris");

    if(!tbody){

        return;

    }

    tbody.innerHTML = "";

    //--------------------------------------------------
    // BELUM ADA DATA
    //--------------------------------------------------

    if(daftarAhliWaris.length==0){

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="text-center text-muted">

                    Belum ada data ahli waris.

                </td>

            </tr>

        `;

    }

    //--------------------------------------------------
    // ADA DATA
    //--------------------------------------------------

    else{

        daftarAhliWaris.forEach(function(item,index){

            tbody.innerHTML += `

                <tr>

                    <td class="text-center">

                        ${index+1}

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

                    <td class="text-center">

                        <button
                            class="btn btn-warning btn-sm me-1"
                            onclick="editAhliWaris(${index})">

                            <i class="fa fa-edit"></i>

                        </button>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="hapusAhliWaris(${index})">

                            <i class="fa fa-trash"></i>

                        </button>

                    </td>

                </tr>

            `;

        });

    }

    //--------------------------------------------------
    // JUMLAH AHLI WARIS
    //--------------------------------------------------

    const jumlah =
        document.getElementById("jumlahAhliWaris");

    if(jumlah){

        jumlah.innerHTML =
            daftarAhliWaris.length + " Orang";

    }

}

/*======================================================
EDIT AHLI WARIS
======================================================*/

function editAhliWaris(index){

    indexEdit = index;

    const data =
        daftarAhliWaris[index];

    document.getElementById("namaAhliWaris").value =
        data.nama;

    document.getElementById("nikAhliWaris").value =
        data.nik;

    document.getElementById("ttlAhliWaris").value =
        data.ttl;

    document.getElementById("alamatAhliWaris").value =
        data.alamat;

}


/*======================================================
HAPUS AHLI WARIS
======================================================*/

function hapusAhliWaris(index){

    if(!confirm("Hapus ahli waris ini?")){

        return;

    }

    daftarAhliWaris.splice(index,1);

    renderAhliWaris();

}


/*======================================================
RESET INPUT AHLI WARIS
======================================================*/

function resetAhliWaris(){

    document.getElementById("nikAhliWaris").value = "";

    document.getElementById("namaAhliWaris").value = "";

    document.getElementById("ttlAhliWaris").value = "";

    document.getElementById("alamatAhliWaris").value = "";

    document.getElementById("nikAhliWaris").focus();

}

/*======================================================
VALIDASI
======================================================*/

function validasi(){

    if(document.getElementById("nama").value.trim()==""){

        alert("Nama Pewaris masih kosong.");

        return false;

    }

    if(daftarAhliWaris.length==0){

        alert("Data Ahli Waris masih kosong.");

        return false;

    }

    if(document.getElementById("hartaWarisan").value.trim()==""){

        alert("Harta Warisan masih kosong.");

        return false;

    }

    if(document.getElementById("namaSaksi1").value.trim()==""){

        alert("Nama Saksi 1 masih kosong.");

        return false;

    }

    if(document.getElementById("namaSaksi2").value.trim()==""){

        alert("Nama Saksi 2 masih kosong.");

        return false;

    }

    return true;

}


/*======================================================
SIMPAN LOCAL STORAGE
======================================================*/

function simpanLocalStorage(){

    localStorage.setItem(

        "waris_nik",

        document.getElementById("nik").value

    );

    localStorage.setItem(

        "waris_nama",

        document.getElementById("nama").value

    );

    localStorage.setItem(

        "waris_tanggalMeninggal",

        document.getElementById("tanggalMeninggal").value

    );

    localStorage.setItem(

        "waris_pasangan",

        document.getElementById("pasangan").value

    );

    localStorage.setItem(

        "waris_statusPasangan",

        document.getElementById("statusHidup").checked ?

        "HIDUP"

        :

        "MENINGGAL"

    );

    localStorage.setItem(

        "waris_tahunMeninggal",

        document.getElementById("tahunMeninggal").value

    );

    localStorage.setItem(

        "waris_harta",

        document.getElementById("hartaWarisan").value

    );

    localStorage.setItem(

        "waris_identitas",

        document.getElementById("identitasWarisan").value

    );

    localStorage.setItem(

        "waris_saksi1_nama",

        document.getElementById("namaSaksi1").value

    );

    localStorage.setItem(

        "waris_saksi1_umur",

        document.getElementById("umurSaksi1").value

    );

    localStorage.setItem(

        "waris_saksi1_pekerjaan",

        document.getElementById("pekerjaanSaksi1").value

    );

    localStorage.setItem(

        "waris_saksi1_alamat",

        document.getElementById("alamatSaksi1").value

    );

    localStorage.setItem(

        "waris_saksi2_nama",

        document.getElementById("namaSaksi2").value

    );

    localStorage.setItem(

        "waris_saksi2_umur",

        document.getElementById("umurSaksi2").value

    );

    localStorage.setItem(

        "waris_saksi2_pekerjaan",

        document.getElementById("pekerjaanSaksi2").value

    );

    localStorage.setItem(

        "waris_saksi2_alamat",

        document.getElementById("alamatSaksi2").value

    );

    localStorage.setItem(

        "waris_ahliwaris",

        JSON.stringify(daftarAhliWaris)

    );

}


/*======================================================
LOAD LOCAL STORAGE
======================================================*/

function loadLocalStorage(){

    

    document.getElementById("nik").value =
        localStorage.getItem("waris_nik") || "";

    document.getElementById("nama").value =
        localStorage.getItem("waris_nama") || "";

    document.getElementById("tanggalMeninggal").value =
        localStorage.getItem("waris_tanggalMeninggal") || "";

    document.getElementById("pasangan").value =
        localStorage.getItem("waris_pasangan") || "";

    //--------------------------------------------------
    // STATUS PASANGAN
    //--------------------------------------------------

    const status =
        localStorage.getItem("waris_statusPasangan");

    if(status=="MENINGGAL"){

        document.getElementById("statusMeninggal").checked =
            true;

        document.getElementById("panelTahunMeninggal").style.display =
            "flex";

    }

    else{

        document.getElementById("statusHidup").checked =
            true;

        document.getElementById("panelTahunMeninggal").style.display =
            "none";

    }

    document.getElementById("tahunMeninggal").value =
        localStorage.getItem("waris_tahunMeninggal") || "";

    //--------------------------------------------------
    // HARTA WARISAN
    //--------------------------------------------------

    document.getElementById("hartaWarisan").value =
        localStorage.getItem("waris_harta") || "";

    document.getElementById("identitasWarisan").value =
        localStorage.getItem("waris_identitas") || "";

    //--------------------------------------------------
    // SAKSI 1
    //--------------------------------------------------

    document.getElementById("namaSaksi1").value =
        localStorage.getItem("waris_saksi1_nama") || "";

    document.getElementById("umurSaksi1").value =
        localStorage.getItem("waris_saksi1_umur") || "";

    document.getElementById("pekerjaanSaksi1").value =
        localStorage.getItem("waris_saksi1_pekerjaan") || "";

    document.getElementById("alamatSaksi1").value =
        localStorage.getItem("waris_saksi1_alamat") || "";

    //--------------------------------------------------
    // SAKSI 2
    //--------------------------------------------------

    document.getElementById("namaSaksi2").value =
        localStorage.getItem("waris_saksi2_nama") || "";

    document.getElementById("umurSaksi2").value =
        localStorage.getItem("waris_saksi2_umur") || "";

    document.getElementById("pekerjaanSaksi2").value =
        localStorage.getItem("waris_saksi2_pekerjaan") || "";

    document.getElementById("alamatSaksi2").value =
        localStorage.getItem("waris_saksi2_alamat") || "";

    //--------------------------------------------------
    // AHLI WARIS
    //--------------------------------------------------

    daftarAhliWaris = JSON.parse(

        localStorage.getItem("waris_ahliwaris") || "[]"

    );

    renderAhliWaris();

}

/*======================================================
PREVIEW SURAT
======================================================*/

async function previewSurat(){

    if(!validasi()){

        return;

    }

    simpanLocalStorage();

    if(localStorage.getItem("nomorAgenda")){

        localStorage.setItem(
            "modeSurat",
            "EDIT"
        );

    }else{

        localStorage.setItem(
            "modeSurat",
            "BARU"
        );

    }

    window.location.href =
        "preview_waris.html";

} 

/*======================================================
SURAT BARU
======================================================*/

function suratBaru(){

    return(

        localStorage.getItem("nomorAgenda")==null ||

        localStorage.getItem("nomorAgenda")==""

    );

}




/*======================================================
UPDATE SURAT
======================================================*/

async function updateSurat(){

    simpanLocalStorage();

    window.location.href =
        "preview_waris.html";

}

/*======================================================
CLEAR DATA
======================================================*/

function clearData(){

    document.getElementById("nik").value = "";

    document.getElementById("nama").value = "";

    document.getElementById("tanggalMeninggal").value = "";

    document.getElementById("pasangan").value = "";

    document.getElementById("statusHidup").checked = true;

    document.getElementById("tahunMeninggal").value = "";

    document.getElementById("hartaWarisan").value = "";

    document.getElementById("identitasWarisan").value = "";

    document.getElementById("namaSaksi1").value = "";

    document.getElementById("umurSaksi1").value = "";

    document.getElementById("pekerjaanSaksi1").value = "";

    document.getElementById("alamatSaksi1").value = "";

    document.getElementById("namaSaksi2").value = "";

    document.getElementById("umurSaksi2").value = "";

    document.getElementById("pekerjaanSaksi2").value = "";

    document.getElementById("alamatSaksi2").value = "";

    daftarAhliWaris = [];

    indexEdit = -1;

    renderAhliWaris();

    tampilStatusPasangan();

}


/*======================================================
HAPUS LOCAL STORAGE
======================================================*/

function clearLocalStorage(){

    localStorage.removeItem("waris_nik");

    localStorage.removeItem("waris_nama");

    localStorage.removeItem("waris_tanggalMeninggal");

    localStorage.removeItem("waris_pasangan");

    localStorage.removeItem("waris_statusPasangan");

    localStorage.removeItem("waris_tahunMeninggal");

    localStorage.removeItem("waris_harta");

    localStorage.removeItem("waris_identitas");

    localStorage.removeItem("waris_saksi1_nama");

    localStorage.removeItem("waris_saksi1_umur");

    localStorage.removeItem("waris_saksi1_pekerjaan");

    localStorage.removeItem("waris_saksi1_alamat");

    localStorage.removeItem("waris_saksi2_nama");

    localStorage.removeItem("waris_saksi2_umur");

    localStorage.removeItem("waris_saksi2_pekerjaan");

    localStorage.removeItem("waris_saksi2_alamat");

    localStorage.removeItem("waris_ahliwaris");

}


/*======================================================
FORMAT TTL
======================================================*/

function formatTTL(tempat,tanggal){

    if(!tanggal){

        return tempat;

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

    const tgl=new Date(tanggal);

    return tempat.toUpperCase() + ", " +

        String(tgl.getDate()).padStart(2,"0") + " " +

        bulan[tgl.getMonth()] + " " +

        tgl.getFullYear();

}

/*======================================================
FORMAT TANGGAL INDONESIA
======================================================*/

function formatTanggal(tanggal){

    if(tanggal==""){

        return "";

    }

    return tanggalIndonesia(

        new Date(tanggal)

    );

}


/*======================================================
FORMAT TAHUN
======================================================*/

function tahun(tanggal){

    if(tanggal==""){

        return "";

    }

    return new Date(tanggal).getFullYear();

}


/*======================================================
ANGKA SAJA
======================================================*/

function hanyaAngka(evt){

    const kode = evt.which ? evt.which : evt.keyCode;

    if(

        kode > 31 &&

        (kode < 48 || kode > 57)

    ){

        evt.preventDefault();

    }

}


/*======================================================
ENTER PINDAH INPUT
======================================================*/

function enterPindah(event,id){

    if(event.key==="Enter"){

        event.preventDefault();

        document.getElementById(id).focus();

    }

}


/*======================================================
  LOAD HALAMAN
======================================================*/

/*======================================================
  LOAD HALAMAN
======================================================*/

document.addEventListener(

    "DOMContentLoaded",

    async function(){

        cekLogin();

        //--------------------------------------------------
        // EVENT TANGGAL KEMATIAN
        //--------------------------------------------------

        document
            .getElementById("tanggalkematian")
            .addEventListener(
                "change",
                isiHari
            );

        //--------------------------------------------------
        // MODE EDIT
        //--------------------------------------------------

        const mode =
            (localStorage.getItem("modeSurat") || "")
            .toLowerCase();

        if(mode == "edit"){

            await loadDataKematian();

        }

        //--------------------------------------------------
        // MODE BARU
        //--------------------------------------------------

        else{

            loadData();

        }

    }

);


/*======================================================
  LOAD DATA KEMATIAN
======================================================*/

async function loadDataKematian(){

    try{

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

        const d = hasil.data;

        //--------------------------------------------------
        // IDENTITAS
        //--------------------------------------------------

        document.getElementById("nik").value          = d.nik;
        document.getElementById("nama").value         = d.nama;
        document.getElementById("tempatlahir").value  = d.tempatlahir;
        document.getElementById("tanggallahir").value = d.tanggallahir;
        document.getElementById("jk").value           = d.jk;
        document.getElementById("agama").value        = d.agama;
        document.getElementById("pekerjaan").value    = d.pekerjaan;
        document.getElementById("sp").value           = d.sp;

        document.getElementById("alamat").value     = d.alamat;
        document.getElementById("rt").value         = d.rt;
        document.getElementById("rw").value         = d.rw;
        document.getElementById("desa").value       = d.desa;
        document.getElementById("kecamatan").value  = d.kecamatan;
        document.getElementById("kabupaten").value  = d.kabupaten;
        document.getElementById("provinsi").value   = d.provinsi;

        //--------------------------------------------------
        // DATA KEMATIAN
        //--------------------------------------------------

        document.getElementById("tanggalkematian").value =
            d.tanggalkematian;

        document.getElementById("tempatkematian").value =
            d.tempatkematian;

        document.getElementById("sebabkematian").value =
            d.sebabkematian;

        //--------------------------------------------------
        // ISI HARI OTOMATIS
        //--------------------------------------------------

        isiHari();

    }

    catch(err){

        console.error(err);

        alert(err.message);

    }

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
  AMBIL DATA DARI LOCAL STORAGE
======================================================*/

function nilai(id){

    return localStorage.getItem(id) || "";

}

function loadData(){

    document.getElementById("nik").value          = nilai("nik");
    document.getElementById("nama").value         = nilai("nama");
    document.getElementById("tempatlahir").value  = nilai("tempatlahir");
    document.getElementById("tanggallahir").value = nilai("tanggallahir");
    document.getElementById("jk").value           = nilai("jk");
    document.getElementById("agama").value        = nilai("agama");
    document.getElementById("pekerjaan").value    = nilai("pekerjaan");
    document.getElementById("sp").value           = nilai("sp");

    document.getElementById("alamat").value =
        nilai("alamat");

    document.getElementById("rt").value         = nilai("rt");
    document.getElementById("rw").value         = nilai("rw");
    document.getElementById("desa").value       = nilai("desa");
    document.getElementById("kecamatan").value  = nilai("kecamatan");
    document.getElementById("kabupaten").value  = nilai("kabupaten");
    document.getElementById("provinsi").value   = nilai("provinsi");

}


/*======================================================
  TANGGAL -> HARI & UMUR
======================================================*/

function isiHari(){

    const tanggalKematian =
        document.getElementById("tanggalkematian").value;

    if(tanggalKematian == ""){

        document.getElementById("harikematian").value = "";

        return;

    }

    const namaHari = [

        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu"

    ];

    const tglMeninggal =
        new Date(tanggalKematian);

    document.getElementById("harikematian").value =

        namaHari[tglMeninggal.getDay()];

}
    


/*======================================================
  VALIDASI
======================================================*/

function validasiForm(){

    if(document.getElementById("tanggalkematian").value == ""){

        alert("Tanggal kematian belum diisi.");

        document.getElementById("tanggalkematian").focus();

        return false;

    }

    if(document.getElementById("tempatkematian").value.trim() == ""){

        alert("Tempat kematian belum diisi.");

        document.getElementById("tempatkematian").focus();

        return false;

    }

    if(document.getElementById("sebabkematian").value.trim() == ""){

        alert("Sebab kematian belum diisi.");

        document.getElementById("sebabkematian").focus();

        return false;

    }

    return true;

}

/*======================================================
  PREVIEW
======================================================*/

function previewSurat(){

    if(!validasiForm()) return;

    //--------------------------------------------------
    // DATA KEMATIAN
    //--------------------------------------------------

    localStorage.setItem(

        "harikematian",

        document.getElementById("harikematian").value

    );

    localStorage.setItem(

        "tanggalkematian",

        document.getElementById("tanggalkematian").value

    );

    localStorage.setItem(

        "tempatkematian",

        document.getElementById("tempatkematian").value.trim()

    );

    localStorage.setItem(

        "sebabkematian",

        document.getElementById("sebabkematian").value.trim()

    );

    //--------------------------------------------------
    // MENUJU PREVIEW
    //--------------------------------------------------

    window.location.href =
        "preview_kematian.html";

}

/*======================================================
  KEMBALI
======================================================*/

function kembali(){

    window.location.href =
        "jenissurat.html";

}


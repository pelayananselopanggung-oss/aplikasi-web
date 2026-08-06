/*======================================================
  SKTM SISWA
======================================================*/

let dataAnak = [];
let dataAyah = [];
let dataIbu = [];

/*======================================================
  LOAD
======================================================*/

document.addEventListener("DOMContentLoaded", async function(){

    cekLogin();
    cekAksesDashboard();

    loadDataSiswa();

    //--------------------------------------------------
    // MODE PREVIEW
    //--------------------------------------------------

    if(localStorage.getItem("modePreview")=="1"){

        loadLocalStorage();

        //--------------------------------------------------
        // EDIT DARI HISTORY
        //--------------------------------------------------

        if(localStorage.getItem("modeSurat")=="edit"){

            await getDataOrtu();

        }

        //--------------------------------------------------
        // KEMBALI DARI PREVIEW
        //--------------------------------------------------

        else{

            dataAyah = JSON.parse(
                localStorage.getItem("dataAyah") || "[]"
            );

            dataIbu = JSON.parse(
                localStorage.getItem("dataIbu") || "[]"
            );

        }

        localStorage.removeItem("modePreview");

    }

    //--------------------------------------------------
    // SURAT BARU
    //--------------------------------------------------

    else{

        localStorage.removeItem("nikSiswa");
        localStorage.removeItem("namaSiswa");
        localStorage.removeItem("tempatLahirSiswa");
        localStorage.removeItem("tanggalLahirSiswa");
        localStorage.removeItem("jkSiswa");

        await getDataOrtu();

    }

});

/*======================================================
  LOAD LOCAL STORAGE
======================================================*/

function loadLocalStorage(){

    //--------------------------------------------------
    // DATA SURAT
    //--------------------------------------------------

    const dataSurat = JSON.parse(

        localStorage.getItem("dataSurat") || "{}"

    );

    //--------------------------------------------------
    // DATA SISWA
    //--------------------------------------------------

    document.getElementById("nikSiswa").value =
        localStorage.getItem("nikSiswa") ||
        localStorage.getItem("nik") || "";

    document.getElementById("namaSiswa").value =
        localStorage.getItem("namaSiswa") ||
        localStorage.getItem("nama") || "";

    document.getElementById("tempatLahirSiswa").value =
        localStorage.getItem("tempatLahirSiswa") ||
        localStorage.getItem("tempatlahir") || "";

    document.getElementById("tanggalLahirSiswa").value =
        ubahTanggalInput(

            localStorage.getItem("tanggalLahirSiswa") ||
            localStorage.getItem("tanggallahir") || ""

        );

    document.getElementById("jkSiswa").value =
        localStorage.getItem("jkSiswa") ||
        localStorage.getItem("jk") || "";

    //--------------------------------------------------
    // ORANG TUA
    //--------------------------------------------------

    document.getElementById("nikOrtu").value =
        localStorage.getItem("nikOrtu") || "";

    document.getElementById("namaOrtu").value =
        localStorage.getItem("namaOrtu") || "";

    document.getElementById("tempatLahirOrtu").value =
        localStorage.getItem("tempatLahirOrtu") || "";

    document.getElementById("tanggalLahirOrtu").value =
        localStorage.getItem("tanggalLahirOrtu") || "";

    document.getElementById("jkOrtu").value =
        localStorage.getItem("jkOrtu") || "";

    document.getElementById("agamaOrtu").value =
        localStorage.getItem("agamaOrtu") || "";

    document.getElementById("pekerjaanOrtu").value =
        localStorage.getItem("pekerjaanOrtu") || "";

    document.getElementById("alamatOrtu").value =
        localStorage.getItem("alamatOrtu") || "";

    //--------------------------------------------------
// DATA SURAT
//--------------------------------------------------

document.getElementById("nisn").value =
    localStorage.getItem("nisn") ||
    dataSurat.nisn ||
    "";

document.getElementById("kelas").value =
    localStorage.getItem("kelas") ||
    dataSurat.kelas ||
    "";

document.getElementById("sekolah").value =
    localStorage.getItem("sekolah") ||
    dataSurat.sekolah ||
    "";

document.getElementById("desil").value =
    localStorage.getItem("desil") ||
    dataSurat.desil ||
    "";

document.getElementById("keperluan").value =
    localStorage.getItem("keperluan") ||
    dataSurat.keperluan ||
    "";    //--------------------------------------------------
    // PEMOHON
    //--------------------------------------------------

    if((dataSurat.pemohon || localStorage.getItem("pemohon"))=="IBU"){

        document.getElementById("ibu").checked = true;

    }else{

        document.getElementById("ayah").checked = true;

    }

}

/*======================================================
  CEK LOGIN
======================================================*/

function cekLogin(){

    if(localStorage.getItem("username")==null){

        window.location.href="index.html";

    }

}


/*======================================================
  LOADING
======================================================*/

function showLoading(){

    document.getElementById("loading").style.display="flex";

}

function hideLoading(){

    document.getElementById("loading").style.display="none";

}


/*======================================================
  LOAD DATA SISWA
======================================================*/

function loadDataSiswa(){

    document.getElementById("nikSiswa").value =

        localStorage.getItem("nikSiswa") ||

        localStorage.getItem("nik") ||

        "";

    document.getElementById("namaSiswa").value =

        localStorage.getItem("namaSiswa") ||

        localStorage.getItem("nama") ||

        "";

    document.getElementById("tempatLahirSiswa").value =

        localStorage.getItem("tempatLahirSiswa") ||

        localStorage.getItem("tempatlahirSiswa") ||

        localStorage.getItem("tempatlahir") ||

        "";

    const tanggal =

        localStorage.getItem("tanggalLahirSiswa") ||

        localStorage.getItem("tanggalLahirSiswa") ||

        localStorage.getItem("tanggallahirSiswa") ||

        localStorage.getItem("tanggallahir") ||

        "";

    document.getElementById("tanggalLahirSiswa").value =

        ubahTanggalInput(tanggal);


    document.getElementById("jkSiswa").value =

        localStorage.getItem("jkSiswa") ||

        localStorage.getItem("jk") ||

        "";

}

/*======================================================
  DD/MM/YYYY -> YYYY-MM-DD
======================================================*/

function ubahTanggalInput(tanggal){

    if(!tanggal) return "";

    // sudah format YYYY-MM-DD
    if(tanggal.includes("-")){

        return tanggal;

    }

    // format DD/MM/YYYY
    const p = tanggal.split("/");

    if(p.length!=3){

        return "";

    }

    return p[2] + "-" + p[1] + "-" + p[0];

}


//======================================================
// GET DATA ORANG TUA
//======================================================

async function getDataOrtu(){

    try{

        showLoading();

        const response = await fetch(

            URL +
            "?aksi=getortu" +
            "&token=" + TOKEN +
            "&nik=" +
            encodeURIComponent(
                localStorage.getItem("nik")
            )

        );

        const hasil =
            (await response.text()).trim();

        const pecah =
            hasil.split("#");

        dataAnak =
            pecah[0] ? pecah[0].split("|") : [];

        dataAyah =
            pecah[1] ? pecah[1].split("|") : [];

        dataIbu =
            pecah[2] ? pecah[2].split("|") : [];

        //--------------------------------------------------
        // SIMPAN CACHE OFFLINE
        //--------------------------------------------------

        localStorage.setItem(
            "dataAyah",
            JSON.stringify(dataAyah)
        );

        localStorage.setItem(
            "dataIbu",
            JSON.stringify(dataIbu)
        );

    }

    catch(err){

        console.log("MODE OFFLINE");

        dataAyah = JSON.parse(
            localStorage.getItem("dataAyah") || "[]"
        );

        dataIbu = JSON.parse(
            localStorage.getItem("dataIbu") || "[]"
        );

    }

    finally{

    //--------------------------------------------------
    // JIKA SUDAH PERNAH MEMILIH PEMOHON
    //--------------------------------------------------

    const pemohon =
        localStorage.getItem("pemohon");

    if(pemohon=="IBU"){

        document.getElementById("ibu").checked = true;

        isiOrangTua("IBU");

    }
    else if(pemohon=="AYAH"){

        document.getElementById("ayah").checked = true;

        isiOrangTua("AYAH");

    }

    //--------------------------------------------------
    // BELUM ADA PEMILIHAN
    //--------------------------------------------------

    else{

        if(dataAyah.length>0 && dataAyah[1]){

            document.getElementById("ayah").checked = true;

            isiOrangTua("AYAH");

        }
        else if(dataIbu.length>0 && dataIbu[1]){

            document.getElementById("ibu").checked = true;

            isiOrangTua("IBU");

        }
        else{

            alert("Data orang tua tidak ditemukan.");

        }

    }

    hideLoading();

}
}
//======================================================
// ISI DATA ORANG TUA
//======================================================

function isiOrangTua(jenis){

    let data = [];

    if(jenis=="AYAH"){

        if(dataAyah.length>0 && dataAyah[1]){

            data = dataAyah;

        }else{

            data = dataIbu;

            document.getElementById("ibu").checked = true;

        }

    }else{

        if(dataIbu.length>0 && dataIbu[1]){

            data = dataIbu;

        }else{

            data = dataAyah;

            document.getElementById("ayah").checked = true;

        }

    }

    if(data.length==0){

        return;

    }

   document.getElementById("nikOrtu").value = data[0] || "";

document.getElementById("namaOrtu").value = data[1] || "";

document.getElementById("tempatLahirOrtu").value = data[2] || "";

document.getElementById("tanggalLahirOrtu").value = data[3] || "";

// TAMBAHAN
document.getElementById("jkOrtu").value = data[4] || "";

document.getElementById("agamaOrtu").value = data[5] || "";

document.getElementById("pekerjaanOrtu").value = data[6] || "";

document.getElementById("alamatOrtu").value =
    (data[7] || "") +
    " RT " + (data[8] || "") +
    " RW " + (data[9] || "") +
    ", " + (data[10] || "") +
    ", " + (data[11] || "") +
    ", " + (data[12] || "");

}



/*======================================================
  SIMPAN LOCAL STORAGE
======================================================*/

function simpanLocalStorage(){

    //--------------------------------------------------
    // SISWA
    //--------------------------------------------------

    const nikSiswa =
        document.getElementById("nikSiswa").value;

    const namaSiswa =
        document.getElementById("namaSiswa").value;

    const tempatLahirSiswa =
        document.getElementById("tempatLahirSiswa").value;

    const tanggalLahirSiswa =
        document.getElementById("tanggalLahirSiswa").value;

    const jkSiswa =
        document.getElementById("jkSiswa").value;

    localStorage.setItem(
        "nikSiswa",
        nikSiswa
    );

    localStorage.setItem(
        "namaSiswa",
        namaSiswa
    );

    localStorage.setItem(
        "tempatLahirSiswa",
        tempatLahirSiswa
    );

    localStorage.setItem(
        "tanggalLahirSiswa",
        tanggalLahirSiswa
    );

    localStorage.setItem(
        "jkSiswa",
        jkSiswa
    );

    //--------------------------------------------------
    // KOMPATIBILITAS MODUL LAIN
    //--------------------------------------------------

    localStorage.setItem("nik", nikSiswa);
    localStorage.setItem("nama", namaSiswa);
    localStorage.setItem("tempatlahir", tempatLahirSiswa);
    localStorage.setItem("tanggallahir", tanggalLahirSiswa);
    localStorage.setItem("jk", jkSiswa);

    //--------------------------------------------------
    // DATA SEKOLAH
    //--------------------------------------------------

    localStorage.setItem(
        "nisn",
        document.getElementById("nisn").value
    );

    localStorage.setItem(
        "kelas",
        document.getElementById("kelas").value
    );

    localStorage.setItem(
        "sekolah",
        document.getElementById("sekolah").value
    );

    //--------------------------------------------------
    // ORANG TUA
    //--------------------------------------------------

    localStorage.setItem(
        "nikOrtu",
        document.getElementById("nikOrtu").value
    );

    localStorage.setItem(
        "namaOrtu",
        document.getElementById("namaOrtu").value
    );

    localStorage.setItem(
        "tempatLahirOrtu",
        document.getElementById("tempatLahirOrtu").value
    );

    localStorage.setItem(
        "tanggalLahirOrtu",
        document.getElementById("tanggalLahirOrtu").value
    );

    localStorage.setItem(
        "jkOrtu",
        document.getElementById("jkOrtu").value
    );

    localStorage.setItem(
        "agamaOrtu",
        document.getElementById("agamaOrtu").value
    );

    localStorage.setItem(
        "pekerjaanOrtu",
        document.getElementById("pekerjaanOrtu").value
    );

    localStorage.setItem(
        "alamatOrtu",
        document.getElementById("alamatOrtu").value
    );

    //--------------------------------------------------
    // DATA SURAT
    //--------------------------------------------------

    localStorage.setItem(
        "desil",
        document.getElementById("desil").value
    );

    localStorage.setItem(
        "keperluan",
        document.getElementById("keperluan").value
    );

    localStorage.setItem(
        "pemohon",
        document.getElementById("ayah").checked ? "AYAH" : "IBU"
    );

}
/*======================================================
  RESET
======================================================*/

function resetForm(){

    document.getElementById("nisn").value="";

    document.getElementById("kelas").value="";

    document.getElementById("sekolah").value="";

    document.getElementById("desil").value="";

    document.getElementById("keperluan").value="";

    document.getElementById("ayah").checked=true;

    isiOrangTua("AYAH");

}


/*======================================================
  PREVIEW
======================================================*/

function previewSurat(){

    simpanLocalStorage();

    localStorage.setItem(
        "modePreview",
        "1"
    );

    localStorage.setItem(
        "nomorAgenda",
        localStorage.getItem("nomorAgenda") || ""
    );

    localStorage.setItem(
        "modeSurat",
        localStorage.getItem("nomorAgenda") ? "edit" : "baru"
    );

    window.location.href =
        "preview_sktm_siswa.html";

}

/*======================================================
  KEMBALI
======================================================*/

function kembali(){

    localStorage.removeItem("modePreview");

    window.location.href =
        "jenissurat.html";

}
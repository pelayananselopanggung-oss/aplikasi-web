//=====================================================
// penduduk.js
// BAGIAN 1
//=====================================================

//=====================================================
// KONFIGURASI
//=====================================================

const URL = "https://script.google.com/macros/s/AKfycbw24mrUE8XAhoabeOUnRju0zuj1D8vLS8s5ply6r4kxAl2UMnd4HHCjoaHlC_gGZNwAGg/exec";
const TOKEN = "RHS_SLPG_2004";

let loading = null;
let MODE = "";
let NIK = "";


//=====================================================
// WINDOW LOAD
//=====================================================

window.onload = function(){

    cekLogin();
    cekAksesDashboard();

    loading = new bootstrap.Modal(
        document.getElementById("loadingModal")
    );

    MODE = localStorage.getItem("mode") || "SIMPAN";
    NIK = localStorage.getItem("nik") || "";

    if(MODE=="EDIT"){

        document.getElementById("btnSimpan").style.display="none";
        document.getElementById("btnEdit").style.display="";
        document.getElementById("btnUpdate").style.display="none";

        disableForm();

        loadPenduduk();

    }else{

        document.getElementById("btnSimpan").style.display="";
        document.getElementById("btnEdit").style.display="none";
        document.getElementById("btnUpdate").style.display="none";

        enableForm();

        clearForm();

        document.getElementById("nik").focus();

    }

}



//=====================================================
// LOGIN
//=====================================================

function cekLogin(){

    let username=localStorage.getItem("username");

    if(username==null){

        location.href="index.html";

    }

}



//=====================================================
// AMBIL DATA PENDUDUK
//=====================================================

async function loadPenduduk(){

    if(NIK==""){

        return;

    }

    loading.show();

    try{

        const response=await fetch(

            URL+
            "?aksi=getdata"+
            "&token="+TOKEN+
            "&nik="+encodeURIComponent(NIK)

        );

        const hasil=await response.text();

        loading.hide();

        if(
            hasil=="DATA TIDAK DITEMUKAN"
        ){

            alert("Data tidak ditemukan.");

            return;

        }

        isiForm(hasil);

    }

    catch(err){

        loading.hide();

        console.log(err);

        alert("Tidak dapat mengambil data.");

    }

}



//=====================================================
// ISI FORM
//=====================================================

function isiForm(hasil){

    let d=hasil.split("#");

    document.getElementById("nik").value=d[0]||"";
    document.getElementById("nama").value=d[1]||"";
    document.getElementById("nokk").value=d[2]||"";
    document.getElementById("tempatlahir").value=d[3]||"";
    document.getElementById("tgllahir").value=formatTanggal(d[4]);
    document.getElementById("jk").value=d[5]||"";
    document.getElementById("agama").value=d[6]||"";
    document.getElementById("pekerjaan").value=d[7]||"";
    document.getElementById("alamat").value=d[8]||"";
    document.getElementById("rt").value=d[9]||"";
    document.getElementById("rw").value=d[10]||"";
    document.getElementById("desa").value=d[11]||"";
    document.getElementById("kecamatan").value=d[12]||"";
    document.getElementById("kabupaten").value=d[13]||"";
    document.getElementById("provinsi").value=d[14]||"";
    document.getElementById("statusKawin").value=d[15]||"";
    document.getElementById("statusHubungan").value=d[16]||"";
    document.getElementById("pendidikan").value=d[17]||"";

}



//=====================================================
// FORMAT TANGGAL
// dd/MM/yyyy -> yyyy-MM-dd
//=====================================================

function formatTanggal(tanggal){

    if(tanggal=="") return "";

    let p=tanggal.split("/");

    if(p.length!=3) return "";

    return p[2]+"-"+p[1].padStart(2,"0")+"-"+p[0].padStart(2,"0");

}



//=====================================================
// CLEAR FORM
//=====================================================

function clearForm(){

    document.getElementById("frmPenduduk").reset();

    const noKK = localStorage.getItem("nokk");

if(noKK){

    document.getElementById("nokk").value = noKK;

}

}



//=====================================================
// AMBIL VALUE
//=====================================================

function getValue(id){

    return document.getElementById(id).value.trim();

}



//=====================================================
// SET VALUE
//=====================================================

function setValue(id,val){

    document.getElementById(id).value=val;

}




//=====================================================
// AKTIFKAN FORM
//=====================================================

function enableForm(){

    const form=document.querySelectorAll(
        "#frmPenduduk input,#frmPenduduk select,#frmPenduduk textarea"
    );

    form.forEach(function(item){

        item.disabled=false;

    });

}



//=====================================================
// NONAKTIFKAN FORM
//=====================================================

function disableForm(){

    const form=document.querySelectorAll(
        "#frmPenduduk input,#frmPenduduk select,#frmPenduduk textarea"
    );

    form.forEach(function(item){

        item.disabled=true;

    });

}



//=====================================================
// MODE EDIT
//=====================================================

function editPenduduk(){

    enableForm();

    // NIK tidak boleh diubah
    document.getElementById("nik").disabled=true;

    document.getElementById("btnEdit").style.display="none";

    document.getElementById("btnUpdate").style.display="";

}



//=====================================================
// VALIDASI DATA
//=====================================================

function validasiForm(){

    if(getValue("nik")==""){

        alert("NIK harus diisi.");

        document.getElementById("nik").focus();

        return false;

    }

    if(getValue("nik").length!=16){

        alert("NIK harus 16 digit.");

        document.getElementById("nik").focus();

        return false;

    }

    if(getValue("nama")==""){

        alert("Nama belum diisi.");

        document.getElementById("nama").focus();

        return false;

    }

    if(getValue("nokk")==""){

        alert("Nomor KK belum diisi.");

        document.getElementById("nokk").focus();

        return false;

    }

    if(getValue("tempatlahir")==""){

        alert("Tempat lahir belum diisi.");

        document.getElementById("tempatlahir").focus();

        return false;

    }

    if(getValue("tgllahir")==""){

        alert("Tanggal lahir belum diisi.");

        document.getElementById("tgllahir").focus();

        return false;

    }

    if(getValue("jk")==""){

        alert("Jenis kelamin belum dipilih.");

        document.getElementById("jk").focus();

        return false;

    }

    if(getValue("agama")==""){

        alert("Agama belum dipilih.");

        document.getElementById("agama").focus();

        return false;

    }

    if(getValue("alamat")==""){

        alert("Alamat belum diisi.");

        document.getElementById("alamat").focus();

        return false;

    }

    if(getValue("rt")==""){

        alert("RT belum diisi.");

        document.getElementById("rt").focus();

        return false;

    }

    if(getValue("rw")==""){

        alert("RW belum diisi.");

        document.getElementById("rw").focus();

        return false;

    }

    if(getValue("desa")==""){

        alert("Desa belum diisi.");

        document.getElementById("desa").focus();

        return false;

    }

    if(getValue("kecamatan")==""){

        alert("Kecamatan belum diisi.");

        document.getElementById("kecamatan").focus();

        return false;

    }

    if(getValue("kabupaten")==""){

        alert("Kabupaten belum diisi.");

        document.getElementById("kabupaten").focus();

        return false;

    }

    if(getValue("provinsi")==""){

        alert("Provinsi belum diisi.");

        document.getElementById("provinsi").focus();

        return false;

    }

    if(getValue("statusKawin")==""){

        alert("Status perkawinan belum dipilih.");

        document.getElementById("statusKawin").focus();

        return false;

    }

    if(getValue("statusHubungan")==""){

        alert("Status hubungan keluarga belum dipilih.");

        document.getElementById("statusHubungan").focus();

        return false;

    }

    if(getValue("pendidikan")==""){

        alert("Pendidikan belum diisi.");

        document.getElementById("pendidikan").focus();

        return false;

    }

    return true;

}



//=====================================================
// KEMBALI
//=====================================================

function kembaliCariData(){

    localStorage.removeItem("mode");
    localStorage.removeItem("nik");

    location.href="caridata.html";

}



//=====================================================
// MENU PERMOHONAN SURAT
//=====================================================

function bukaPermohonan(){

    if(getValue("nik")==""){

        alert("Data penduduk belum tersedia.");

        return;

    }

    localStorage.setItem(
        "nik",
        getValue("nik")
    );

    location.href="permohonan.html";

}




//=====================================================
// SIMPAN DATA
//=====================================================

async function simpanPenduduk(){

    if(!validasiForm()) return;

    loading.show();

    try{

        const params=new URLSearchParams({

            aksi:"simpan",
            token:TOKEN,

            nik:getValue("nik"),
            nama:getValue("nama"),
            nokk:getValue("nokk"),
            tempatlahir:getValue("tempatlahir"),
            tanggallahir:getValue("tgllahir"),
            jk:getValue("jk"),
            agama:getValue("agama"),
            pekerjaan:getValue("pekerjaan"),
            alamat:getValue("alamat"),

            ert:getValue("rt"),
            rw:getValue("rw"),

            desa:getValue("desa"),
            kecamatan:getValue("kecamatan"),
            kabupaten:getValue("kabupaten"),
            provinsi:getValue("provinsi"),

            sp:getValue("statusKawin"),
            sdhk:getValue("statusHubungan"),
            pendidikan:getValue("pendidikan")

        });

        const response=await fetch(

            URL+"?"+params.toString()

        );

        const hasil=await response.text();

        loading.hide();

        alert(hasil);

        if(hasil=="DATA BERHASIL DISIMPAN"){

            localStorage.setItem("mode","EDIT");
            localStorage.setItem("nik",getValue("nik"));

            location.reload();

        }

    }

    catch(err){

        loading.hide();

        console.log(err);

        alert("Gagal menyimpan data.");

    }

}



//=====================================================
// UPDATE DATA
//=====================================================

async function updatePenduduk(){

    if(!validasiForm()) return;

    loading.show();

    try{

        const params=new URLSearchParams({

            aksi:"update",
            token:TOKEN,

            nik:getValue("nik"),
            nama:getValue("nama"),
            nokk:getValue("nokk"),
            tempatlahir:getValue("tempatlahir"),
            tanggallahir:getValue("tgllahir"),
            jk:getValue("jk"),
            agama:getValue("agama"),
            pekerjaan:getValue("pekerjaan"),
            alamat:getValue("alamat"),

            ert:getValue("rt"),
            rw:getValue("rw"),

            desa:getValue("desa"),
            kecamatan:getValue("kecamatan"),
            kabupaten:getValue("kabupaten"),
            provinsi:getValue("provinsi"),

            sp:getValue("statusKawin"),
            sdhk:getValue("statusHubungan"),
            pendidikan:getValue("pendidikan")

        });

        const response=await fetch(

            URL+"?"+params.toString()

        );

        const hasil=await response.text();

        loading.hide();

        alert(hasil);

        if(hasil=="DATA BERHASIL DIUPDATE"){

            disableForm();

            document.getElementById("btnEdit").style.display="";
            document.getElementById("btnUpdate").style.display="none";

        }

    }

    catch(err){

        loading.hide();

        console.log(err);

        alert("Gagal mengupdate data.");

    }

}



//=====================================================
// HAPUS DATA
//=====================================================

async function hapusPenduduk(){

    if(!confirm("Yakin ingin menghapus data ini?")){

        return;

    }

    loading.show();

    try{

        const response=await fetch(

            URL+
            "?aksi=hapus"+
            "&token="+TOKEN+
            "&nik="+encodeURIComponent(getValue("nik"))

        );

        const hasil=await response.text();

        loading.hide();

        alert(hasil);

        if(hasil=="DATA BERHASIL DIHAPUS"){

            localStorage.removeItem("nik");
            localStorage.removeItem("mode");

            location.href="caridata.html";

        }

    }

    catch(err){

        loading.hide();

        console.log(err);

        alert("Gagal menghapus data.");

    }

}



//=====================================================
// BATAL
//=====================================================

function batal(){

    if(MODE=="EDIT"){

        loadPenduduk();

        disableForm();

        document.getElementById("btnEdit").style.display="";
        document.getElementById("btnUpdate").style.display="none";

    }

    else{

        clearForm();

    }

}



//=====================================================
// LOGOUT
//=====================================================

function logout(){

    if(confirm("Keluar dari aplikasi ?")){

        localStorage.clear();

        location.href="index.html";

    }

}




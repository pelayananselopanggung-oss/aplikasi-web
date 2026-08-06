
//=====================================================
// PERMOHONAN SURAT
//=====================================================

document.addEventListener("DOMContentLoaded", function () {

    // Jika dari halaman penduduk
    const nik = localStorage.getItem("nik");

    if (nik != null && nik != "") {

        document.getElementById("txtCari").value = nik;

        cariPenduduk();

    }

    // Enter untuk mencari
    document.getElementById("txtCari")
    .addEventListener("keypress", function (e) {

        if (e.key === "Enter") {

            cariPenduduk();

        }

    });

});


//=====================================================
// HOME
//=====================================================

function dashboard(){

    window.location.href="dashboard.html";

}


//=====================================================
// LOADING
//=====================================================

function showLoading(){

    document.getElementById("loading").style.display="flex";

}

function hideLoading(){

    document.getElementById("loading").style.display="none";

}


//=====================================================
// CARI DATA PENDUDUK
//=====================================================

async function cariPenduduk(){

    const q=document.getElementById("txtCari").value.trim();

    if(q==""){

        alert("Masukkan NIK/Nama dan untuk SKTM Siswa masukan NIk/Nama Siswa.");

        return;

    }

    showLoading();

    try{

        const response=await fetch(

            URL+
            "?aksi=caridata"+
            "&token="+TOKEN+
            "&q="+encodeURIComponent(q)

        );

        const hasil=await response.text();

        hideLoading();

        tampilkanHasil(hasil);

    }

    catch(err){

        hideLoading();

        console.log(err);

        alert("Gagal mengambil data.");

    }

}



//=====================================================
// TAMPILKAN HASIL PENCARIAN
//=====================================================

function tampilkanHasil(hasil){

    const area=document.getElementById("hasilCari");
    const status=document.getElementById("statusArea");

    const btnTambah=document.getElementById("btnTambah");
    const btnLuar=document.getElementById("btnLuar");


    area.innerHTML="";


    //-------------------------------------------------
    // DATA TIDAK DITEMUKAN
    //-------------------------------------------------

    if(hasil=="NOTFOUND"){

        status.className="alert alert-warning";

        status.innerHTML=
        "<b>Data penduduk tidak ditemukan.</b><br>" +
        "Silakan tambah penduduk baru atau pilih pemohon luar daerah.";

        btnTambah.style.display="block";
        btnLuar.style.display="block";

        return;

    }



    //-------------------------------------------------
    // DATA DITEMUKAN
    //-------------------------------------------------

    btnTambah.style.display="none";
    btnLuar.style.display="none";


    const rows=hasil.split("#");


    status.className="alert alert-success";

    status.innerHTML=
    "Ditemukan <b>"+rows.length+"</b> data.";



    rows.forEach(function(item){


        if(item.trim()=="") return;


        const d=item.split("|");


        const nik=d[0];

        const nama=d[1];

        const jk=d[5];

        const alamat =
                d[6] +
                " RT " + d[7] +
                " RW " + d[8];



        //-------------------------------------------------
        // FOTO
        //-------------------------------------------------

        let foto=
        "assets/foto/" + nik + ".jpg";


        let jenisKelamin = jk
    .toString()
    .trim()
    .toUpperCase();


let fotoDefault =
    jenisKelamin=="P" ||
    jenisKelamin.includes("PEREMPUAN") ||
    jenisKelamin.includes("WANITA")
    ?
    "assets/img/female.jpg"
    :
    "assets/img/male.jpg";



        //-------------------------------------------------
        // CARD
        //-------------------------------------------------

        area.innerHTML+=`


<div class="data-card"

onclick="pilihPenduduk('${nik}')">



<div class="row align-items-center">



<div class="col-3 text-center">


<img

src="${foto}"

class="foto-cari"


onerror="

this.onerror=null;

this.src='${fotoDefault}';

"

>


</div>




<div class="col-9">



<div class="nama">

${nama}

</div>




<div class="detail">

<b>NIK :</b> ${nik}

</div>




<div class="detail">

${jk}

</div>




<div class="detail">

${alamat}

</div>



</div>



</div>



</div>


`;

    });

}


//=====================================================
// PILIH PENDUDUK
//=====================================================

function pilihPenduduk(nik){

    // Simpan NIK untuk digunakan pada halaman surat
    localStorage.setItem("nik",nik);

    // Buka halaman pilih jenis surat
    window.location.href="jenissurat.html";

}



//=====================================================
// TAMBAH PENDUDUK BARU
//=====================================================

function tambahPenduduk(){

    localStorage.setItem("mode","SIMPAN");

    localStorage.removeItem("nik");

    window.location.href="penduduk.html";

}



//=====================================================
// PEMOHON LUAR DAERAH
//=====================================================

function pemohonLuar(){

    const nik = document.getElementById("txtCari").value.trim();

    localStorage.setItem("nikLuar", nik);

    localStorage.removeItem("nik");

    window.location.href="luardaerah.html";

}


//=====================================================
// RESET PENCARIAN
//=====================================================

function resetCari(){

    document.getElementById("txtCari").value="";

    document.getElementById("hasilCari").innerHTML="";

    document.getElementById("statusArea").className="alert alert-info";

    document.getElementById("statusArea").innerHTML=
    "Silakan masukkan NIK atau Nama Penduduk.";

    document.getElementById("btnTambah").style.display="none";

    document.getElementById("btnLuar").style.display="none";

}



//=====================================================
// LOGOUT
//=====================================================

function logout(){

    if(confirm("Keluar dari aplikasi?")){

        localStorage.clear();

        window.location.href="index.html";

    }

}



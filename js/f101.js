//======================================================
// LOAD HALAMAN
//======================================================

document.addEventListener(

    "DOMContentLoaded",

    function(){

        cekLogin();

    }

);

//======================================================
// LOADING
//======================================================

function showLoading(){

    document.getElementById("loading").style.display="flex";

}

function hideLoading(){

    document.getElementById("loading").style.display="none";

}

//======================================================
// CEK LOGIN
//======================================================

function cekLogin(){

    const username = localStorage.getItem("username");

    if(username==null){

        window.location.href="index.html";

    }

}

//======================================================
// CARI KK
//======================================================

async function cariKK(){

    const nokk =

        document.getElementById("nokk")

        .value

        .trim();

    if(nokk==""){

        alert("Nomor KK belum diisi.");

        return;

    }

    showLoading();

    try{

        //--------------------------------------------------
        // MODE OFFLINE
        //--------------------------------------------------

        if(localStorage.getItem("statusSync")=="0"){

            const data = JSON.parse(

                localStorage.getItem("dataKK") || "[]"

            );

            tampilkanKK(data);

            hideLoading();

            return;

        }

        //--------------------------------------------------
        // MODE ONLINE
        //--------------------------------------------------

        const response = await fetch(

            URL +

            "?aksi=carikk" +

            "&token=" + TOKEN +

            "&nokk=" + encodeURIComponent(nokk)

        );

        const hasil = await response.text();

        hideLoading();

        if(

            hasil=="" ||

            hasil=="NOTFOUND"

        ){

            alert("Nomor KK tidak ditemukan.");

            return;

        }

        const anggota = hasil.split("#");

        tampilkanKK(anggota);

    }

    catch(err){

        hideLoading();

        console.log(err);

        alert("Gagal mengambil data.");

    }

}




//======================================================
// TAMPILKAN KK
//======================================================

function tampilkanKK(data){

    let html="";

    let kepala=null;

    data.forEach(function(item,index){

        const d=item.split("|");

        if(index==0){

            kepala=d;

        }

        html+=`

        <tr>

            <td>${index+1}</td>

            <td>${d[0]}</td>

            <td>${d[1]}</td>

            <td>${d[2]}, ${d[3]}</td>

            <td>${d[4]}</td>

            <td>${d[5]}</td>

            <td>${d[6]}</td>

            <td>${d[8]}</td>

            <td>${d[7]}</td>

        </tr>

        `;

    });

    document.getElementById("dataKK").innerHTML=html;

//--------------------------------------------------
// DATA KEPALA KELUARGA
//--------------------------------------------------

if(kepala){

    document.getElementById("namaKK").value =
        kepala[1];

    document.getElementById("alamat").value =
        kepala[9];

    document.getElementById("rt").value =
        kepala[10];

    document.getElementById("rw").value =
        kepala[11];

    document.getElementById("desa").value =
        kepala[12];

    document.getElementById("kecamatan").value =
        kepala[13];

}
    //--------------------------------------------------
    // SIMPAN OFFLINE
    //--------------------------------------------------

    localStorage.setItem(

        "dataKK",

        JSON.stringify(data)

    );

}



//======================================================
// PREVIEW
//======================================================

function previewF101(){

    localStorage.setItem(

        "modePreview",

        "1"

    );

    window.location.href=

        "preview_f101.html";

}

//======================================================
// KEMBALI
//======================================================

function kembali(){

    window.location.href=

        "dashboard.html";

}
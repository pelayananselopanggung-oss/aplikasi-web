/*======================================================
  SAAT HALAMAN DIBUKA
======================================================*/

window.onload = function(){

    cekLogin();

    tampilOperator();

    eventMenu();

};


/*======================================================
  TAMPILKAN NAMA OPERATOR
======================================================*/

function tampilOperator(){

    const username = localStorage.getItem("username");

    if(document.getElementById("namaOperator")){

        document.getElementById("namaOperator").innerHTML =
            username;

    }

}


/*======================================================
  CEK LOGIN
======================================================*/

function cekLogin(){

    const username = localStorage.getItem("username");

    if(!username){

        window.location.href =
            "index.html";

    }

}


/*======================================================
  MENU
======================================================*/

function eventMenu(){

    //--------------------------------------------------
    // KETERANGAN WARIS
    //--------------------------------------------------

    document.getElementById("menuWaris").onclick = function(){

        window.location.href =
            "waris_tanah.html";

    };

    //--------------------------------------------------
    // KETERANGAN HARGA TANAH
    //--------------------------------------------------

    document.getElementById("menuHargaTanah").onclick = function(){

        window.location.href =
            "harga_tanah.html";

    };

    //--------------------------------------------------
    // KETERANGAN KEPEMILIKAN TANAH
    //--------------------------------------------------

    document.getElementById("menuKepemilikanTanah").onclick = function(){

        window.location.href =
            "kepemilikan_tanah.html";

    };

    //--------------------------------------------------
    // KEMBALI
    //--------------------------------------------------

    document.getElementById("menuKembali").onclick = function(){

        window.location.href =
            "dashboard.html";

    };

}
/*======================================================
  LOAD HALAMAN
======================================================*/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        cekLogin();

        cekAksesNikah();

        loadRiwayat();

    }

);

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
  LOGIN
======================================================*/

function cekLogin(){

    if(localStorage.getItem("username")==null){

        window.location.href="index.html";

    }

}

/*======================================================
  LOAD RIWAYAT
======================================================*/

function loadRiwayat(){

    if(navigator.onLine){

        loadOnline();

    }

    else{

        loadOffline();

    }

}

/*======================================================
  ONLINE
======================================================*/

async function loadOnline(){

    try{

        showLoading();

        //--------------------------------------------------
        // PENCARIAN
        //--------------------------------------------------

        const txtCari=document.getElementById("cari");

        const cari=

            txtCari ? txtCari.value.trim() : "";

        //--------------------------------------------------
        // URL
        //--------------------------------------------------

        const url=

            URL+

            "?aksi=cariAgendaNikah"+

            "&token="+ TOKEN +

            "&cari="+encodeURIComponent(cari);

        //--------------------------------------------------
        // REQUEST
        //--------------------------------------------------

        const response=

            await fetch(url);

        const result=

            await response.json();

        //--------------------------------------------------
        // RESPONSE
        //--------------------------------------------------

        if(result.status){

            tampilData(result.data);

        }

        else{

            console.log(result.pesan);

            tampilData([]);

        }

    }

    catch(err){

        console.log(err);

        tampilData([]);

    }

    finally{

        hideLoading();

    }

}

/*======================================================
  OFFLINE
======================================================*/

function loadOffline(){

    //--------------------------------------------------
    // NANTI DIAMBIL DARI INDEXEDDB
    //--------------------------------------------------

    tampilData([]);

}

/*======================================================
  TAMPIL DATA
======================================================*/

function tampilData(data){

    const tbody=

        document.getElementById("dataRiwayat");

    if(data.length==0){

        tbody.innerHTML=

        `

        <tr>

            <td colspan="6" class="text-center">

                Belum ada data.

            </td>

        </tr>

        `;

        return;

    }

    let html="";

    data.forEach(function(item,index){

        html+=`

        <tr>

            <td class="text-center">

                ${index+1}

            </td>

            <td class="text-center">

                ${item.nomor}

            </td>

            <td>

                ${item.suami}

            </td>

            <td>

                ${item.istri}

            </td>

            <td class="text-center">

                ${item.tanggal || "-"}

            </td>

            <td class="text-center">

                <button

                    class="btn btn-warning btn-sm btn-aksi"

                    onclick="edit('${item.nomor}')"

                    title="Edit">

                    <i class="fa fa-pen"></i>

                </button>

                <button

                    class="btn btn-success btn-sm btn-aksi"

                    onclick="preview('${item.nomor}')"

                    title="Preview">

                    <i class="fa fa-print"></i>

                </button>

            </td>

        </tr>

        `;

    });

    tbody.innerHTML=html;

}


/*======================================================
  LOAD DATA KE LOCALSTORAGE
======================================================*/

async function loadDataNikah(nomor){

    const url =

        URL +

        "?aksi=cetakNikah" +

        "&token=" + TOKEN +

        "&nomor=" + nomor;

    const response = await fetch(url);

    const result = await response.json();

    if(!result.status){

        alert(result.pesan);

        return false;

    }

    //--------------------------------------------------
    // SIMPAN KE LOCALSTORAGE
    //--------------------------------------------------

    const data = result.data;

    Object.keys(data).forEach(function(key){

        localStorage.setItem(

            key,

            data[key]

        );

    });

    //--------------------------------------------------
    // NOMOR & MODE
    //--------------------------------------------------

    localStorage.setItem(

        "nomorAgenda",

        nomor

    );

    localStorage.setItem(

        "modeSurat",

        "edit"

    );

    return true;

}

/*======================================================
  PENCARIAN
======================================================*/

function cariData(){

    loadRiwayat();

}

/*======================================================
  EDIT
======================================================*/

async function edit(nomor){

    const sukses =

        await loadDataNikah(nomor);

    if(!sukses){

        return;

    }

    window.location.href =

        "nikah.html";

}


         

/*======================================================
  PREVIEW
======================================================*/

async function preview(nomor){

    const sukses =

        await loadDataNikah(nomor);

    if(!sukses){

        return;

    }

    window.location.href =

        "preview_nikah.html";

}

/*======================================================
  KEMBALI
======================================================*/

function kembali(){

    window.location.href=

        "dashboard_nikah.html";

}
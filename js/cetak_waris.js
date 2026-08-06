
/*======================================================
 CETAK AHLI WARIS
======================================================*/


document.addEventListener("DOMContentLoaded", function(){

    loadWaris();
    loadTandaTangan();

//--------------------------------------------------
// QR
//--------------------------------------------------

const kodeQR =
localStorage.getItem("kodeVerifikasi");


buatQRCodeWaris(kodeQR);

});



async function loadWaris(){


    const nomor =
        localStorage.getItem("nomorAgenda");

        console.log("Nomor kirim:", nomor);


    if(!nomor){

        alert("Nomor surat tidak ditemukan");

        return;

    }



    try{


        const response = await fetch(

            URL +

            "?aksi=getAhliWaris" +

            "&token=" + TOKEN +

            "&nomor=" +

            encodeURIComponent(nomor)

        );



        const hasil =
            await response.json();



        if(!hasil.status){

            alert(hasil.pesan);

            return;

        }



        const h =
            hasil.header;



        //--------------------------------------------------
        // DATA PEWARIS
        //--------------------------------------------------


        document.getElementById("namaPewaris").innerHTML =
        h.nama;


        document.getElementById("namaPewaris2").innerHTML =
        h.nama;


        document.getElementById("namaPewaris3").innerHTML =
        h.nama;


        document.getElementById("namaPewaris4").innerHTML =
        h.nama;



        document.getElementById("tanggalMeninggal").innerHTML =
        formatTanggal(h.tanggalMeninggal);



        //--------------------------------------------------
        // PASANGAN
        //--------------------------------------------------

        document.getElementById("namaPasangan").innerHTML =
        h.pasangan;



        if(h.statusPasangan){

            document.getElementById("kalimatPasangan").innerHTML =
            " dan masih hidup sampai sekarang.";

        }



        //--------------------------------------------------
        // HARTA
        //--------------------------------------------------

        document.getElementById("hartaWarisan").innerHTML =
        h.hartaWarisan;



        //--------------------------------------------------
        // SAKSI
        //--------------------------------------------------

        document.getElementById("namaSaksi1").innerHTML =
        h.namaSaksi1;


        document.getElementById("umurSaksi1").innerHTML =
        h.umurSaksi1;


        document.getElementById("pekerjaanSaksi1").innerHTML =
        h.pekerjaanSaksi1;


        document.getElementById("alamatSaksi1").innerHTML =
        h.alamatSaksi1;



        document.getElementById("namaSaksi2").innerHTML =
        h.namaSaksi2;


        document.getElementById("umurSaksi2").innerHTML =
        h.umurSaksi2;


        document.getElementById("pekerjaanSaksi2").innerHTML =
        h.pekerjaanSaksi2;


        document.getElementById("alamatSaksi2").innerHTML =
        h.alamatSaksi2;




        //--------------------------------------------------
        // TABEL AHLI WARIS
        //--------------------------------------------------

        let tabel="";


        hasil.ahliWaris.forEach((a,index)=>{


            tabel += `

            <tr>

            <td>${index+1}</td>

            <td>${a.nama}</td>

            <td>${a.nik}</td>

            <td>${a.ttl}</td>

            <td>${a.alamat}</td>

            </tr>

            `;


        });



        document.getElementById("bodyAhliWaris").innerHTML =
        tabel;


        document.getElementById("bodyAhliWaris2").innerHTML =
        tabel;



        document.getElementById("jumlahAhliWaris").innerHTML =
        hasil.ahliWaris.length;


//--------------------------------------------------
// SIMPAN AHLI WARIS KE LOCAL STORAGE
//--------------------------------------------------

localStorage.setItem(

    "waris_ahliwaris",

    JSON.stringify(hasil.ahliWaris)

);



//--------------------------------------------------
// TAMPILKAN TTD AHLI WARIS
//--------------------------------------------------

tampilTTDAhliWaris();



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


        //--------------------------------------------------
        // NOMOR SURAT
        //--------------------------------------------------

        const tahun =
        new Date().getFullYear();


        document.getElementById("nomorSuratFooter").innerHTML =

        "470/" +
        nomor +
        "/418.60.04/" +
        tahun;



        document.getElementById("tanggalSurat").innerHTML =
        tanggalIndonesia(new Date());



    }

    catch(err){

        alert(err.message);

    }


}




function formatTanggal(t){

    if(!t) return "";

    let d = new Date(t);

    return d.toLocaleDateString(
        "id-ID",
        {
            day:"numeric",
            month:"long",
            year:"numeric"
        }
    );

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



//======================================================
// QR CODE WARIS
//======================================================

function buatQRCodeWaris(kodeVerifikasi){


    //--------------------------------------------------
    // OFFLINE
    //--------------------------------------------------

    if(!kodeVerifikasi){

        buatQRCodeWarisOffline();

        return;

    }



    //--------------------------------------------------
    // ONLINE
    //--------------------------------------------------


    const urlVerifikasi =

        URL +

        "?aksi=verifikasi" +

        "&kode=" +

        encodeURIComponent(kodeVerifikasi);



    const imgQR =
        document.getElementById("imgQR");


    const offline =
        document.getElementById("offlineQR");



    if(offline){

        offline.style.display="none";

    }



    if(imgQR){

        imgQR.style.display="block";


        imgQR.src =

        "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data="

        +

        encodeURIComponent(urlVerifikasi);

    }


}



//======================================================
// QR OFFLINE WARIS
//======================================================


function buatQRCodeWarisOffline(){


    const imgQR =
        document.getElementById("imgQR");


    const qr =
        document.getElementById("offlineQR");


    const info =
        document.getElementById("offlineInfo");



    if(imgQR){

        imgQR.style.display="none";

    }



    if(!qr){

        return;

    }



    qr.style.display="block";


    qr.innerHTML="";



    const teks =


`PEMERINTAH DESA SELOPANGGUNG

STATUS : SURAT OFFLINE


Jenis Surat : SURAT KETERANGAN AHLI WARIS


Nama Pewaris :

${localStorage.getItem("namaPewaris") || ""}


Tanggal :

${new Date().toLocaleString("id-ID")}


Nomor surat resmi diterbitkan saat Online.

Silahkan mengajukan cetak ulang untuk mendapatkan QR resmi.`;




    new QRCode(qr,{

        text:teks,

        width:100,

        height:100

    });



    if(info){

        info.innerHTML =

        "<b>QR OFFLINE</b><br>"+

        "QR dibuat offline.";

    }


}


/*======================================================
  CETAK
======================================================*/

function cetakSurat(){

    window.print();

}

/*======================================================
  LOAD HALAMAN
======================================================*/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        cekLogin();
        cekAksesDashboard();

        loadCetak();

    }

);

/*======================================================
  CEK LOGIN
======================================================*/

function cekLogin(){

    const username =

        localStorage.getItem("username");

    if(username==null){

        window.location.href="index.html";

    }

}


/*======================================================
  LOAD CETAK
======================================================*/



function loadCetak(){

    const mode = localStorage.getItem("modeCetak");

    console.log("Mode Cetak :", mode);
    const body = document.body;

    body.classList.remove(
    "portrait",
    "landscape"
     );

     if(

    mode=="orang"

     ){

    body.classList.add(

        "portrait"

    );

     }

     else{

    body.classList.add(

        "landscape"

    );

    }

    switch(mode){

        case "all":

            cetakSemuaPenduduk();
            break;

        case "orang":

            cetakSatuPenduduk();
            break;

        case "kk":

            cetakSatuKK();
            break;

        default:

            document.getElementById("hasilCetak").innerHTML =

                "<div class='alert alert-danger'>" +

                "<b>Mode cetak tidak dikenal.</b><br>" +

                "Mode yang diterima : " + mode +

                "</div>";

    }

}



/*======================================================
  CETAK SATU PENDUDUK
======================================================*/

function cetakSatuPenduduk(){

    const nik = localStorage.getItem("nikCetak");

    fetch(

        URL +

        "?aksi=getdata" +

        "&token=" + TOKEN +

        "&nik=" + nik

    )

    .then(response => response.text())

    .then(function(result){

        if(result=="DATA TIDAK DITEMUKAN"){

            document.getElementById("hasilCetak").innerHTML =
                "<h3>Data tidak ditemukan.</h3>";

            return;

        }

        tampilSatuPenduduk(result);

    })

    .catch(function(error){

        document.getElementById("hasilCetak").innerHTML =
            "<pre>"+error+"</pre>";

    });

}

/*======================================================
  TAMPILKAN SATU PENDUDUK
======================================================*/

function tampilSatuPenduduk(result){

    const data = result.split("#");


    const tanggalCetak = new Date().toLocaleDateString(
        "id-ID",
        {
            day:"2-digit",
            month:"long",
            year:"numeric"
        }
    );


    let nikAsli = data[0];

    let nik = data[0];

    let nokk = data[2];


    /* FOTO PENDUDUK */

    let foto = 
        "assets/foto/" + nikAsli + ".jpg";


    let fotoDefault =
        data[5].toUpperCase().startsWith("L")
        ?
        "assets/img/male.jpg"
        :
        "assets/img/female.jpg";



    if(hideNik()) nik = sensorNomor(nik);

    if(hideKK()) nokk = sensorNomor(nokk);



    let html = `


    <div class="halaman">


        ${headerLaporan(

            "BIODATA PENDUDUK",

            1

        )}



        <!-- FOTO -->

        <div style="text-align:center;margin-bottom:15px;">

            <img

                src="${foto}"

                style="
                    width:120px;
                    height:150px;
                    object-fit:cover;
                    border:1px solid #000;
                "

                onerror="
                    this.onerror=null;
                    this.src='${fotoDefault}';
                "

            >

        </div>




        <table class="info-laporan">


            <tr>

                <td width="150">
                    Tanggal Cetak
                </td>

                <td width="10">
                    :
                </td>

                <td>
                    ${tanggalCetak}
                </td>

            </tr>


        </table>




        <table class="table table-bordered">


            <tr>

                <th width="220">
                    NIK
                </th>

                <td>
                    ${nik}
                </td>

            </tr>



            <tr>

                <th>
                    No. KK
                </th>

                <td>
                    ${nokk}
                </td>

            </tr>



            <tr>

                <th>
                    Nama
                </th>

                <td>
                    ${data[1]}
                </td>

            </tr>



            <tr>

                <th>
                    Tempat, Tanggal Lahir
                </th>

                <td>
                    ${data[3]}, ${data[4]}
                </td>

            </tr>



            <tr>

                <th>
                    Jenis Kelamin
                </th>

                <td>
                    ${data[5]}
                </td>

            </tr>



            <tr>

                <th>
                    Agama
                </th>

                <td>
                    ${data[6]}
                </td>

            </tr>



            <tr>

                <th>
                    Pekerjaan
                </th>

                <td>
                    ${data[7]}
                </td>

            </tr>



            <tr>

                <th>
                    Alamat
                </th>

                <td>

                    ${data[8]}

                    RT ${data[9]}

                    RW ${data[10]}

                    Desa ${data[11]}

                    Kecamatan ${data[12]}

                    Kabupaten ${data[13]}

                    Provinsi ${data[14]}

                </td>

            </tr>



            <tr>

                <th>
                    Status Perkawinan
                </th>

                <td>
                    ${data[15]}
                </td>

            </tr>



            <tr>

                <th>
                    Status Hubungan Keluarga
                </th>

                <td>
                    ${data[16]}
                </td>

            </tr>



            <tr>

                <th>
                    Pendidikan
                </th>

                <td>
                    ${data[17]}
                </td>

            </tr>



        </table>



        ${footerLaporan(1)}


    </div>


    `;



    document.getElementById("hasilCetak").innerHTML = html;


}


/*======================================================
  CETAK SATU KK
======================================================*/

function cetakSatuKK(){

    const nokk = localStorage.getItem("kkCetak");

    fetch(

        URL +

        "?aksi=carikk" +

        "&token=" + TOKEN +

        "&nokk=" + nokk

    )

    .then(response => response.text())

    .then(function(result){

        if(result=="NOTFOUND"){

            document.getElementById("hasilCetak").innerHTML=

                "<h3>Data KK tidak ditemukan.</h3>";

            return;

        }

        tampilSatuKK(result);

    });

}

function tampilSatuKK(result){

    const data = result.split("#");

    const perHalaman = 25;

    let halaman = 1;


    const tanggalCetak = new Date().toLocaleDateString(
        "id-ID",
        {
            day:"2-digit",
            month:"long",
            year:"numeric"
        }
    );


    let html = "";


    //--------------------------------------------------
    // NOMOR KK
    //--------------------------------------------------

    let nokk = localStorage.getItem("kkCetak") || "";


    if(hideKK()){

        nokk = sensorNomor(nokk);

    }



    //--------------------------------------------------
    // HEADER TABEL
    //--------------------------------------------------

    function headerTabel(){

        return `

        <table class="table table-bordered table-sm tabel-penduduk">

            <thead>

                <tr>

                    <th width="45">
                        No
                    </th>

                    <th width="70">
                        Foto
                    </th>

                    <th width="170">
                        NIK
                    </th>

                    <th>
                        Nama Lengkap
                    </th>

                    <th width="120">
                        SHDK
                    </th>

                    <th width="60">
                        L/P
                    </th>

                    <th width="180">
                        Tempat, Tgl Lahir
                    </th>

                    <th>
                        Pendidikan
                    </th>

                    <th>
                        Pekerjaan
                    </th>

                </tr>

            </thead>

            <tbody>

        `;

    }



    //--------------------------------------------------
    // HALAMAN PERTAMA
    //--------------------------------------------------

    html += `

    <div class="halaman">


        ${headerLaporan(

            "LAPORAN DATA SATU KARTU KELUARGA",

            halaman

        )}



        <table class="info-laporan">

            <tr>

                <td width="120">
                    Nomor KK
                </td>

                <td width="10">
                    :
                </td>

                <td>
                    ${nokk}
                </td>


                <td align="right">

                    Tanggal Cetak :

                    ${tanggalCetak}

                </td>

            </tr>

        </table>


        ${headerTabel()}

    `;



    //--------------------------------------------------
    // DATA ANGGOTA KK
    //--------------------------------------------------

    data.forEach(function(item,index){



        //------------------------------------------
        // HALAMAN BARU
        //------------------------------------------

        if(index>0 && index%perHalaman==0){


            html += `

                </tbody>

            </table>


            ${footerLaporan(data.length)}


            </div>


            <div class="page-break"></div>


            <div class="halaman">


                ${headerLaporan(

                    "LAPORAN DATA SATU KARTU KELUARGA",

                    halaman+1

                )}


                <table class="info-laporan">

                    <tr>

                        <td width="120">
                            Nomor KK
                        </td>

                        <td width="10">
                            :
                        </td>

                        <td>
                            ${nokk}
                        </td>


                        <td align="right">

                            Halaman ${halaman+1}

                        </td>

                    </tr>

                </table>


                ${headerTabel()}


            `;


            halaman++;

        }




        const d = item.split("|");



        let nikAsli = d[0];

        let nik = d[0];



        if(hideNik()){

            nik = sensorNomor(nik);

        }



        //--------------------------------------------------
        // FOTO
        //--------------------------------------------------

        let foto = 
            "assets/foto/" + nikAsli + ".jpg";



        let fotoDefault =
            d[4].toUpperCase().startsWith("L")
            ?
            "assets/img/male.jpg"
            :
            "assets/img/female.jpg";





        html += `


        <tr>


            <td class="text-center">

                ${index+1}

            </td>



            <td class="text-center">


                <img

                    src="${foto}"

                    style="
                        width:45px;
                        height:55px;
                        object-fit:cover;
                        border:1px solid #000;
                    "


                    onerror="
                        this.onerror=null;
                        this.src='${fotoDefault}';
                    "


                >


            </td>




            <td>

                ${nik}

            </td>



            <td>

                ${d[1]}

            </td>



            <td>

                ${d[6]}

            </td>



            <td class="text-center">

                ${d[4]}

            </td>



            <td>

                ${d[2]}, ${d[3]}

            </td>



            <td>

                ${d[8]}

            </td>



            <td>

                ${d[7]}

            </td>



        </tr>


        `;


    });




    //--------------------------------------------------
    // PENUTUP
    //--------------------------------------------------

    html += `


            </tbody>

        </table>



        ${footerLaporan(data.length)}



    </div>



    `;



    document.getElementById("hasilCetak").innerHTML = html;


}


/*======================================================
  SENSOR NOMOR
======================================================*/

function sensorNomor(nilai){

    if(nilai==null) return "";

    nilai = nilai.toString();

    if(nilai.length<=4){

        return nilai;

    }

    return nilai.substring(0,2)

        +

        "*".repeat(

            nilai.length-4

        )

        +

        nilai.substring(

            nilai.length-2

        );

}



/*======================================================
  STATUS SENSOR
======================================================*/

function hideNik(){

    return localStorage.getItem("hideNik")=="true";

}

function hideKK(){

    return localStorage.getItem("hideKK")=="true";

}





/*======================================================
  CETAK SEMUA PENDUDUK
======================================================*/

function cetakSemuaPenduduk(){

    fetch(

         URL +

    "?aksi=listPenduduk" +

        "&token=" + TOKEN

    )

    .then(

        response=>response.json()

    )

    .then(function(hasil){

        if(!hasil.status){

            document.getElementById(

                "hasilCetak"

            ).innerHTML=

            "<h3>Data tidak ditemukan.</h3>";

            return;

        }

        tampilSemuaPenduduk(

            hasil.data

        );

    })

    .catch(function(error){

        document.getElementById(

            "hasilCetak"

        ).innerHTML=

        error;

    });

}


function tampilSemuaPenduduk(data){

    //--------------------------------------------------
    // JUMLAH DATA PER HALAMAN
    //--------------------------------------------------

    const perHalaman = parseInt(
        localStorage.getItem("barisPerHalaman") || 20
    );

    let halaman = 1;

    let html = "";

    //--------------------------------------------------
    // TANGGAL CETAK
    //--------------------------------------------------

    const tanggalCetak = new Date().toLocaleDateString(
        "id-ID",
        {
            day:"2-digit",
            month:"long",
            year:"numeric"
        }
    );

    //--------------------------------------------------
    // HEADER HALAMAN PERTAMA
    //--------------------------------------------------

    html += `

    <div class="halaman">

        ${headerLaporan(
            "LAPORAN DATA PENDUDUK",
            halaman
        )}

        <table class="info-laporan">

            <tr>

                <td width="120">Tanggal Cetak</td>

                <td width="10">:</td>

                <td>${tanggalCetak}</td>

                <td align="right">

                    Halaman ${halaman}

                </td>

            </tr>

        </table>

        <table class="table table-bordered table-sm tabel-penduduk">

            <thead>

                <tr>

                    <th width="45">No</th>

                    <th width="170">NIK</th>

                    <th>Nama Lengkap</th>

                    <th width="170">No. KK</th>

                    <th width="60">L/P</th>

                    <th width="220">

                        Tempat, Tanggal Lahir

                    </th>

                    <th>Alamat</th>

                </tr>

            </thead>

            <tbody>

    `;

    //--------------------------------------------------
    // DATA
    //--------------------------------------------------

    data.forEach(function(item,index){

        //----------------------------------------------
        // HALAMAN BARU
        //----------------------------------------------

        if(index>0 && index%perHalaman==0){

            html += `

                    </tbody>

                </table>

                ${footerLaporan(data.length)}

            </div>

            <div class="page-break"></div>

            `;

            halaman++;

            html += `

            <div class="halaman">

                ${headerLaporan(
                    "LAPORAN DATA PENDUDUK",
                    halaman
                )}

                <table class="info-laporan">

                    <tr>

                        <td width="120">

                            Tanggal Cetak

                        </td>

                        <td width="10">:</td>

                        <td>${tanggalCetak}</td>

                        <td align="right">

                            Halaman ${halaman}

                        </td>

                    </tr>

                </table>

                <table class="table table-bordered table-sm tabel-penduduk">

                    <thead>

                        <tr>

                            <th width="45">No</th>

                            <th width="170">NIK</th>

                            <th>Nama Lengkap</th>

                            <th width="170">No. KK</th>

                            <th width="60">L/P</th>

                            <th width="220">

                                Tempat, Tanggal Lahir

                            </th>

                            <th>Alamat</th>

                        </tr>

                    </thead>

                    <tbody>

            `;

        }

        let nik = item.nik;
        let nokk = item.nokk;

        if(hideNik()) nik = sensorNomor(nik);
        if(hideKK()) nokk = sensorNomor(nokk);

        html += `

        <tr>

            <td class="text-center">${index+1}</td>

            <td>${nik}</td>

            <td>${item.nama}</td>

            <td>${nokk}</td>

            <td class="text-center">${item.jk}</td>

            <td>

                ${item.tempatlahir},

                ${item.tanggallahir}

            </td>

            <td>

                ${item.alamat}

                RT ${item.rt}

                RW ${item.rw}

            </td>

        </tr>

        `;

    });

    //--------------------------------------------------
    // TUTUP HALAMAN TERAKHIR
    //--------------------------------------------------

    html += `

            </tbody>

        </table>

        ${footerLaporan(data.length)}

    </div>

    `;

    //--------------------------------------------------
    // TAMPILKAN
    //--------------------------------------------------

    document.getElementById("hasilCetak").innerHTML = html;

}


/*======================================================
  CETAK DOKUMEN
======================================================*/

function cetakDokumen(){

    //--------------------------------------------------
    // SEMBUNYIKAN TOOLBAR
    //--------------------------------------------------

    document.getElementById(

        "toolbar"

    ).style.display="none";

    //--------------------------------------------------
    // CETAK
    //--------------------------------------------------

    window.print();

}

/*======================================================
  SETELAH CETAK
======================================================*/

window.onafterprint = function(){

    document.getElementById(

        "toolbar"

    ).style.display="block";

};


/*======================================================
  HEADER LAPORAN
======================================================*/

function headerLaporan(judul, halaman){

    return `

    <div class="header-laporan">

        <table class="table-header">

            <tr>

                <td width="90">

                    <img
                        src="assets/logo_kediri.png"
                        class="logo">

                </td>

                <td>

                    <div class="judul1">

                        PEMERINTAH KABUPATEN KEDIRI

                    </div>

                    <div class="judul2">

                        KECAMATAN SEMEN

                    </div>

                    <div class="judul3">

                        DESA SELOPANGGUNG

                    </div>

                    <div class="alamat">

                        Jl. Simpang Tiga No. 01 Desa Selopanggung

                    </div>

                </td>

            </tr>

        </table>

        <hr>

        <h3>

            ${judul}

        </h3>

        <div class="halaman">

            Halaman : ${halaman}

        </div>

    </div>

    `;

}


/*======================================================
  FOOTER LAPORAN
======================================================*/

function footerLaporan(jumlah){

    const operator =

        localStorage.getItem("namauser") || "-";

    const sekarang = new Date();

    return `

    <div class="footer-laporan">

        <hr>

        <table width="100%">

            <tr>

                <td>

                    Jumlah Data :

                    <b>${jumlah}</b>

                </td>

                <td align="right">

                    Dicetak :

                    ${sekarang.toLocaleDateString("id-ID")}

                    ${sekarang.toLocaleTimeString("id-ID")}

                    <br>

                    Operator :

                    <b>${operator}</b>

                </td>

            </tr>

        </table>

    </div>

    `;

}
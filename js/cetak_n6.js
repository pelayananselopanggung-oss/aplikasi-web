/*======================================================
  LOAD HALAMAN
======================================================*/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        cekLogin();
        cekAksesNikah();

        tampilN6();

    }

);

/*======================================================
  LOCAL STORAGE
======================================================*/

function ls(key){

    return localStorage.getItem(key) || "";

}

/*======================================================
  FORMAT TANGGAL
======================================================*/

function formatTanggal(tanggal){

    if(!tanggal) return "";

    const t = new Date(tanggal);

    const bulan = [

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

    return (

        t.getDate() +

        " " +

        bulan[t.getMonth()] +

        " " +

        t.getFullYear()

    );

}

/*======================================================
  EDIT
======================================================*/

function editN6(){

    window.location.href = "preview_n6.html";

}

/*======================================================
  CETAK
======================================================*/

function cetak(){

    window.print();

}

/*======================================================
  N6
======================================================*/

async function tampilN6(){

    footerN6();

    //--------------------------------------------------
    // QR
    //--------------------------------------------------

    document.getElementById("qrCode").src =

        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +

        encodeURIComponent(ls("kodeVerifikasi"));



    //--------------------------------------------------
    // NOMOR SURAT
    //--------------------------------------------------

    const tahun = new Date().getFullYear();

    document.getElementById("nomorSurat").innerHTML =

        "475/" +

        ls("nomorAgenda") +

        "/418.60.04/" +

        tahun;


    //--------------------------------------------------
    // TANGGAL
    //--------------------------------------------------

    document.getElementById("tanggalSurat").innerHTML =

        formatTanggal(new Date());


    //--------------------------------------------------
    // PEJABAT
    //--------------------------------------------------

    document.getElementById("namaPejabat").innerHTML =

        ls("namaPejabat");


    document.getElementById("nipPejabat").innerHTML =

        ls("nipPejabat");


    document.getElementById("jabatanTtd").innerHTML =

        ls("jabatanPejabat");



 //--------------------------------------------------
// HUBUNGAN
//--------------------------------------------------

const hubungan =

    ls("jenisN6")=="DUDA"

    ? "istri"

    : "suami";


const binBinti =

    ls("jenisN6")=="DUDA"

    ? "Bin"

    : "Binti";


const namaAyah =

    ls("jenisN6")=="DUDA"

    ? ls("namaAyahSuami")

    : ls("namaAyahIstri");


//--------------------------------------------------
// ISI SURAT
//--------------------------------------------------

document.getElementById("isiSurat").innerHTML = `

Yang bertanda tangan di bawah ini menerangkan dengan sesungguhnya bahwa :

<br><br>

<table class="identitasUtama">

<tr>

<td class="no">1.</td>

<td class="label">Nama lengkap dan alias</td>

<td>:</td>

<td>${ls("namaPasangan")}</td>

</tr>

<tr>

<td>2.</td>

<td>Bin / Binti</td>

<td>:</td>

<td>${ls("binPasangan")}</td>

</tr>

<tr>

<td>3.</td>

<td>Nomor Induk Kependudukan (NIK)</td>

<td>:</td>

<td>${ls("nikPasangan")}</td>

</tr>

<tr>

<td>4.</td>

<td>Tempat dan tanggal lahir</td>

<td>:</td>

<td>

${ls("tempatLahirPasangan")},

${formatTanggal(ls("tanggalLahirPasangan"))}

</td>

</tr>

<tr>

<td>5.</td>

<td>Kewarganegaraan</td>

<td>:</td>

<td>INDONESIA</td>

</tr>

<tr>

<td>6.</td>

<td>Agama</td>

<td>:</td>

<td>${ls("agamaPasangan")}</td>

</tr>

<tr>

<td>7.</td>

<td>Pekerjaan</td>

<td>:</td>

<td>${ls("pekerjaanPasangan")}</td>

</tr>

<tr>

<td>8.</td>

<td>Alamat</td>

<td>:</td>

<td>${ls("alamatPasangan")}</td>

</tr>

</table>

<br>

<table class="identitasOrtu">

<tr>

<td class="label">Telah meninggal dunia pada tanggal</td>

<td>:</td>

<td>${formatTanggal(ls("tanggalMeninggal"))}</td>

<tr>

<td class="label">di</td>

<td>:</td>

<td>${ls("tempatMeninggal")}</td>

</tr>

</table>

<br>

Yang bersangkutan adalah <b>${hubungan}</b> dari :

<br><br>

<table class="identitasUtama">

<tr>

<td class="no">1.</td>

<td class="label">Nama lengkap dan alias</td>

<td>:</td>

<td>${ls("namaPemohonN6")}</td>

</tr>

<tr>

<td>2.</td>

<td>${binBinti}</td>

<td>:</td>

<td>${namaAyah}</td>

</tr>

<tr>

<td>3.</td>

<td>Nomor Induk Kependudukan (NIK)</td>

<td>:</td>

<td>${ls("nikPemohonN6")}</td>

</tr>

<tr>

<td>4.</td>

<td>Tempat dan tanggal lahir</td>

<td>:</td>

<td>${ls("ttlPemohonN6")}</td>

</tr>

<tr>

<td>5.</td>

<td>Kewarganegaraan</td>

<td>:</td>

<td>INDONESIA</td>

</tr>

<tr>

<td>6.</td>

<td>Agama</td>

<td>:</td>

<td>${ls("agamaPemohonN6")}</td>

</tr>

<tr>

<td>7.</td>

<td>Pekerjaan</td>

<td>:</td>

<td>${ls("pekerjaanPemohonN6")}</td>

</tr>

<tr>

<td>8.</td>

<td>Alamat</td>

<td>:</td>

<td>${ls("alamatPemohonN6")}</td>

</tr>

</table>

<br><br>

<p style="text-align:justify">

Demikian surat keterangan ini dibuat dengan mengingat sumpah jabatan dan untuk dipergunakan seperluanya.

</p>

`;

await loadTandaTangan();

}


/*======================================================
  FOOTER N6
======================================================*/

function footerN6(){

    document.getElementById("footerSurat").innerHTML = `

        <table class="ttd">

            <tr>

                <td style="width:50%"></td>

                <td
                    style="width:50%"
                    class="text-center">

                   Kediri, <span id="tanggalSurat"></span>

                    <br>

                    <div id="jabatanTtd"></div>

                    <br><br><br><br>

                    <b>

                        <u id="namaPejabat"></u>

                    </b>

                    <br>

                    -

                    <span id="nipPejabat"></span>

                </td>

            </tr>

        </table>

    `;

}


/*======================================================
  TANDA TANGAN
======================================================*/

async function tampilTandaTangan(){

    await loadTandaTangan();

}

/*======================================================
  LOAD TANDA TANGAN
======================================================*/

async function loadTandaTangan(){

    const ttd = await getTandaTangan();

    if(!ttd) return;

    const jabatan = document.getElementById("jabatanTtd");
    const nama     = document.getElementById("namaPejabat");
    const nip      = document.getElementById("nipPejabat");

    if(!jabatan || !nama || !nip){

        console.warn("Elemen tanda tangan tidak ditemukan.");

        return;

    }

    if(ttd.statusJabatan=="KADES"){

        jabatan.innerHTML =
            "KEPALA DESA SELOPANGGUNG";

        nama.innerHTML =
            ttd.namaKades;

        nip.innerHTML =
            ttd.nipKades;

    }else{

        jabatan.innerHTML =
            "a.n. KEPALA DESA SELOPANGGUNG<br>SEKRETARIS DESA";

        nama.innerHTML =
            ttd.namaSekdes;

        nip.innerHTML =
            ttd.nipSekdes;

    }

}



/*======================================================
  LOAD HALAMAN
======================================================*/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        cekLogin();
        cekAksesNikah();

        loadSurat();

    }

);

/*======================================================
  LOGIN
======================================================*/

function cekLogin(){

    const username = localStorage.getItem("username");

    if(username == null){

        window.location.href = "index.html";

    }

}

/*======================================================
  LOCAL STORAGE
======================================================*/

function ls(key){

    return localStorage.getItem(key) || "";

}

/*======================================================
  KEMBALI
======================================================*/

function kembali(){

    window.close();

}

/*======================================================
  LOAD SURAT
======================================================*/

async function loadSurat(){

    //--------------------------------------------------
    // JENIS N5
    //--------------------------------------------------

    const jenis = localStorage.getItem("jenisN5");

    switch(jenis){

        case "suami":

            await tampilN5Suami();

        break;

        case "istri":

            await tampilN5Istri();

        break;

        default:

            alert("Jenis N5 belum dipilih.");

    }

}

/*======================================================
  N5 CALON SUAMI
======================================================*/

async function tampilN5Suami(){

    //--------------------------------------------------
    // QR
    //--------------------------------------------------

    document.getElementById("qrCode").src =

        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +

        encodeURIComponent(ls("kodeVerifikasi"));

    //--------------------------------------------------
    // TANGGAL
    //--------------------------------------------------

    const tanggal =

        "Kediri, " +

        formatTanggal(new Date());

    document.getElementById("tanggalIbu").innerHTML =

        tanggal;

    //--------------------------------------------------
    // TTD
    //--------------------------------------------------

    document.getElementById("ttdAyah").innerHTML =

        ls("namaAyahSuami");

    document.getElementById("ttdIbu").innerHTML =

        ls("namaIbuSuami");

    //--------------------------------------------------
    // ISI SURAT
    //--------------------------------------------------

    document.getElementById("isiSurat").innerHTML = `

Yang bertandatangan di bawah ini :

<br><br>

<b>I. Ayah :</b>

<br><br>

<table class="identitasUtama">

<tr>

<td class="no">1.</td>

<td class="label">Nama lengkap dan alias</td>

<td>:</td>

<td>${ls("namaAyahSuami")}</td>

</tr>

<tr>

<td>2.</td>

<td>Nomor Induk Kependudukan (NIK)</td>

<td>:</td>

<td>${ls("nikAyahSuami")}</td>

</tr>

<tr>

<td>3.</td>

<td>Tempat dan tanggal lahir</td>

<td>:</td>

<td>

${ls("tempatLahirAyahSuami")},

${formatTanggal(ls("tanggalLahirAyahSuami"))}

</td>

</tr>

<tr>

<td>4.</td>

<td>Kewarganegaraan</td>

<td>:</td>

<td>INDONESIA</td>

</tr>

<tr>

<td>5.</td>

<td>Agama</td>

<td>:</td>

<td>${ls("agamaAyahSuami")}</td>

</tr>

<tr>

<td>6.</td>

<td>Pekerjaan</td>

<td>:</td>

<td>${ls("pekerjaanAyahSuami")}</td>

</tr>

<tr>

<td>7.</td>

<td>Alamat</td>

<td>:</td>

<td>${ls("alamatAyahSuami")}</td>

</tr>

</table>

<br><br>

<b>II. Ibu :</b>

<br><br>

<table class="identitasUtama">

<tr>

<td class="no">1.</td>

<td class="label">Nama lengkap dan alias</td>

<td>:</td>

<td>${ls("namaIbuSuami")}</td>

</tr>

<tr>

<td>2.</td>

<td>Nomor Induk Kependudukan (NIK)</td>

<td>:</td>

<td>${ls("nikIbuSuami")}</td>

</tr>

<tr>

<td>3.</td>

<td>Tempat dan tanggal lahir</td>

<td>:</td>

<td>

${ls("tempatLahirIbuSuami")},

${formatTanggal(ls("tanggalLahirIbuSuami"))}

</td>

</tr>

<tr>

<td>4.</td>

<td>Kewarganegaraan</td>

<td>:</td>

<td>INDONESIA</td>

</tr>

<tr>

<td>5.</td>

<td>Agama</td>

<td>:</td>

<td>${ls("agamaIbuSuami")}</td>

</tr>

<tr>

<td>6.</td>

<td>Pekerjaan</td>

<td>:</td>

<td>${ls("pekerjaanIbuSuami")}</td>

</tr>

<tr>

<td>7.</td>

<td>Alamat</td>

<td>:</td>

<td>${ls("alamatIbuSuami")}</td>

</tr>

</table>

<br><br>

Dengan ini memberikan izin kepada anak kami :

<br><br>

<table class="identitasUtama">

<tr>

<td class="no">1.</td>

<td class="label">Nama lengkap dan alias</td>

<td>:</td>

<td>${ls("namaSuami")}</td>

</tr>

<tr>

<td>2.</td>

<td>Bin</td>

<td>:</td>

<td>${ls("namaAyahSuami")}</td>

</tr>

<tr>

<td>3.</td>

<td>Nomor Induk Kependudukan (NIK)</td>

<td>:</td>

<td>${ls("nikSuami")}</td>

</tr>

<tr>

<td>4.</td>

<td>Tempat dan tanggal lahir</td>

<td>:</td>

<td>

${ls("tempatLahirSuami")},

${formatTanggal(ls("tanggalLahirSuami"))}

</td>

</tr>

<tr>

<td>5.</td>

<td>Agama</td>

<td>:</td>

<td>${ls("agamaSuami")}</td>

</tr>

<tr>

<td>6.</td>

<td>Pekerjaan</td>

<td>:</td>

<td>${ls("pekerjaanSuami")}</td>

</tr>

<tr>

<td>7.</td>

<td>Alamat</td>

<td>:</td>

<td>${ls("alamatSuami")}</td>

</tr>

</table>

<br>

Untuk melangsungkan perkawinan dengan :

<br><br>

<table class="identitasUtama">

<tr>

<td class="no">1.</td>

<td class="label">Nama lengkap dan alias</td>

<td>:</td>

<td>${ls("namaIstri")}</td>

</tr>

<tr>

<td>2.</td>

<td>Binti</td>

<td>:</td>

<td>${ls("namaAyahIstri")}</td>

</tr>

<tr>

<td>3.</td>

<td>Nomor Induk Kependudukan (NIK)</td>

<td>:</td>

<td>${ls("nikIstri")}</td>

</tr>

<tr>

<td>4.</td>

<td>Tempat dan tanggal lahir</td>

<td>:</td>

<td>

${ls("tempatLahirIstri")},

${formatTanggal(ls("tanggalLahirIstri"))}

</td>

</tr>

<tr>

<td>5.</td>

<td>Agama</td>

<td>:</td>

<td>${ls("agamaIstri")}</td>

</tr>

<tr>

<td>6.</td>

<td>Pekerjaan</td>

<td>:</td>

<td>${ls("pekerjaanIstri")}</td>

</tr>

<tr>

<td>7.</td>

<td>Alamat</td>

<td>:</td>

<td>${ls("alamatIstri")}</td>

</tr>

</table>

<br><br>

<p style="text-align:justify">

Demikian surat izin ini dibuat dengan sebenarnya untuk dipergunakan sebagaimana mestinya.

</p>

`;

}

/*======================================================
  N5 CALON ISTRI
======================================================*/

async function tampilN5Istri(){


    //--------------------------------------------------
    // QR
    //--------------------------------------------------

    document.getElementById("qrCode").src =

    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +

    encodeURIComponent(ls("kodeVerifikasi"));



    //--------------------------------------------------
    // TANGGAL
    //--------------------------------------------------

    const tanggal =

    "Kediri, " +

    formatTanggal(new Date());

    document.getElementById("tanggalIbu").innerHTML = tanggal;



    //--------------------------------------------------
    // TTD
    //--------------------------------------------------

    document.getElementById("ttdAyah").innerHTML =

    ls("namaAyahIstri");


    document.getElementById("ttdIbu").innerHTML =

    ls("namaIbuIstri");



    //--------------------------------------------------
    // ISI SURAT
    //--------------------------------------------------

    document.getElementById("isiSurat").innerHTML = `


Yang bertandatangan di bawah ini :


<br><br>


<b>I. Ayah :</b>


<br><br>


<table class="identitasUtama">


<tr>
<td class="no">1.</td>
<td class="label">Nama lengkap dan alias</td>
<td>:</td>
<td>${ls("namaAyahIstri")}</td>
</tr>


<tr>
<td>2.</td>
<td>Nomor Induk Kependudukan (NIK)</td>
<td>:</td>
<td>${ls("nikAyahIstri")}</td>
</tr>


<tr>
<td>3.</td>
<td>Tempat dan tanggal lahir</td>
<td>:</td>
<td>
${ls("tempatLahirAyahIstri")},
${formatTanggal(ls("tanggalLahirAyahIstri"))}
</td>
</tr>


<tr>
<td>4.</td>
<td>Kewarganegaraan</td>
<td>:</td>
<td>INDONESIA</td>
</tr>


<tr>
<td>5.</td>
<td>Agama</td>
<td>:</td>
<td>${ls("agamaAyahIstri")}</td>
</tr>


<tr>
<td>6.</td>
<td>Pekerjaan</td>
<td>:</td>
<td>${ls("pekerjaanAyahIstri")}</td>
</tr>


<tr>
<td>7.</td>
<td>Alamat</td>
<td>:</td>
<td>${ls("alamatAyahIstri")}</td>
</tr>


</table>


<br><br>


<b>II. Ibu :</b>


<br><br>


<table class="identitasUtama">


<tr>
<td class="no">1.</td>
<td class="label">Nama lengkap dan alias</td>
<td>:</td>
<td>${ls("namaIbuIstri")}</td>
</tr>


<tr>
<td>2.</td>
<td>Nomor Induk Kependudukan (NIK)</td>
<td>:</td>
<td>${ls("nikIbuIstri")}</td>
</tr>


<tr>
<td>3.</td>
<td>Tempat dan tanggal lahir</td>
<td>:</td>
<td>
${ls("tempatLahirIbuIstri")},
${formatTanggal(ls("tanggalLahirIbuIstri"))}
</td>
</tr>


<tr>
<td>4.</td>
<td>Kewarganegaraan</td>
<td>:</td>
<td>INDONESIA</td>
</tr>


<tr>
<td>5.</td>
<td>Agama</td>
<td>:</td>
<td>${ls("agamaIbuIstri")}</td>
</tr>


<tr>
<td>6.</td>
<td>Pekerjaan</td>
<td>:</td>
<td>${ls("pekerjaanIbuIstri")}</td>
</tr>


<tr>
<td>7.</td>
<td>Alamat</td>
<td>:</td>
<td>${ls("alamatIbuIstri")}</td>
</tr>


</table>


<br><br>


Dengan ini memberikan izin kepada anak kami :


<br><br>


<table class="identitasUtama">


<tr>
<td class="no">1.</td>
<td class="label">Nama lengkap dan alias</td>
<td>:</td>
<td>${ls("namaIstri")}</td>
</tr>


<tr>
<td>2.</td>
<td>Binti</td>
<td>:</td>
<td>${ls("namaAyahIstri")}</td>
</tr>


<tr>
<td>3.</td>
<td>Nomor Induk Kependudukan (NIK)</td>
<td>:</td>
<td>${ls("nikIstri")}</td>
</tr>


<tr>
<td>4.</td>
<td>Tempat dan tanggal lahir</td>
<td>:</td>
<td>
${ls("tempatLahirIstri")},
${formatTanggal(ls("tanggalLahirIstri"))}
</td>
</tr>


<tr>
<td>5.</td>
<td>Agama</td>
<td>:</td>
<td>${ls("agamaIstri")}</td>
</tr>


<tr>
<td>6.</td>
<td>Pekerjaan</td>
<td>:</td>
<td>${ls("pekerjaanIstri")}</td>
</tr>


<tr>
<td>7.</td>
<td>Alamat</td>
<td>:</td>
<td>${ls("alamatIstri")}</td>
</tr>


</table>


<br><br>


Untuk melangsungkan perkawinan dengan :


<br><br>


<table class="identitasUtama">


<tr>
<td class="no">1.</td>
<td class="label">Nama lengkap dan alias</td>
<td>:</td>
<td>${ls("namaSuami")}</td>
</tr>


<tr>
<td>2.</td>
<td>Bin</td>
<td>:</td>
<td>${ls("namaAyahSuami")}</td>
</tr>


<tr>
<td>3.</td>
<td>Nomor Induk Kependudukan (NIK)</td>
<td>:</td>
<td>${ls("nikSuami")}</td>
</tr>


<tr>
<td>4.</td>
<td>Tempat dan tanggal lahir</td>
<td>:</td>
<td>
${ls("tempatLahirSuami")},
${formatTanggal(ls("tanggalLahirSuami"))}
</td>
</tr>


<tr>
<td>5.</td>
<td>Agama</td>
<td>:</td>
<td>${ls("agamaSuami")}</td>
</tr>


<tr>
<td>6.</td>
<td>Pekerjaan</td>
<td>:</td>
<td>${ls("pekerjaanSuami")}</td>
</tr>


<tr>
<td>7.</td>
<td>Alamat</td>
<td>:</td>
<td>${ls("alamatSuami")}</td>
</tr>


</table>


<br><br>


<p style="text-align:justify">

Demikian surat izin ini dibuat dengan sebenarnya untuk dipergunakan sebagaimana mestinya.

</p>


`;

}
/*======================================================
  LOAD HALAMAN
======================================================*/

document.addEventListener("DOMContentLoaded", function(){

    cekLogin();
    cekAksesNikah();

    loadSurat();

});


/*======================================================
  LOAD SURAT
======================================================*/

async function loadSurat(){

    //--------------------------------------------------
    // JENIS N1
    //--------------------------------------------------

    const jenis = localStorage.getItem("jenisN1");

    switch(jenis){

        case "suami":

            await tampilN1Suami();

        break;

        case "istri":

            await tampilN1Istri();

        break;

        default:

            alert("Jenis N1 belum dipilih.");

    }

}

/*======================================================
  HEADER N1
======================================================*/

function headerN1(){

    //--------------------------------------------------
    // LAMPIRAN
    //--------------------------------------------------

    document.getElementById("lampiranSurat").innerHTML = `

        LAMPIRAN V<br>
        KEPUTUSAN DIREKTUR JENDERAL BIMBINGAN MASYARAKAT ISLAM<br>
        NOMOR 473 TAHUN 2020<br>
        TENTANG<br>
        PETUNJUK TEKNIS PELAKSANAAN PENCATATAN PERNIKAHAN

    `;

    //--------------------------------------------------
    // JUDUL
    //--------------------------------------------------

    document.getElementById("judulSurat").innerHTML =

        "FORMULIR PENGANTAR NIKAH";

    //--------------------------------------------------
    // MODEL
    //--------------------------------------------------

    document.getElementById("modelSurat").innerHTML =

        "Model N1";

    //--------------------------------------------------
    // HEADER
    //--------------------------------------------------

    document.getElementById("headerSurat").innerHTML = `

        <table class="header">

            <tr>

                <td class="label">

                    KANTOR DESA

                </td>

                <td>

                    : SELOPANGGUNG

                </td>

            </tr>

            <tr>

                <td>

                    KECAMATAN

                </td>

                <td>

                    : SEMEN

                </td>

            </tr>

            <tr>

                <td>

                    KABUPATEN

                </td>

                <td>

                    : KEDIRI

                </td>

            </tr>

        </table>

        <br>

        <div class="judul">

            PENGANTAR NIKAH

        </div>

    `;

}


/*======================================================
  FOOTER N1
======================================================*/

function footerN1(){

    document.getElementById("footerSurat").innerHTML = `

        <table class="ttd">

            <tr>

                <td style="width:50%"></td>

                <td
                    style="width:50%"
                    class="text-center">

                    <div id="tanggalSurat"></div>

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
  N1 CALON SUAMI
======================================================*/

async function tampilN1Suami(){


    //--------------------------------------------------
    // LOAD HEADER & FOOTER N1
    //--------------------------------------------------

    headerN1();
    footerN1();

    //--------------------------------------------------
    // NOMOR SURAT
    //--------------------------------------------------

    document.getElementById("nomorSurat").innerHTML =

        "Nomor : 474/" +
        ls("nomorAgenda") +
        "/418.60.04/" +
        new Date().getFullYear();

    //--------------------------------------------------
    // STATUS
    //--------------------------------------------------

    let status = "Jejaka";

    if(

        ls("statusKawinSuami") == "Cerai Hidup" ||

        ls("statusKawinSuami") == "Cerai Mati"

    ){

        status = "Duda";

    }

    //--------------------------------------------------
    // ISI SURAT
    //--------------------------------------------------

    document.getElementById("isiSurat").innerHTML = `

Yang bertandatangan di bawah ini menjelaskan dengan sesungguhnya bahwa :

<br><br>

<table class="identitasUtama">

<tr>

<td class="no">1.</td>

<td class="label">
Nama lengkap dan alias
</td>

<td>:</td>

<td>

${ls("namaSuami")}

</td>

</tr>

<tr>

<td>2.</td>

<td>
Nomor Induk Kependudukan (NIK)
</td>

<td>:</td>

<td>

${ls("nikSuami")}

</td>

</tr>

<tr>

<td>3.</td>

<td>
Jenis Kelamin
</td>

<td>:</td>

<td>

Laki-Laki

</td>

</tr>

<tr>

<td>4.</td>

<td>
Tempat dan tanggal lahir
</td>

<td>:</td>

<td>

${ls("tempatLahirSuami")},
${formatTanggal(ls("tanggalLahirSuami"))}

</td>

</tr>

<tr>

<td>5.</td>

<td>
Kewarganegaraan
</td>

<td>:</td>

<td>

${ls("kewarganegaraanSuami") || "INDONESIA"}

</td>

</tr>

<tr>

<td>6.</td>

<td>
Agama
</td>

<td>:</td>

<td>

${ls("agamaSuami")}

</td>

</tr>

<tr>

<td>7.</td>

<td>
Pekerjaan
</td>

<td>:</td>

<td>

${ls("pekerjaanSuami")}

</td>

</tr>

<tr>

<td>8.</td>

<td>
Alamat
</td>

<td>:</td>

<td>

${ls("alamatSuami")}

</td>

</tr>

<tr>

<td>9.</td>

<td>
Status Perkawinan
</td>

<td>:</td>

<td>

a. Laki-laki :

${statusSuami()=="Jejaka"
? "<b>✔ Jejaka</b> &nbsp;&nbsp;&nbsp; Duda"
: "Jejaka &nbsp;&nbsp;&nbsp; <b>✔ Duda</b>"}

<br>

Beristri ke :

....................

<br><br>

b. Perempuan :

-

</td>

</tr>

</table>

<br>

Adalah benar anak dari pernikahan seorang pria :

<br><br>

<table class="identitasOrtu">

<tr>

<td class="label">
Nama lengkap dan alias
</td>

<td>:</td>

<td>

${ls("namaAyahSuami")}

</td>

</tr>

<tr>

<td>
Nomor Induk Kependudukan (NIK)
</td>

<td>:</td>

<td>

${ls("nikAyahSuami")}

</td>

</tr>

<tr>

<td>
Tempat dan tanggal lahir
</td>

<td>:</td>

<td>

${ls("tempatLahirAyahSuami")},
${formatTanggal(ls("tanggalLahirAyahSuami"))}

</td>

</tr>

<tr>

<td>
Kewarganegaraan
</td>

<td>:</td>

<td>

INDONESIA

</td>

</tr>

<tr>

<td>
Agama
</td>

<td>:</td>

<td>

${ls("agamaAyahSuami")}

</td>

</tr>

<tr>

<td>
Pekerjaan
</td>

<td>:</td>

<td>

${ls("pekerjaanAyahSuami")}

</td>

</tr>

<tr>

<td>
Alamat
</td>

<td>:</td>

<td>

${ls("alamatAyahSuami")}

</td>

</tr>

</table>

<br>

Dengan seorang wanita :

<br><br>

<table class="identitasOrtu">

<tr>

<td class="label">
Nama lengkap dan alias
</td>

<td>:</td>

<td>

${ls("namaIbuSuami")}

</td>

</tr>

<tr>

<td>
Nomor Induk Kependudukan (NIK)
</td>

<td>:</td>

<td>

${ls("nikIbuSuami")}

</td>

</tr>

<tr>

<td>
Tempat dan tanggal lahir
</td>

<td>:</td>

<td>

${ls("tempatLahirIbuSuami")},
${formatTanggal(ls("tanggalLahirIbuSuami"))}

</td>

</tr>

<tr>

<td>
Kewarganegaraan
</td>

<td>:</td>

<td>

INDONESIA

</td>

</tr>

<tr>

<td>
Agama
</td>

<td>:</td>

<td>

${ls("agamaIbuSuami")}

</td>

</tr>

<tr>

<td>
Pekerjaan
</td>

<td>:</td>

<td>

${ls("pekerjaanIbuSuami")}

</td>

</tr>

<tr>

<td>
Alamat
</td>

<td>:</td>

<td>

${ls("alamatIbuSuami")}

</td>

</tr>

</table>

<br><br>

Demikian surat pengantar ini dibuat dengan mengingat sumpah jabatan dan untuk dipergunakan sebagaimana mestinya.

`;

    //--------------------------------------------------
    // TANGGAL SURAT
    //--------------------------------------------------

    document.getElementById("tanggalSurat").innerHTML =

        "Selopanggung, " +
        formatTanggal(new Date());

    //--------------------------------------------------
    // QR VERIFIKASI
    //--------------------------------------------------

    document.getElementById("qrCode").src =

        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +

        encodeURIComponent(ls("kodeVerifikasi"));

    //--------------------------------------------------
    // TANDA TANGAN
    //--------------------------------------------------

    await loadTandaTangan();

}





/*======================================================
  N1 CALON ISTRI
======================================================*/

async function tampilN1Istri(){

    //--------------------------------------------------
    // LOAD HEADER & FOOTER N1
    //--------------------------------------------------

    headerN1();
    footerN1();


    //--------------------------------------------------
    // NOMOR SURAT
    //--------------------------------------------------

    document.getElementById("nomorSurat").innerHTML =

        "Nomor : 474/" +
        ls("nomorAgenda") +
        "/418.60.04/" +
        new Date().getFullYear();

    //--------------------------------------------------
    // STATUS
    //--------------------------------------------------

    let status = "Perawan";

    if(

        ls("statusKawinIstri") == "Cerai Hidup" ||

        ls("statusKawinIstri") == "Cerai Mati"

    ){

        status = "Janda";

    }

    //--------------------------------------------------
    // ISI SURAT
    //--------------------------------------------------

    document.getElementById("isiSurat").innerHTML = `

Yang bertandatangan di bawah ini menjelaskan dengan sesungguhnya bahwa :

<br><br>

<table class="identitasUtama">

<tr>

<td class="no">1.</td>

<td class="label">
Nama lengkap dan alias
</td>

<td>:</td>

<td>

${ls("namaIstri")}

</td>

</tr>

<tr>

<td>2.</td>

<td>
Nomor Induk Kependudukan (NIK)
</td>

<td>:</td>

<td>

${ls("nikIstri")}

</td>

</tr>

<tr>

<td>3.</td>

<td>
Jenis Kelamin
</td>

<td>:</td>

<td>

Perempuan

</td>

</tr>

<tr>

<td>4.</td>

<td>
Tempat dan tanggal lahir
</td>

<td>:</td>

<td>

${ls("tempatLahirIstri")},
${formatTanggal(ls("tanggalLahirIstri"))}

</td>

</tr>

<tr>

<td>5.</td>

<td>
Kewarganegaraan
</td>

<td>:</td>

<td>

${ls("kewarganegaraanIstri") || "INDONESIA"}

</td>

</tr>

<tr>

<td>6.</td>

<td>
Agama
</td>

<td>:</td>

<td>

${ls("agamaIstri")}

</td>

</tr>

<tr>

<td>7.</td>

<td>
Pekerjaan
</td>

<td>:</td>

<td>

${ls("pekerjaanIstri")}

</td>

</tr>

<tr>

<td>8.</td>

<td>
Alamat
</td>

<td>:</td>

<td>

${ls("alamatIstri")}

</td>

</tr>

<tr>

<td>9.</td>

<td>
Status Perkawinan
</td>

<td>:</td>

<td>

a. Laki-laki :

-

<br><br>

b. Perempuan :

${status=="Perawan"
? "<b>✔ Perawan</b> &nbsp;&nbsp;&nbsp; Janda"
: "Perawan &nbsp;&nbsp;&nbsp; <b>✔ Janda</b>"}

</td>

</tr>

</table>

<br>

Adalah benar anak dari pernikahan seorang pria :

<br><br>

<table class="identitasOrtu">

<tr>

<td class="label">
Nama lengkap dan alias
</td>

<td>:</td>

<td>

${ls("namaAyahIstri")}

</td>

</tr>

<tr>

<td>
Nomor Induk Kependudukan (NIK)
</td>

<td>:</td>

<td>

${ls("nikAyahIstri")}

</td>

</tr>

<tr>

<td>
Tempat dan tanggal lahir
</td>

<td>:</td>

<td>

${ls("tempatLahirAyahIstri")},
${formatTanggal(ls("tanggalLahirAyahIstri"))}

</td>

</tr>

<tr>

<td>
Kewarganegaraan
</td>

<td>:</td>

<td>

INDONESIA

</td>

</tr>

<tr>

<td>
Agama
</td>

<td>:</td>

<td>

${ls("agamaAyahIstri")}

</td>

</tr>

<tr>

<td>
Pekerjaan
</td>

<td>:</td>

<td>

${ls("pekerjaanAyahIstri")}

</td>

</tr>

<tr>

<td>
Alamat
</td>

<td>:</td>

<td>

${ls("alamatAyahIstri")}

</td>

</tr>

</table>

<br>

Dengan seorang wanita :

<br><br>

<table class="identitasOrtu">

<tr>

<td class="label">
Nama lengkap dan alias
</td>

<td>:</td>

<td>

${ls("namaIbuIstri")}

</td>

</tr>

<tr>

<td>
Nomor Induk Kependudukan (NIK)
</td>

<td>:</td>

<td>

${ls("nikIbuIstri")}

</td>

</tr>

<tr>

<td>
Tempat dan tanggal lahir
</td>

<td>:</td>

<td>

${ls("tempatLahirIbuIstri")},
${formatTanggal(ls("tanggalLahirIbuIstri"))}

</td>

</tr>

<tr>

<td>
Kewarganegaraan
</td>

<td>:</td>

<td>

INDONESIA

</td>

</tr>

<tr>

<td>
Agama
</td>

<td>:</td>

<td>

${ls("agamaIbuIstri")}

</td>

</tr>

<tr>

<td>
Pekerjaan
</td>

<td>:</td>

<td>

${ls("pekerjaanIbuIstri")}

</td>

</tr>

<tr>

<td>
Alamat
</td>

<td>:</td>

<td>

${ls("alamatIbuIstri")}

</td>

</tr>

</table>

<br><br>

Demikian surat pengantar ini dibuat dengan mengingat sumpah jabatan dan untuk dipergunakan sebagaimana mestinya.

`;

    //--------------------------------------------------
    // TANGGAL SURAT
    //--------------------------------------------------

    document.getElementById("tanggalSurat").innerHTML =

        "Selopanggung, " +
        formatTanggal(new Date());

    //--------------------------------------------------
    // QR VERIFIKASI
    //--------------------------------------------------

    document.getElementById("qrCode").src =

        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +

        encodeURIComponent(ls("kodeVerifikasi"));

    //--------------------------------------------------
    // TANDA TANGAN
    //--------------------------------------------------

    await loadTandaTangan();

}




/*======================================================
  N3
======================================================*/

async function tampilN3(){

    let html = "";

    document.getElementById("isiSurat").innerHTML = html;

    await tampilTandaTangan();

}


/*======================================================
  N4
======================================================*/

async function tampilN4(){

    let html = "";

    document.getElementById("isiSurat").innerHTML = html;

    await tampilTandaTangan();

}


/*======================================================
  N5
======================================================*/

async function tampilN5(){

    let html = "";

    document.getElementById("isiSurat").innerHTML = html;

    await tampilTandaTangan();

}


/*======================================================
  STATUS PERKAWINAN
======================================================*/

function statusSuami(){

    const sp = ls("statusKawinSuami").toUpperCase();

    if(sp=="BELUM KAWIN"){

        return "JEJAKA";

    }

    if(sp=="CERAI HIDUP" || sp=="CERAI MATI"){

        return "DUDA";

    }

    return "";

}

function statusIstri(){

    const sp = ls("statusKawinIstri").toUpperCase();

    if(sp=="BELUM KAWIN"){

        return "PERAWAN";

    }

    if(sp=="CERAI HIDUP" || sp=="CERAI MATI"){

        return "JANDA";

    }

    return "";

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



/*======================================================
  KEMBALI
======================================================*/

function kembali(){

    window.close();

}
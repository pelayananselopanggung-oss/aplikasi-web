/*======================================================
  LOAD HALAMAN
======================================================*/

document.addEventListener("DOMContentLoaded", function(){

    cekLogin();
    cekAksesNikah();

    tampilN2();

});


/*======================================================
  HEADER N2
======================================================*/

function headerN2(){

    document.getElementById("judulSurat").innerHTML =

        "FORMULIR PERMOHONAN KEHENDAK NIKAH";

    document.getElementById("modelSurat").innerHTML =

        "Model N2";


}


/*======================================================
  FOOTER N2
======================================================*/

function footerN2(){


    document.getElementById("namaPemohon").innerHTML =

        ls("namaSuami");


    document.getElementById("qrCode").src =

        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +

        encodeURIComponent(ls("kodeVerifikasi"));

}


/*======================================================
  N2
======================================================*/

async function tampilN2(){

    headerN2();

    footerN2();

    let html = `

<div style="margin-top:10px">

Perihal : Permohonan kehendak nikah

<br><br>

Kepada yth,

<br>

Kepala KUA Kecamatan/PPN LN

<br>

di .....................................

<br><br><br>

<div style="padding-left:60px">

Dengan hormat, kami mengajukan permohonan kehendak nikah untuk atas nama :

</div>

<br>

<table class="identitasN2">

<tr>

<td class="label">

Calon suami

</td>

<td class="titik">:</td>

<td>

${ls("namaSuami")}

</td>

</tr>

<tr>

<td>

Calon istri

</td>

<td>:</td>

<td>

${ls("namaIstri")}

</td>

</tr>

<tr>

<td>

Hari /Tanggal/Jam

</td>

<td>:</td>

<td>

${ls("hariAkad")},
${formatTanggal(ls("tanggalAkad"))},
${ls("jamAkad")}

</td>

</tr>

<tr>

<td>

Tempat akad nikah

</td>

<td>:</td>

<td>

${ls("tempatAkad")}

</td>

</tr>

<tr>

<td>

MASKAWIN

</td>

<td>:</td>

<td>

${ls("maskawin")}

</td>

</tr>

</table>

<br><br>

<div style="padding-left:60px">

Bersama ini kami sampaikan surat-surat yang diperlukan untuk diperiksa sebagai berikut :

</div>

<br>

1. Surat pengantar nikah dari Desa/Kelurahan

<br>

2. Persetujuan calon mempelai

<br>

3. Fotocopi KTP

<br>

4. Fotocopi akte kelahiran

<br>

5. Fotocopi kartu keluarga

<br>

6. Pasfoto 2x3 = 3 lembar berlatar belakang biru

<br>

7. ....................................

<br>

8. ....................................

<br><br>

<div style="padding-left:60px;text-align:justify;">

Demikian permohonan ini kami sampaikan, kiranya dapat diperiksa, dihadiri dan dicatat sesuai dengan ketentuan peraturan perundang-undangan.

</div>

`;

document.getElementById("isiSurat").innerHTML = html;
}


/*======================================================
  KEMBALI
======================================================*/

function kembali(){

    window.close();

}
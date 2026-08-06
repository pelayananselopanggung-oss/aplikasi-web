/*======================================================
  N4 PERSETUJUAN CALON PENGANTIN
======================================================*/

/*======================================================
  LOCAL STORAGE
======================================================*/

function ls(key){

    return localStorage.getItem(key) || "";

}

/*======================================================
  TAMPIL N4
======================================================*/
async function tampilN4(){

    console.log("tampilN4 dijalankan");

    //--------------------------------------------------
    // QR
    //--------------------------------------------------

    document.getElementById("qrCode").src =

        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +

        encodeURIComponent(ls("kodeVerifikasi"));

    //--------------------------------------------------
    // TTD
    //--------------------------------------------------

    document.getElementById("ttdSuami").innerHTML =

        ls("namaSuami");

    document.getElementById("ttdIstri").innerHTML =

        ls("namaIstri");

    document.getElementById("tanggalSurat").innerHTML =

    "Kediri, " +

    formatTanggal(new Date());

    //--------------------------------------------------
    // ISI
    //--------------------------------------------------

    let html = `

Yang bertandatangan di bawah ini :

<br><br>

<b>A. Calon Suami :</b>

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
<td>Jenis Kelamin</td>
<td>:</td>
<td>Laki-Laki</td>
</tr>

<tr>
<td>5.</td>
<td>Tempat dan tanggal lahir</td>
<td>:</td>
<td>
${ls("tempatLahirSuami")},
${formatTanggal(ls("tanggalLahirSuami"))}
</td>
</tr>

<tr>
<td>6.</td>
<td>Kewarganegaraan</td>
<td>:</td>
<td>${ls("kewarganegaraanSuami") || "INDONESIA"}</td>
</tr>

<tr>
<td>7.</td>
<td>Agama</td>
<td>:</td>
<td>${ls("agamaSuami")}</td>
</tr>

<tr>
<td>8.</td>
<td>Pekerjaan</td>
<td>:</td>
<td>${ls("pekerjaanSuami")}</td>
</tr>

<tr>
<td>9.</td>
<td>Alamat</td>
<td>:</td>
<td>${ls("alamatSuami")}</td>
</tr>

</table>

<br><br>

<b>B. Calon Istri :</b>

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
<td>Jenis Kelamin</td>
<td>:</td>
<td>Perempuan</td>
</tr>

<tr>
<td>5.</td>
<td>Tempat dan tanggal lahir</td>
<td>:</td>
<td>
${ls("tempatLahirIstri")},
${formatTanggal(ls("tanggalLahirIstri"))}
</td>
</tr>

<tr>
<td>6.</td>
<td>Kewarganegaraan</td>
<td>:</td>
<td>${ls("kewarganegaraanIstri") || "INDONESIA"}</td>
</tr>

<tr>
<td>7.</td>
<td>Agama</td>
<td>:</td>
<td>${ls("agamaIstri")}</td>
</tr>

<tr>
<td>8.</td>
<td>Pekerjaan</td>
<td>:</td>
<td>${ls("pekerjaanIstri")}</td>
</tr>

<tr>
<td>9.</td>
<td>Alamat</td>
<td>:</td>
<td>${ls("alamatIstri")}</td>
</tr>

</table>

<br><br>

<p style="text-align:justify">

Menyatakan dengan sesungguhnya bahwa atas dasar sukarela,
dengan kesadaran sendiri, tanpa ada paksaan dari siapa pun
juga, setuju untuk melangsungkan pernikahan.

</p>

<br>

<p style="text-align:justify">

Demikian surat persetujuan ini dibuat untuk dipergunakan
seperlunya.

</p>



</div>

`;

    document.getElementById("isiSurat").innerHTML = html;

}



document.addEventListener("DOMContentLoaded", function(){

    cekLogin();

    cekAksesNikah();

    tampilN4();

});
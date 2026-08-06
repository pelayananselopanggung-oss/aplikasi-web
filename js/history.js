/*======================================================
  HISTORY AGENDA SURAT
======================================================*/

document.addEventListener("DOMContentLoaded", function(){

    clearDataSurat();
    loadAgenda();
    cekAksesDashboard();

});

/*======================================================
  LOADING
======================================================*/

function showLoading(){

    document.getElementById("loading").style.display = "flex";

}

function hideLoading(){

    document.getElementById("loading").style.display = "none";

}

/*======================================================
  LOAD AGENDA
======================================================*/

async function loadAgenda(){

    showLoading();

    try{

        const response = await fetch(

            URL +
            "?aksi=listAgenda" +
            "&token=" + TOKEN

        );

        const hasil = await response.json();

        hideLoading();

        if(!hasil.status || !Array.isArray(hasil.data) || hasil.data.length==0){

            document.getElementById("dataAgenda").innerHTML =

            `<tr>
                <td colspan="7" class="text-center">
                    Belum ada data.
                </td>
            </tr>`;

            return;

        }

        tampilAgenda(hasil.data);

    }

    catch(err){

        hideLoading();

        console.log(err);

        alert("Gagal mengambil data.");

    }

}

/*======================================================
  CARI AGENDA
======================================================*/

async function cariAgenda(){

    const q = document.getElementById("cari").value.trim();

    if(q==""){

        loadAgenda();

        return;

    }

    showLoading();

    try{

        const response = await fetch(

            URL +
            "?aksi=cariagenda" +
            "&token=" + TOKEN +
            "&q=" + encodeURIComponent(q)

        );

       const hasil = await response.json();
       
        hideLoading();

        if(!hasil.status || !Array.isArray(hasil.data) || hasil.data.length==0){

            document.getElementById("dataAgenda").innerHTML =

            `<tr>
                <td colspan="7" class="text-center">
                    Data tidak ditemukan.
                </td>
            </tr>`;

            return;

        }

        tampilAgenda(hasil.data);

    }

    catch(err){

        hideLoading();

        console.log(err);

        alert("Pencarian gagal.");

    }

}


/*======================================================
  TAMPILKAN DATA
======================================================*/

function tampilAgenda(data){

    let html = "";

    data.forEach(function(item,index){

        html += `

        <tr>

            <td>${index+1}</td>

            <td>${item.nomor}</td>

            <td>${item.nama}</td>

            <td>${item.nik}</td>

            <td>${item.jenis}</td>

            <td>${item.tanggal}</td>

            <td>


    <button
        class="btn btn-warning btn-sm"
        onclick="editAgenda('${item.nomor}','${item.jenis}')"
        title="Edit">

        <i class="fa fa-pen"></i>

    </button>

    <button
        class="btn btn-success btn-sm"
        onclick="cetakAgenda('${item.nomor}','${item.jenis}')"
        title="Cetak">

        <i class="fa fa-print"></i>

    </button>

    <button
        class="btn btn-danger btn-sm"
        onclick="hapusAgenda('${item.nomor}')"
        title="Hapus">

        <i class="fa fa-trash"></i>

    </button>

</td>

        </tr>

        `;

    });

    if(html==""){

        html = `

        <tr>

            <td colspan="7" class="text-center">

                Belum ada data.

            </td>

        </tr>

        `;

    }

    document.getElementById("dataAgenda").innerHTML = html;

}

/*======================================================
  AMBIL DATA AGENDA
======================================================*/

async function getAgenda(nomor){

    showLoading();

    try{

        const response = await fetch(

            URL +
            "?aksi=getagenda" +
            "&token=" + TOKEN +
            "&nomor=" + encodeURIComponent(nomor)

        );

        const hasil = await response.json();

        hideLoading();

        if(!hasil.status){

            alert(hasil.pesan);

            return null;

        }

        return hasil;

    }

    catch(err){

        hideLoading();

        console.log(err);

        alert("Gagal mengambil data agenda.");

        return null;

    }

}

/*======================================================
  AMBIL DATA PENDUDUK
======================================================*/

async function getPenduduk(nik){

    try{

        const response = await fetch(

            URL +
            "?aksi=getpendudukJson" +
            "&token=" + TOKEN +
            "&nik=" + encodeURIComponent(nik)

        );

        const hasil = await response.json();

        if(!hasil.status){

            alert("Data penduduk tidak ditemukan.");

            return null;

        }

        return hasil.data;

    }

    catch(err){

        alert(err.message);

        return null;

    }

}


/*======================================================
  TAMBAH AGENDA
======================================================*/

async function tambahAgenda(){

    const nama =
        document.getElementById("namaAgenda").value.trim();

    const nik =
        document.getElementById("nikAgenda").value.trim();

    const jenis =
        document.getElementById("jenisAgenda").value.trim();

    const tanggal =
        document.getElementById("tanggalAgenda").value;

    if(nama==""){

        alert("Nama harus diisi.");

        return;

    }

    if(jenis==""){

        alert("Jenis surat harus diisi.");

        return;

    }

    showLoading();

    try{

        const response = await fetch(

            URL +

            "?aksi=tambahAgenda" +

            "&token=" + TOKEN +

            "&nama=" + encodeURIComponent(nama) +

            "&nik=" + encodeURIComponent(nik) +

            "&jenis=" + encodeURIComponent(jenis) +

            "&tanggal=" + encodeURIComponent(tanggal)

        );

        const hasil = await response.json();

        hideLoading();

        if(!hasil.status){

            alert(hasil.pesan);

            return;

        }

        alert(hasil.pesan);

        document.getElementById("namaAgenda").value="";

        document.getElementById("nikAgenda").value="";

        document.getElementById("jenisAgenda").value="";

        document.getElementById("tanggalAgenda").value="";

        bootstrap.Modal
            .getInstance(
                document.getElementById("modalTambahAgenda")
            )
            .hide();

        loadAgenda();

    }

    catch(err){

        hideLoading();

        console.log(err);

        alert("Gagal menambah agenda.");

    }

}


/*======================================================
  EDIT SURAT
======================================================*/

async function editAgenda(nomor, jenis){

    clearDataSurat();
    const agenda = await getAgenda(nomor);

    if(!agenda) return;

    //--------------------------------------------------
    // MODE EDIT
    //--------------------------------------------------

    localStorage.setItem("nomorAgenda", agenda.nomor);

    localStorage.setItem(
        "kodeVerifikasi",
        agenda.kodeVerifikasi
    );

    localStorage.setItem(
        "jenisSurat",
        agenda.jenis
    );

    localStorage.setItem(
        "modeSurat",
        "edit"
    );

    localStorage.setItem(
        "modePreview",
        "1"
    );

    //--------------------------------------------------
    // SURAT KETERANGAN
    // IDENTITAS DIAMBIL DARI DATABASE
    //--------------------------------------------------

    switch(agenda.jenis.toUpperCase()){

        case "SKTM":
        case "USAHA":
        case "PENGHASILAN":
        case "KEHILANGAN":
        case "SKCK":
        case "KETERANGAN":

            const penduduk = await getPenduduk(agenda.nik);

            if(!penduduk) return;

            localStorage.setItem("nik", penduduk.nik);
            localStorage.setItem("nama", penduduk.nama);
            localStorage.setItem("tempatlahir", penduduk.tempatlahir);
            localStorage.setItem("tanggallahir", penduduk.tanggallahir);
            localStorage.setItem("jk", penduduk.jk);
            localStorage.setItem("agama", penduduk.agama);
            localStorage.setItem("sp", penduduk.sp);
            localStorage.setItem("pekerjaan", penduduk.pekerjaan);
            localStorage.setItem("alamat", penduduk.alamat);
            localStorage.setItem("rt", penduduk.rt);
            localStorage.setItem("rw", penduduk.rw);
            localStorage.setItem("desa", penduduk.desa);
            localStorage.setItem("kecamatan", penduduk.kecamatan);
            localStorage.setItem("kabupaten", penduduk.kabupaten);
            localStorage.setItem("provinsi", penduduk.provinsi);

        break;

    }

    //--------------------------------------------------
    // DATA SURAT
    //--------------------------------------------------

    localStorage.setItem(
        "dataSurat",
        JSON.stringify(agenda.data)
    );

    //--------------------------------------------------
    // PINDAH HALAMAN
    //--------------------------------------------------

    switch(agenda.jenis.toUpperCase()){

        case "SKTM":
        case "USAHA":
        case "PENGHASILAN":
        case "KEHILANGAN":
        case "SKCK":
        case "KETERANGAN":
            

            window.location.href = "keterangan.html";

        break;

        case "SURAT DOMISILI":

            window.location.href = "domisili.html";

        break;

        case "SKTM SISWA":

    //--------------------------------------------------
    // BERSIHKAN DATA SKTM SISWA LAMA
    //--------------------------------------------------

    [
        "nikSiswa",
        "namaSiswa",
        "tempatLahirSiswa",
        "tanggalLahirSiswa",
        "jkSiswa",
        "nisn",
        "kelas",
        "sekolah",
        "desil",
        "keperluan",
        "pemohon"
    ].forEach(function(key){

        localStorage.removeItem(key);

    });

    //--------------------------------------------------
    // DATA SURAT
    //--------------------------------------------------

    const dataSurat = agenda.data || {};

    Object.keys(dataSurat).forEach(function(key){

        localStorage.setItem(
            key,
            dataSurat[key]
        );

    });

    //--------------------------------------------------
    // DATA SISWA
    //--------------------------------------------------

    const siswa = await getPenduduk(
        dataSurat.nikSiswa
    );

    if(!siswa){

        alert("Data siswa tidak ditemukan.");

        return;

    }

    localStorage.setItem("nikSiswa", siswa.nik);
    localStorage.setItem("namaSiswa", siswa.nama);
    localStorage.setItem("tempatLahirSiswa", siswa.tempatlahir);
    localStorage.setItem("tanggalLahirSiswa", siswa.tanggallahir);
    localStorage.setItem("jkSiswa", siswa.jk);

    //--------------------------------------------------
    // KOMPATIBILITAS
    //--------------------------------------------------

    localStorage.setItem("nik", siswa.nik);
    localStorage.setItem("nama", siswa.nama);
    localStorage.setItem("tempatlahir", siswa.tempatlahir);
    localStorage.setItem("tanggallahir", siswa.tanggallahir);
    localStorage.setItem("jk", siswa.jk);

    window.location.href = "sktm_siswa.html";

break;
        case "SURAT KETERANGAN RANMOR":
        case "SURAT KEPEMILIKAN RANMOR":

            window.location.href = "ranmor.html";

        break;

        case "PERMOHONAN NIKAH":

         const dataNikah = agenda.data;


          Object.keys(dataNikah).forEach(function(key){

          localStorage.setItem(
            key,
            dataNikah[key]
           );

           });


           window.location.href = "nikah.html";


         break;

                 case "SURAT KEMATIAN":

            //--------------------------------------------------
            // DATA SURAT
            //--------------------------------------------------

            const dataKematian = agenda.data || {};

            Object.keys(dataKematian).forEach(function(key){

                localStorage.setItem(
                    key,
                    dataKematian[key]
                );

            });

            //--------------------------------------------------
            // MODE EDIT
            //--------------------------------------------------

            localStorage.setItem(
                "modeSurat",
                "edit"
            );

            localStorage.setItem(
                "modePreview",
                "1"
            );

            //--------------------------------------------------
            // PINDAH HALAMAN
            //--------------------------------------------------

            window.location.href =
                "kematian.html";

        break;

                case "SURAT KETERANGAN AHLI WARIS":

            //--------------------------------------------------
            // DATA SURAT
            //--------------------------------------------------

            const dataWaris = agenda.data || {};

            Object.keys(dataWaris).forEach(function(key){

                localStorage.setItem(
                    key,
                    dataWaris[key]
                );

            });

            //--------------------------------------------------
            // MODE EDIT
            //--------------------------------------------------

            localStorage.setItem(
                "modeSurat",
                "edit"
            );

            localStorage.setItem(
                "modePreview",
                "1"
            );

            //--------------------------------------------------
            // PINDAH HALAMAN
            //--------------------------------------------------

            window.location.href =
                "waris_tanah.html";

        break;

        default:

            alert("Jenis surat belum didukung.");

    }

}

/*======================================================
  CETAK ULANG
======================================================*/

async function cetakAgenda(nomor, jenis){

    clearDataSurat();
    const agenda = await getAgenda(nomor);

    if(!agenda) return;

    //--------------------------------------------------
    // Simpan nomor & kode verifikasi
    //--------------------------------------------------

    localStorage.setItem(
        "nomorAgenda",
        agenda.nomor
    );

    localStorage.setItem(
        "kodeVerifikasi",
        agenda.kodeVerifikasi
    );

    //--------------------------------------------------
    // Tentukan halaman cetak
    //--------------------------------------------------

    let url = "";

    switch(jenis.toUpperCase()){

        case "SKTM":
        case "USAHA":
        case "PENGHASILAN":
        case "KEHILANGAN":
        case "SKCK":
        case "KETERANGAN":

            url =
                "cetak_keterangan.html?nomor=" +
                encodeURIComponent(agenda.nomor);

        break;

        case "SURAT DOMISILI":

            url =
                "cetak_domisili.html?nomor=" +
                encodeURIComponent(agenda.nomor);

        break;

                case "SURAT KEMATIAN":

            url =
                "cetak_kematian.html?nomor=" +
                encodeURIComponent(agenda.nomor);

        break;

         case "SKTM SISWA":

    //--------------------------------------------------
    // DATA SURAT
    //--------------------------------------------------

    localStorage.setItem(
        "dataSurat",
        JSON.stringify(agenda.data)
    );

    localStorage.setItem(
        "nomorAgenda",
        agenda.nomor
    );

    localStorage.setItem(
        "kodeVerifikasi",
        agenda.kodeVerifikasi
    );

    url =
        "cetak_sktm_siswa.html?nomor=" +
        encodeURIComponent(agenda.nomor);

break;

        case "SURAT KETERANGAN RANMOR":
        case "SURAT KEPEMILIKAN RANMOR":

            url =
                "cetak_ranmor.html?nomor=" +
                encodeURIComponent(agenda.nomor);

        break;

        case "PERMOHONAN NIKAH":

          // simpan data nikah ke localStorage

            Object.keys(agenda.data).forEach(function(key){

            localStorage.setItem(
            key,
            agenda.data[key]
        );

          });


        localStorage.setItem(
        "nomorAgenda",
        agenda.nomor
         );


         localStorage.setItem(
          "kodeVerifikasi",
          agenda.kodeVerifikasi
         );


        localStorage.setItem(
        "modeSurat",
        "edit"
        );


        url = "preview_nikah.html";

        break;

        case "SURAT KETERANGAN AHLI WARIS":

    //--------------------------------------------------
    // DATA SURAT
    //--------------------------------------------------

    Object.keys(agenda.data || {}).forEach(function(key){

        localStorage.setItem(
            key,
            agenda.data[key]
        );

    });

    //--------------------------------------------------
    // NOMOR & QR
    //--------------------------------------------------

    localStorage.setItem(
        "nomorAgenda",
        agenda.nomor
    );

    localStorage.setItem(
        "kodeVerifikasi",
        agenda.kodeVerifikasi
    );

    localStorage.setItem(
        "modeSurat",
        "edit"
    );

    //--------------------------------------------------
    // CETAK
    //--------------------------------------------------

    url =
        "cetak_waris.html?nomor=" +
        encodeURIComponent(agenda.nomor);

break;

        default:

            alert("Jenis surat belum didukung.");
            return;

    }

    //--------------------------------------------------
    // Buka di tab/halaman baru
    //--------------------------------------------------

    window.open(
        url,
        "_blank"
    );

}




/*======================================================
  HAPUS AGENDA
======================================================*/

async function hapusAgenda(nomor){

    if(!confirm(
        "Yakin ingin menghapus agenda nomor " +
        nomor +
        " ?"
    )){

        return;

    }

    showLoading();

    try{

        const response = await fetch(

            URL +
            "?aksi=hapusAgenda" +
            "&token=" + TOKEN +
            "&nomor=" + encodeURIComponent(nomor)

        );

        const hasil = await response.json();

        hideLoading();

        if(!hasil.status){

            alert(hasil.pesan);

            return;

        }

        alert(hasil.pesan);

        loadAgenda();

    }

    catch(err){

        hideLoading();

        console.log(err);

        alert("Gagal menghapus agenda.");

    }

}

/*======================================================
  CLEAR DATA SURAT
======================================================*/

function clearDataSurat(){

    //--------------------------------------------------
    // DATA SURAT
    //--------------------------------------------------

    localStorage.removeItem("nomorAgenda");
    localStorage.removeItem("kodeVerifikasi");
    localStorage.removeItem("statusSync");
    localStorage.removeItem("modeSurat");
    localStorage.removeItem("modePreview");
    localStorage.removeItem("jenisSurat");
    localStorage.removeItem("dataSurat");

    //--------------------------------------------------
    // IDENTITAS
    //--------------------------------------------------

    localStorage.removeItem("nik");
    localStorage.removeItem("nama");
    localStorage.removeItem("tempatlahir");
    localStorage.removeItem("tanggallahir");
    localStorage.removeItem("jk");
    localStorage.removeItem("agama");
    localStorage.removeItem("sp");
    localStorage.removeItem("pekerjaan");

    //--------------------------------------------------
    // ALAMAT
    //--------------------------------------------------

    localStorage.removeItem("alamat");
    localStorage.removeItem("rt");
    localStorage.removeItem("rw");
    localStorage.removeItem("desa");
    localStorage.removeItem("kecamatan");
    localStorage.removeItem("kabupaten");
    localStorage.removeItem("provinsi");

    //--------------------------------------------------
    // DOMISILI
    //--------------------------------------------------

    localStorage.removeItem("bertempat");
    localStorage.removeItem("keperluan");

    //--------------------------------------------------
    // RANMOR
    //--------------------------------------------------

    localStorage.removeItem("nopol");
    localStorage.removeItem("namaPemilik");
    localStorage.removeItem("alamatPemilik");
    localStorage.removeItem("merk");
    localStorage.removeItem("type");
    localStorage.removeItem("jenis");
    localStorage.removeItem("model");
    localStorage.removeItem("tahunPembuatan");
    localStorage.removeItem("isiSilinder");
    localStorage.removeItem("nomorRangka");
    localStorage.removeItem("nomorMesin");

}

/*======================================================
  KEMBALI
======================================================*/

function kembali(){

    window.location.href = "dashboard.html";

}
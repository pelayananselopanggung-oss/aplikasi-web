/*======================================================
  DATA FORMULIR
======================================================*/

const FORMULIR = [

    {
        kode : "F-1.01",
        nama : "FORMULIR BIODATA WNI",
        file : "DAFDUK - F-1.01 - FORMULIR BIODATA WNI KEDIRI.pdf"
    },

    {
        kode : "F-1.02",
        nama : "FORMULIR PENDAFTARAN PERISTIWA KEPENDUDUKAN",
        file : "DAFDUK - F-1.02 - FORMULIR PENDAFTARAN PERISTIWA KEPENDUDUKAN.pdf"
    },

    {
        kode : "F-1.03",
        nama : "FORMULIR PENDAFTARAN PERPINDAHAN PENDUDUK",
        file : "DAFDUK - F-1.03 - FORMULIR PENDAFTARAN PERPINDAHAN PENDUDUK.pdf"
    },

    {
        kode : "F-1.04",
        nama : "SURAT PERNYATAAN TIDAK MEMILIKI DOKUMEN KEPENDUDUKAN",
        file : "DAFDUK - F-1.04 - SURAT PERNYATAAN TIDAK MEMILIKI DOKUMEN KEPENDUDUKAN.pdf"
    },

    {
        kode : "F-1.05",
        nama : "SURAT PERNYATAAN TANGGUNG JAWAB MUTLAK KAWIN DAN CERAI",
        file : "DAFDUK - F-1.05 - SURAT PERNYATAAN TANGGUNG JAWAB MUTLAK KAWIN DAN CERAI.pdf"
    },

    {
        kode : "F-1.06",
        nama : "SURAT PERNYATAAN PERUBAHAN ELEMEN DATA KEPENDUDUKAN",
        file : "DAFDUK - F-1.06 - SURAT PERNYATAAN PERUBAHAN ELEMEN DATA KEPENDUDUKAN.pdf"
    },

    {
        kode : "F-1.03A",
        nama : "SURAT KUASA PENGASUHAN ANAK DARI ORANG TUA",
        file : "F-1.03A SURAT KUASA PENGASUHAN ANAK DARI ORANG TUA.pdf"
    },

    {
        kode : "F-1.03B",
        nama : "SURAT PERNYATAAN BERSEDIA MENERIMA SEBAGAI ANGGOTA KELUARGA",
        file : "F-1.03B SURAT PERNYATAAN BERSEDIA MENERIMA SEBAGAI ANGGOTA KELUARGA.pdf"
    },

    {
        kode : "F-1.03C",
        nama : "SURAT PERNYATAAN TIDAK KEBERATAN PENGGUNAAN ALAMAT DALAM DOKUMEN KEPENDUDUKAN",
        file : "F-1.03C SURAT PERNYATAAN TIDAK KEBERATAN PENGGUNAAN ALAMAT DALAM DOKUMEN KEPENDUDUKAN.pdf"
    },

    {
        kode : "F-1.70",
        nama : "SPTJM PERUBAHAN KEPERCAYAAN TERHADAP TUHAN YANG MAHA ESA MENJADI AGAMA",
        file : "Formulir-F-1.70.docx"
    },
 
    {
        kode : "F-1.71",
        nama : "SPTJM SEBAGAI PENGHAYAT KEPERCAYAAN TERHADAP TUHAN YANG MAHA ESA",
        file : "Formulir-F-1.71.docx"
    },

    {
        kode : "F-2.01",
        nama : "FORMULIR PELAPORAN PENCATATAN SIPIL DI WILAYAH NKRI",
        file : "CAPIL - F-2.01 - FORMULIR PELAPORAN PENCATATAN SIPIL DI WILAYAH NKRI.pdf"
    },

    {
        kode : "F-2.03",
        nama : "(SPTJM) KEBENARAN DATA KELAHIRAN",
        file : "CAPIL - F-2.03 - Surat Pernyataan Tanggungjawab Mutlak (SPTJM) Kebenaran Data Kelahiran.pdf"
    },

    {
        kode : "F-2.04",
        nama : "(SPTJM) KEBENARAN SEBAGAI PASANGAN SUAMI ISTERI",
        file : "CAPIL - F-2.04 - Surat Pernyataan Tanggungjawab Mutlak (SPTJM) Kebenaran Sebagai Pasangan Suami Isteri.pdf"
    },

    {
        kode : "PERMOHONAN 1",
        nama : "SURAT PERMOHONAN CETAK ULANG AKTA KELAHIRAN",
        file : "CAPIL - SURAT PERMOHONAN CETAK ULANG AKTA KELAHIRAN.pdf"
    },

    {
        kode : "PERMOHONAN 2",
        nama : "SURAT PERMOHONAN CETAK ULANG AKTA KEMATIAN",
        file : "CAPIL - SURAT PERMOHONAN CETAK ULANG AKTA KEMATIAN.pdf"
    },

    {
        kode : "PERMOHONAN 3",
        nama : "SURAT PERNYATAAN SINGKATAN NAMA",
        file : "CAPIL - SURAT PERNYATAAN SINGKATAN NAMA.pdf"
    }
];

/*======================================================
  LOAD HALAMAN
======================================================*/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        cekLogin();

        tampilForm();

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
  TAMPILKAN FORMULIR
======================================================*/

function tampilForm(){

    let html="";

    FORMULIR.forEach(function(item,index){

        html += `

        <tr>

            <td class="text-center">

                ${index+1}

            </td>

            <td class="text-center">

                ${item.kode}

            </td>

            <td>

                ${item.nama}

            </td>

            <td class="text-center">

                <button

                    class="btn btn-primary btn-sm me-1"

                    onclick="lihatForm('${item.file}')">

                    <i class="fa fa-eye"></i>

                    Lihat

                </button>

                <button

                    class="btn btn-danger btn-sm"

                    onclick="downloadForm('${item.file}')">

                    <i class="fa fa-download"></i>

                    Download

                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById(

        "dataForm"

    ).innerHTML = html;

}

/*======================================================
  LIHAT FORMULIR
======================================================*/

function lihatForm(file){

    const viewer =

        document.getElementById("viewerPdf");

    if(viewer){

        viewer.src =

            "pdf/" + file;

    }

}

/*======================================================
  DOWNLOAD FORMULIR
======================================================*/

function downloadForm(file){

    const link =

        document.createElement("a");

    link.href =

        "pdf/" + file;

    link.download =

        file;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}

/*======================================================
  CARI FORMULIR
======================================================*/

function cariForm(){

    const keyword =

        document.getElementById("cari")

        .value

        .toUpperCase();

    const hasil =

        FORMULIR.filter(function(item){

            return (

                item.kode

                .toUpperCase()

                .includes(keyword)

                ||

                item.nama

                .toUpperCase()

                .includes(keyword)

            );

        });

    tampilHasil(hasil);

}

/*======================================================
  TAMPIL HASIL PENCARIAN
======================================================*/

function tampilHasil(data){

    let html="";

    data.forEach(function(item,index){

        html += `

        <tr>

            <td class="text-center">

                ${index+1}

            </td>

            <td class="text-center">

                ${item.kode}

            </td>

            <td>

                ${item.nama}

            </td>

            <td class="text-center">

                <button

                    class="btn btn-primary btn-sm me-1"

                    onclick="lihatForm('${item.file}')">

                    <i class="fa fa-eye"></i>

                    Lihat

                </button>

                <button

                    class="btn btn-danger btn-sm"

                    onclick="downloadForm('${item.file}')">

                    <i class="fa fa-download"></i>

                    Download

                </button>

            </td>

        </tr>

        `;

    });

    if(html==""){

        html = `

        <tr>

            <td

                colspan="4"

                class="text-center">

                Formulir tidak ditemukan.

            </td>

        </tr>

        `;

    }

    document.getElementById(

        "dataForm"

    ).innerHTML = html;

}

/*======================================================
  KEMBALI
======================================================*/

function kembali(){

    window.location.href =

        "dashboard.html";

}
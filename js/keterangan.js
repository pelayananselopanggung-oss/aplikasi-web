/*======================================================
  KETERANGAN.JS
  BAGIAN 1
  INISIALISASI + UTILITY
======================================================*/
/*======================================================
  LOAD JENIS SURAT
======================================================*/

function loadJenisSurat(){

    const jenis = localStorage.getItem("jenisSurat") || "";

    //--------------------------------------------------
    // Judul
    //--------------------------------------------------

    const judul = document.getElementById("judulDataSurat");

    //--------------------------------------------------
    // Group
    //--------------------------------------------------

    const desil = document.getElementById("groupDesil");
    const usaha = document.getElementById("groupUsaha");
    const penghasilan = document.getElementById("groupPenghasilan");
    const kehilangan = document.getElementById("groupKehilangan");
    const dinamis = document.getElementById("groupDinamis");

    //--------------------------------------------------
    // Sembunyikan semua
    //--------------------------------------------------

    desil.style.display = "none";
    usaha.style.display = "none";
    penghasilan.style.display = "none";
    kehilangan.style.display = "none";
    dinamis.style.display = "none";
    isiNilai("desil","");
    isiNilai("jenisUsaha",""); 
    isiNilai("letakUsaha","");
    isiNilai("penghasilan","");
    isiNilai("tempatHilang","");
    isiNilai("tanggalHilang","");
    isiNilai("isiKeterangan","");

document.getElementById("listBarang").innerHTML="";

    //--------------------------------------------------
    // Tampilkan sesuai jenis
    //--------------------------------------------------

    switch(jenis){

        case "SKTM":

            judul.innerHTML = "DATA SURAT KETERANGAN TIDAK MAMPU";

            desil.style.display = "block";

        break;

        case "USAHA":

            judul.innerHTML = "DATA SURAT KETERANGAN USAHA";

            usaha.style.display = "flex";

        break;

        case "PENGHASILAN":

            judul.innerHTML = "DATA SURAT KETERANGAN PENGHASILAN";

            penghasilan.style.display = "flex";

        break;

        case "KEHILANGAN":

            judul.innerHTML = "DATA SURAT KETERANGAN KEHILANGAN";

            kehilangan.style.display = "flex";

        break;

        case "KETERANGAN":

            judul.innerHTML = "DATA SURAT KETERANGAN";

            dinamis.style.display = "block";

        break;

        default:

            judul.innerHTML = "DATA SURAT";

    }

}

/*======================================================
  ON LOAD
======================================================*/

window.onload = function(){

    inisialisasiSurat();

    loadDataPenduduk();

    loadJenisSurat();      // tampilkan field sesuai jenis surat

    loadDataSurat();       // isi data ke field

}

/*======================================================
  INISIALISASI SURAT
======================================================*/

function inisialisasiSurat(){

    //--------------------------------------------------
    // Jika bukan kembali dari Preview,
    // berarti membuat surat baru
    //--------------------------------------------------

    if(localStorage.getItem("modePreview")!="1"){

        localStorage.removeItem("nomorAgenda");
        localStorage.removeItem("kodeVerifikasi");
        localStorage.removeItem("modeSurat");

    }

}

/*======================================================
  LOADING
======================================================*/

function showLoading(pesan="Memproses..."){

    const loading=document.getElementById("loading");

    if(!loading) return;

    const text=loading.querySelector(".loading-text");

    if(text){

        text.innerHTML=pesan;

    }

    loading.style.display="flex";

}

function hideLoading(){

    const loading=document.getElementById("loading");

    if(loading){

        loading.style.display="none";

    }

}



/*======================================================
  FORMAT YYYY-MM-DD -> DD/MM/YYYY
======================================================*/

function formatTanggal(tanggal){

    if(!tanggal) return "";

    const p=tanggal.split("-");

    if(p.length!=3) return tanggal;

    return p[2]+"/"+p[1]+"/"+p[0];

}

//======================================================
// FORMAT TANGGAL UNTUK INPUT TYPE="DATE"
//======================================================

function ubahTanggalInput(tanggal){

    if(!tanggal) return "";

    tanggal = tanggal.toString().trim();

    //--------------------------------------------------
    // DD/MM/YYYY
    //--------------------------------------------------

    if(tanggal.indexOf("/") > -1){

        const p = tanggal.split("/");

        if(p.length == 3){

            return p[2] + "-" + p[1] + "-" + p[0];

        }

    }

    //--------------------------------------------------
    // YYYY-MM-DD
    //--------------------------------------------------

    if(/^\d{4}-\d{2}-\d{2}$/.test(tanggal)){

        return tanggal;

    }

    //--------------------------------------------------
    // DD-MM-YYYY
    //--------------------------------------------------

    if(/^\d{2}-\d{2}-\d{4}$/.test(tanggal)){

        const p = tanggal.split("-");

        return p[2] + "-" + p[1] + "-" + p[0];

    }

    return "";

}

/*======================================================
  MODE SURAT
======================================================*/

function suratBaru(){

    return localStorage.getItem("nomorAgenda")==null;

}

function suratEdit(){

    return localStorage.getItem("nomorAgenda")!=null;

}

/*======================================================
  SELESAI EDIT
======================================================*/

function selesaiEdit(){

    localStorage.removeItem("modePreview");

}

/*======================================================
  KEMBALI
======================================================*/

function kembali(){

    window.location.href="jenissurat.html";

}

/*======================================================
  BAGIAN 2
  LOCAL STORAGE
======================================================*/

/*======================================================
  SIMPAN LOCAL STORAGE
======================================================*/

function simpanLocalStorage(){

    function nilai(id){

        const el=document.getElementById(id);

        return el ? el.value.trim() : "";

    }

    //--------------------------------------------------
    // DATA PENDUDUK
    //--------------------------------------------------

    localStorage.setItem("nik",nilai("nik"));
    localStorage.setItem("nama",nilai("nama"));
    localStorage.setItem("tempatlahir",nilai("tempatlahir"));
    localStorage.setItem("tanggallahir",nilai("tanggallahir"));
    localStorage.setItem("jk",nilai("jk"));
    localStorage.setItem("agama",nilai("agama"));
    localStorage.setItem("sp",nilai("sp"));
    localStorage.setItem("pekerjaan",nilai("pekerjaan"));
    localStorage.setItem("alamat",nilai("alamat"));
    localStorage.setItem("rt",nilai("rt"));
    localStorage.setItem("rw",nilai("rw"));
    localStorage.setItem("desa",nilai("desa"));
    localStorage.setItem("kecamatan",nilai("kecamatan"));
    localStorage.setItem("kabupaten",nilai("kabupaten"));
    localStorage.setItem("provinsi",nilai("provinsi"));

    //--------------------------------------------------
// DATA SURAT
//--------------------------------------------------

localStorage.setItem("bertempat", nilai("bertempat"));
localStorage.setItem("keperluan", nilai("keperluan"));

// Bersihkan semua field khusus terlebih dahulu
localStorage.removeItem("desil");
localStorage.removeItem("jenisUsaha");
localStorage.removeItem("letakUsaha");
localStorage.removeItem("penghasilan");
localStorage.removeItem("tempatHilang");
localStorage.removeItem("tanggalHilang");
localStorage.removeItem("barangHilang");
localStorage.removeItem("isiKeterangan");

const jenis = localStorage.getItem("jenisSurat");

switch(jenis){

    case "SKTM":

        localStorage.setItem("desil", nilai("desil"));

    break;

    case "USAHA":

        localStorage.setItem("jenisUsaha", nilai("jenisUsaha"));
        localStorage.setItem("letakUsaha", nilai("letakUsaha"));

    break;

    case "PENGHASILAN":

        localStorage.setItem("penghasilan", nilai("penghasilan"));

    break;

    case "KEHILANGAN":

        localStorage.setItem("tempatHilang", nilai("tempatHilang"));
        localStorage.setItem("tanggalHilang", nilai("tanggalHilang"));

        const barang = [];

        document.querySelectorAll(".barangHilang").forEach(function(item){

            if(item.value.trim()!=""){

                barang.push(item.value.trim());

            }

        });

        localStorage.setItem(
            "barangHilang",
            JSON.stringify(barang)
        );

    break;

    case "KETERANGAN":

    localStorage.setItem(
        "isiKeterangan",
        nilai("isiKeterangan")
    );

     break;

}

    //--------------------------------------------------
    // JSON SURAT
    //--------------------------------------------------

    

    //--------------------------------------------------
    // MODE PREVIEW
    //--------------------------------------------------

    localStorage.setItem(

        "modePreview",

        "1"

    );

    
}

/*======================================================
  BERSIHKAN DATA SURAT
======================================================*/

function clearDataSurat(){

    const daftar=[

        "bertempat",
        "keperluan",

        "desil",
        "jenisUsaha",
        "letakUsaha",
        "penghasilan",

        "tempatHilang",
        "tanggalHilang",

        "barangHilang",
        "isiKeterangan",
        "dataSurat"

    ];

    daftar.forEach(function(key){

        localStorage.removeItem(key);

    });

}

/*======================================================
  BERSIHKAN SEMUA MODE
======================================================*/

function clearModeSurat(){

    localStorage.removeItem("modePreview");
    localStorage.removeItem("modeSurat");
    localStorage.removeItem("nomorAgenda");
    localStorage.removeItem("kodeVerifikasi");

}

/*======================================================
  LOAD DATA HISTORY
======================================================*/

function loadSuratHistory(){

    const surat = localStorage.getItem("surat");

    if(!surat) return;

    const data = JSON.parse(surat);

    for(const key in data){

        localStorage.setItem(key,data[key]);

    }

    localStorage.removeItem("surat");

    //--------------------------------------------------
    // Refresh tampilan form
    //--------------------------------------------------

    loadDataPenduduk();

    loadJenisSurat();

    loadDataSurat();

}


/*======================================================
  BAGIAN 3
  LOAD DATA
======================================================*/

/*======================================================
  LOAD DATA PENDUDUK
======================================================*/

function loadDataPenduduk(){

        
    function isi(id,key){

        const el=document.getElementById(id);

        if(!el) return;

        let nilai=localStorage.getItem(key) || "";

        if(id=="tanggallahir"){

            nilai=ubahTanggalInput(nilai);

        }

        el.value=nilai;

    }

    //--------------------------------------------------
    // DATA PENDUDUK
    //--------------------------------------------------

    isi("nik","nik");
    isi("nama","nama");
    isi("tempatlahir","tempatlahir");
    isi("tanggallahir","tanggallahir");
    isi("jk","jk");
    isi("agama","agama");
    isi("sp","sp");
    isi("pekerjaan","pekerjaan");
    isi("alamat","alamat");
    isi("rt","rt");
    isi("rw","rw");
    isi("desa","desa");
    isi("kecamatan","kecamatan");
    isi("kabupaten","kabupaten");
    isi("provinsi","provinsi");

}


/*======================================================
  LOAD DATA SURAT
======================================================*/

function loadDataSurat(){

    const json = localStorage.getItem("dataSurat");

    if(json){

        const data = JSON.parse(json);

        isiSurat(
            data.dataJSON || data
        );

        return;

    }

    //--------------------------------------------------
    // Jika tidak ada dataSurat
    //--------------------------------------------------

    isiField("bertempat","bertempat");
    isiField("keperluan","keperluan");

    isiField("desil","desil");
    isiField("jenisUsaha","jenisUsaha");
    isiField("letakUsaha","letakUsaha");
    isiField("penghasilan","penghasilan");

    isiField("tempatHilang","tempatHilang");
    isiField("tanggalHilang","tanggalHilang");
    isiField("isiKeterangan","isiKeterangan");

    loadBarang();

}
/*======================================================
  LOAD FIELD DARI JSON
======================================================*/

function isiSurat(data){

    
    //--------------------------------------------------
    // Bersihkan semua field khusus
    //--------------------------------------------------

    isiNilai("desil","");
    isiNilai("jenisUsaha","");
    isiNilai("letakUsaha","");
    isiNilai("penghasilan","");
    isiNilai("tempatHilang","");
    isiNilai("tanggalHilang","");
    isiNilai("isiKeterangan","");

    const list=document.getElementById("listBarang");

    if(list){

        list.innerHTML="";

    }

    //--------------------------------------------------
    // Field umum
    //--------------------------------------------------

    isiNilai("bertempat",data.bertempat);
    isiNilai("keperluan",data.keperluan);

    //--------------------------------------------------
    // Isi sesuai jenis surat
    //--------------------------------------------------

    switch(localStorage.getItem("jenisSurat")){

        case "SKTM":

            isiNilai("desil",data.desil);

        break;

        case "USAHA":

            isiNilai("jenisUsaha",data.jenisUsaha);
            isiNilai("letakUsaha",data.letakUsaha);

        break;

        case "PENGHASILAN":

            isiNilai("penghasilan",data.penghasilan);

        break;

        case "KEHILANGAN":

            isiNilai("tempatHilang",data.tempatHilang);
            isiNilai("tanggalHilang",data.tanggalHilang);

            if(list){

                if(data.barangHilang &&
                   data.barangHilang.length){

                    data.barangHilang.forEach(function(item){

                        tambahBarang(item);

                    });

                }else{

                    tambahBarang();

                }

            }

        break;

        case "KETERANGAN":

          isiNilai(
           "isiKeterangan",
           data.isiKeterangan
          );

        break;

    }

}

/*======================================================
  ISI FIELD
======================================================*/

function isiField(id,key){

    isiNilai(

        id,

        localStorage.getItem(key)

    );

}

function isiNilai(id,nilai){

    const el=document.getElementById(id);

    if(!el) return;

    el.value=nilai || "";

}


/*======================================================
  BAGIAN 4
  DATA JSON + PREVIEW
======================================================*/

/*======================================================
  DATA JSON SURAT KETERANGAN
======================================================*/

function dataJSONKeterangan(){

    const jenis = localStorage.getItem("jenisSurat");

    let data = {

        keperluan :
            localStorage.getItem("keperluan") || ""

    };

    switch(jenis){

        case "SKTM":

            data.desil =
                localStorage.getItem("desil") || "";

        break;

        case "USAHA":

            data.jenisUsaha =
                localStorage.getItem("jenisUsaha") || "";

            data.letakUsaha =
                localStorage.getItem("letakUsaha") || "";

        break;

        case "PENGHASILAN":

            data.penghasilan =
                localStorage.getItem("penghasilan") || "";

        break;

        case "KEHILANGAN":

            data.tempatHilang =
                localStorage.getItem("tempatHilang") || "";

            data.tanggalHilang =
                localStorage.getItem("tanggalHilang") || "";

            data.barangHilang =
                JSON.parse(
                    localStorage.getItem("barangHilang") || "[]"
                );

        break;

        case "KETERANGAN":

          data.isiKeterangan =
          localStorage.getItem("isiKeterangan") || "";

        break;

         }

    return data;

}


/*======================================================
  PREVIEW SURAT
======================================================*/

function previewSurat(){

    if(!validasiForm()) return;

    simpanLocalStorage();

    if(suratBaru()){

        localStorage.removeItem("nomorAgenda");
        localStorage.removeItem("kodeVerifikasi");

    }

    window.location.href="preview_keterangan.html";

}

/*======================================================
  BAGIAN 5
  VALIDASI + BARANG HILANG
======================================================*/

/*======================================================
  VALIDASI FORM
======================================================*/

function validasiForm(){

    //--------------------------------------------------
    // NIK
    //--------------------------------------------------

    if(document.getElementById("nik")){

        if(document.getElementById("nik").value.trim()==""){

            alert("NIK belum diisi.");

            document.getElementById("nik").focus();

            return false;

        }

    }

    //--------------------------------------------------
    // NAMA
    //--------------------------------------------------

    if(document.getElementById("nama")){

        if(document.getElementById("nama").value.trim()==""){

            alert("Nama belum diisi.");

            document.getElementById("nama").focus();

            return false;

        }

    }

    //--------------------------------------------------
    // KEPERLUAN
    //--------------------------------------------------

    if(document.getElementById("keperluan")){

        if(document.getElementById("keperluan").value.trim()==""){

            alert("Keperluan belum diisi.");

            document.getElementById("keperluan").focus();

            return false;

        }

    }

    //--------------------------------------------------
    // ISI KETERANGAN (DINAMIS)
    //--------------------------------------------------

    if(localStorage.getItem("jenisSurat")=="KETERANGAN"){

        if(document.getElementById("isiKeterangan")){

            if(document.getElementById("isiKeterangan").value.trim()==""){

                alert("Isi keterangan belum diisi.");

                document.getElementById("isiKeterangan").focus();

                return false;

            }

        }

    }

    return true;

}

/*======================================================
  TAMBAH BARANG
======================================================*/

function tambahBarang(nilai=""){

    const list=document.getElementById("listBarang");

    if(!list) return;

    const div=document.createElement("div");

    div.className="input-group mb-2";

    div.innerHTML=`

        <input
            type="text"
            class="form-control barangHilang"
            value="${nilai}"
            placeholder="Nama Barang">

        <button
            type="button"
            class="btn btn-danger"
            onclick="hapusBarang(this)">

            <i class="fa fa-trash"></i>

        </button>

    `;

    list.appendChild(div);

}

/*======================================================
  HAPUS BARANG
======================================================*/

function hapusBarang(btn){

    btn.parentElement.remove();

}

/*======================================================
  LOAD BARANG
======================================================*/

function loadBarang(){

    const list=document.getElementById("listBarang");

    if(!list) return;

    list.innerHTML="";

    const data=JSON.parse(

        localStorage.getItem("barangHilang") ||

        "[]"

    );

    if(data.length==0){

        tambahBarang();

        return;

    }

    data.forEach(function(item){

        tambahBarang(item);

    });

}

/*======================================================
  SIMPAN BARANG
======================================================*/

function simpanBarang(){

    const data=[];

    document.querySelectorAll(".barangHilang").forEach(function(item){

        if(item.value.trim()!=""){

            data.push(item.value.trim());

        }

    });

    localStorage.setItem(

        "barangHilang",

        JSON.stringify(data)

    );

}

/*======================================================
  CLEAR BARANG
======================================================*/

function clearBarang(){

    localStorage.removeItem("barangHilang");

    loadBarang();

}


/*======================================================
  FORMAT RUPIAH
======================================================*/

function formatRupiah(input){

    //--------------------------------------------------
    // Hanya angka
    //--------------------------------------------------

    let angka = input.value.replace(/\D/g,"");

    if(angka==""){

        input.value="";

        return;

    }

    //--------------------------------------------------
    // Format Indonesia
    //--------------------------------------------------

    input.value =

        "Rp " +

        Number(angka).toLocaleString("id-ID");

}
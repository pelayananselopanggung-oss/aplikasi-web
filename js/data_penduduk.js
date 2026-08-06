/*======================================================
  DATA GLOBAL
======================================================*/

let dataFilter = [];

let halaman = 1;

let perHalaman = 10;

let timerCari = null;


/*======================================================
  LOAD HALAMAN
======================================================*/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        cekLogin();

        cekAksesDashboard();

        loadPenduduk();

        //--------------------------------------------------
        // EVENT PENCARIAN
        //--------------------------------------------------

        const txtCari=document.getElementById("cari");

        if(txtCari){

            txtCari.addEventListener(

                "keyup",

                function(){

                    clearTimeout(timerCari);

                    timerCari=setTimeout(

                        cariPenduduk,

                        300

                    );

                }

            );

        }

    }

);


/*======================================================
  CEK LOGIN
======================================================*/

function cekLogin(){

    const username=localStorage.getItem("username");

    if(!username){

        window.location.href="index.html";

    }

}


/*======================================================
  LOADING
======================================================*/

function showLoading(){

    const loading=document.getElementById("loading");

    if(loading){

        loading.style.display="flex";

    }

}

function hideLoading(){

    const loading=document.getElementById("loading");

    if(loading){

        loading.style.display="none";

    }

}


/*======================================================
  LOAD HALAMAN DATA PENDUDUK
======================================================*/

function loadPenduduk(){

    //--------------------------------------------------
    // RESET
    //--------------------------------------------------

    dataFilter=[];

    halaman=1;

    //--------------------------------------------------
    // RESET PENCARIAN
    //--------------------------------------------------

    const txtCari=document.getElementById("cari");

    if(txtCari){

        txtCari.value="";

        txtCari.focus();

    }

    //--------------------------------------------------
    // AREA DATA
    //--------------------------------------------------

    document.getElementById("dataPenduduk").innerHTML=`

        <div class="text-center text-muted py-5">

            <i class="fa fa-id-card fa-4x mb-3"></i>

            <h5>Pencarian Data Penduduk</h5>

            <div>

                Masukkan <b>NIK</b>,
                <b>Nama</b>, atau
                <b>Nomor KK</b>
                pada kotak pencarian.

            </div>

        </div>

    `;

    //--------------------------------------------------
    // INFO
    //--------------------------------------------------

    document.getElementById("infoData").innerHTML="";

    //--------------------------------------------------
    // PAGINATION
    //--------------------------------------------------

    const pagination=document.getElementById("pagination");

    if(pagination){

        pagination.innerHTML="";

    }

    //--------------------------------------------------
    // INFO HALAMAN
    //--------------------------------------------------

    const infoHalaman=document.getElementById("infoHalaman");

    if(infoHalaman){

        infoHalaman.innerHTML="";

    }

}


/*======================================================
  CARI PENDUDUK
======================================================*/

async function cariPenduduk(){

    //--------------------------------------------------
    // KATA KUNCI
    //--------------------------------------------------

    const txtCari = document.getElementById("cari");

    const q = txtCari.value.trim();

    //--------------------------------------------------
    // KOSONG
    //--------------------------------------------------

    if(q===""){

        dataFilter = [];

        halaman = 1;

        tampilPenduduk();

        return;

    }

    //--------------------------------------------------
    // LOADING
    //--------------------------------------------------

    showLoading();

    try{

        //--------------------------------------------------
        // REQUEST
        //--------------------------------------------------

        const response = await fetch(

            URL +

            "?aksi=caridata" +

            "&token=" + TOKEN +

            "&q=" + encodeURIComponent(q),

            {

                method:"GET",

                cache:"no-cache"

            }

        );

        //--------------------------------------------------
        // GAGAL HTTP
        //--------------------------------------------------

        if(!response.ok){

            hideLoading();

            alert("Gagal mengambil data.");

            return;

        }

        //--------------------------------------------------
        // HASIL
        //--------------------------------------------------

        const result = (await response.text()).trim();

        hideLoading();

        //--------------------------------------------------
        // TIDAK ADA DATA
        //--------------------------------------------------

        if(result==="" || result==="NOTFOUND"){

            dataFilter = [];

            halaman = 1;

            tampilPenduduk();

            return;

        }

        //--------------------------------------------------
        // RESET
        //--------------------------------------------------

        dataFilter = [];

        //--------------------------------------------------
        // KONVERSI DATA
        //--------------------------------------------------

        const rows = result.split("#");

        rows.forEach(function(row){

            if(row==="") return;

            const d = row.split("|");

            if(d.length<9) return;

            dataFilter.push({

                nik : d[0],

                nama : d[1],

                nokk : d[2],

                tempatlahir : d[3],

                tanggallahir : d[4],

                jk : d[5],

                alamat : d[6],

                rt : d[7],

                rw : d[8]

            });

        });

        //--------------------------------------------------
        // HALAMAN PERTAMA
        //--------------------------------------------------

        halaman = 1;

        //--------------------------------------------------
        // TAMPILKAN
        //--------------------------------------------------

        tampilPenduduk();

    }

    catch(err){

        hideLoading();

        dataFilter = [];

        halaman = 1;

        tampilPenduduk();

        alert(

            "Tidak dapat terhubung ke server."

        );

    }

}


/*======================================================
  TAMPILKAN DATA
======================================================*/

function tampilPenduduk(){

    const container=document.getElementById("dataPenduduk");

    const info=document.getElementById("infoData");

    //--------------------------------------------------
    // BELUM ADA HASIL
    //--------------------------------------------------

    if(dataFilter.length===0){

        container.innerHTML=`

            <div class="text-center text-muted py-5">

                <i class="fa fa-users fa-3x mb-3"></i>

                <h5>Tidak ada data yang ditampilkan</h5>

            </div>

        `;

        info.innerHTML="";

        document.getElementById("pagination").innerHTML="";

        document.getElementById("infoHalaman").innerHTML="";

        return;

    }

    //--------------------------------------------------
    // PAGING
    //--------------------------------------------------

    const mulai=(halaman-1)*perHalaman;

    const akhir=mulai+perHalaman;

    const data=dataFilter.slice(mulai,akhir);

    //--------------------------------------------------
    // CARD
    //--------------------------------------------------

    let html="";

    data.forEach(function(item,index){

        html+=`

        <div class="penduduk-card">

            <div class="penduduk-body">

                <div class="foto-area">

                    <img

    src="assets/foto/${item.nik}.jpg"

    class="foto-penduduk"

    loading="lazy"

    onerror="this.onerror=null;this.src='${item.jk.toUpperCase().startsWith('L') ? 'assets/img/male.jpg' : 'assets/img/female.jpg'}';">

                </div>

                <div class="data-area">

                    <div class="nama-penduduk">

                        ${item.nama}

                    </div>

                    <div class="identitas">

                        <label>NIK</label>

                        <span>: ${item.nik}</span>

                    </div>

                    <div class="identitas">

                        <label>No. KK</label>

                        <span>: ${item.nokk}</span>

                    </div>

                    <div class="identitas">

                        <label>Jenis Kelamin</label>

                        <span>: ${item.jk}</span>

                    </div>

                    <div class="identitas">

                        <label>TTL</label>

                        <span>: ${item.tempatlahir}, ${item.tanggallahir}</span>

                    </div>

                    <div class="identitas">

                        <label>Alamat</label>

                        <span>: ${item.alamat} RT ${item.rt} RW ${item.rw}</span>

                    </div>

                </div>

                <div class="aksi-area">

                    <button

                        class="btn btn-danger btn-sm"

                        onclick="modalCetakPenduduk('${item.nik}','${item.nokk}')">

                        <i class="fa fa-print"></i>

                        Cetak

                    </button>

                </div>

            </div>

        </div>

        `;

    });

    container.innerHTML=html;

    //--------------------------------------------------
    // INFO DATA
    //--------------------------------------------------

    const total=dataFilter.length;

    const dari=mulai+1;

    const sampai=Math.min(akhir,total);

    info.innerHTML=

        "Menampilkan "+dari+

        " - "+sampai+

        " dari "+total+" data";

    //--------------------------------------------------
    // PAGINATION
    //--------------------------------------------------

    buatPagination();

}

/*======================================================
  PAGINATION
======================================================*/

function buatPagination(){

    const pagination=document.getElementById("pagination");

    const infoHalaman=document.getElementById("infoHalaman");

    const totalHalaman=Math.ceil(dataFilter.length/perHalaman);

    if(totalHalaman===0){

        pagination.innerHTML="";

        infoHalaman.innerHTML="";

        return;

    }

    if(halaman<1) halaman=1;

    if(halaman>totalHalaman) halaman=totalHalaman;

    if(totalHalaman===1){

        pagination.innerHTML="";

        infoHalaman.innerHTML="Halaman 1 dari 1";

        return;

    }

    let html="";

    html+=`
    <li class="page-item ${halaman===1?"disabled":""}">
        <a class="page-link" href="#"
            onclick="gantiHalaman(1);return false;">
            &laquo;
        </a>
    </li>`;

    html+=`
    <li class="page-item ${halaman===1?"disabled":""}">
        <a class="page-link" href="#"
            onclick="gantiHalaman(${halaman-1});return false;">
            &lsaquo;
        </a>
    </li>`;

    const awal=Math.max(1,halaman-2);

    const akhir=Math.min(totalHalaman,halaman+2);

    for(let i=awal;i<=akhir;i++){

        html+=`
        <li class="page-item ${i===halaman?"active":""}">
            <a class="page-link" href="#"
                onclick="gantiHalaman(${i});return false;">
                ${i}
            </a>
        </li>`;

    }

    html+=`
    <li class="page-item ${halaman===totalHalaman?"disabled":""}">
        <a class="page-link" href="#"
            onclick="gantiHalaman(${halaman+1});return false;">
            &rsaquo;
        </a>
    </li>`;

    html+=`
    <li class="page-item ${halaman===totalHalaman?"disabled":""}">
        <a class="page-link" href="#"
            onclick="gantiHalaman(${totalHalaman});return false;">
            &raquo;
        </a>
    </li>`;

    pagination.innerHTML=html;

    infoHalaman.innerHTML=

        "Halaman "+halaman+" dari "+totalHalaman;

}


/*======================================================
  GANTI HALAMAN
======================================================*/

function gantiHalaman(page){

    const totalHalaman=Math.ceil(dataFilter.length/perHalaman);

    if(totalHalaman===0) return;

    if(page<1) page=1;

    if(page>totalHalaman) page=totalHalaman;

    halaman=page;

    tampilPenduduk();

}


/*======================================================
  GANTI JUMLAH DATA
======================================================*/

function gantiPerHalaman(){

    perHalaman=parseInt(

        document.getElementById("perHalaman").value

    );

    halaman=1;

    tampilPenduduk();

}


/*======================================================
  MODAL CETAK SEMUA
======================================================*/

function modalCetakSemua(){

    localStorage.removeItem("nikCetak");

    localStorage.removeItem("kkCetak");

    document.getElementById("cetakSemua").checked=true;

    new bootstrap.Modal(

        document.getElementById("modalCetak")

    ).show();

}

/*======================================================
  MODAL CETAK SATU PENDUDUK
======================================================*/

function modalCetakPenduduk(nik,nokk){

    localStorage.setItem("nikCetak",nik);

    localStorage.setItem("kkCetak",nokk);

    document.getElementById("cetakPenduduk").checked=true;

    new bootstrap.Modal(

        document.getElementById("modalCetak")

    ).show();

}


/*======================================================
  PROSES CETAK
======================================================*/

function prosesCetak(){

    const jenis=document.querySelector(

        "input[name='jenisCetak']:checked"

    ).value;

    localStorage.setItem(

        "hideNik",

        document.getElementById("hideNik").checked

    );

    localStorage.setItem(

        "hideKK",

        document.getElementById("hideKK").checked

    );

    localStorage.setItem(

        "barisPerHalaman",

        document.getElementById("barisPerHalaman").value

    );

    if(

        jenis==="penduduk" &&

        !localStorage.getItem("nikCetak")

    ){

        alert("Pilih data penduduk terlebih dahulu.");

        return;

    }

    if(

        jenis==="kk" &&

        !localStorage.getItem("kkCetak")

    ){

        alert("Pilih data penduduk terlebih dahulu.");

        return;

    }

    const mode={

        semua:"all",

        penduduk:"orang",

        kk:"kk"

    };

    localStorage.setItem(

        "modeCetak",

        mode[jenis]

    );

    const modal=bootstrap.Modal.getInstance(

        document.getElementById("modalCetak")

    );

    if(modal){

        modal.hide();

    }

    window.open(

        "cetak_penduduk.html",

        "_blank"

    );

}


/*======================================================
  KEMBALI
======================================================*/

function kembali(){

    window.location.href="dashboard.html";

}


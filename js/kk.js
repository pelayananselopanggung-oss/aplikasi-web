//=====================================================
// DATA KARTU KELUARGA
//=====================================================

document.addEventListener("DOMContentLoaded", function () {

    // Tombol Enter
    document.getElementById("txtNoKK").addEventListener("keypress", function (e) {

        if (e.key === "Enter") {
            cariKK();
        }

    });

    // Nomor KK terakhir
    const lastKK = localStorage.getItem("LastNoKK");

    if (lastKK) {

        document.getElementById("txtNoKK").value = lastKK;

        cariKK();

    }

});


//=====================================================
// LOADING
//=====================================================

function showLoading() {

    document.getElementById("loading").style.display = "flex";

}

function hideLoading() {

    document.getElementById("loading").style.display = "none";

}


//=====================================================
// HOME
//=====================================================

function dashboard() {

    localStorage.removeItem("LastNoKK");

    window.location.href = "dashboard.html";

}


//=====================================================
// CARI KK
//=====================================================

async function cariKK() {

    const nokk = document.getElementById("txtNoKK").value.trim();

    if (nokk == "") {

        alert("Masukkan Nomor KK.");

        return;

    }

    localStorage.setItem("LastNoKK", nokk);

    showLoading();

    try {

        const response = await fetch(

            URL +
            "?aksi=carikk" +
            "&token=" + TOKEN +
            "&nokk=" + encodeURIComponent(nokk)

        );

        const hasil = await response.text();

        hideLoading();

        tampilkanData(hasil);

    }

    catch (e) {

        hideLoading();

        console.log(e);

        alert("Gagal mengambil data.");

    }

}

//=====================================================
// TAMPILKAN DATA KK
//=====================================================

function tampilkanData(hasil) {

    const list = document.getElementById("listKK");
    const status = document.getElementById("statusArea");
    const btnTambah = document.getElementById("btnTambah");

    list.innerHTML = "";

    //=========================================
    // DATA TIDAK DITEMUKAN
    //=========================================

    if (hasil == "NOTFOUND") {

        status.className = "alert alert-warning";

        status.innerHTML =
            "<b>Nomor KK belum terdaftar.</b><br>Silakan tambah anggota keluarga pertama.";

        btnTambah.style.display = "block";

        return;

    }

    //=========================================
    // DATA DITEMUKAN
    //=========================================

    btnTambah.style.display = "block";

    const rows = hasil.split("#");

    status.className = "alert alert-success";

    status.innerHTML =
        "Jumlah Anggota : <b>" + rows.length + "</b> Orang";

    rows.forEach(function (item) {

        if (item.trim() == "") return;

        const d = item.split("|");

        const nik = d[0];
        const nama = d[1];
        const tempat = d[2];
        const tanggal = d[3];
        const jk = d[4];
        const agama = d[5];
        const sdhk = d[6];
        const pekerjaan = d[7];
        const pendidikan = d[8];

        //---------------------------------------
        // ICON
        //---------------------------------------

        let icon = "fa-person";

        let warna = "laki";

        if (jk.toUpperCase().includes("PEREMPUAN")) {

            icon = "fa-person-dress";

            warna = "perempuan";

        }

        //---------------------------------------
        // BADGE STATUS
        //---------------------------------------

        let badge = "lain";

        if (sdhk.toUpperCase() == "KEPALA KELUARGA") {

            badge = "kepala";

        }
        else if (sdhk.toUpperCase() == "ISTRI") {

            badge = "istri";

        }
        else if (sdhk.toUpperCase() == "ANAK") {

            badge = "anak";

        }

        //---------------------------------------
        // CARD
        //---------------------------------------

        list.innerHTML += `

<div class="anggota-card" onclick="bukaPenduduk('${nik}')">

    <div class="row">

        <div class="col-2 text-center">

            <div class="anggota-icon ${warna}">

                <i class="fa-solid ${icon}"></i>

            </div>

        </div>

        <div class="col-10">

            <div class="nama">

                ${nama}

            </div>

            <div class="detail">

                <b>NIK :</b> ${nik}

            </div>

            <div class="detail">

                ${tempat}, ${tanggal}

            </div>

            <div class="detail">

                ${jk} | ${agama}

            </div>

            <div class="detail">

                ${pekerjaan}

            </div>

            <div class="detail">

                Pendidikan : ${pendidikan}

            </div>

            <span class="badge-status ${badge}">

                ${sdhk}

            </span>

        </div>

    </div>

</div>

`;

    });

}


//=====================================================
// BUKA DATA PENDUDUK (EDIT)
//=====================================================

function bukaPenduduk(nik){

    localStorage.setItem("mode","EDIT");
    localStorage.setItem("nik",nik);

    // bersihkan data tambah
    localStorage.removeItem("nokk");

    window.location.href="penduduk.html";

}


//=====================================================
// TAMBAH ANGGOTA KELUARGA
//=====================================================

function tambahAnggota(){

    const nokk = document.getElementById("txtNoKK").value.trim();

    if(nokk==""){

        alert("Masukkan Nomor KK terlebih dahulu.");

        return;

    }

    localStorage.setItem("mode","SIMPAN");
    localStorage.setItem("nokk",nokk);

    // hapus nik edit
    localStorage.removeItem("nik");

    window.location.href="penduduk.html";

}


//=====================================================
// RESET PENCARIAN
//=====================================================

function resetPencarian(){

    document.getElementById("txtNoKK").value="";

    document.getElementById("listKK").innerHTML="";

    document.getElementById("statusArea").className="alert alert-info";

    document.getElementById("statusArea").innerHTML=
    "Silakan masukkan Nomor KK.";

    document.getElementById("btnTambah").style.display="none";

    localStorage.removeItem("LastNoKK");

}


//=====================================================
// LOGOUT
//=====================================================

function logout(){

    if(confirm("Keluar dari aplikasi ?")){

        localStorage.clear();

        window.location.href="index.html";

    }

}


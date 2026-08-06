//=====================================================
// KONFIGURASI
//=====================================================

// URL Google Apps Script
const URL = "https://script.google.com/macros/s/AKfycbw24mrUE8XAhoabeOUnRju0zuj1D8vLS8s5ply6r4kxAl2UMnd4HHCjoaHlC_gGZNwAGg/exec";

// Token
const TOKEN = "RHS_SLPG_2004";

// Bootstrap Modal
let loading;


//=====================================================
// SAAT HALAMAN DIBUKA
//=====================================================

window.onload = function(){

    cekLogin();

    loading = new bootstrap.Modal(
        document.getElementById("loadingModal")
    );

    document.getElementById("btnCari")
        .addEventListener("click", cariData);

    document.getElementById("btnTambah")
        .addEventListener("click", tambahData);

    document.getElementById("txtCari")
        .addEventListener("keypress", function(e){

            if(e.key==="Enter"){

                cariData();

            }

        });

}


//=====================================================
// CEK LOGIN
//=====================================================

function cekLogin(){

    const username = localStorage.getItem("username");

    if(username==null){

        window.location.href="index.html";

    }

}


//=====================================================
// CARI DATA
//=====================================================

async function cariData(){

    const keyword =
    document.getElementById("txtCari").value.trim();

    if(keyword==""){

        ubahStatus(
            "Masukkan NIK atau Nama Penduduk.",
            "danger"
        );

        return;

    }

    document.getElementById("btnTambah").style.display="none";

    loading.show();

    try{

        const response = await fetch(

            URL+
            "?aksi=caridata"+
            "&token="+encodeURIComponent(TOKEN)+
            "&q="+encodeURIComponent(keyword)

        );

        if(!response.ok){

            throw new Error(
                "HTTP Error : "+response.status
            );

        }

        const hasil = await response.text();

        console.log(hasil);

        loading.hide();

        //=========================================
        // DATA TIDAK DITEMUKAN
        //=========================================

        if(

            hasil=="" ||

            hasil=="NOTFOUND" ||

            hasil=="DATA TIDAK DITEMUKAN"

        ){

            document.getElementById("hasilCari").innerHTML=`

                <tr>

                    <td colspan="5"
                    class="text-center text-danger p-4">

                        Data tidak ditemukan

                    </td>

                </tr>

            `;

            ubahStatus(
                "Data tidak ditemukan.",
                "danger"
            );

            document.getElementById("btnTambah").style.display="inline-block";

            return;

        }

        //=========================================
        // DATA DITEMUKAN
        //=========================================

        ubahStatus(
            "Data ditemukan.",
            "success"
        );

        tampilkanData(hasil);

    }

    catch(error){

        console.log(error);

        loading.hide();

        ubahStatus(
            "Tidak dapat terhubung ke server.",
            "danger"
        );

    }

}
//=====================================================
// TAMPILKAN HASIL PENCARIAN
//=====================================================

function tampilkanData(hasil){

    const tbody = document.getElementById("hasilCari");

    tbody.innerHTML = "";

    // Pisahkan setiap record
    const records = hasil.split("#");

    records.forEach(function(record){

        if(record.trim()=="") return;

        const data = record.split("|");

        const nik     = data[0];
        const nama    = data[1];
        const jk      = data[2];
        const alamat  = data[3];

        const tr = document.createElement("tr");

        tr.innerHTML = `

            <td>${nik}</td>

            <td>${nama}</td>

            <td>${jk}</td>

            <td>${alamat}</td>

            <td class="text-center">

                <button
                    class="btn btn-primary btn-sm"
                    onclick="pilihPenduduk('${nik}')">

                    <i class="fa-solid fa-check"></i>

                    Pilih

                </button>

            </td>

        `;

        tbody.appendChild(tr);

    });

}


//=====================================================
// PILIH DATA PENDUDUK
//=====================================================

function pilihPenduduk(nik){

    // Mode Edit
    localStorage.setItem("mode","EDIT");

    // Simpan NIK
    localStorage.setItem("nik",nik);

    // Buka Form Penduduk
    window.location.href="penduduk.html";

}


//=====================================================
// TAMBAH DATA BARU
//=====================================================

function tambahData(){

    // Mode Simpan
    localStorage.setItem("mode","SIMPAN");

    // Hapus NIK yang tersimpan
    localStorage.removeItem("nik");

    // Buka Form Penduduk
    window.location.href="penduduk.html";

}


//=====================================================
// KEMBALI KE DASHBOARD
//=====================================================

function kembaliDashboard(){

    window.location.href="dashboard.html";

}


//=====================================================
// UBAH STATUS
//=====================================================

function ubahStatus(pesan,warna){

    const label =
    document.getElementById("labelStatus");

    label.innerHTML = pesan;

    label.className="";

    switch(warna){

        case "success":

            label.classList.add("status-success");

            break;

        case "danger":

            label.classList.add("status-danger");

            break;

        default:

            label.classList.add("status-info");

            break;

    }

}


//=====================================================
// RESET HASIL PENCARIAN
//=====================================================

function resetPencarian(){

    document.getElementById("hasilCari").innerHTML=`

        <tr>

            <td colspan="5"
                class="text-center text-muted p-4">

                Belum ada pencarian.

            </td>

        </tr>

    `;

    document.getElementById("btnTambah").style.display="none";

    ubahStatus(
        "Silakan masukkan NIK atau Nama.",
        "info"
    );

}


//=====================================================
// SAAT TEXTBOX DIKOSONGKAN
//=====================================================

document
.getElementById("txtCari")
.addEventListener("input",function(){

    if(this.value.trim()==""){

        resetPencarian();

    }

});


//=====================================================
// FOCUS KE TEXTBOX
//=====================================================

window.addEventListener("load",function(){

    document.getElementById("txtCari").focus();

});


//=====================================================
// ESC UNTUK MEMBERSIHKAN
//=====================================================

document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        document.getElementById("txtCari").value="";

        resetPencarian();

        document.getElementById("txtCari").focus();

    }

});


//=====================================================
// CEGAH DOUBLE CLICK TOMBOL CARI
//=====================================================

let sedangCari=false;

async function cariData(){

    if(sedangCari){

        return;

    }

    sedangCari=true;

    const tombol=
    document.getElementById("btnCari");

    tombol.disabled=true;

    const keyword=
    document.getElementById("txtCari").value.trim();

    if(keyword==""){

        ubahStatus(
            "Masukkan NIK atau Nama Penduduk.",
            "danger"
        );

        tombol.disabled=false;

        sedangCari=false;

        return;

    }

    document.getElementById("btnTambah").style.display="none";

    loading.show();

    try{

        const response=await fetch(

            URL+
            "?aksi=caridata"+
            "&token="+encodeURIComponent(TOKEN)+
            "&q="+encodeURIComponent(keyword)

        );

        const hasil=await response.text();

        loading.hide();

        if(

            hasil=="" ||
            hasil=="NOTFOUND" ||
            hasil=="DATA TIDAK DITEMUKAN"

        ){

            document.getElementById("hasilCari").innerHTML=`

            <tr>

            <td colspan="5"
            class="text-center text-danger p-4">

            Data tidak ditemukan

            </td>

            </tr>

            `;

            document.getElementById("btnTambah").style.display="inline-block";

            ubahStatus(
                "Data tidak ditemukan.",
                "danger"
            );

        }

        else{

            ubahStatus(
                "Data ditemukan.",
                "success"
            );

            tampilkanData(hasil);

        }

    }

    catch(err){

        console.log(err);

        loading.hide();

        ubahStatus(

            "Gagal terhubung ke server.",

            "danger"

        );

    }

    tombol.disabled=false;

    sedangCari=false;

}


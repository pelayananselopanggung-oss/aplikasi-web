//=====================================================
// KONFIGURASI
//=====================================================

window.onload = function(){

    loadTandaTangan();

};

//=====================================================
// LOAD DATA
//=====================================================

async function loadTandaTangan(){

    try{

        const response = await fetch(

            URL +
            "?aksi=gettandatangan" +
            "&token=" + encodeURIComponent(TOKEN)

        );

        const hasil = await response.json();

        if(!hasil.status){

            alert("Data tidak ditemukan.");

            return;

        }

        document.getElementById("namaKades").value =
            hasil.namaKades || "";

        document.getElementById("nipKades").value =
            hasil.nipKades || "";

        document.getElementById("namaSekdes").value =
            hasil.namaSekdes || "";

        document.getElementById("nipSekdes").value =
            hasil.nipSekdes || "";

        if(hasil.statusJabatan=="SEKDES"){

            document.getElementById("statusSekdes").checked = true;

        }else{

            document.getElementById("statusKades").checked = true;

        }

        previewTandaTangan();

    }

    catch(err){

        console.log(err);

        alert("Gagal mengambil data.");

    }

}

//=====================================================
// PREVIEW
//=====================================================

function previewTandaTangan(){

    const namaKades =
        document.getElementById("namaKades").value;

    const namaSekdes =
        document.getElementById("namaSekdes").value;

    const status =
        document.querySelector(
            "input[name=status]:checked"
        ).value;

    let teks = "";

    if(status=="KADES"){

        teks +=
            "KEPALA DESA SELOPANGGUNG\n\n";

        teks +=
            "( tanda tangan )\n\n";

        teks +=
            namaKades;

    }

    else{

        teks +=
            "a.n. KEPALA DESA SELOPANGGUNG\n";

        teks +=
            "SEKRETARIS DESA\n\n";

        teks +=
            "( tanda tangan )\n\n";

        teks +=
            namaSekdes;

    }

    document.getElementById("previewTtd").textContent =
        teks;

}

//=====================================================
// SIMPAN
//=====================================================

async function simpanTandaTangan(){

    const namaKades =
        document.getElementById("namaKades").value.trim();

    const nipKades =
        document.getElementById("nipKades").value.trim();

    const namaSekdes =
        document.getElementById("namaSekdes").value.trim();

    const nipSekdes =
        document.getElementById("nipSekdes").value.trim();

    const status =
        document.querySelector(
            "input[name=status]:checked"
        ).value;

    if(namaKades==""){

        alert("Nama Kepala Desa belum diisi.");

        return;

    }

    if(namaSekdes==""){

        alert("Nama Sekretaris Desa belum diisi.");

        return;

    }

    try{

        const response = await fetch(

            URL +
            "?aksi=updatetandatangan" +
            "&token=" + encodeURIComponent(TOKEN) +
            "&namaKades=" + encodeURIComponent(namaKades) +
            "&nipKades=" + encodeURIComponent(nipKades) +
            "&namaSekdes=" + encodeURIComponent(namaSekdes) +
            "&nipSekdes=" + encodeURIComponent(nipSekdes) +
            "&status=" + encodeURIComponent(status)

        );

        const hasil = await response.json();

        if(hasil.status){

            alert("Data berhasil disimpan.");

        }else{

            alert("Gagal menyimpan.");

        }

    }

    catch(err){

        console.log(err);

        alert("Terjadi kesalahan.");

    }

}

//=====================================================
// EVENT
//=====================================================

document.addEventListener(

    "input",

    function(e){

        if(

            e.target.id=="namaKades" ||

            e.target.id=="namaSekdes"

        ){

            previewTandaTangan();

        }

    }

);

document.addEventListener(

    "change",

    function(e){

        if(e.target.name=="status"){

            previewTandaTangan();

        }

    }

);

//=====================================================
// KEMBALI
//=====================================================

function kembali(){

    window.location.href =
        "dashboard.html";

}
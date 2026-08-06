
/*======================================================
  MODAL CETAK SEMUA
======================================================*/

function modalCetakSemua(){

    localStorage.removeItem("nikCetak");

    localStorage.removeItem("kkCetak");

    const modal =

        new bootstrap.Modal(

            document.getElementById(

                "modalCetak"

            )

        );

    document.getElementById(

        "cetakSemua"

    ).checked = true;

    modal.show();

}

/*======================================================
  MODAL CETAK SATU PENDUDUK / KK
======================================================*/

function modalCetakPenduduk(nik,nokk){

    localStorage.setItem("nikCetak",nik);
    localStorage.setItem("kkCetak",nokk);

    document.getElementById("cetakPenduduk").checked = true;

    const modal = new bootstrap.Modal(
        document.getElementById("modalCetak")
    );

    modal.show();

}

/*======================================================
  PROSES CETAK
======================================================*/

function prosesCetak(){

    //--------------------------------------------------
    // JENIS CETAK
    //--------------------------------------------------

    const jenis = document.querySelector(
        "input[name='jenisCetak']:checked"
    ).value;

    //--------------------------------------------------
    // OPSI PRIVASI
    //--------------------------------------------------

    const hideNik = document.getElementById("hideNik").checked;
    const hideKK  = document.getElementById("hideKK").checked;

    localStorage.setItem("hideNik", hideNik);
    localStorage.setItem("hideKK", hideKK);
    localStorage.setItem(

    "barisPerHalaman",

    document.getElementById(

        "barisPerHalaman"

    ).value

);

    //--------------------------------------------------
    // MODE CETAK
    //--------------------------------------------------

    if(jenis=="semua"){

        localStorage.setItem("modeCetak","all");

    }

    else if(jenis=="penduduk"){

        if(!localStorage.getItem("nikCetak")){

            alert("Pilih penduduk dari tabel terlebih dahulu.");
            return;

        }

        localStorage.setItem("modeCetak","orang");

    }

    else if(jenis=="kk"){

        if(!localStorage.getItem("kkCetak")){

            alert("Pilih penduduk dari tabel terlebih dahulu.");
            return;

        }

        localStorage.setItem("modeCetak","kk");

    }

    //--------------------------------------------------
    // TUTUP MODAL
    //--------------------------------------------------

    bootstrap.Modal.getInstance(
        document.getElementById("modalCetak")
    ).hide();

    //--------------------------------------------------
    // BUKA HALAMAN CETAK
    //--------------------------------------------------

    window.open(
        "cetak_penduduk.html",
        "_blank"
    );

}

/*======================================================
  KEMBALI
======================================================*/

function kembali(){

    window.location.href = "dashboard.html";

}

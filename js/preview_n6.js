/*======================================================
  PREVIEW N6 - KETERANGAN KEMATIAN
======================================================*/


/*======================================================
  HELPER LOCAL STORAGE
======================================================*/

function ls(key){

    return localStorage.getItem(key) || "";

}



/*======================================================
  NILAI INPUT
======================================================*/

function nilai(id){

    return document.getElementById(id).value.trim();

}



/*======================================================
  FORMAT TANGGAL
======================================================*/

function formatTanggal(tanggal){

    if(!tanggal) return "";

    let t = new Date(tanggal);

    let bulan = [

        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"

    ];


    return (

        t.getDate()
        +
        " "
        +
        bulan[t.getMonth()]
        +
        " "
        +
        t.getFullYear()

    );

}



/*======================================================
  PILIH JENIS N6
======================================================*/

function pilihN6(){


    let pilihan = document.querySelector(
        'input[name="jenisN6"]:checked'
    );


    if(!pilihan) return;



    let jenis = pilihan.value;



    localStorage.setItem(
        "jenisN6",
        jenis
    );



    if(jenis=="DUDA"){


        isiCalon(

            ls("namaSuami"),
            ls("nikSuami"),
            ls("tempatLahirSuami"),
            ls("tanggalLahirSuami"),
            ls("agamaSuami"),
            ls("pekerjaanSuami"),
            ls("alamatSuami")

        );


    }



    if(jenis=="JANDA"){


        isiCalon(

            ls("namaIstri"),
            ls("nikIstri"),
            ls("tempatLahirIstri"),
            ls("tanggalLahirIstri"),
            ls("agamaIstri"),
            ls("pekerjaanIstri"),
            ls("alamatIstri")

        );


    }

    if(jenis=="DUDA"){

    document.getElementById("binPemohon").value =
        ls("namaAyahSuami");

}

else{

    document.getElementById("binPemohon").value =
        ls("namaAyahIstri");

}


}



/*======================================================
  ISI DATA CALON
======================================================*/

function isiCalon(
    nama,
    nik,
    tempat,
    tanggal,
    agama,
    pekerjaan,
    alamat
){


    document.getElementById("namaPemohon").value =
        nama;


    document.getElementById("nikPemohon").value =
        nik;


    document.getElementById("ttlPemohon").value =

        tempat
        +
        ", "
        +
        formatTanggal(tanggal);



    document.getElementById("agamaPemohon").value =
        agama;



    document.getElementById("pekerjaanPemohon").value =
        pekerjaan;



document.getElementById("alamatPemohon").value =
        alamat;


}



/*======================================================
  SIMPAN DATA SEMENTARA N6
======================================================*/

function simpanPreviewN6(){



    let jenis =
        localStorage.getItem("jenisN6");



    if(!jenis){

        alert(
            "Pilih jenis N6 terlebih dahulu"
        );

        return;

    }



    if(
        nilai("namaPasangan")==""
    ){

        alert(
            "Nama pasangan meninggal belum diisi"
        );

        return;

    }



    localStorage.setItem(
        "namaPemohonN6",
        nilai("namaPemohon")
    );

    localStorage.setItem(
    "binPemohon",
    nilai("binPemohon")
);

    localStorage.setItem(
        "nikPemohonN6",
        nilai("nikPemohon")
    );


    localStorage.setItem(
        "ttlPemohonN6",
        nilai("ttlPemohon")
    );


    localStorage.setItem(
        "agamaPemohonN6",
        nilai("agamaPemohon")
    );


    localStorage.setItem(
        "pekerjaanPemohonN6",
        nilai("pekerjaanPemohon")
    );


    localStorage.setItem(
        "alamatPemohonN6",
        nilai("alamatPemohon")
    );



    // DATA PASANGAN MENINGGAL

    localStorage.setItem(
        "namaPasangan",
        nilai("namaPasangan")
    );

    localStorage.setItem(
    "binPasangan",
    nilai("binPasangan")
);


    localStorage.setItem(
        "nikPasangan",
        nilai("nikPasangan")
    );


    localStorage.setItem(
        "tempatLahirPasangan",
        nilai("tempatLahirPasangan")
    );


    localStorage.setItem(
        "tanggalLahirPasangan",
        nilai("tanggalLahirPasangan")
    );

    localStorage.setItem(
    "agamaPasangan",
    nilai("agamaPasangan")
);

localStorage.setItem(
    "pekerjaanPasangan",
    nilai("pekerjaanPasangan")
);

localStorage.setItem(
    "alamatPasangan",
    nilai("alamatPasangan")
);

    localStorage.setItem(
        "tanggalMeninggal",
        nilai("tanggalMeninggal")
    );


    localStorage.setItem(
        "tempatMeninggal",
        nilai("tempatMeninggal")
    );




    window.location.href =
        "cetak_n6.html";


}



/*======================================================
  LOAD DATA SAAT EDIT
======================================================*/

function loadN6(){



    let jenis =
        ls("jenisN6");



    if(jenis){


        let radio =
        document.querySelector(
            'input[value="'+jenis+'"]'
        );


        if(radio){

            radio.checked = true;

        }


        pilihN6();


    }

document.getElementById("binPemohon").value =
    ls("binPemohon");

    document.getElementById("namaPasangan").value =
        ls("namaPasangan");

        document.getElementById("binPasangan").value =
    ls("binPasangan");


    document.getElementById("nikPasangan").value =
        ls("nikPasangan");


    document.getElementById("tempatLahirPasangan").value =
        ls("tempatLahirPasangan");


    document.getElementById("tanggalLahirPasangan").value =
        ls("tanggalLahirPasangan");

        document.getElementById("agamaPasangan").value =
    ls("agamaPasangan");

document.getElementById("pekerjaanPasangan").value =
    ls("pekerjaanPasangan");

document.getElementById("alamatPasangan").value =
    ls("alamatPasangan");


    document.getElementById("tanggalMeninggal").value =
        ls("tanggalMeninggal");


    document.getElementById("tempatMeninggal").value =
        ls("tempatMeninggal");


    


}



/*======================================================
  KEMBALI
======================================================*/

function kembali(){

    window.location.href =
    "preview_nikah.html";

}



/*======================================================
  LOAD HALAMAN
======================================================*/

document.addEventListener(
"DOMContentLoaded",

function(){

    loadN6();

});
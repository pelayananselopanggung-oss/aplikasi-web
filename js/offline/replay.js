/*======================================================
  REPLAY JOB OFFLINE
======================================================*/

async function replayJob(item){

    if(!item){

        return false;

    }

    if(!item.jenis){

        console.log("Jenis job tidak ditemukan.");

        return false;

    }

    console.log(

        "Replay :",

        item.jenis

    );

    switch(item.jenis.toUpperCase()){

        //--------------------------------------------------
        // SURAT KETERANGAN
        //--------------------------------------------------

        case "KETERANGAN":

            return await replayKeterangan(item.data);

        //--------------------------------------------------
        // SURAT DOMISILI
        //--------------------------------------------------

        case "DOMISILI":

            return await replayDomisili(item.data);

        //--------------------------------------------------
        // SURAT RANMOR
        //--------------------------------------------------

        case "RANMOR":

            return await replayRanmor(item.data);

        //--------------------------------------------------

        default:

            console.log(

                "Jenis tidak dikenal :",

                item.jenis

            );

            return false;

    }

}

/*======================================================
REPLAY SURAT KETERANGAN
======================================================*/

async function replayKeterangan(data){

    console.log("Replay Keterangan");

    const agenda = await kirimAgenda(data);

    if(!agenda){

        return false;

    }

    //--------------------------------------------------
    // UPDATE STATUS
    //--------------------------------------------------

    updateStatusSinkron(agenda);

    return true;

}
/*======================================================
  REPLAY SURAT DOMISILI
======================================================*/

async function replayDomisili(data){

    const agenda = await kirimAgenda(data);

    if(!agenda){

        return false;

    }

    const berhasil = await kirimDomisili(
        data,
        agenda.nomor
    );

    if(!berhasil){

        return false;

    }

     //--------------------------------------------------
    // UPDATE STATUS
    //--------------------------------------------------

    updateStatusSinkron(agenda);

    return true;

}

    

/*======================================================
REPLAY SURAT RANMOR
======================================================*/

async function replayRanmor(data){

    const agenda = await kirimAgenda(data);

    if(!agenda){

        return false;

    }

    const berhasil = await kirimRanmor(
        data,
        agenda.nomor
    );

    if(!berhasil){

        return false;

    }

    //--------------------------------------------------
    // UPDATE STATUS
    //--------------------------------------------------

    updateStatusSinkron(agenda);

    return true;

}


/*======================================================
  RESTORE LOCAL STORAGE
======================================================*/

function restoreLocalStorage(data){

    if(!data) return;

    for(const key in data){

        localStorage.setItem(

            key,

            data[key]

        );

    }

}


/*======================================================
UPDATE STATUS SETELAH SINKRON
======================================================*/

async function updateStatusSinkron(agenda){

    //--------------------------------------------------
    // NOMOR SURAT
    //--------------------------------------------------

    localStorage.setItem(

        "nomorAgenda",

        agenda.nomor

    );

    //--------------------------------------------------
    // QR
    //--------------------------------------------------

    localStorage.setItem(

        "kodeVerifikasi",

        agenda.kodeVerifikasi

    );

    //--------------------------------------------------
    // STATUS
    //--------------------------------------------------

    localStorage.setItem(

        "statusSync",

        "1"

    );

    //--------------------------------------------------
    // OFFLINE
    //--------------------------------------------------

    localStorage.removeItem(

        "offlineID"

    );

    console.log(

        "Sinkron berhasil",

        agenda.nomor

    );

}

/*======================================================
KIRIM AGENDA
======================================================*/

async function kirimAgenda(data){

    try{

        const response = await fetch(

            URL +

            "?aksi=simpanagenda" +

            "&token=" + TOKEN +

            "&nik=" +

            encodeURIComponent(data.nik) +

            "&nama=" +

            encodeURIComponent(data.nama) +

            "&jenis=" +

            encodeURIComponent(data.jenisSurat) +

            "&dataJSON=" +

            encodeURIComponent(

                JSON.stringify(

                    data.dataJSON

                )

            )

        );

        const hasil = await response.json();

        if(!hasil.status){

            return null;

        }

        return hasil;

    }

    catch(err){

        console.log(err);

        return null;

    }

}


/*======================================================
KIRIM DOMISILI
======================================================*/

async function kirimDomisili(data,nomorAgenda){

    try{

        const response = await fetch(

            URL +

            "?aksi=simpandomisili" +

            "&token=" + TOKEN +

            "&nik=" + encodeURIComponent(data.nik) +

            "&nama=" + encodeURIComponent(data.nama) +

            "&tempatlahir=" + encodeURIComponent(data.tempatlahir) +

            "&tanggallahir=" + encodeURIComponent(data.tanggallahir) +

            "&jk=" + encodeURIComponent(data.jk) +

            "&agama=" + encodeURIComponent(data.agama) +

            "&pekerjaan=" + encodeURIComponent(data.pekerjaan) +

            "&alamat=" + encodeURIComponent(data.alamat) +

            "&ert=" + encodeURIComponent(data.rt) +

            "&rw=" + encodeURIComponent(data.rw) +

            "&desa=" + encodeURIComponent(data.desa) +

            "&kecamatan=" + encodeURIComponent(data.kecamatan) +

            "&kabupaten=" + encodeURIComponent(data.kabupaten) +

            "&provinsi=" + encodeURIComponent(data.provinsi) +

            "&sp=" + encodeURIComponent(data.sp) +

            "&bertempat=" + encodeURIComponent(data.bertempat) +

            "&keperluan=" + encodeURIComponent(data.keperluan) +

            "&nomor=" + encodeURIComponent(nomorAgenda)

        );

        const hasil=(await response.text()).trim();

return hasil=="DATA DOMISILI BERHASIL DISIMPAN";

    }

    catch(err){

        console.log(err);

        return false;

    }

}

/*======================================================
KIRIM RANMOR
======================================================*/

async function kirimRanmor(data,nomorAgenda){

    try{

        const response = await fetch(

            URL +

            "?aksi=simpanKendaraan" +

            "&token=" + TOKEN +

            "&nomor=" + encodeURIComponent(nomorAgenda) +

            "&nopol=" + encodeURIComponent(data.nopol) +

            "&namaPemilik=" + encodeURIComponent(data.namaPemilik) +

            "&alamatPemilik=" + encodeURIComponent(data.alamatPemilik) +

            "&merk=" + encodeURIComponent(data.merk) +

            "&type=" + encodeURIComponent(data.type) +

            "&jenis=" + encodeURIComponent(data.jenis) +

            "&model=" + encodeURIComponent(data.model) +

            "&tahunPembuatan=" + encodeURIComponent(data.tahunPembuatan) +

            "&isiSilinder=" + encodeURIComponent(data.isiSilinder) +

            "&nomorRangka=" + encodeURIComponent(data.nomorRangka) +

            "&nomorMesin=" + encodeURIComponent(data.nomorMesin) +

            "&namaPembeli=" + encodeURIComponent(data.namaPembeli) +

            "&nikPembeli=" + encodeURIComponent(data.nikPembeli) +

            "&alamatPembeli=" + encodeURIComponent(data.alamatPembeli) +

            "&ttlPembeli=" + encodeURIComponent(data.ttlPembeli) +

            "&jkPembeli=" + encodeURIComponent(data.jkPembeli) +

            "&keperluan=" + encodeURIComponent(data.keperluan)

        );

        const hasil = await response.json();

        return hasil.status;

    }

    catch(err){

        console.log(err);

        return false;

    }

}


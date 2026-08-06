/*======================================================
SINKRONISASI DATA OFFLINE
======================================================*/

async function sinkronisasi(){

    //--------------------------------------------------
    // CEK KONEKSI INTERNET
    //--------------------------------------------------

    if(!navigator.onLine){

        console.log("Offline.");

        window.dispatchEvent(
            new Event("queueChanged")
        );

        return;

    }

    //--------------------------------------------------
    // AMBIL DATA OFFLINE
    //--------------------------------------------------

    const daftar = await ambilOffline();

    if(daftar.length===0){

        console.log("Tidak ada data offline.");

        window.dispatchEvent(
            new Event("queueChanged")
        );

        return;

    }

    console.log(
        "Sinkronisasi",
        daftar.length,
        "data."
    );

    //--------------------------------------------------
    // KIRIM SATU PERSATU
    //--------------------------------------------------

    for(const item of daftar){

        try{

            console.log(
                "Mengirim",
                item.jenis
            );

            const berhasil =
                await replayJob(item);

            if(berhasil){

                console.log(
                    "Berhasil",
                    item.jenis
                );

                await hapusOffline(item.id);

            }else{

                console.log(
                    "Gagal",
                    item.jenis
                );

            }

        }catch(err){

            console.error(err);

        }

    }

    console.log("Sinkronisasi selesai.");

    //--------------------------------------------------
    // UPDATE STATUS
    //--------------------------------------------------

    window.dispatchEvent(
        new Event("queueChanged")
    );

}


/*======================================================
ONLINE
======================================================*/

window.addEventListener(

    "online",

    async function(){

        console.log("ONLINE");

        await sinkronisasi();

    }

);


/*======================================================
OFFLINE
======================================================*/

window.addEventListener(

    "offline",

    function(){

        console.log("OFFLINE");

        window.dispatchEvent(
            new Event("queueChanged")
        );

    }

);


/*======================================================
SAAT HALAMAN DIBUKA
======================================================*/

document.addEventListener(

    "DOMContentLoaded",

    async function(){

        await sinkronisasi();

    }

);
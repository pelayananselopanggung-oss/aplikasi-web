/*======================================================
ONLINE
======================================================*/

window.addEventListener(

    "online",

    async function(){

        console.log("ONLINE");

        //--------------------------------------------------
        // SINKRONISASI OTOMATIS
        //--------------------------------------------------

        await sinkronisasi();

        //--------------------------------------------------
        // UPDATE STATUS HALAMAN
        //--------------------------------------------------

        window.dispatchEvent(

            new Event("internetOnline")

        );

    }

);


/*======================================================
OFFLINE
======================================================*/

window.addEventListener(

    "offline",

    function(){

        console.log("OFFLINE");

        //--------------------------------------------------
        // UPDATE STATUS HALAMAN
        //--------------------------------------------------

        window.dispatchEvent(

            new Event("internetOffline")

        );

    }

);
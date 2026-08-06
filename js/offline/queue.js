/*======================================================
QUEUE OFFLINE
======================================================*/


/*======================================================
SIMPAN DATA
======================================================*/

async function simpanOffline(jenis,data){

    const db = await bukaDatabase();

    return new Promise((resolve,reject)=>{

        const trx = db.transaction(
            STORE_QUEUE,
            "readwrite"
        );

        const store = trx.objectStore(
            STORE_QUEUE
        );

        const req = store.add({

            jenis  : jenis,
            nik    : data.nik || "",
            nama   : data.nama || "",
            waktu  : new Date().toISOString(),
            status : "MENUNGGU",
            data   : data

        });

        req.onsuccess=function(){

            //--------------------------------------------------
            // UPDATE STATUS
            //--------------------------------------------------

            window.dispatchEvent(
                new Event("queueChanged")
            );

            resolve(req.result);

        };

        req.onerror=function(){

            reject(false);

        };

    });

}


/*======================================================
AMBIL SEMUA DATA
======================================================*/

async function ambilOffline(){

    const db = await bukaDatabase();

    return new Promise((resolve,reject)=>{

        const trx = db.transaction(
            STORE_QUEUE,
            "readonly"
        );

        const store = trx.objectStore(
            STORE_QUEUE
        );

        const req = store.getAll();

        req.onsuccess=function(){

            resolve(req.result);

        };

        req.onerror=function(){

            reject([]);

        };

    });

}


/*======================================================
AMBIL SATU DATA
======================================================*/

async function cariOffline(id){

    const db = await bukaDatabase();

    return new Promise((resolve,reject)=>{

        const trx = db.transaction(
            STORE_QUEUE,
            "readonly"
        );

        const store = trx.objectStore(
            STORE_QUEUE
        );

        const req = store.get(id);

        req.onsuccess=function(){

            resolve(req.result);

        };

        req.onerror=function(){

            reject(null);

        };

    });

}


/*======================================================
UPDATE DATA
======================================================*/

async function updateOffline(id,data){

    const db = await bukaDatabase();

    return new Promise((resolve,reject)=>{

        const trx = db.transaction(
            STORE_QUEUE,
            "readwrite"
        );

        const store = trx.objectStore(
            STORE_QUEUE
        );

        const reqGet = store.get(id);

        reqGet.onsuccess=function(){

            const item = reqGet.result;

            if(!item){

                resolve(false);

                return;

            }

            item.data   = data;
            item.waktu  = new Date().toISOString();
            item.status = "MENUNGGU";

            const reqPut = store.put(item);

            reqPut.onsuccess=function(){

                window.dispatchEvent(
                    new Event("queueChanged")
                );

                resolve(true);

            };

            reqPut.onerror=function(){

                reject(false);

            };

        };

        reqGet.onerror=function(){

            reject(false);

        };

    });

}


/*======================================================
HAPUS DATA
======================================================*/

async function hapusOffline(id){

    const db = await bukaDatabase();

    return new Promise((resolve,reject)=>{

        const trx = db.transaction(
            STORE_QUEUE,
            "readwrite"
        );

        const store = trx.objectStore(
            STORE_QUEUE
        );

        const req = store.delete(id);

        req.onsuccess=function(){

            //--------------------------------------------------
            // UPDATE STATUS
            //--------------------------------------------------

            window.dispatchEvent(
                new Event("queueChanged")
            );

            resolve(true);

        };

        req.onerror=function(){

            reject(false);

        };

    });

}


/*======================================================
JUMLAH DATA
======================================================*/

async function jumlahOffline(){

    const db = await bukaDatabase();

    return new Promise((resolve,reject)=>{

        const trx = db.transaction(
            STORE_QUEUE,
            "readonly"
        );

        const store = trx.objectStore(
            STORE_QUEUE
        );

        const req = store.count();

        req.onsuccess=function(){

            resolve(req.result);

        };

        req.onerror=function(){

            reject(0);

        };

    });

}


/*======================================================
ALIAS
======================================================*/

async function getSemuaOffline(){

    return await ambilOffline();

}

async function jumlahQueue(){

    return await jumlahOffline();

}
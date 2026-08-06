/*======================================================
DATABASE OFFLINE
======================================================*/

const DB_NAME = "pelayanan_desa";

const DB_VERSION = 1;

const STORE_QUEUE = "queue";

/*======================================================
BUKA DATABASE
======================================================*/

function bukaDatabase(){

    return new Promise((resolve,reject)=>{

        const request = indexedDB.open(

            DB_NAME,

            DB_VERSION

        );

        request.onupgradeneeded=function(e){

            const db=e.target.result;

            if(!db.objectStoreNames.contains(STORE_QUEUE)){

                db.createObjectStore(

                    STORE_QUEUE,

                    {

                        keyPath:"id",

                        autoIncrement:true

                    }

                );

            }

        };

        request.onsuccess=function(e){

            resolve(e.target.result);

        };

        request.onerror=function(e){

            reject(e);

        };

    });

}


/*======================================================
AMBIL SEMUA DATA QUEUE
======================================================*/

async function getSemuaQueue(){

    const db = await bukaDatabase();

    return new Promise((resolve,reject)=>{

        const tx = db.transaction(
            STORE_QUEUE,
            "readonly"
        );

        const store = tx.objectStore(
            STORE_QUEUE
        );

        const request = store.getAll();

        request.onsuccess = function(){

            resolve(request.result);

        };

        request.onerror = function(){

            reject(request.error);

        };

    });

}


/*======================================================
HAPUS DATA QUEUE
======================================================*/

async function hapusQueue(id){

    const db = await bukaDatabase();

    return new Promise((resolve,reject)=>{

        const tx = db.transaction(
            STORE_QUEUE,
            "readwrite"
        );

        const store = tx.objectStore(
            STORE_QUEUE
        );

        const request = store.delete(id);

        request.onsuccess=function(){

            resolve(true);

        };

        request.onerror=function(){

            reject(false);

        };

    });

}


/*======================================================
JUMLAH DATA QUEUE
======================================================*/

async function jumlahQueue(){

    const data = await getSemuaQueue();

    return data.length;

}


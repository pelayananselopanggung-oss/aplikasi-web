/*======================================================
  SERVICE WORKER
======================================================*/

const CACHE_NAME = "pelayanan-desa-v2";

/*======================================================
  FILE WAJIB
======================================================*/

const APP_SHELL = [

    "./",

    "./index.html",

    "./manifest.json"

];

/*======================================================
  INSTALL
======================================================*/

self.addEventListener("install",event=>{

    console.log("SW Install");

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache=>cache.addAll(APP_SHELL))

    );

    self.skipWaiting();

});


/*======================================================
  ACTIVATE
======================================================*/

self.addEventListener("activate",event=>{

    console.log("SW Active");

    event.waitUntil(

        caches.keys()

        .then(keys=>{

            return Promise.all(

                keys.map(key=>{

                    if(key!==CACHE_NAME){

                        return caches.delete(key);

                    }

                })

            );

        })

    );

    self.clients.claim();

});


/*======================================================
  FETCH
======================================================*/

self.addEventListener("fetch",event=>{

    if(event.request.method!=="GET"){

        return;

    }

    //--------------------------------------------------
    // JANGAN CACHE GOOGLE APPS SCRIPT
    //--------------------------------------------------

    const url = new URL(event.request.url);

    if(

        url.hostname.includes("script.google.com") ||

        url.hostname.includes("script.googleusercontent.com")

    ){

        event.respondWith(

            fetch(event.request)

        );

        return;

    }

    //--------------------------------------------------
    // HALAMAN HTML
    //--------------------------------------------------

    if(event.request.mode==="navigate"){

        event.respondWith(

            fetch(event.request)

            .then(response=>{

                const copy=response.clone();

                caches.open(CACHE_NAME)

                .then(cache=>{

                    cache.put(event.request,copy);

                });

                return response;

            })

            .catch(()=>{

                return caches.match(event.request)

                .then(cache=>{

                    return cache ||

                    caches.match("./index.html");

                });

            })

        );

        return;

    }

    //--------------------------------------------------
    // JS CSS IMAGE FONT
    //--------------------------------------------------

    event.respondWith(

    fetch(event.request)

    .then(response=>{

        if(

            response &&
            response.status===200 &&
            response.type==="basic"

        ){

            const copy=response.clone();

            caches.open(CACHE_NAME)

            .then(cache=>{

                cache.put(event.request,copy);

            });

        }

        return response;

    })

    .catch(()=>{

        return caches.match(event.request);

    })

);

});
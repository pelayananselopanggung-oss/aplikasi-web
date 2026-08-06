/*======================================================
REGISTER SERVICE WORKER
======================================================*/

if("serviceWorker" in navigator){

    window.addEventListener("load",()=>{

        navigator.serviceWorker

        .register("./service-worker.js")

        .then(reg=>{

            console.log("Service Worker aktif.");

        })

        .catch(err=>{

            console.log(err);

        });

    });

}
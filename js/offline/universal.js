/*======================================================
  SIMPAN UNIVERSAL
======================================================*/

async function simpanUniversal(jenis,data){

    //--------------------------------------------------
    // ONLINE
    //--------------------------------------------------

    if(navigator.onLine){

        console.log("ONLINE");

        return false;

    }

    //--------------------------------------------------
    // OFFLINE
    //--------------------------------------------------

    console.log("OFFLINE");

    await simpanOffline(

        jenis,

        data

    );

    alert(

        "Internet tidak tersedia.\n\n" +

        "Data disimpan sementara dan akan otomatis dikirim ketika koneksi kembali."

    );

    return true;

}
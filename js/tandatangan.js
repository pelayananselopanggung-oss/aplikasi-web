/*======================================================
AMBIL DATA TANDA TANGAN
======================================================*/

async function getTandaTangan(){

    const response = await fetch(

        URL +
        "?aksi=gettandatangan" +
        "&token=" + encodeURIComponent(TOKEN)

    );

    return await response.json();

}
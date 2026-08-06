/*======================================================
  KIRIM DATA UNIVERSAL (GET)
======================================================*/

async function kirimData(aksi,data){

    try{

        let url =

            URL +

            "?aksi=" + aksi +

            "&token=" + TOKEN;

        for(const key in data){

            url +=

                "&" +

                encodeURIComponent(key) +

                "=" +

                encodeURIComponent(data[key]);

        }

        const response = await fetch(url);

        const hasil = await response.json();

        if(hasil.status){

            console.log(

                aksi,

                "BERHASIL"

            );

            return true;

        }

        console.log(hasil.pesan);

        return false;

    }

    catch(err){

        console.log(err);

        return false;

    }

}
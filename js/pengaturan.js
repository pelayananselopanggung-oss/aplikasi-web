//======================================================
// LOAD
//======================================================

window.onload=function(){

    document.getElementById("username").value=
        localStorage.getItem("username") || "";

};


//======================================================
// LOADING
//======================================================

function showLoading(){

    document
    .getElementById("loading")
    .classList.add("show");

}

function hideLoading(){

    document
    .getElementById("loading")
    .classList.remove("show");

}


//======================================================
// KEMBALI
//======================================================

function kembali(){

    if(document.referrer.includes("dashboard_nikah.html")){

        window.location.href = "dashboard_nikah.html";

    }
    else if(document.referrer.includes("dashboard.html")){

        window.location.href = "dashboard.html";

    }
    else{

        history.back();

    }

}


//======================================================
// GANTI PASSWORD
//======================================================

async function gantiPassword(){

    const username=
        document.getElementById("username").value.trim();

    const passwordLama=
        document.getElementById("passwordLama").value.trim();

    const passwordBaru=
        document.getElementById("passwordBaru").value.trim();

    const passwordUlang=
        document.getElementById("passwordUlang").value.trim();

    if(passwordLama==""){

        alert("Password lama masih kosong.");

        return;

    }

    if(passwordBaru==""){

        alert("Password baru masih kosong.");

        return;

    }

    if(passwordBaru!=passwordUlang){

        alert("Konfirmasi password tidak sama.");

        return;

    }

    showLoading();

    try{

        const response=await fetch(

            URL+

            "?aksi=gantiPassword"+

            "&token="+TOKEN+

            "&username="+encodeURIComponent(username)+

            "&passwordLama="+encodeURIComponent(passwordLama)+

            "&passwordBaru="+encodeURIComponent(passwordBaru)

        );

        const hasil=await response.text();

        hideLoading();

        if(hasil=="SUKSES"){

            alert("Password berhasil diubah.");

            document.getElementById("passwordLama").value="";
            document.getElementById("passwordBaru").value="";
            document.getElementById("passwordUlang").value="";

            return;

        }

        if(hasil=="PASSWORD_LAMA_SALAH"){

            alert("Password lama salah.");

            return;

        }

        if(hasil=="DATA_TIDAK_LENGKAP"){

            alert("Data belum lengkap.");

            return;

        }

        alert("Gagal mengubah password.");

    }

    catch(err){

        hideLoading();

        console.log(err);

        alert("Tidak dapat terhubung ke server.");

    }

}
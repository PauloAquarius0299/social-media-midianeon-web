let userprofileimg = document.getElementById('userprofileimg');
let usercoverimg = document.getElementById('usercoverimg');
let progressdiv = document.getElementById('progressdiv');
let progressbar = document.getElementById('progressbar');

let fileType = '';
let uid;
let updateurl = '';
let allUsers = []

let changeCoverImage = (event) => {
    var uploadTask = firebase.storage().ref().child(`users/${uid}/coverpicture`).put(event.target.files[0]);

    uploadTask.on('state_changed', 
        (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            var uploadpercentage = Math.round(progress);
            progressdiv.style.display = 'block';
            progressbar.style.width = `${uploadpercentage}%`;
            progressbar.innerHTML = `${uploadpercentage}%`;
        }, 
        (error) => { }, 
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                progressdiv.style.display = 'none';
                firebase.firestore().collection("users/").doc(uid).update({
                    CoverPicture: downloadURL
                })
            });
        }
    );
}

let changeProfileImage = (event) => {
    var uploadTask = firebase.storage().ref().child(`users/${uid}/profilepicture`).put(event.target.files[0]);

    uploadTask.on('state_changed', 
        (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            var uploadpercentage = Math.round(progress);
            progressdiv.style.display = 'block';
            progressbar.style.width = `${uploadpercentage}%`;
            progressbar.innerHTML = `${uploadpercentage}%`;
        }, 
        (error) => { }, 
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                progressdiv.style.display = 'none';
                firebase.firestore().collection("users/").doc(uid).update({
                    ProfilePicture: downloadURL
                })
            });
        }
    );
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if (user.emailVerified) {
            uid = user.uid;
            firebase.firestore().collection("users/").onSnapshot((result) => {
                result.forEach((userData) => { // Renomeado para userData para evitar conflito de nomes
                    allUsers.push(userData.data())
                    fileType = userData.data.fileType;
                    if(userData.data().uid === user.uid){
                        if(userData.data().profilePicture !== "" || userData.data().CoverPicture !== ""){
                            userprofileimg.setAttribute("src", userData.data().profilePicture || "https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png")
                            usercoverimg.setAttribute("src", userData.data().CoverPicture || "https://img.freepik.com/fotos-premium/um-fundo-azul-e-roxo-com-um-fundo-roxo-que-diz-azul_873925-15986.jpg")
                        }
                    }
                })
            })
        } else {
            setTimeout(() => {
                window.location.assign("../pages/emailVerification.html");
            });
        }
    } else {
        window.location.assign("../pages/Login.html");
    }
});



HOME == = = = = =
 
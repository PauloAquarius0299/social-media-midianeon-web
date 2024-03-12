firebase.auth().onAuthStateChanged((user) => {
    if(user){
        if(user.emailVerified){
            setTimeout(() => {
                window.location.assign("../pages/home.html")
            }, 1000)
        } else {
            setTimeout(() => {
                window.location.assign("../pages/emailVerification.html")
            }, 1000)
        }
        }else{
            setTimeout(() => {
                window.location.assign("../pages/Login.html")
            }, 1000)
    }
})
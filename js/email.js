let Email = document.getElementById('emailid')
let Message = document.getElementById('message')

firebase.auth().onAuthStateChanged((user) => {
    if(user){
        if(user.emailVerified){
            window.location.assign("../pages/home.html")
        }else{
            Email.innerHTML = user.Email
        }
    }else{
        window.location.assign("../pages/Login.html")
    }
});

const resend = ()=>{
    firebase.auth().sendEmailVerification().then(()=> {
        Message.innerHTML = 'A verification email code has been send to your email address'
        Message.style.color ='green'
        Message.style.marginBottom = '15px'
    })
}

const reloud = ()=>{
   location.reload()
}
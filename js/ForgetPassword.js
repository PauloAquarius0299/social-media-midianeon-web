const back =()=> {
    window.location.assign("../pages/Login.html")
}

let email = document.getElementById('email')
let Message = document.getElementById('message')

const reset = () => {
    if(email.value === ""){
        Message.innerHTML = 'Email address is required'
        Message.style.color = 'red'
        email.focus()
    }
    firebase.auth().sendPasswordResetEmail(email)
   .then(() => {
    window.location.assign("../pages/emailVerification.html")
  })
  .catch((error) => {
    Message.innerHTML = error.message;
    Message.style.color = 'red'
  });
}
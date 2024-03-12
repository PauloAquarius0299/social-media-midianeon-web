var login = () => {
    window.location.assign("../pages/Login.html")
}

const FirstName = document.getElementById('fistname')
const LastName = document.getElementById('lastname')
const MobileNumber = document.getElementById('mobilenumber')
const Email = document.getElementById('emailaddress')
const Password = document.getElementById('password')
const ReEnterPassword = document.getElementById('repassword')
const Message = document.getElementById('message')
const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const signup = () => {
        if (FirstName.value === "") {
            Message.innerHTML = "First name is required"
            Message.style.color = 'red'
        }else if (LastName.value === "") {
            Message.innerHTML = "Last name is required"
            Message.style.color = 'red'
        }else if (MobileNumber.value === "") {
            Message.innerHTML = "Mobile number is required"
            Message.style.color = 'red'
        }else if (MobileNumber.value.length < 11) {
            Message.innerHTML = "please enter 11 digit mobile number"
            Message.style.color = 'red'
        }else if (Email.value === "") {
            Message.innerHTML = "Email is required"
            Message.style.color = 'red'
        }else if (!Email.value.match(regex)){
            Message.innerHTML = "Please enter valid email address"
            Message.style.color = 'red'
        }else if (Password.value === "") {
            Message.innerHTML = "Password is required"
            Message.style.color = 'red'
        }else if (Password.value.length < 6) {
            Message.innerHTML = "Please enter atleast 6 digits password"
            Message.style.color = 'red'
        }else if (ReEnterPassword.value === "") {
            Message.innerHTML = "Re Enter Password is required"
            Message.style.color = 'red'
        }else if (Password.value !== ReEnterPassword.value) {
            Message.innerHTML = "Password does not match"
            Message.style.color = 'red'
        }else{
            firebase.auth().createUserWithEmailAndPassword(Email.value, Password.value)
           .then((userCredential) => {

            var d = new Date().toLocaleDateString();

           const userData = {
                FirstName: FirstName.value,
                LastName: LastName.value,
                MobileNumber: MobileNumber.value,
                Email: Email.value,
                Password: Password.value,
                ReEnterPassword: ReEnterPassword.value,
                uid: userCredential.user.uid,
                ProfilePicture: "",
                CoverPicture: "",
                Description: "",
                Signupdate: `${d}`
            }
            firebase.firestore().collection("users").doc(userCredential.user.uid).set(userData).then((res)=>{
                Message.innerHTML = 'Account was successfully created'
                Message.style.color = 'green'

                const user = firebase.auth().currentUser;
                user.sendEmailVerification().then((res) => {
                    setTimeout(() => {
                window.location.assign("../pages/emailVerification.html")
                    }, 2000)
                    
                })
            })
             })
            .catch((error) => {
            Message.innerHTML = error.message;
            Message.style.color = 'red';
    // ..
            });

            
           
        }
        
        
    }
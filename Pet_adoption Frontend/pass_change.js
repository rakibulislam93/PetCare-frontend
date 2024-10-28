

const passwordField = document.getElementById('old_password');
const togglePassword = document.getElementById('togglePassword');

const newPasswordField = document.getElementById('new_password')
const toggleNewPassword = document.getElementById('togglePassword1')

// ********* old password er jonno kaj korbe **********
togglePassword.addEventListener('click', function () {
    
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;

    this.classList.toggle('bi-eye');
    this.classList.toggle('bi-eye-slash');
});

// *************** new password er jonno kaj korbe **********
toggleNewPassword.addEventListener('click', function () {
    
    const type = newPasswordField.type === 'password' ? 'text' : 'password';
    newPasswordField.type = type;
    
    this.classList.toggle('bi-eye');
    this.classList.toggle('bi-eye-slash');
});


// ************* Change Password ****************
const ChangePassword=(event)=>{
    event.preventDefault()
    const old_password = document.getElementById('old_password').value 
    const new_passwod = document.getElementById('new_password').value 
    const token = localStorage.getItem('token')
    fetch('https://pet-care-api.vercel.app/accounts/change_password/',{
        method : 'PUT',
        headers : {
            'Content-Type':'application/json',
            'Authorization':`Token ${token}`,
        },
        body:JSON.stringify({
            old_password : old_password,
            new_password : new_passwod,
        })
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.error){
            document.getElementById('pass_change_msg').innerText = `${data.error}`
            document.getElementById('pass_change_msg').style.color = 'red'
            setTimeout(()=>{
                document.getElementById('pass_change_msg').innerText = ''
            },4000)
        }
        else if(data.success){
            document.getElementById('pass_change_msg').innerText = `${data.success}`
            document.getElementById('pass_change_msg').style.color = 'green'
            setTimeout(()=>{
                window.location.href = 'dashboard.html'
            },3000)
        }
    })
}



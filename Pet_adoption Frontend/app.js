
const handleLogin=(event)=>{
    event.preventDefault()
    
    const username = getValue("username")
    const password = getValue("password")
    console.log(username,password)

    fetch("https://pet-care-api.vercel.app/accounts/login/",{
        method : 'POST',
        headers : {'content-type':"application/json"},
        body : JSON.stringify({
            'username':username,
            'password':password,
            
        })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.error){
            console.log("error ase")
            document.getElementById('error').style.display = "block"
            document.getElementById('error').innerText=data.error
            document.getElementById('error').style.color = 'red'
        }
        else{
            console.log(data.token)
            console.log(data.user_id)
            window.localStorage.setItem('token', data.token);
            window.localStorage.setItem('user_id', data.user_id);
            window.localStorage.setItem('username',username);
            document.getElementById('error').innerText= `Login successfull`
            document.getElementById('error').style.color = 'green'
            setTimeout(()=>{
                window.location.href = "home.html"
            },2000)
        }
    })

}

const handleRegistration=(event)=>{
    event.preventDefault()
    const username = getValue("username")
    const first_name = getValue("first_name")
    const last_name = getValue("last_name")
    const email = getValue("email")
    const password = getValue("password")
    const confirm_password = getValue("confirm_password")

    const info={
        'username':username,
        'first_name':first_name,
        'last_name':last_name,
        'email':email,
        'password':password,
        'confirm_password':confirm_password
    }
    console.log(info)

    if(password === confirm_password){
        if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)){

            fetch("https://pet-care-api.vercel.app/accounts/register/",{
                method : 'POST',
                headers : {'content-type':'application/json'},
                body : JSON.stringify(info)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error){
                    document.getElementById('register_error').innerText = `${data.error}`
                    document.getElementById('register_error').style.color = 'red'
                    setTimeout(()=>{
                        document.getElementById('register_error').innerText = " "
                    },3000)
                }
                else if(data.messages){
                    document.getElementById('register_error').innerText = `${data.messages}`
                    document.getElementById('register_error').style.color = 'green'
                    setTimeout(()=>{
                        window.location.href = 'login.html'
                    },3000)
                }
                else if(data.username){
                    document.getElementById('register_error').innerText = `${data.username}`
                    document.getElementById('register_error').style.color = 'red'
                    setTimeout(()=>{
                        document.getElementById('register_error').innerText = " "
                    },3000)
                }
            })
        }
        else{
            document.getElementById('register_error').innerText = 'Password contains Minimum eight characters, at least one letter, one number and one special character must'
            document.getElementById('register_error').style.color = 'red'
            setTimeout(()=>{
                document.getElementById('register_error').innerText = " "
            },3000)
        }
    }
    else{
        document.getElementById('register_error').innerText = "Password and Confirm password doesn't match"
        document.getElementById('register_error').style.color = 'red'
        setTimeout(()=>{
            document.getElementById('register_error').innerText = " "
        },3000)
    }
    

}


const handleLogout=(event)=>{
    event.preventDefault()
    const token = localStorage.getItem("token")
    fetch("https://pet-care-api.vercel.app/accounts/logout/",{
        method : 'POST',
        headers : {
            'Authorization':`Token ${token}`,
            // "Content-Type":"application/json",
        }
        
    })
    .then(res=>{
        if(res.ok){
            localStorage.removeItem('token')
            localStorage.removeItem('user_id')
            localStorage.removeItem('username')
            window.location.href = 'index.html'
        }
        
    })
       
}


const getValue=(id)=>{
    const value = document.getElementById(id).value
    return value
}




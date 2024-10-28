
// *************** Contact Form er kaj shuru ***************
const loadContact=(event)=>{
    event.preventDefault()
    const token = localStorage.getItem('token')
    const name = document.getElementById('user_name').value
    const massage = document.getElementById('user_message').value 
    
    if(token){
        fetch('https://pet-care-api.vercel.app/accounts/contact/',{
            method : 'POST',
            headers : {
                'Authorization':`Token ${token}`,
                'Content-Type':'application/json',
            },
            body : JSON.stringify({
                name : name,
                massage : massage,
            })
        })
        .then(res=>{
            if(res.ok){
                
                const contactModal = new bootstrap.Modal(document.getElementById('Contactmodal'))
                contactModal.show()
                document.getElementById('contact_massage').innerText = 'Message sent successful. wating for response'
                document.getElementById('contact_massage').style.color = 'green'
                res.json()
            }
            else{
                const contactModal = new bootstrap.Modal(document.getElementById('Contactmodal'))
                contactModal.show()
                document.getElementById('contact_massage').innerText = 'Message not successfully sent'
                document.getElementById('contact_massage').style.color = 'red'
                res.json()
            }
        })
        .then(data=>{
            const name = document.getElementById('user_name').value = ''
            const massage = document.getElementById('user_message').value  = ''
        })

    }
    else{
        const contactModal = new bootstrap.Modal(document.getElementById('Contactmodal'))
        contactModal.show()
        document.getElementById('contact_massage').innerText = 'Please Login Your Account'
        document.getElementById('contact_massage').style.color = 'red'
        setTimeout(()=>{
            window.location.href = 'login.html'
        },3000)
    }
    
}
// ************* Contact Form er kaj shesh ***************
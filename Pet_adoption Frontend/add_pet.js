// *************** Deposite Amount *************

const DepositeAmount=(event)=>{
    event.preventDefault()
    const token = localStorage.getItem('token')
    const amount = document.getElementById('amount').value
    fetch('https://pet-care-api.vercel.app/accounts/deposite/',{
        method : 'POST',
        headers : {
            'Content-Type':'application/json',
            'Authorization':`Token ${token}`,
        },
        body : JSON.stringify({amount:amount})
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.success){
            document.getElementById('deposite_msg').innerText = `${data.success}`
            document.getElementById('deposite_msg').style.color = 'green'
            setTimeout(()=>{
                window.location.href = 'dashboard.html'
            },3000)
        }
        else if(data.error){
            document.getElementById('deposite_msg').innerText = `${data.error}`
            document.getElementById('deposite_msg').style.color = 'red'
            setTimeout(()=>{
                document.getElementById('deposite_msg').innerText = ''
            },3000)
        }
    })
}

const loadCategory=()=>{
    
    fetch('https://pet-care-api.vercel.app/pet/category/')
    .then(res=>res.json())
    .then(categories=>{
        console.log(categories)
        const select = document.getElementById('category')
        // select.innerHTML = ''
        categories.forEach(element => {
            const option = document.createElement('option')
            option.value = element.id 
            option.textContent = element.name
            console.log(element.name)
            console.log(element.id)
            
            select.appendChild(option)
        });
        
    })  
}
loadCategory()

// const AddNewPet=(event)=>{
//     event.preventDefault()
    
//     const formData = new FormData(document.getElementById('addPetForm'))
    
//     const token = localStorage.getItem('token')
//     fetch('https://pet-care-api.vercel.app/pet/list/',{
//         method : 'POST',
//         headers : {
//             // 'Content-Type':'application/json',
//             'Authorization':`Token ${token}`,
//         },
//         body : formData
//     })
//     .then(res=>{
//         if(res.ok){
//             document.getElementById('pet_added_msg').innerText = 'Pet added successful'
//             document.getElementById('pet_added_msg').style.color = 'green'
//             setTimeout(()=>{
//                 window.location.href = 'home.html'
//             },3000)
//         }
//         else{
//             document.getElementById('pet_added_msg').innerText = 'Sorry.! pet not added'
//             document.getElementById('pet_added_msg').style.color = 'red'
//         }
//         return res.json()
        
//     })
//     .then(data=>{
//         console.log(data)
//     })
// }


const AddNewPet = (event) => {
    event.preventDefault();
    
    const form = document.getElementById('addPetForm');
    const formData = new FormData(form);
    const token = localStorage.getItem('token');
    const imageFile = formData.get('image');
    
    
    const imageFormData = new FormData();
    imageFormData.append('image', imageFile);

    
    fetch('https://api.imgbb.com/1/upload?key=c01d71d29b3352c858c5c173c8183ac1', {
        method: 'POST',
        body: imageFormData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const imageUrl = data.data.url;

            
            formData.delete('image');
            formData.append('image', imageUrl);
            
            return fetch('https://pet-care-api.vercel.app/pet/list/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData
            });
        } else {
            throw new Error('Image upload failed');
        }
    })
    .then(res => {
        if (res.ok) {
            document.getElementById('pet_added_msg').innerText = 'Pet added successful';
            document.getElementById('pet_added_msg').style.color = 'green';
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 3000);
        } else {
            document.getElementById('pet_added_msg').innerText = 'Sorry.! pet not added';
            document.getElementById('pet_added_msg').style.color = 'red';
        }
        return res.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('pet_added_msg').innerText = 'Something went wrong';
        document.getElementById('pet_added_msg').style.color = 'red';
    });
};

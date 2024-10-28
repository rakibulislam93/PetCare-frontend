

const loadUserPet=()=>{
    
    const token = localStorage.getItem('token')
    if(token){
        fetch(`https://pet-care-api.vercel.app/pet/user_added/`,{
            method : 'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            displayAddedPet(data)
            document.getElementById('count_added_pet').innerHTML= `<i>Total added pet found : ${data.length}</i>`
        })
    }
    else{
        window.location.href = 'login.html'
    }
}

const displayAddedPet=(pets)=>{

    pets.forEach(element => {
        
        const parent = document.getElementById('all_added_container')
        
        const div = document.createElement("div")
        div.classList.add('adopt_card')
        div.innerHTML = `
            <img class="adopt_image" src="${element.image}" alt="">
            <p class="mt-2 ps-2">ID : ${element.id}</p>
            <p class="ps-2"> Name : ${element.name}</p>
            <p class="ps-2"> Price : $${element.price}</p>
            <p class="ps-2"> Age : ${element.age} years</p>
            <p class="ps-2"><b>Description : </b>${element.description.slice(0,52)}</p>
            
            `
            parent.appendChild(div)
    });
}

loadUserPet()
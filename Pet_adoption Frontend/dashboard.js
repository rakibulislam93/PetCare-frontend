const sidebarToggle = document.querySelector("#sidebar-toggle");
sidebarToggle.addEventListener("click",function(){
    document.querySelector("#sidebar").classList.toggle("collapsed");
});

document.querySelector(".theme-toggle").addEventListener("click",() => {
    toggleLocalStorage();
    toggleRootClass();
});

function toggleRootClass(){
    const current = document.documentElement.getAttribute('data-bs-theme');
    const inverted = current == 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme',inverted);
}

function toggleLocalStorage(){
    if(isLight()){
        localStorage.removeItem("light");
    }else{
        localStorage.setItem("light","set");
    }
}

function isLight(){
    return localStorage.getItem("light");
}

if(isLight()){
    toggleRootClass();
}



// ************** Dashboard a kokhon kun page a ase tar link ta active hobe **********


// Current page er URL ta niye ashbe....
var currentPage = window.location.href;

// Sidebar link gulo select koro
var sidebarLinks = document.querySelectorAll('.sidebar-link');

// Prottek link er upor loop chalabo
sidebarLinks.forEach(function(link) {
    // Jodi link er href er sathe current page er URL mile, tahole active class add koro
    if (link.href === currentPage) {
        link.classList.add('active-link');
    }
});

// ***************** profile er balance ta hide korar jonno **************
let balanceVisible =false;
let actualBalance = '';
const toggleBalance = () => {
    balanceVisible = !balanceVisible;
    const balanceElement = document.getElementById('profile_balance');
    
    // Update the balance visibility
    if (balanceVisible) {
        balanceElement.innerHTML = `<b> Balance: ($****) </b>`;
        document.getElementById('toggle_balance').classList.add('fa-eye-slash');
        document.getElementById('toggle_balance').classList.remove('fa-eye');
    } else {
        
        balanceElement.innerHTML = `<b> Balance: ($${actualBalance}) </b>`;
        document.getElementById('toggle_balance').classList.add('fa-eye');
        document.getElementById('toggle_balance').classList.remove('fa-eye-slash');
    }
}




const loadProfile=()=>{
    const token = localStorage.getItem("token")
    fetch('https://pet-care-api.vercel.app/accounts/profile/',{
        method : 'GET',
        headers : {
            'Content-Type':'application/json',
            'Authorization':`Token ${token}`,
        }
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        actualBalance = data.balance
        
        document.getElementById('profile_balance').innerHTML = `<b>Balance: ($${actualBalance}) </b>`
        const profileImage = document.getElementById('profile_image')

        if(data.profile_image){
            profileImage.src = data.profile_image
        }
        else{
            profileImage.src = './images/user_profile.png'
        }
    })
}
// ***** profile er image er niche toolpit dekhabe *********
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});


// **********************Load adopted pet using user_id ************
const loadAdoptPet=()=>{
    const user_id = localStorage.getItem('user_id')
    const token = localStorage.getItem('token')
    if(token){
        fetch(`https://pet-care-api.vercel.app/pet/adoption/user/${user_id}/`,{
            method : 'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            displayAdoptPet(data)
            document.getElementById('count_adopt_pet').innerHTML= `<i>Total adopted pet found : ${data.length}</i>`
        })
    }
    else{
        window.location.href = 'login.html'
    }
}

const displayAdoptPet=(adopt)=>{
    adopt.forEach(element => {
        fetch(`https://pet-care-api.vercel.app/pet/list/${element.pet}/`)
        .then(res=>res.json())
        .then(pet_data=>{
            console.log(pet_data)
            const parent = document.getElementById('all_adopt_container')
            const div = document.createElement("div")
            div.classList.add('adopt_card')
            div.innerHTML = `
                <img class="adopt_image" src="${pet_data.image}" alt="">
                <p class="mt-2 ps-2">ID : ${pet_data.id}</p>
                <p class="ps-2"> Name : ${pet_data.name}</p>
                <p class="ps-2"> Price : $${pet_data.price}</p>
                <p class="ps-2"><b>Description : </b>${pet_data.description.slice(0,60)}</p>
                <small style="color:blue;" class="ps-2">Date : ${element.created_at}</small>
            `
            parent.appendChild(div)
        })
        
    });
}


// ********** Profile logout er kaj korbo ************
const ProfileLogout=(event)=>{
    event.preventDefault()
    const token = localStorage.getItem("token")
    fetch("https://pet-care-api.vercel.app/accounts/logout/",{
        method : 'POST',
        headers : {
            'Authorization':`Token ${token}`,           
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

const getProfileData=()=>{
    const token = localStorage.getItem('token')
    const user_id = localStorage.getItem('user_id')

    fetch(`https://pet-care-api.vercel.app/accounts/update/${user_id}/`,{
        method :'GET',
        headers :{
            'Content-Type':'application/json',
            'Authorization':`Token ${token}`
        }
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        document.getElementById('username').value = data.username
        document.getElementById('first_name').value = data.first_name
        document.getElementById('last_name').value = data.last_name
        document.getElementById('email').value = data.email 
    })
}

const SubmitProfileData = (event) => {
    event.preventDefault();

    const formData = new FormData(document.getElementById('profileForm'));
    
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    const imageFile = formData.get('profile_image');
    
    const imageFormData = new FormData();
    imageFormData.append('image', imageFile);

    fetch('https://api.imgbb.com/1/upload?key=c01d71d29b3352c858c5c173c8183ac1', {
        method: 'POST',
        body: imageFormData,
    })
    .then(res => {
        if (!res.ok) throw new Error('Image upload failed');
        return res.json();
    })
    .then(data => {
        if (data.status === 200) { // Check for successful upload
            const imageUrl = data.data.url;
            formData.delete('profile_image');
            formData.append('profile_image', imageUrl);

            return fetch(`https://pet-care-api.vercel.app/accounts/update/${user_id}/`, {
                method: 'PUT',
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
        if (!res.ok) throw new Error('Profile update failed');
        document.getElementById('profile_update_msg').innerText = 'Profile Update successful';
        document.getElementById('profile_update_msg').style.color = 'green';
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
        return res.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        document.getElementById('profile_update_msg').innerText = error.message;
        document.getElementById('profile_update_msg').style.color = 'red';
    });
};


getProfileData()
loadProfile()
loadAdoptPet()
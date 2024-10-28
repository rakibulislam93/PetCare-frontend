
// *************** Load All pet *************
const loadAllPet=(search)=>{
    document.getElementById("all-pet").innerHTML = ""
    document.getElementById("loading").style.display = "block"
    document.getElementById('no-data').style.display = "none";
    
    console.log(search)
    fetch(`https://pet-care-api.vercel.app/pet/list/?search=${search?search:""}`)
    .then(res=>res.json())
    .then(data=>{
        document.getElementById("pet-count").innerText = `Total Pet Found : ${data.length}`
        if(data.length>0){
            setTimeout(function() {
                document.getElementById('loading').style.display = 'none'; // Hide loading
            }, 1000);
            displayAllPet(data)
            console.log(data)
            
        }
        else{
            
            document.getElementById('loading').style.display = 'none';
            document.getElementById('no-data').style.display = "block";
        }
    })
}
const displayAllPet=(pet)=>{
    pet.forEach(element => {
        const parent = document.getElementById('all-pet')
        const div = document.createElement("div")
        div.classList.add("pet-card")
        div.innerHTML=`
        <img class="pet-img" src="${element.image}">
        <h5 class="mt-3">${element.name}</h5>
        <p>${element.available === true ? '<h6>Stock: Available</h6>' : '<h6 class="text-danger">Stock: Not Available</h6>'}</p>
        <a href="pet_details.html?pet_id=${element.id}"><button class="detail-btn w-100 p-3">Details</button></a>
        `
        parent.appendChild(div)
    });
}

/* **************** Category load *********************** */
const loadCategory=()=>{
    fetch('https://pet-care-api.vercel.app/pet/category/')
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        displayCategory(data)
    })
}
const displayCategory=(category)=>{
    category.forEach(element=>{
        const parent = document.getElementById("dropdown-menu")
        const li = document.createElement("li")
        li.classList.add("dropdown-item")     
        li.innerHTML=`
        <li onclick="loadAllPet('${element.name}')"><a style="cursor:pointer">${element.name}</a></li>
        `
        parent.appendChild(li)
    })
}

const getSearchValue = ()=>{
    const value = document.getElementById("pet-search").value
    console.log(value)
    loadAllPet(value)
    document.getElementById("pet-search").value = ""
    
}




// ******************* Pet details er kaj shuru hoise aikhan theke ***************
const loadPetDetails=()=>{
    const pet_id = new URLSearchParams(window.location.search).get("pet_id")
    console.log(pet_id)
    fetch(`https://pet-care-api.vercel.app/pet/list/${pet_id}/`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        displayPetDetails(data)
        document.getElementById('review_petId').value = pet_id
    })
}
const displayPetDetails = (pet) => {
    const parent = document.getElementById("pet-details-container");
    parent.innerHTML = ''; // Clear previous details

    const div = document.createElement("div");
    div.classList.add("pet-and-info", "container");
    const username = localStorage.getItem('username')
    div.innerHTML = `
        <div class="pet-image">
            <img src="${pet.image}" alt="Pet Image" class="img-fluid">
        </div>
        <div class="pet-info">
            <p><b>Name :</b> ${pet.name}</p>
            <p><b>Descriptions :</b> ${pet.description.slice(0,100)}</p>
            <p><b>Age :</b> ${pet.age} years</p>
            <p><b>Price :</b> ${pet.price}$</p>
            <p><b>Available :</b> ${pet.available}</p>
            <p><b>Added by :</b> ${pet.added_by}</p>
            ${pet.added_by !== username ?`
            <button type="submit" class="btn btn-secondary mt-3" onclick ="handlePetAdoption(${pet.id})" >Adopt Me!</button>
            `:''}
            ${pet.added_by === username ? `

                <a href="pet_update.html?updatePet_id=${pet.id}"><button type="submit" class="btn btn-primary mt-3">Update</button></a>
                <button type="submit" class="btn btn-danger mt-3" onclick = "OpenDelModal(${pet.id})" >Delete</button>
                `:''}
        </div>
            
    `;
    parent.appendChild(div)
    
}
// ************* Pet details er kaj shesh ******************



const handlePetAdoption=(pet_id)=>{
    const token = localStorage.getItem('token')
    const user_id = localStorage.getItem('user_id')
    console.log(token)
    fetch(`https://pet-care-api.vercel.app/pet/adoption/`,{
        method : 'POST',
        headers : {
            'Authorization':`Token ${token}`,
            'Content-Type': 'application/json',
        },
        body : JSON.stringify({
            'pet':pet_id,
        })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.error){
            var errorModal = new bootstrap.Modal(document.getElementById('addopt_error_msg'));
            errorModal.show();
            document.getElementById('adopt_massage').innerText = `${data.error}`
            document.getElementById('adopt_massage').style.color = 'red'
            
        }
        else if(data.id){
            var errorModal = new bootstrap.Modal(document.getElementById('addopt_error_msg'));
            errorModal.show();
            document.getElementById('adopt_massage').innerText = `Pet adopt successful`
            document.getElementById('adopt_massage').style.color = 'green'
            setTimeout(() => {
                window.location.href = 'dashboard.html'
            }, 2000);
        }
        else if(data.detail){
            var errorModal = new bootstrap.Modal(document.getElementById('addopt_error_msg'));
            errorModal.show();
            document.getElementById('adopt_massage').innerText = `Invalid User.! Login please`
            document.getElementById('adopt_massage').style.color = 'red'
            setTimeout(()=>{

                window.location.href = 'login.html'
            },3000)
        }       
    })
}




// ************** Pet Update Form a data Dekhabo **************

const PetUpdateData=()=>{
    const pet_id = new URLSearchParams(window.location.search).get("updatePet_id")
    console.log(pet_id)
    fetch(`https://pet-care-api.vercel.app/pet/list/${pet_id}/`)
    .then(res=>res.json())
    .then(data=>{
       
        document.getElementById("input2").value = data.name
        document.getElementById("input3").value = data.description
        document.getElementById("input4").value = data.price
        document.getElementById("input6").value = data.age
        // document.getElementById("input5").value = data.image
       
        console.log(data.available)
        console.log(data.name)
        console.log(data.category)

        fetch('https://pet-care-api.vercel.app/pet/category/')
        .then(res=>res.json())
        .then(categories=>{
            console.log(categories)
            const select = document.getElementById('input1')
            // select.innerHTML = '';
            categories.forEach(element=>{
                console.log(element.name)
                const option = document.createElement("option")
                option.value = element.id
                option.textContent = element.name

                if(element.id === data.category){
                    option.selected = true
                }
                select.appendChild(option)
            })  
            
        })
        
    })
}
   
const SubmitUpdateData = (event) => {
    event.preventDefault();
    
    const formData = new FormData(document.getElementById("updatePetForm")); // Form data create
    const pet_id = new URLSearchParams(window.location.search).get("updatePet_id");
    const token = localStorage.getItem('token');
    const imageInput = formData.get('image')

    if (token && imageInput) {
        // image url new form a append korbo
        const imageFormData = new FormData();
        imageFormData.append('image', imageInput);
        
        fetch("https://api.imgbb.com/1/upload?key=c01d71d29b3352c858c5c173c8183ac1", {
            method: "POST",
            body: imageFormData
        })
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.data.url; 

            
            formData.delete('image');
            formData.append('image', imageUrl);
            
            
            return fetch(`https://pet-care-api.vercel.app/pet/list/${pet_id}/`, {
                method: "PUT",
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: formData,
            });
        })
        .then(response => {
            if (response.ok) {
                document.getElementById("update-error").style.display = "none";
                document.getElementById("update-massage").innerText = "Pet Update Successfull";
                document.getElementById("update-massage").style.color = "green";
                document.getElementById("update-massage").style.display = "block";
                setTimeout(function() {
                    window.location.href = "home.html";
                }, 2000);
            } else {
                document.getElementById("update-error").style.display = "none";
                document.getElementById("update-massage").innerText = "You have no permission to update this pet";
                document.getElementById("update-massage").style.color = "blue";
                document.getElementById("update-massage").style.display = "block";
            }
            return response.json();
        })
        .then(update_data => {
            console.log(update_data); 
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("update-error").innerText = "An error occurred while updating the pet.";
            document.getElementById("update-error").style.display = "block";
        });
    } 
    else {
        window.location.href = 'login.html';
    }
};




const OpenDelModal=(pet_id)=>{
    document.getElementById('delmodal_tittle').innerText = `Pet Id : ${pet_id}`
    const delModal = new bootstrap.Modal(document.getElementById('deleteModal'))
    delModal.show();

    document.getElementById('pet_del_btn').onclick=()=>DeletePet(pet_id)
}

const DeletePet =(pet_id)=>{
    // alert('hellow')
    const token = localStorage.getItem('token')
    if(token){
        fetch(`https://pet-care-api.vercel.app/pet/list/${pet_id}/`,{
            method : 'DELETE',
            headers : {
                'Content-Type':'application/json',
                'Authorization': `Token ${token}`,
            },
        })
        // .then(res=>res.json())
        .then(res=>{
            if(res.status == 204){
                document.getElementById('pet-del-error').innerText = 'Pet delete successful'
                document.getElementById('pet-del-error').style.color = "green"
    
                setTimeout( ()=>{
                    window.location.href = 'home.html'
                },2000)
            }
            else{
                return res.json()
            }
        })
        .then(data=>{
            console.log(data)
            if(data.detail){
                document.getElementById('pet-del-error').innerText = 'You have no permission delete this pet'
                document.getElementById('pet-del-error').style.color = "red"
            }
        })
    }
    else{
        window.location.href = 'login.html'
    }
}


const AddReview =(event)=>{
    event.preventDefault()
    const review_body = document.getElementById('review-body').value 
    const ratting = document.getElementById('ratting').value
    const pet_id = document.getElementById('review_petId').value
    console.log(review_body)
    console.log(ratting)
    console.log(pet_id)

    const token = localStorage.getItem('token')
    console.log(token)
    fetch('https://pet-care-api.vercel.app/pet/reviews/',{
        method : 'POST',
        headers : {
            'Authorization':`Token ${token}`,
            'Content-Type':'application/json',
        },
        body : JSON.stringify({
            body : review_body,
            ratting : ratting,
            pet : pet_id,
        })
    })
    .then(res=> res.json())
    .then(data=>{
        console.log(data)
        if(data.id){
            

            var errorModal = new bootstrap.Modal(document.getElementById('addopt_error_msg'));
            errorModal.show();
            document.getElementById('adopt_massage').innerText = "Review added successfully."
            document.getElementById('adopt_massage').style.color = 'green'

            setTimeout(()=>{
                document.getElementById('review_msg').innerText=" "
                document.getElementById('review-body').value=""
                document.getElementById('ratting').value=""
            },3000)
        }
        else{
            
            var errorModal = new bootstrap.Modal(document.getElementById('addopt_error_msg'));
            errorModal.show();
            document.getElementById('adopt_massage').innerText = `You can only review a pet that you have adopted.`
            document.getElementById('adopt_massage').style.color = 'red'

            setTimeout(()=>{
                document.getElementById('review_msg').innerText=" "
                document.getElementById('review-body').value=''
                document.getElementById('ratting').value=""
            },3000)
        }
    })
}


const loadPetReview =()=>{
    const petId = new URLSearchParams(window.location.search).get("pet_id")
    console.log(petId)
    
    fetch(`https://pet-care-api.vercel.app/pet/reviews/pet_id/${petId}/`,{
        method : 'GET',
        headers :{'Content-Type':'application/json'},
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        document.getElementById('count_review').innerHTML = `<i>Total review : ${data.length}</i>`
        displayPetReview(data)
    })
}

const displayPetReview =(review)=>{
    review.forEach(element => {
        const parent = document.getElementById('per_pet_review')
        const li = document.createElement("li")
        li.classList.add('slide-visible')
        const profileImage = element.reviewer.profile_image ? element.reviewer.profile_image : './images/user_image.jpg';
        li.innerHTML = `
        <div class="card shadow">
            <div class="ratio ratio-16x9">
                <img class="team-image" src="${profileImage}" class="card-img-top" loading="lazy" alt="image">
            </div>
            <div class="card-body p-3 p-xl-5">
                <h3 class="card-title h5">${element.reviewer.user}</h3>
                <p class="card-text">${element.body.slice(0,100)}</p>
                <p class="card-text">${element.ratting}</p>
            
            </div>
        </div>
        `
        parent.appendChild(li)
    });
}



loadCategory()
loadPetDetails()
loadPetReview()
PetUpdateData()
getSearchValue()
// loadAllPet()
// SubmitUpdateData()


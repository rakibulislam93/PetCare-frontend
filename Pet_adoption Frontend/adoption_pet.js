
const AdoptionPet=()=>{
    fetch('https://pet-care-api.vercel.app/pet/adoption/')
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        document.getElementById('all_adoptPet_count').innerHTML = `<i>Total adopted pet : ${data.length} </i>`
        data.forEach(element => {
            console.log(element.pet)
            fetch(`https://pet-care-api.vercel.app/pet/list/${element.pet}/`)
            .then(res=>res.json())
            .then(adopPet=>{
                console.log(adopPet)
                const parent = document.getElementById('adoppet_container')
                const div = document.createElement('div')
                div.classList.add('adoppet_card')

                div.innerHTML = `
                <img class="adoption_pet_image" src="${adopPet.image}" alt="">
                <div class="pet_info">
                    <h6>${adopPet.name}</h6>
                    <h6>$${adopPet.price}</h6>
                    <h6 class="text-start ps-3">Age : ${adopPet.age}</h6>
                    <h6 class="text-start ps-3">Category : ${adopPet.category}</h6>
                    <p class="text-start ps-3"><b>Description : </b> ${adopPet.description.slice(0,60)}</p>
                    
                </div>
                `
                parent.appendChild(div)
            })
        });
    })
}

const TotalReview=()=>{
    fetch('https://pet-care-api.vercel.app/pet/reviews/')
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        document.getElementById('all_reviews_count').innerHTML = `<i>Total reviews found : ${data.length} </i>`
        disPlayAllReviews(data)
    })
}
const disPlayAllReviews=(reviews)=>{
    reviews.forEach(element => {
        const parent = document.getElementById('reviews_card')
        const li = document.createElement("li")
        li.classList.add('slide-visible')
        const profileImage = element.reviewer.profile_image ? element.reviewer.profile_image : './images/user_image.jpg';
        li.innerHTML = `
             <div class="card shadow h-100">
                        <div class="ratio ratio-16x9">
                            <img src="${profileImage}" class="card-img-top" loading="lazy" alt="...">
                        </div>
                        <div class="card-body p-3 p-xl-5">
                            <h3 class="card-title h5">${element.reviewer.user}</h3>
                            <p class="card-text">${element.body.slice(0,60)}</p>
                            <p class="card-text">${element.ratting}</p>
                            
                            </div>
                        </div>
                    </div>
        `
        parent.appendChild(li)
    });
}


AdoptionPet()
TotalReview()
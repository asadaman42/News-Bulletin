const loadNews = async() => {
    const urlMain = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(urlMain);
    const data = await res.json();
    displayCategories(data.data.news_category);
}

const displayCategories = categories => {
    const categoryContainer = document.getElementById('add-category');
    categories.forEach(category => {
        const categoryName = category.category_name;
        const categoryID = category.category_id;
        const liCreate = document.createElement('li');
        liCreate.classList.add('nav-item', 'mx-lg-4');
        liCreate.innerHTML = `
        <a class="nav-link active" aria-current="page" href="#" onclick="displayNewses('${categoryID}', '${categoryName}')">${categoryName}</a>
        `;
        categoryContainer.appendChild(liCreate);
        
    });    
}



const displayNewses = async (id, category) => {
    const urlNews = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch (urlNews);
    const data = await res.json();
    const newses = data.data;
    const newsContainer = document.getElementById('news-container');
    const itemLengthContainer = document.getElementById('items-found');
    itemLengthContainer.innerHTML = ``;
    newsContainer.innerHTML = ``;
    const pCreate = document.createElement('p');
    pCreate.innerText = `${newses.length} items found in ${category} category`;
    itemLengthContainer.appendChild(pCreate);
    newses.forEach(news => {
        const {thumbnail_url, title, details, author, total_view, rating, _id,} = news;
        const createDiv = document.createElement('div');
        createDiv.classList.add('row', 'bg-dark', 'my-5', 'mx-2');
        createDiv.innerHTML = `
        <div class="col-12 col-md-3 my-auto ms-md-0">
            <img class="img-fluid" src="${thumbnail_url}">
        </div>
        <div class="row col-12 col-md-9">
            <h2 class="col-12 my-2"> ${title} </h2>
            <p class="col-12 text-truncate"> ${details} </p>
            <div class="col-12 row align-items-center"> 
                <div class="row col-12 col-md-12 col-lg-4 align-items-center">
                    <img class="col-4 img-fluid rounded-circle" src="${author.img}">
                    <div class="col-8 text-start">
                        <p>${author.name  ? author.name : 'No Data Available.'}</p>
                        <p>${author.published_date}</p>
                    </div>                                    
                </div>
                <p class="col-12 col-md-4 col-lg-2"><i class="fa-solid fa-eye"> </i> ${total_view ? total_view : 'No views!'}</p>
                <div class="col-12 col-md-4 col-lg-3">
                    <div class="stars-outer">
                        <div class="stars-inner"></div>
                    </div>
                </div>
                <button onclick="exploreDetails('${news._id}')" class="col-12 col-md-4 col-lg-3 btn btn-primary my-4">Explore</button>
            </div>
        </div>        
        `;
        newsContainer.appendChild(createDiv);
        
        const starPercentage = `${(rating.number / 5) * 100}%`;
        document.querySelector( '.stars-inner').style.width = starPercentage;
    });
}

const exploreDetails = async (id) => {
    const urlDetails = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch (urlDetails);
    const data = await res.json();
    const mainObject = data.data[0];
    const {author, details, image_url, thumbnail_url, title, total_view} = mainObject
    console.log(mainObject);
    const modalContainer = document.getElementById('exampleModal');
    modalContainer.innerHTML = ``;
    
    
    
    const createDiv = document.createElement('div');
    createDiv.classList.add('modal-dialog', 'modal-xl', 'text-dark');
    createDiv.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="container-fluid">                
                <div class="row-cols-12">
                    <img class="col img-fluid rounded-2 my-2" src="${image_url}">
                    <div class="col row my-2">
                        <div class="col-2"></div>
                        <img class="col-1 img-fluid rounded-circle" src="${author.img}">
                        <div class="col-5 row ms-0 justify-content-start text-start">
                            <p class="col-12 ms-0"> Author Name: ${author.name ? author.name : 'No Data Available.'} </p>
                            <p class="col-12 ms-0"> Publish Date: ${author.published_date} </p>                            
                        </div>                    
                        <div class="col-2"> Views: ${total_view ? total_view : 'No data Found!'}</div>
                        <div class="col-2"></div>                    
                    </div>
                    <div class="col my-2">${details}</div>                    
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
    </div>
    `;
    modalContainer.appendChild(createDiv);
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
    myModal.show()
    

}






loadNews()
// onclick="exploreDetails('${news._id}')"
// data-bs-toggle="modal" data-bs-target="#exampleModal"

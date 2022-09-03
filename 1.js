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
        // console.log(news);
        
        const {thumbnail_url, title, details, author, total_view, rating, _id,} = news;
        const createDiv = document.createElement('div');
        createDiv.classList.add('row', 'bg-dark', 'my-5', 'mx-2');
        createDiv.innerHTML = `
        <div class="col-12 col-md-3 my-auto ms-md-0">
            <img class="img-fluid" src="${thumbnail_url}">
        </div>
        <div class="row col-12 col-md-9">
            <h2 class="col-12"> ${title} </h2>
            <p class="col-12 text-truncate text-truncate--2"> ${details} </p>
            <div class="col-12 row align-items-center"> 
                <div class=" col-12 col-md-12 col-lg-4 align-items-center">
                    <div>
                        <p> Author:${author.name}</p>
                        <p> Date:${author.published_date}</p>
                    </div>                                    
                </div>
                <p class="col-12 col-md-4 col-lg-2"><i class="fa-solid fa-eye"> </i> ${total_view}</p>
                <div class="col-12 col-md-4 col-lg-3">
                    <div class="stars-outer">
                        <div class="stars-inner"></div>
                    </div>
                </div>
                <button onclick="exploreDetails('${news._id}')" class="col-12 col-md-4 col-lg-3 btn btn-primary my-4" data-bs-toggle="modal" data-bs-target="#exampleModal">Explore</button>
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
    const modalContainer = document.getElementById('exampleModal');
    console.log(data);

}



loadNews()


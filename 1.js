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
    console.log(data.data);
    const itemLengthContainer = document.getElementById('items-found');
    itemLengthContainer.innerHTML = ``;
    const pCreate = document.createElement('p');
    pCreate.innerText = `${data.data.length} items found in ${category} category`;
    itemLengthContainer.appendChild(pCreate);

    
}

loadNews()


const wrapper = document.querySelector('.wrapper')
const productContainer = document.querySelector('.product-container')
const loading = document.querySelector('.loading')
const categories = document.querySelector('.categories')
const addProductForm = document.querySelector('#add-form')

const errorBlock = document.createElement('div')




addProductForm.addEventListener('submit', (e) => {
    e.preventDefault() 
    const productTitle = document.querySelector('#product-title').value
    const productPrice = document.querySelector('#product-price').value

    const productDescription = document.querySelector('#product-descript').value

    addNewProduct({ title: productTitle, price: productPrice, description: productDescription })

    addProductForm.reset()
})

async function  getProducts(params) {
    productContainer.innerHTML = ''
    try{
        loading.textContent = 'Загрузка каталога'
        await fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then((data) => data.products.forEach((product) => createProduct(product)))
        }
    catch(error) {
        errorBlock.textContent = 'Ошибка, не удалось загрузить карточки'
        productContainer.appendChild(errorBlock)
    }
    finally{
        loading.style.display = 'none'

    }
}

getProducts()

async function  getCategories() {
try{
    await fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(data => data.forEach((item) => createCategory(item) ));
    } catch(error){

    }
  
}
getCategories()

function createCategory (category) {
        const blockCategory = document.createElement('div')
        blockCategory.className = 'block-cat'
        blockCategory.textContent = category.name
        blockCategory.onclick = () => getProductByCategory(category.slug)
        categories.appendChild(blockCategory)
        
    }
    
async function getProductByCategory(category) {
    productContainer.innerHTML = ''
 try{
    await fetch(`https://dummyjson.com/products/category/${category}`)

    .then(res => res.json())
    .then(data => data.products.forEach((product) => createProduct(product) ))
       
 } catch(err){

 }
}

// кнопка сброса фильтра
const showAllBtn = document.createElement('button');
showAllBtn.textContent = 'Сбросить фильтр';
showAllBtn.className = 'show-btn'
showAllBtn.style.margin = '10px';
showAllBtn.onclick = () => getProducts();

categories.appendChild(showAllBtn);


const search = document.querySelector('.search')
const inputForSearch = document.createElement('input')
inputForSearch.type = 'text'
inputForSearch.id = 'search-input'
inputForSearch.placeholder = 'Поиск по названию'

const searchButton = document.createElement('button');
searchButton.className = 'search-btn'
searchButton.textContent = 'Искать';

search.appendChild(inputForSearch);
search.appendChild(searchButton);


searchButton.onclick = () => {
    const searchValue = inputForSearch.value

    searchProduct(searchValue)
    }

    inputForSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const searchValue = e.target.value;
        searchProduct(searchValue)
    }
    })
               
    async function searchProduct(product) {
    productContainer.innerHTML = ''
    try{
        await fetch(`https://dummyjson.com/products/search?q=${product}`)
        
        .then(res => res.json())
        .then(data => data.products.forEach((product) => createProduct(product) ))
           
     } catch(error) {
        errorBlock.textContent = 'Ошибка, не удалось загрузить карточки'
        productContainer.appendChild(errorBlock)
    }
    }

    async function addNewProduct(product){
        await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        title: product?.title ?? '',
        price: product?.price ?? '',
        description: product?.description?? '',
        productId:1,
  })
})

    .then(res => res.json()).then(data => {
    console.log(data)
    createProduct(data)
})

    }

function createProduct(product){
 
       
        const wrapToCard = document.createElement('div')
        wrapToCard.className = 'card-wrap'
        wrapToCard.dataset.id = product.id

        const card = document.createElement('div')
        card.className = 'item-card'

        const cardInfo = document.createElement('div')
        cardInfo.className = 'card-info'

        const itemText = document.createElement('span')
        itemText.textContent = product.title
        itemText.className = 'item-text'

        const itemPrice = document.createElement('span')
        itemPrice.textContent = 'Цена: ' + product.price
        itemPrice.className = 'item-price'

        const itemDescription = document.createElement('div')
        itemDescription.textContent = product.description
        itemDescription.className = 'item-descr'

        const itemViewBtn = document.createElement('button')
        itemViewBtn.textContent = 'Подробнее'
        itemViewBtn.className = 'view-btn'

        cardInfo.appendChild(itemText)
        cardInfo.appendChild(itemPrice)
        cardInfo.appendChild(itemViewBtn)


        card.appendChild(cardInfo)

        wrapToCard.appendChild(card)
        wrapToCard.appendChild(itemDescription)


        productContainer.appendChild(wrapToCard)
        
}

setTimeout(() => document.querySelectorAll('.view-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const productId = e.target.closest('.card-wrap').dataset.id
        window.location.href = `product.html?id=${productId}`
    })
}), 1000)




// const cars = ["Saab", "Volvo", "Lada", "Toyota"]

//const handleSearch = (searchValue) => {
    // const filteredCars = Cars.filter((car) => 
    // car.toLowerCase().includes(searchValue.toLowerCase()))
    
// return filteredCars
// }

// handleSearch('s')


// onchange у инпута листенером 









let aboutUsPage = document.querySelector('.about-us-page');
let aboutUsButton = document.querySelector('#about-us-btn');
let mainPage = document.querySelector('.main-page')
let aboutUsText = document.querySelector('.about-us-text')
let productsList = document.querySelector('.products-list')


aboutUsButton.addEventListener('click', function () {
    mainPage.style.display = 'none'
    aboutUsPage.style.display = 'flex';
    aboutUsText.style.display = 'flex'
});





async function getProducts() {
    let response = await fetch("shop.json")
    let products = await response.json()
    return products
};

// Функція для отримання значення кукі за ім'ям
function getCookieValue(cookieName) {
    // Розділяємо всі куки на окремі частини
    const cookies = document.cookie.split(';')
    // Шукаємо куки з вказаним ім'ям
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim() // Видаляємо зайві пробіли
        // Перевіряємо, чи починається поточне кукі з шуканого імені
        if (cookie.startsWith(cookieName + '=')) {
            // Якщо так, повертаємо значення кукі
            return cookie.substring(cookieName.length + 1) // +1 для пропуску "="
        }
    }
    // Якщо кукі з вказаним іменем не знайдено, повертаємо порожній рядок 
    return ''
}


let products_list = document.querySelector(".products-list")

function getCard(product){
    return  `
         <div class="card" style="width: 20rem;">
            <img src="img/${product.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.price} грн.</p>
        <button class="btn btn-outline-dark py-3 add-cart-btn" data-product='${JSON.stringify(product)}'>
            <svg  xmlns="http://www.w3.org/2000/svg"  width="30"  height="30"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M12.5 17h-6.5v-14h-2" /><path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
            Додати в кошик</button>|
            </div>
          </div>
    `
}


class ShoppingCart{
    constructor(){
        this.items = {}
        this.loadCartFromCookies()
    }

    // Зберігання кошика в кукі
    saveCartToCookies() {
        let cartJSON = JSON.stringify(this.items);
        document.cookie = `cart=${cartJSON}; max-age=${60 * 60 * 24 * 7}; path=/`;
    }

    // Завантаження кошика з кукі
    loadCartFromCookies() {
        let cartCookie = getCookieValue('cart');
        if (cartCookie && cartCookie !== '') {
            this.items = JSON.parse(cartCookie);
        }
    }

    addItem(product){
        if (product.id in this.items){
            this.items[product.id].quantity += 1
        }else{
            this.items[product.id] = product
            this.items[product.id].quantity = 1
        }
        this.saveCartToCookies()
    }
}

let cart = new ShoppingCart() 

function addToCard(event){
    let data = event.target.getAttribute('data-product')
    let product = JSON.parse(data)
    cart.addItem(product)

    console.log(cart.items)
}

getProducts().then(function(products){

    if (products_list){
        products.forEach(function(product){
            products_list.innerHTML+= getCard(product)
        })
        let addBtn_list = document.querySelectorAll(".add-cart-btn")
        addBtn_list.forEach(function(btn){
            btn.addEventListener("click", addToCard)
        })
    }
    
})

// Додавання товарів кошика на сторінку


function getCartItem(product){
    return  `
         <div class="card my-2">
                <div class="row m-2 ">
                    <div class="col-2">
                        <img src="img/${product.image}" class="img-fluid">
                    </div>
                    <div class="col-6">
                        <h5>${product.title}</h5>
                    </div>
                    <div class="col-2">${product.quantity} шт.</div>
                    <div class="col-2">
                        <h4>${product.price * product.quantity} грн</h4>
                    </div>
                </div>
            </div>
    `
}

let cart_list = document.querySelector(".сart-list")
cart_list.innerHTML =''

for (let key in cart.items){
    cart_list.innerHTML+= getCartItem(cart.items[key])
}





const swiper = new Swiper('.swiper', {
    // Optional parameters
    //direction: 'vertical',
    loop: true,
    autoplay: {
        delay: 5000,
    },
    slidesPerView: 1,
    updateOnWindowResize: true,
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    /* scrollbar: {
      el: '.swiper-scrollbar',
    }, */
});

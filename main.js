const navbar = document.querySelector('.nav--list');
const menuBtn = document.querySelector('.first--wrapper i');
const cartIcon = document.querySelector('.cart--icon');
const checkoutContainer = document.querySelector('.checkout--wrapper');
const removeBtn = document.querySelector('.fa-trash');
const navLinks = document.querySelectorAll('.nav--list li');
const prevBtn = document.querySelector('.prev--btn');
const prevBtn2 = document.querySelector('.prev--btn-2');
const nextBtn = document.querySelector('.next--btn');
const nextBtn2 = document.querySelector('.next--btn-2');
const carouselContainer = document.querySelector('.carousel--wrapper');
const carouselContainer2 = document.querySelector('.big--img--carousel');
const highlightImgs = document.querySelectorAll('.thumbnail--img');
const highlightImgs2 = document.querySelectorAll('.thumbnail--img-2');
const closeBtn = document.querySelector('#close--btn');
const bigCarousel = document.querySelector('.big--img--wrapper');
let indexCarousel = 0;
let remove = false;


// NAVBAR TOGGLE 
menuBtn.addEventListener('click', () => {
    if (menuBtn.classList.contains('fa-bars')) {
        menuBtn.classList.remove('fa-bars');
        menuBtn.classList.add('fa-times');
        navbar.classList.add('show');
    }
    else {
        menuBtn.classList.remove('fa-times');
        menuBtn.classList.add('fa-bars')
        navbar.classList.remove('show');
    }
})

// CART & CHEKCKOUT CONTAINER 

cartIcon.addEventListener('click', () => {
    checkoutContainer.classList.toggle('active');
})




// ACTIVE LINKS 

const activeLink = (index) => {
    navLinks.forEach(link => link.classList.remove('active'));
    navLinks[index].classList.add('active');
}

navLinks.forEach((link, i) => {
    link.addEventListener('click', () => {
        activeLink(i)
    })
})

// CAROUSEL CONTAINER 

prevBtn.addEventListener('click', () => {
    indexCarousel--;
    if (indexCarousel < 0) {
        indexCarousel = 3;
    }
    carouselContainer.style.transform = `translateX(${-indexCarousel * 500}px)`;
})

nextBtn.addEventListener('click', () => {
    indexCarousel++;
    if (indexCarousel > 3) {
        indexCarousel = 0;
    }
    carouselContainer.style.transform = `translateX(${-indexCarousel * 500}px)`;
})




prevBtn2.addEventListener('click', () => {
    indexCarousel--;
    if (indexCarousel < 0) {
        indexCarousel = 3;
    }
    carouselContainer2.style.transform = `translateX(${-indexCarousel * 630}px)`;
    highlightImgs2.forEach(img => img.classList.remove('highlight'));
    highlightImgs2[indexCarousel].classList.add('highlight');
})

nextBtn2.addEventListener('click', () => {
    indexCarousel++;
    if (indexCarousel > 3) {
        indexCarousel = 0;
    }

    carouselContainer2.style.transform = `translateX(${-indexCarousel * 630}px)`;
    highlightImgs2.forEach(img => img.classList.remove('highlight'));
    highlightImgs2[indexCarousel].classList.add('highlight');
})

//NOTE IMG HIGHLIGHT FUNCTION

function handleHighlight() {
    const index = this.dataset.index;
    highlightImgs.forEach(img => img.classList.remove('highlight'));
    highlightImgs[index].classList.add('highlight');
    if (highlightImgs[index].classList.contains('highlight')) {
        bigCarousel.classList.add('select');
    }
    else {
        bigCarousel.classList.remove('select');
    }
    highlightImgs2.forEach(img => img.classList.remove('highlight'));
    highlightImgs2[index].classList.add('highlight');
    carouselContainer2.style.transform = `translateX(${-index * 630}px)`;
    indexCarousel = index;
}

highlightImgs.forEach(img => img.addEventListener('click', handleHighlight))

// NOTE IMG HIGHLIGHT FUNCTION 2
function handleHighlight2() {
    const index = this.dataset.index;
    highlightImgs2.forEach(img => img.classList.remove('highlight'));
    highlightImgs2[index].classList.add('highlight');
    carouselContainer2.style.transform = `translateX(${-index * 630}px)`;
    indexCarousel = index;
}


highlightImgs2.forEach(img => img.addEventListener('click', handleHighlight2))


// NOTE CLOSE CAROUSEL BUTTON 
closeBtn.addEventListener('click', () => {
    if (bigCarousel.classList.contains('select')) {
        bigCarousel.classList.remove('select');
        highlightImgs.forEach(img => img.classList.remove('highlight'));
        highlightImgs2.forEach(img => img.classList.remove('highlight'));
    }
    else {
        return;
    }
})


// ANCHOR  ADD TO CART EVENTS
let counter = 0;
document.addEventListener('DOMContentLoaded', () => {
    checkCounter(counter);
})

function checkCounter(quantity) {
    // quantity = counter;
    if (quantity > 0) {
        checkoutContainer.innerHTML = `
                  <span>Cart</span>
            <div class="order--wrapper">
              <img src="./images/image-product-1-thumbnail.jpg" alt="shoes">
              <p>Fall Limited Edition Sneakers $125.00 x <span class="quantity">${quantity}</span>=<span
                  class="total-price">\$${quantity * 125.00}</span></p>
              <i onClick="cartEmpty()" class="fas fa-trash"></i>
              <button class="checkout">Checkout</button>
            </div> 
    `
    }
    else {
        checkoutContainer.innerHTML = `
     <span>Cart</span>
        <div class="order--wrapper-2">
              <p>Your cart is empty</p>
        </div>
    `
    }
}

// NOTE ADD FUNCTIONS AND VARIABLES
const addBtn = document.querySelector('#add--btn');
const minusBtn = document.querySelector('#minus--btn');
const orderAmount = document.querySelector('#quantity-digit');
const orderPopup = document.querySelector('.cart--icon');
const addToCartBtn = document.querySelector('#addCart');

// NOTE FUNCTION TO EMPTY CART
function cartEmpty() {
    remove = true;
    checkoutContainer.innerHTML = ` `;
    checkoutContainer.innerHTML = `
     <span>Cart</span>
        <div class="order--wrapper-2">
              <p>Your cart is empty</p>
        </div>
    `
    orderPopup.setAttribute('data-order', 0);
    orderPopup.classList.remove('ordered');
    checkCounter(0);
    remove = false;
}

addBtn.addEventListener('click', () => {
    counter++;
    orderAmount.textContent = counter;
})

minusBtn.addEventListener('click', () => {
    counter--;
    if (counter < 1) {
        counter = 0;
    }
    orderAmount.textContent = counter;
})

function handleAddToCart(orderQuantity) {
    if (orderQuantity > 0) {
        checkCounter(orderQuantity);
        orderPopup.setAttribute('data-order', orderQuantity);
        orderPopup.classList.add('ordered');
    }
    else {
        checkCounter(0);
        orderPopup.setAttribute('data-order', orderQuantity);
        orderPopup.classList.remove('ordered');
    }
}

addToCartBtn.addEventListener('click', () => {
    handleAddToCart(counter)
})

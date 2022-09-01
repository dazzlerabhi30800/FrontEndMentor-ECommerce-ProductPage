const navbar = document.querySelector('.nav--list');
const menuBtn = document.querySelector('.first--wrapper i');
const cartIcon = document.querySelector('.cart--icon');
const checkoutContainer = document.querySelector('.checkout--wrapper');
const removeBtn = document.querySelector('.fa-trash');
const navLinks = document.querySelectorAll('.nav--list li');
const prevBtn = document.querySelector('.prev--btn');
const nextBtn = document.querySelector('.next--btn');
const carouselContainer = document.querySelector('.carousel--wrapper');
let index = 0;
let remove = false;



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

cartIcon.addEventListener('click', () => {
    checkoutContainer.classList.toggle('active');
})

removeBtn.addEventListener('click', () => {
    remove = true;
    checkoutContainer.innerHTML = ` `;
    checkoutContainer.innerHTML = `
     <span>Cart</span>
        <div class="order--wrapper-2">
              <p>Your cart is empty</p>
        </div>
    `

})

const activeLink = (index) => {
    navLinks.forEach(link => link.classList.remove('active'));
    navLinks[index].classList.add('active');
}

navLinks.forEach((link, i) => {
    link.addEventListener('click', () => {
        activeLink(i)
    })
})

prevBtn.addEventListener('click', () => {
    index--;
    if (index < 0) {
        index = 3;
    }
    carouselContainer.style.transform = `translateX(${-index * 500}px)`;
})
nextBtn.addEventListener('click', () => {
    index++;
    if (index > 3) {
        index = 0;
    }
    carouselContainer.style.transform = `translateX(${-index * 500}px)`;
})
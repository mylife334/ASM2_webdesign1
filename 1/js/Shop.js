let header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});

const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
});

sr.reveal('.home-text, .buds-text', { origin: 'left' });
sr.reveal('.home-img, .buds-img', { origin: 'right' });
sr.reveal('.heading', { delay: 200 });
sr.reveal('.specs-details .box', { origin: 'left', interval: 200 });
sr.reveal('.specs-img', { delay: 600 });
sr.reveal('.shop-container .box, .footer .logo, .footer .footer-box', { interval: 150 });

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
cartIcon.onclick = () => {
    cart.classList.add("active");
};
closeCart.onclick = () => {
    cart.classList.remove("active");
};

let addCartIcons = document.querySelectorAll('.add-cart');
addCartIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        cart.classList.add("active");
    });
});

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    var reomveCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < reomveCartButtons.length; i++) {
        var button = reomveCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

function buyButtonClicked() {
    alert("Thank you! Your order has been placed.");
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild)
    }
    document.getElementsByClassName("total-price")[0].innerText = "$0";
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.querySelector(".cart-price");
        var quantityElement = cartBox.querySelector(".cart-quantity");

        // Kiểm tra xem priceElement và quantityElement có tồn tại không
        if (priceElement && quantityElement) {
            var price = parseFloat(priceElement.innerText.replace("$", ""));
            var quantity = quantityElement.value;
            total = total + price * quantity;
        }
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}



function quantityChanged(event) {
    var input = event.target;
    var cartBox = input.closest('.cart-box');

    if (isNaN(input.value)) {
        input.value =1;
    } else if (input.value >= 100) {
        alert("There is not enough product in stock!");
        input.value = 99;
    }else if (input.value <= 0) {
        cartBox.remove();
        alert("The product has been removed from the cart because the quantity is less than 1.");
    }

    updatetotal();
}

function addCartClicked(event) {
    var button = event.target;
    var shopProduct = button.parentElement;
    var title = shopProduct.getElementsByClassName("product-title")[0].innerText;
    var price = shopProduct.getElementsByClassName("price")[0].innerText;
    var productImg = shopProduct.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = document.getElementsByClassName('cart-title');

    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            // Nếu sản phẩm đã tồn tại, tăng số lượng
            var quantityElement = cartItemsNames[i].parentNode.querySelector('.cart-quantity');
            var currentQuantity = parseInt(quantityElement.value);
            quantityElement.value = currentQuantity + 1;
            alert('Item quantity increased in the cart');
            updatetotal();
            return;
        }
    }

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>
    `;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
    updatetotal();
}


document.getElementById('logout-btn').addEventListener('click', function() {
    window.location.href = '/Login-Register/Login.html';
});
var swiper = new Swiper('.home-slider-container', {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: true,
});
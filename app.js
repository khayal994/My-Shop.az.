function filterProducts() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const genderFilter = document.getElementById("genderFilter").value;
    const colorFilter = document.getElementById("colorFilter").value;
    const sizeFilter = document.getElementById("sizeFilter").value.toLowerCase();
    const minPriceFilter = document.getElementById("minPriceFilter").value;
    const maxPriceFilter = document.getElementById("maxPriceFilter").value;
    const brandFilter = document.getElementById("brandFilter").value;
    const cards = document.querySelectorAll(".product-cardxl");

    let anyProductsMatch = false; // Yalnız filterə uyğun məhsul varsa true olacaq

    cards.forEach(card => {
        const name = card.getAttribute("data-name-filter").toLowerCase();
        const category = card.getAttribute("data-category-filter").toLowerCase();
        const gender = card.getAttribute("data-gender-filter");
        const color = card.getAttribute("data-color-filter");
        const size = card.getAttribute("data-size-filter").toLowerCase();
        const price = parseFloat(card.getAttribute("data-price-filter"));
        const brand = card.getAttribute("data-brand-filter");

        let show = true;

        if (searchInput && !(name.includes(searchInput) || category.includes(searchInput))) {
            show = false;
        }

        if (genderFilter && gender !== genderFilter) {
            show = false;
        }

        if (colorFilter && color !== colorFilter) {
            show = false;
        }

        if (sizeFilter && !size.includes(sizeFilter)) {
            show = false;
        }

        if (minPriceFilter && price < parseFloat(minPriceFilter)) {
            show = false;
        }

        if (maxPriceFilter && price > parseFloat(maxPriceFilter)) {
            show = false;
        }

        if (brandFilter && brand !== brandFilter) {
            show = false;
        }

        card.style.display = show ? "block" : "none";

        if (show) {
            anyProductsMatch = true; // Filtrləmə nəticəsi varsa true olur
        }
    });

    // Əgər filtrə uyğun heç bir məhsul yoxdursa mesajı göstər
    if (!anyProductsMatch) {
        document.getElementById('noProductsMessage').style.display = 'block';
    } else {
        document.getElementById('noProductsMessage').style.display = 'none';
    }
}
function resetFilters() {
    document.getElementById("searchInput").value = "";
    document.getElementById("genderFilter").value = "";
    document.getElementById("colorFilter").value = "";
    document.getElementById("sizeFilter").value = "";
    document.getElementById("minPriceFilter").value = "";
    document.getElementById("maxPriceFilter").value = "";
    document.getElementById("brandFilter").value = "";
    filterProducts();
}

// finish 


// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = 'block';
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebarlar');
    const isOpen = cartSidebar.style.right === '0px';
    cartSidebar.style.right = isOpen ? '-400px' : '0px';
}
document.addEventListener('DOMContentLoaded', () => {
    const cartSidebar = document.getElementById('cart-sidebarlar');
    const cartCount = document.getElementById('cart-countlar');
    const totalPriceElement = document.getElementById('total-pricelar');
    const cartItemsContainer = document.querySelector('.cart-itemslar');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCart();

    document.querySelectorAll('.add-to-cartlar').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const productCard = event.target.closest('.product-cardlar');
        const productId = productCard.dataset.id;
        const productName = productCard.dataset.name;
        const productPrice = parseFloat(productCard.dataset.price);
        const productImage = productCard.dataset.image;

        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }

        updateCart();
        toggleCart(true);  // Səbəti avtomatik açmaq üçün true parametri ilə çağırırıq
    }

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        cartCount.textContent = cart.length;
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.price} AZN</p>
                </div>
                <div class="cart-item-actions">
                    <button class="decrease-quantity">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity">+</button>
                    <button class="remove-item">🗑️</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);

            cartItem.querySelector('.increase-quantity').addEventListener('click', () => changeQuantity(item.id, 1));
            cartItem.querySelector('.decrease-quantity').addEventListener('click', () => changeQuantity(item.id, -1));
            cartItem.querySelector('.remove-item').addEventListener('click', () => removeFromCart(item.id));

            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    function changeQuantity(productId, change) {
        const product = cart.find(item => item.id === productId);
        if (product) {
            product.quantity += change;
            if (product.quantity <= 0) {
                removeFromCart(productId);
            } else {
                updateCart();
            }
        }
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    function toggleCart(forceOpen = false) {
        const isOpen = cartSidebar.style.right === '0px';
        if (forceOpen || !isOpen) {
            cartSidebar.style.right = '0px';
        } else {
            cartSidebar.style.right = '-400px';
        }
    }
});   
// like 
document.getElementById('openFavorites').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('favoritesPagex').classList.add('show');
    // history.pushState({ page: 'favorites' }, 'Favorites', '#favorites'); // URL-ı dəyişdiririk
});

document.getElementById('closeFavorites').addEventListener('click', function() {
    document.getElementById('favoritesPagex').classList.remove('show');
    // history.back(); // URL-ı əvvəlki vəziyyətinə qaytarırıq
});

// window.addEventListener('popstate', function(event) {
//     if (event.state && event.state.page === 'favorites') {
//         document.getElementById('favoritesPagex').classList.add('show');
//     } else {
//         document.getElementById('favoritesPagex').classList.remove('show');
//     }
// });

document.getElementById('openFavorites').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('favoritesPagex').classList.add('show');
});

document.getElementById('closeFavorites').addEventListener('click', function() {
    document.getElementById('favoritesPagex').classList.remove('show');
});

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
updateFavoriteCount();
renderFavorites();

document.querySelectorAll('.like-iconx').forEach(function(icon) {
    const card = icon.closest('.product-cardx');
    const name = card.getAttribute('data-namex');
    const isFavorited = favorites.some(fav => fav.name === name);

    if (isFavorited) {
        icon.classList.add('filled');
    }

    icon.addEventListener('click', function() {
        const name = card.getAttribute('data-namex');
        const price = card.getAttribute('data-pricex');
        const image = card.getAttribute('data-imagex');
        const id = card.getAttribute('data-id');

        if (icon.classList.contains('filled')) {
            favorites = favorites.filter(fav => fav.name !== name);
            icon.classList.remove('filled');
        } else {
            favorites.push({ name, price, image, id });
            icon.classList.add('filled');
            showNotification();
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteCount();
        renderFavorites();
    });
});

function updateFavoriteCount() {
    const favoriteCountElement = document.querySelector('.favorites .count');
    favoriteCountElement.textContent = favorites.length;
}

function renderFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = '';

    favorites.forEach(function(fav) {
        const listItem = document.createElement('div');
        listItem.classList.add('favorites-list-item');

        listItem.innerHTML = `
    <img src="${fav.image}" onclick="openProductDetail(${fav.id})">
    <div class="product-infox">
        <p class="product-namex javaName" onclick="openProductDetail(${fav.id})">${fav.name}</p> <!-- data-id dəyərini burada istifadə etdik -->
        <p class="product-pricex javaPrice">${fav.price}</p>
        <span class="animated-deliveryxl javaAnimated ">Çatdırılma Pulsuz 0₼</span>
        <div class="product-ratingxl">
            <span class="star">&#9733;</span>
            <span class="star">&#9733;</span>
            <span class="star">&#9733;</span>
            <span class="star">&#9733;</span>
            <span class="star">&#9734;</span>
        </div>
        <button class="remove-icon javaRemove w3-button w3-block w3-red ">Məhsulu sil &times;</button>
    </div>
`;

        // Remove icon click event
        listItem.querySelector('.remove-icon').addEventListener('click', function() {
            favorites = favorites.filter(f => f.name !== fav.name);
            localStorage.setItem('favorites', JSON.stringify(favorites));

            // Kartdakı like-iconu tam qırmızı halından çıxarmaq
            document.querySelectorAll('.product-cardx').forEach(function(card) {
                if (card.getAttribute('data-namex') === fav.name) {
                    card.querySelector('.like-iconx').classList.remove('filled');
                }
            });

            renderFavorites();
            updateFavoriteCount();
        });

        favoritesList.appendChild(listItem);
    });
}

function showNotification() {
    const notification = document.getElementById('notification');
    notification.classList.add('show');

    setTimeout(function() {
        notification.classList.remove('show');
    }, 3000);
}
    document.querySelectorAll('.product-cardx').forEach(function(card) {
    const id = card.getAttribute('data-id');
    card.setAttribute('onclick', `openProductDetail(${id})`);
    });

function closeFavoritesPage() {
    document.getElementById('favoritesPagex').classList.remove('show');
}

document.getElementById('favoritesList').addEventListener('click', function(event) {
    if (event.target.matches('.product-infox, .product-infox *, img')) {
        closeFavoritesPage();
    }
});
function closeFavoritesPage() {
    document.getElementById('favoritesPagex').classList.remove('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('favoritesList').addEventListener('click', function(event) {
    if (event.target.matches('.product-infox, .product-infox *') || event.target.matches('img')) {
        closeFavoritesPage();
    }
});


function applyFilterAndClose() {
    filterProducts();
    w3_close();
}

// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = 'block';
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
} 
function applyFilterAndClose() {
    filterProducts();
    animateClose();
}

function w3_open() {
    const sidebar = document.getElementById("mySidebar");
    sidebar.style.display = "block";
    sidebar.style.transform = "translateX(0)";
    sidebar.style.opacity = "1";
}

function w3_close() {
    animateClose();
}

function animateClose() {
    const sidebar = document.getElementById("mySidebar");
    let opacity = 1;
    let transform = 0;
    
    const animate = () => {
        if (opacity > 0) {
            opacity -= 0.1;
            transform -= 10;
            sidebar.style.opacity = opacity;
            sidebar.style.transform = `translateX(${transform}px)`;
            requestAnimationFrame(animate);
        } else {
            sidebar.style.display = "none";
            sidebar.style.opacity = "1";
            sidebar.style.transform = "translateX(0)";
        }
    };
    animate();
}
function filterProductsx() {
                        const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
                        const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;
                        const color = document.getElementById("color").value;
                        const searchTerm = document.getElementById("searchTerm").value.toLowerCase();
                        
                        const cards = document.querySelectorAll(".product-cardl");
                        let anyProductsMatch = false;
                
                        cards.forEach(card => {
                            const price = parseFloat(card.querySelector(".product-price").textContent.replace('$', ''));
                            const title = card.querySelector(".product-title").textContent.toLowerCase();
                            const cardColor = card.querySelector(".product-image").style.backgroundColor;
                
                            if ((price >= minPrice && price <= maxPrice) &&
                                (searchTerm === "" || title.includes(searchTerm)) &&
                                (color === "" || cardColor === color)) {
                                card.style.display = "block";
                                anyProductsMatch = true;
                            } else {
                                card.style.display = "none";
                            }
                        });
                
                        if (!anyProductsMatch) {
                            document.getElementById('noProductsMessage').style.display = 'block';
                        } else {
                            document.getElementById('noProductsMessage').style.display = 'none';
                        }
                    }
                
                    document.querySelectorAll('.nav-itemkat').forEach(item => {
                        item.addEventListener('click', event => {
                            const category = item.getAttribute('data-category');
                            filterByCategory(category);
                        });
                    });
                
                    function filterByCategory(category) {
                        const cards = document.querySelectorAll(".product-cardl");
                
                        cards.forEach(card => {
                            const cardCategory = card.getAttribute("data-category").toLowerCase();
                            if (category === "all" || cardCategory === category) {
                                card.style.display = "block";
                            } else {
                                card.style.display = "none";
                            }
                        });
                
                        const anyProductsMatch = Array.from(cards).some(card => card.style.display === "block");
            
                }
                // lll
                document.addEventListener('DOMContentLoaded', function() {
        const navbar = document.querySelector('.navbarkat');
        const navItems = document.querySelectorAll('.nav-itemkat a');
        const scrollLeftBtn = document.querySelector('.scroll-btn.left');
        const scrollRightBtn = document.querySelector('.scroll-btn.right');

        navItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove the active class from all items
                navItems.forEach(nav => nav.classList.remove('active'));
                // Add the active class to the clicked item
                this.classList.add('active');
            });
        });
        
        // Function to show/hide scroll buttons based on scroll position
        function checkScrollButtons() {
            const scrollLeft = navbar.scrollLeft;
            const maxScrollLeft = navbar.scrollWidth - navbar.clientWidth;
            
            scrollLeftBtn.style.display = scrollLeft > 0 ? 'flex' : 'none';
            scrollRightBtn.style.display = scrollLeft < maxScrollLeft ? 'flex' : 'none';
        }
        
        // Initial check when the page loads
        checkScrollButtons();
        
        // Scroll buttons event listeners for desktop
        scrollLeftBtn.addEventListener('click', function() {
            navbar.scrollBy({
                left: -100,
                behavior: 'smooth'
            });
            // Show the right scroll button after scrolling left
            scrollRightBtn.style.display = 'flex';
        });

        scrollRightBtn.addEventListener('click', function() {
            navbar.scrollBy({
                left: 100,
                behavior: 'smooth'
            });
            // Show the left scroll button after scrolling right
            scrollLeftBtn.style.display = 'flex';
        });

        // Swipe left/right functionality for mobile
        let isDown = false;
        let startX;
        let scrollLeft;

        navbar.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - navbar.offsetLeft;
            scrollLeft = navbar.scrollLeft;
        });

        navbar.addEventListener('touchend', () => {
            isDown = false;
        });

        navbar.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - navbar.offsetLeft;
            const walk = (x - startX) * 3; // Adjust scrolling speed here
            navbar.scrollLeft = scrollLeft - walk;
        });

        // Show/hide scroll buttons based on scroll position
        navbar.addEventListener('scroll', function() {
            checkScrollButtons();
        });

        // Initially set the first item as active
        document.querySelector('.default-active').classList.add('active');
    });
        // Yuxarı çıx 
        // script.js
// Düyməni əldə edin
let backToTopBtn = document.getElementById("backToTopBtn");

// İstifadəçi səhifədə 20px-dən çox aşağı sürüşdükdə düyməni göstərmək üçün funksiyanı işə salın
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.classList.add("show");
        backToTopBtn.classList.remove("hide");
    } else {
        backToTopBtn.classList.add("hide");
        backToTopBtn.classList.remove("show");
    }
}

// İstifadəçi düyməni kliklədikdə səhifənin yuxarısına qayıdın
backToTopBtn.onclick = function() {
    document.body.scrollTop = 0; // Safari üçün
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE və Opera üçün
};
// filter acil 
function toggleFilter(filterId) {
            var filterOptions = document.getElementById(filterId);
            filterOptions.classList.toggle('active');
        }

        // language 

        function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none';
    } else {
        dropdownMenu.style.display = 'block';
    }
}

window.onclick = function(event) {
    if (!event.target.matches('.language-selector') && !event.target.matches('.language-selector *')) {
        document.getElementById('dropdown-menu').style.display = 'none';
    }
}
// navbarDesing 
// function showPage(pageId) {
//     const contents = document.querySelectorAll('.contentDesing');
//     const navItems = document.querySelectorAll('.nav-itemDesing');
//     contents.forEach(content => {
//         content.classList.remove('activeDesing');
//     });
//     navItems.forEach(navItem => {
//         navItem.classList.remove('activeNav');
//     });
//     document.getElementById(pageId).classList.add('activeDesing');
//     document.querySelector(`[onclick="showPage('${pageId}')"]`).classList.add('activeNav');
// }

function showPage(pageId) {
    const contents = document.querySelectorAll('.contentDesing');
    const navItems = document.querySelectorAll('.nav-itemDesing');
    
    contents.forEach(content => {
        content.classList.remove('activeDesing');
    });
    navItems.forEach(navItem => {
        navItem.classList.remove('activeNav');
    });
    
    document.getElementById(pageId).classList.add('activeDesing');
    document.querySelector(`[onclick="showPage('${pageId}')"]`).classList.add('activeNav');
    window.location.hash = pageId;
            // URL-i yalnız "index.html" və aktiv səhifə adı ilə yenilə
            const url = `index.html#${pageId}`;
            history.replaceState(null, document.title, url);

}

function loadPageFromHash() {
    const pageId = window.location.hash.substring(1) || 'home';
    showPage(pageId);
}

window.addEventListener('hashchange', loadPageFromHash);
window.addEventListener('load', loadPageFromHash);







        // WhatsApp düyməsini yaratmaq üçün JavaScript kodu
        document.addEventListener("DOMContentLoaded", function() {
            var whatsappButton = document.createElement("a");
            whatsappButton.href = "https://wa.me/+9940552163114";
            whatsappButton.target = "_blank";
            whatsappButton.rel = "noopener noreferrer";
            whatsappButton.classList.add("whatsapp-button");

            var whatsappIcon = document.createElement("img");
            whatsappIcon.src = "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg";
            whatsappIcon.alt = "WhatsApp";

            whatsappButton.appendChild(whatsappIcon);
            document.getElementById("whatsapp-container").appendChild(whatsappButton);
        });
        // Menu Java 
        function toggleCard(card) {
            const allCards = document.querySelectorAll('.cardxls');
            allCards.forEach(c => {
                if (c !== card) {
                    c.classList.remove('open');
                }
            });
            card.classList.toggle('open');
        }

        function filterCards() {
            const filterValue = document.getElementById('filterInput').value.toUpperCase();
            const cards = document.querySelectorAll('.cardxls');

            cards.forEach(card => {
                const cardText = card.getAttribute('data-filter').toUpperCase();
                if (cardText.includes(filterValue)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // WhatsApp and Products 

        function openProductDetail(productId) {
            // Əvvəlki məhsul detallarını gizlədək
            var productDetails = document.getElementsByClassName('product-detail');
            for (var i = 0; i < productDetails.length; i++) {
                productDetails[i].style.display = 'none';
            }
            
            // İndiyə qədər gizlədilmiş məhsulun detallarını açaq
            var selectedProductDetail = document.getElementById('product-detail-' + productId);
            if (selectedProductDetail) {
                selectedProductDetail.style.display = 'block';
            }
            
            // Köhnə səhifə elementlərini gizlədək
            document.getElementById('product-list').style.display = 'none';
            
            // URL-ni dəyişdirək ki, məhsul detalları səhifəsini göstərsin
            history.pushState(null, null, `?product=${productId}`);
        }

        function backToList() {
            // Məhsul detallarını gizlədək və köhnə səhifə elementlərini göstərək
            var productDetails = document.getElementsByClassName('product-detail');
            for (var i = 0; i < productDetails.length; i++) {
                productDetails[i].style.display = 'none';
            }
            document.getElementById('product-list').style.display = 'block';
            
            // URL-ni bərpa edək ki, köhnə səhifəyə dönüş etsin
            history.pushState(null, null, window.location.pathname);
        }

        function sendToWhatsApp(productName, productPrice, productLink) {
            var phoneNumber = "+9940552163114"; // WhatsApp nömrənizi daxil edin
            var message = "Salam, mən " + productName + " adlı məhsulu sifariş etmək istəyirəm. Məhsulun linki: " + productLink;
            var url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        }

        // Səhifə yükləndikdə, URL-dən məhsulun parametrini yoxlayaq və uyğun səhifəni göstərək
        window.onload = function() {
            var urlParams = new URLSearchParams(window.location.search);
            var productId = urlParams.get('product');
            if (productId) {
                openProductDetail(parseInt(productId));
            }
        }

        function changeMainImage(thumbnail) {
            const mainImage = thumbnail.closest('.container').querySelector('.main-image img');
            mainImage.src = thumbnail.src;
        }

        function changeQuantity(button, amount) {
            const quantityInput = button.closest('.quantity').querySelector('.quantity-input');
            let currentQuantity = parseInt(quantityInput.value);
            currentQuantity += amount;
            if (currentQuantity < 1) currentQuantity = 1;
            quantityInput.value = currentQuantity;
        }

        // WhatsApp and Products 
        function openProductDetail(productId) {
            // Əvvəlki məhsul detallarını gizlədək
            var productDetails = document.getElementsByClassName('product-detail');
            for (var i = 0; i < productDetails.length; i++) {
                productDetails[i].style.display = 'none';
            }
            
            // İndiyə qədər gizlədilmiş məhsulun detallarını açaq
            var selectedProductDetail = document.getElementById('product-detail-' + productId);
            if (selectedProductDetail) {
                selectedProductDetail.style.display = 'block';
            }
            
            // Köhnə səhifə elementlərini gizlədək
            document.getElementById('product-list').style.display = 'none';
            
            // URL-ni dəyişdirək ki, məhsul detalları səhifəsini göstərsin
            history.pushState(null, null, `?product=${productId}`);
        }

        function backToList() {
            // Məhsul detallarını gizlədək və köhnə səhifə elementlərini göstərək
            var productDetails = document.getElementsByClassName('product-detail');
            for (var i = 0; i < productDetails.length; i++) {
                productDetails[i].style.display = 'none';
            }
            document.getElementById('product-list').style.display = 'block';
            
            // URL-ni bərpa edək ki, köhnə səhifəyə dönüş etsin
            history.pushState(null, null, window.location.pathname);
        }

        function sendToWhatsApp(productName, productPrice, productLink) {
            var phoneNumber = "+9940552163114"; // WhatsApp nömrənizi daxil edin
            var message = "Salam, mən " + productName + " adlı məhsulu sifariş etmək istəyirəm. Məhsulun linki: " + productLink;
            var url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        }

        // Səhifə yükləndikdə, URL-dən məhsulun parametrini yoxlayaq və uyğun səhifəni göstərək
        window.onload = function() {
            var urlParams = new URLSearchParams(window.location.search);
            var productId = urlParams.get('product');
            if (productId) {
                openProductDetail(parseInt(productId));
            }
        }

        function changeMainImage(thumbnail) {
            const mainImage = thumbnail.closest('.container').querySelector('.main-image img');
            mainImage.src = thumbnail.src;
        }

        function changeQuantity(button, amount) {
            const quantityInput = button.closest('.quantity').querySelector('.quantity-input');
            let currentQuantity = parseInt(quantityInput.value);
            currentQuantity += amount;
            if (currentQuantity < 1) currentQuantity = 1;
            quantityInput.value = currentQuantity;
        }

        // WhatsApp and Products 
        let selectedColor = '';
        let selectedSize = '';


        function sendToWhatsApp(productName, productPrice, productLink) {
            var phoneNumber = "+9940552163114"; // WhatsApp nömrənizi daxil edin
            var message = "Salam, mən " + productName + " adlı məhsulu sifariş etmək istəyirəm. Rəng: " + selectedColor + ", Ölçü: " + selectedSize + ". Məhsulun linki: " + productLink;
            var url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        }

        // Səhifə yükləndikdə, URL-dən məhsulun parametrini yoxlayaq və uyğun səhifəni göstərək
        window.onload = function() {
            var urlParams = new URLSearchParams(window.location.search);
            var productId = urlParams.get('product');
            if (productId) {
                openProductDetail(parseInt(productId));
            }
        }
        function openProductDetail(productId) {
    // Əvvəlki məhsul detallarını gizlədək
    var productDetails = document.getElementsByClassName('product-detail');
    for (var i = 0; i < productDetails.length; i++) {
        productDetails[i].style.display = 'none';
    }
    
    // İndiyə qədər gizlədilmiş məhsulun detallarını açaq
    var selectedProductDetail = document.getElementById('product-detail-' + productId);
    if (selectedProductDetail) {
        selectedProductDetail.style.display = 'block';
        selectedProductDetail.style.animation = 'slideInFromRight 0.5s forwards';
    }
    
    // Köhnə səhifə elementlərini gizlədək
    document.getElementById('product-list').classList.add('hidden');
    
    // URL-ni dəyişdirək ki, məhsul detalları səhifəsini göstərsin
    history.pushState(null, null, `?product=${productId}`);
}

function backToList() {
    var selectedProductDetail = document.querySelector('.product-detail[style*="block"]');
    if (selectedProductDetail) {
        selectedProductDetail.style.animation = 'slideOutToRight 0.5s forwards';
        setTimeout(function() {
            selectedProductDetail.style.display = 'none';
            document.getElementById('product-list').classList.remove('hidden');
            // URL-ni bərpa edək ki, köhnə səhifəyə dönüş etsin
            history.pushState(null, null, window.location.pathname);
        }, 500); // Animasiya müddəti ilə uyğun gəlməlidir
    }
}
        function changeMainImage(thumbnail) {
            const mainImage = thumbnail.closest('.container').querySelector('.main-image img');
            mainImage.src = thumbnail.src;
        }
        function selectColor(button, color) {
            selectedColor = color;
            console.log('Selected color:', selectedColor);

            // Remove the 'selected' class from all color buttons
            const colorButtons = document.querySelectorAll('.colors .color-option');
            colorButtons.forEach(btn => btn.classList.remove('selected'));

            // Add the 'selected' class to the clicked button
            button.classList.add('selected');
        }

        function selectSize(button, size) {
            selectedSize = size;
            console.log('Selected size:', selectedSize);

            // Remove the 'selected' class from all size buttons
            const sizeButtons = document.querySelectorAll('.sizes button');
            sizeButtons.forEach(btn => btn.classList.remove('selected'));

            // Add the 'selected' class to the clicked button
            button.classList.add('selected');
        }

        function changeQuantity(button, amount) {
            const quantityInput = button.closest('.quantity').querySelector('.quantity-input');
            let currentQuantity = parseInt(quantityInput.value);
            currentQuantity += amount;
            if (currentQuantity < 1) currentQuantity = 1;
            quantityInput.value = currentQuantity;
        }
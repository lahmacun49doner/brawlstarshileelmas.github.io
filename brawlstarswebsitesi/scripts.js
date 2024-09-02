document.addEventListener('DOMContentLoaded', function() {
    displayCart();

    // Sepeti boşaltma butonuna işlev ekle
    document.getElementById('empty-cart-button').addEventListener('click', function() {
        document.getElementById('confirmation-modal').style.display = 'flex';
    });

    // Onaylama butonuna işlev ekle
    document.getElementById('confirm-button').addEventListener('click', function() {
        localStorage.removeItem('cart');
        displayCart();
        document.getElementById('confirmation-modal').style.display = 'none';
    });

    // İptal butonuna işlev ekle
    document.getElementById('cancel-button').addEventListener('click', function() {
        document.getElementById('confirmation-modal').style.display = 'none';
    });

    // Anasayfa butonuna işlev ekle
    document.getElementById('home-button').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});

function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsDiv = document.getElementById('cart-items');
    
    cartItemsDiv.innerHTML = ''; // Sepeti temizle

    // Ürünlerin toplam miktarını hesapla
    let productMap = cart.reduce((acc, item) => {
        if (!acc[item.src]) {
            acc[item.src] = {
                ...item,
                quantity: 1
            };
        } else {
            acc[item.src].quantity++;
        }
        return acc;
    }, {});

    // Ürünleri listele
    for (let src in productMap) {
        let item = productMap[src];
        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <img src="${item.src}" alt="${item.name}">
                <div class="cart-item-details">
                    <p>${item.name} <span>${item.quantity} Adet</span></p>
                    <p>Fiyat: <span>${item.price} TL</span></p>
                    <button onclick="removeItem('${item.src}')">Sil</button>
                </div>
            </div>
        `;
    }
}

function removeItem(src) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let updatedCart = cart.map(item => {
        if (item.src === src) {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                return null; // Bu ürünü kaldır
            }
        }
        return item;
    }).filter(item => item !== null);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    displayCart();
}

// app.js

let cartCount = 0;

function updateCartUI() {
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.style.transform = 'scale(1.2)';
        setTimeout(() => cartBadge.style.transform = 'scale(1)', 200);
    }
}

function performSearch() {
    const intro = document.getElementById('introState');
    const results = document.getElementById('resultsState');
    if (intro && results) {
        intro.classList.add('d-none');
        results.classList.remove('d-none');
    }
}

function addToCart(btn) {
    btn.innerHTML = '<span style="font-size:14px">✓</span>';
    btn.style.background = 'var(--success)';
    cartCount++;
    updateCartUI();
}
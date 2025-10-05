const PRODUCTS = [
  {id: 1, title: 'Pro Wireless Mouse', price: 49.99, img: 'https://picsum.photos/seed/mouse/400/300'},
  {id: 2, title: 'Mechanical Keyboard', price: 89.99, img: 'https://picsum.photos/seed/keyboard/400/300'},
  {id: 3, title: '4K Monitor', price: 299.99, img: 'https://picsum.photos/seed/monitor/400/300'},
  {id: 4, title: 'Wireless Earbuds', price: 79.99, img: 'https://picsum.photos/seed/earbuds/400/300'},
  {id: 5, title: 'USB-C Hub', price: 39.99, img: 'https://picsum.photos/seed/hub/400/300'},
  {id: 6, title: 'Laptop Stand', price: 29.99, img: 'https://picsum.photos/seed/stand/400/300'}
];

const productsEl = document.getElementById('products');
const tpl = document.getElementById('productTpl');
const cartPanel = document.getElementById('cartPanel');
const cartToggle = document.getElementById('cartToggle');
const cartCount = document.getElementById('cartCount');
const cartList = document.getElementById('cartList');
const cartTotal = document.getElementById('cartTotal');
const overlay = document.getElementById('overlay');

let cart = JSON.parse(localStorage.getItem('shop_cart') || '{}');

function renderProducts() {
  productsEl.innerHTML = '';
  PRODUCTS.forEach(p => {
    const node = tpl.content.cloneNode(true);
    const img = node.querySelector('.product-img');
    img.src = p.img;
    img.alt = p.title;
    node.querySelector('.product-title').textContent = p.title;
    node.querySelector('.product-price').textContent = p.price.toFixed(2);
    const btn = node.querySelector('.add');
    btn.addEventListener('click', () => {
      addToCart(p.id);
      btn.classList.add('added');
      setTimeout(() => btn.classList.remove('added'), 1000);
    });
    productsEl.appendChild(node);
  });
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  renderCart();
  showCartBriefly();
}

function saveCart() {
  localStorage.setItem('shop_cart', JSON.stringify(cart));
}

function renderCart() {
  cartList.innerHTML = '';
  let total = 0;
  let count = 0;
  
  for (const id in cart) {
    const qty = cart[id];
    const p = PRODUCTS.find(x => x.id == id);
    if (!p) continue;
    
    const li = document.createElement('li');
    const title = document.createElement('span');
    title.textContent = `${p.title} × ${qty}`;
    
    const price = document.createElement('span');
    const line = p.price * qty;
    total += line;
    count += qty;
    price.textContent = `$${line.toFixed(2)}`;
    
    const remove = document.createElement('button');
    remove.textContent = '×';
    remove.className = 'remove-item';
    remove.addEventListener('click', () => {
      delete cart[id];
      saveCart();
      renderCart();
    });
    
    li.appendChild(title);
    li.appendChild(price);
    li.appendChild(remove);
    cartList.appendChild(li);
  }
  
  cartCount.textContent = count;
  cartTotal.textContent = total.toFixed(2);
  
  // Update cart button appearance
  cartToggle.classList.toggle('has-items', count > 0);
}

function toggleCart() {
  const hidden = cartPanel.getAttribute('aria-hidden') === 'true';
  cartPanel.setAttribute('aria-hidden', String(!hidden));
  overlay.setAttribute('aria-hidden', String(!hidden));
  document.body.style.overflow = hidden ? 'hidden' : '';
}

function showCartBriefly() {
  if (cartPanel.getAttribute('aria-hidden') === 'true') {
    toggleCart();
    setTimeout(() => {
      if (cartPanel.getAttribute('aria-hidden') === 'false') {
        toggleCart();
      }
    }, 2000);
  }
}

cartToggle.addEventListener('click', toggleCart);
overlay.addEventListener('click', toggleCart);

document.getElementById('checkout').addEventListener('click', () => {
  if (cartTotal.textContent === '0.00') {
    alert('Your cart is empty!');
    return;
  }
  alert('Thank you for your order! (Demo: No actual payment processing)');
  cart = {};
  saveCart();
  renderCart();
  toggleCart();
});

renderProducts();
renderCart();

renderProducts(); renderCart();
const quotes = [
  {q: "Simplicity is the soul of efficiency.", a: "— Austin Freeman"},
  {q: "Stay curious. Keep learning.", a: "— Unknown"},
  {q: "Code is like humor. When you have to explain it, it’s bad.", a: "— Cory House"},
  {q: "Don’t fear failure. Fear being in the exact same place next year as you are today.", a: "— Michael Hyatt"},
  {q: "Ship fast, iterate faster.", a: "— Open Source Mindset"}
];

const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const btn = document.getElementById('newQuote');

function pick() {
  const item = quotes[Math.floor(Math.random()*quotes.length)];
  quoteEl.textContent = item.q;
  authorEl.textContent = item.a;
}

btn.addEventListener('click', pick);
window.addEventListener('load', pick);

/**
 * cart.js — Shopping cart logic and LocalStorage persistence
 * Radha Rani Store
 */

const Cart = (() => {
  let items = []; // Array of { productId, name, weight, price, quantity, subtotal }

  // ── Persistence ────────────────────────────────────────────────────
  function save() {
    try {
      localStorage.setItem(STORE_CONFIG.localStorageKey, JSON.stringify(items));
    } catch (e) {
      console.warn("Cart: could not save to localStorage", e);
    }
  }

  function load() {
    try {
      const stored = localStorage.getItem(STORE_CONFIG.localStorageKey);
      if (stored) {
        items = JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Cart: could not load from localStorage", e);
      items = [];
    }
  }

  // ── Core Operations ────────────────────────────────────────────────
  function add(product) {
    const existing = items.find(i => i.productId === product.id);
    if (existing) {
      existing.quantity += 1;
      existing.subtotal = existing.price * existing.quantity;
    } else {
      items.push({
        productId: product.id,
        name: product.name,
        weight: product.weight,
        price: product.price,
        quantity: 1,
        subtotal: product.price
      });
    }
    save();
    updateCartBadge();
    syncProductCardButtons();
  }

  function remove(productId) {
    items = items.filter(i => i.productId !== productId);
    save();
    updateCartBadge();
    syncProductCardButtons();
  }

  function increase(productId) {
    const item = items.find(i => i.productId === productId);
    if (item) {
      item.quantity += 1;
      item.subtotal = item.price * item.quantity;
      save();
      updateCartBadge();
    }
  }

  function decrease(productId) {
    const item = items.find(i => i.productId === productId);
    if (item) {
      if (item.quantity <= 1) {
        remove(productId);
      } else {
        item.quantity -= 1;
        item.subtotal = item.price * item.quantity;
        save();
        updateCartBadge();
        syncProductCardButtons();
      }
    }
  }

  function getItem(productId) {
    return items.find(i => i.productId === productId) || null;
  }

  function getAll() {
    return [...items];
  }

  function getCount() {
    return items.reduce((sum, i) => sum + i.quantity, 0);
  }

  function getSubtotal() {
    return items.reduce((sum, i) => sum + i.subtotal, 0);
  }

  function clear() {
    items = [];
    save();
    updateCartBadge();
    syncProductCardButtons();
  }

  // ── Badge ──────────────────────────────────────────────────────────
  function updateCartBadge() {
    const count = getCount();
    document.querySelectorAll(".cart-badge").forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? "flex" : "none";
    });
  }

  // ── Sync product card buttons after cart changes ────────────────────
  function syncProductCardButtons() {
    document.querySelectorAll(".product-card").forEach(card => {
      const pid = card.dataset.productId;
      const item = getItem(pid);
      const addBtn = card.querySelector(".btn-add-to-cart");
      const qtyControl = card.querySelector(".qty-control");
      const qtyDisplay = card.querySelector(".qty-display");

      if (item) {
        if (addBtn) addBtn.style.display = "none";
        if (qtyControl) qtyControl.style.display = "flex";
        if (qtyDisplay) qtyDisplay.textContent = item.quantity;
      } else {
        if (addBtn) addBtn.style.display = "block";
        if (qtyControl) qtyControl.style.display = "none";
      }
    });
  }

  // ── Cart Screen Rendering ──────────────────────────────────────────
  function renderCartScreen() {
    const container = document.getElementById("cart-items-container");
    const totalEl = document.getElementById("cart-total");
    const subtotalEl = document.getElementById("cart-subtotal");
    const emptyState = document.getElementById("cart-empty-state");
    const cartContent = document.getElementById("cart-content");

    if (!container) return;

    if (items.length === 0) {
      if (emptyState) emptyState.style.display = "flex";
      if (cartContent) cartContent.style.display = "none";
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    if (cartContent) cartContent.style.display = "block";

    container.innerHTML = items.map(item => `
      <div class="cart-item" data-product-id="${item.productId}">
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-weight">${item.weight}</p>
          <p class="cart-item-price">${STORE_CONFIG.currency}${item.price} each</p>
        </div>
        <div class="cart-item-actions">
          <div class="cart-qty-control">
            <button class="btn-qty cart-decrease" aria-label="Decrease quantity" data-id="${item.productId}">−</button>
            <span class="cart-qty-display">${item.quantity}</span>
            <button class="btn-qty cart-increase" aria-label="Increase quantity" data-id="${item.productId}">+</button>
          </div>
          <p class="cart-item-subtotal">${STORE_CONFIG.currency}${item.subtotal}</p>
          <button class="btn-remove-item" aria-label="Remove ${item.name}" data-id="${item.productId}">🗑</button>
        </div>
      </div>
    `).join("");

    const subtotal = getSubtotal();
    if (subtotalEl) subtotalEl.textContent = `${STORE_CONFIG.currency}${subtotal}`;
    if (totalEl) totalEl.textContent = `${STORE_CONFIG.currency}${subtotal}`;

    // Attach event listeners
    container.querySelectorAll(".cart-increase").forEach(btn =>
      btn.addEventListener("click", () => {
        increase(btn.dataset.id);
        renderCartScreen();
      })
    );
    container.querySelectorAll(".cart-decrease").forEach(btn =>
      btn.addEventListener("click", () => {
        decrease(btn.dataset.id);
        renderCartScreen();
      })
    );
    container.querySelectorAll(".btn-remove-item").forEach(btn =>
      btn.addEventListener("click", () => {
        remove(btn.dataset.id);
        renderCartScreen();
      })
    );
  }

  return { add, remove, increase, decrease, getItem, getAll, getCount, getSubtotal, clear, load, save, updateCartBadge, syncProductCardButtons, renderCartScreen };
})();

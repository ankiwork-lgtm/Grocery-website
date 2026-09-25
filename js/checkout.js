/**
 * checkout.js — Form validation, order summary, WhatsApp message generation
 * Radha Rani Store
 */

const Checkout = (() => {

  // ── Render Checkout Form ───────────────────────────────────────────
  function renderCheckoutForm() {
    const cartItems = Cart.getAll();

    // Guard: empty cart
    if (cartItems.length === 0) {
      App.showScreen("cart");
      return;
    }

    // Show mini order summary above form
    const summaryEl = document.getElementById("checkout-mini-summary");
    if (summaryEl) {
      summaryEl.innerHTML = cartItems.map(item => `
        <div class="mini-summary-row">
          <span>${item.name} × ${item.quantity}</span>
          <span>${STORE_CONFIG.currency}${item.subtotal}</span>
        </div>
      `).join("") + `
        <div class="mini-summary-total">
          <span>Total</span>
          <span>${STORE_CONFIG.currency}${Cart.getSubtotal()}</span>
        </div>`;
    }

    // Reset form errors
    clearErrors();

    // Toggle address field based on delivery option
    const deliveryRadios = document.querySelectorAll('input[name="delivery-option"]');
    const addressGroup = document.getElementById("address-group");
    deliveryRadios.forEach(radio => {
      radio.addEventListener("change", () => {
        if (addressGroup) {
          addressGroup.style.display = radio.value === "home" ? "block" : "none";
        }
      });
    });

    // Form submit
    const form = document.getElementById("checkout-form");
    if (form) {
      // Remove old listener by cloning
      const newForm = form.cloneNode(true);
      form.parentNode.replaceChild(newForm, form);
      newForm.addEventListener("submit", handleFormSubmit);

      // Re-attach delivery toggle on cloned form
      newForm.querySelectorAll('input[name="delivery-option"]').forEach(radio => {
        radio.addEventListener("change", () => {
          const ag = document.getElementById("address-group");
          if (ag) ag.style.display = radio.value === "home" ? "block" : "none";
        });
      });
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    clearErrors();

    const formData = getFormData();
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      showErrors(errors);
      return;
    }

    renderOrderSummary(Cart.getAll(), formData);
    App.showScreen("summary");
  }

  // ── Form Data Extraction ────────────────────────────────────────────
  function getFormData() {
    return {
      name: document.getElementById("customer-name")?.value.trim() || "",
      mobile: document.getElementById("customer-mobile")?.value.trim() || "",
      delivery: document.querySelector('input[name="delivery-option"]:checked')?.value || "",
      address: document.getElementById("customer-address")?.value.trim() || ""
    };
  }

  // ── Validation ─────────────────────────────────────────────────────
  function validateForm(data) {
    const errors = {};
    if (!data.name) errors.name = "Please enter your name.";
    if (!data.mobile) {
      errors.mobile = "Please enter your mobile number.";
    } else if (!/^[6-9]\d{9}$/.test(data.mobile)) {
      errors.mobile = "Please enter a valid 10-digit Indian mobile number.";
    }
    if (!data.delivery) errors.delivery = "Please select a delivery option.";
    if (data.delivery === "home" && !data.address) {
      errors.address = "Please enter your delivery address.";
    }
    return errors;
  }

  function showErrors(errors) {
    Object.entries(errors).forEach(([field, message]) => {
      const errorEl = document.getElementById(`${field}-error`);
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = "block";
      }
    });
    // Scroll to first error
    const firstError = document.querySelector(".field-error[style='display: block;']");
    if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function clearErrors() {
    document.querySelectorAll(".field-error").forEach(el => {
      el.textContent = "";
      el.style.display = "none";
    });
  }

  // ── Order Summary Screen ───────────────────────────────────────────
  function renderOrderSummary(cartItems, formData) {
    const container = document.getElementById("order-summary-items");
    const totalEl = document.getElementById("order-summary-total");
    const customerEl = document.getElementById("order-summary-customer");

    if (!container) return;

    container.innerHTML = cartItems.map((item, idx) => `
      <div class="summary-item">
        <div class="summary-item-left">
          <p class="summary-item-name">${idx + 1}. ${item.name}</p>
          <p class="summary-item-detail">${item.weight} × ${item.quantity}</p>
        </div>
        <p class="summary-item-subtotal">${STORE_CONFIG.currency}${item.subtotal}</p>
      </div>
    `).join("");

    if (totalEl) totalEl.textContent = `${STORE_CONFIG.currency}${Cart.getSubtotal()}`;

    if (customerEl) {
      const deliveryLabel = formData.delivery === "home" ? "Home Delivery" : "Store Pickup";
      const addressLine = formData.delivery === "home"
        ? `<p><strong>Address:</strong> ${formData.address}</p>`
        : "";
      customerEl.innerHTML = `
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Mobile:</strong> ${formData.mobile}</p>
        <p><strong>Delivery:</strong> ${deliveryLabel}</p>
        ${addressLine}
      `;
    }

    // Format phone number for button display (e.g. "919250445348" -> "+91 92504 45348")
    function formatDisplayNumber(numStr) {
      if (!numStr) return "";
      const cleaned = String(numStr).replace(/\D/g, "");
      if (cleaned.length === 12 && cleaned.startsWith("91")) {
        return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
      }
      if (cleaned.length === 10) {
        return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
      }
      return numStr;
    }

    // Attach WhatsApp buttons
    [
      { id: "btn-order-whatsapp",   number: STORE_CONFIG.whatsappNumber  },
      { id: "btn-order-whatsapp-2", number: STORE_CONFIG.whatsappNumber2 },
    ].forEach(({ id, number }) => {
      const waBtn = document.getElementById(id);
      if (waBtn) {
        const formattedNum = formatDisplayNumber(number);
        const newBtn = waBtn.cloneNode(true);
        const textSpan = newBtn.querySelector("span:not(.btn-whatsapp-icon)");
        if (textSpan && formattedNum) {
          textSpan.textContent = `Send to ${formattedNum}`;
        }
        newBtn.setAttribute("aria-label", `Place order on WhatsApp (${formattedNum || number})`);
        waBtn.parentNode.replaceChild(newBtn, waBtn);
        newBtn.addEventListener("click", () => sendToWhatsApp(cartItems, formData, number));
      }
    });
  }

  // ── WhatsApp Message Builder ───────────────────────────────────────
  function buildWhatsAppMessage(cartItems, formData) {
    const deliveryLabel = formData.delivery === "home" ? "Home Delivery" : "Store Pickup";
    const total = Cart.getSubtotal();
    const curr = STORE_CONFIG.currency;

    const itemLines = cartItems.map((item, idx) =>
      `${idx + 1}. ${item.name}\n   Weight: ${item.weight}\n   Qty: ${item.quantity}\n   Price: ${curr}${item.price}\n   Subtotal: ${curr}${item.subtotal}`
    ).join("\n\n");

    const addressLine = formData.delivery === "home"
      ? `\nAddress:\n${formData.address}`
      : "";

    return `🛒 *RADHA RANI STORE ORDER*

*Customer Name:* ${formData.name}
*Mobile:* ${formData.mobile}

*Items:*

${itemLines}

-------------------------
*TOTAL: ${curr}${total}*
-------------------------

*Delivery:* ${deliveryLabel}${addressLine}

_Please confirm my order._`;
  }

  function sendToWhatsApp(cartItems, formData, number) {
    const message = buildWhatsAppMessage(cartItems, formData);
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${number}?text=${encoded}`;
    window.open(url, "_blank");
    App.showScreen("confirmation");
  }

  return { renderCheckoutForm, renderOrderSummary, buildWhatsAppMessage };
})();

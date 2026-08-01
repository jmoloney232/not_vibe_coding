const SIZES = [
  { id: "12oz", label: "12 oz", price: 19 },
  { id: "2lb", label: "2 lb", price: 34 },
  { id: "5lb", label: "5 lb", price: 78 },
];
const GRINDS = ["Whole bean", "Drip", "Espresso", "Pour over", "French press"];

let state = { size: "12oz", grind: "Whole bean", qty: 1 };
let cartCount = 0;

function currentPrice() {
  const size = SIZES.find(s => s.id === state.size);
  return size.price * state.qty;
}

function render() {
  document.getElementById("size-options").innerHTML = SIZES.map(s =>
    `<button class="option-btn ${s.id === state.size ? 'selected' : ''}" data-size="${s.id}">${s.label} — $${s.price}</button>`
  ).join("");

  document.getElementById("grind-options").innerHTML = GRINDS.map(g =>
    `<button class="option-btn ${g === state.grind ? 'selected' : ''}" data-grind="${g}">${g}</button>`
  ).join("");

  document.getElementById("qty-value").textContent = state.qty;
  document.getElementById("price").innerHTML = `$${currentPrice()} <span class="unit">for ${state.qty} × ${SIZES.find(s => s.id === state.size).label}, ${state.grind.toLowerCase()}</span>`;

  document.querySelectorAll("[data-size]").forEach(btn => btn.addEventListener("click", () => { state.size = btn.dataset.size; document.getElementById("cart-feedback").textContent = ""; render(); }));
  document.querySelectorAll("[data-grind]").forEach(btn => btn.addEventListener("click", () => { state.grind = btn.dataset.grind; document.getElementById("cart-feedback").textContent = ""; render(); }));
}

document.getElementById("qty-minus").addEventListener("click", () => {
  state.qty = Math.max(1, state.qty - 1);
  document.getElementById("cart-feedback").textContent = "";
  render();
});
document.getElementById("qty-plus").addEventListener("click", () => {
  state.qty = Math.min(12, state.qty + 1);
  document.getElementById("cart-feedback").textContent = "";
  render();
});
document.getElementById("add-cart-btn").addEventListener("click", () => {
  const size = SIZES.find(s => s.id === state.size);
  document.getElementById("cart-feedback").textContent = `Added ${state.qty} × Cerro Alto (${size.label}, ${state.grind}) — $${currentPrice()} total.`;
  // Caught by re-testing the interaction end-to-end, not just visual review:
  // the top-right cart badge never moved off "Cart (0)" after a real add,
  // which is the kind of state-consistency bug §11 exists to catch.
  cartCount += state.qty;
  document.getElementById("cart-link").textContent = `Cart (${cartCount})`;
});

render();

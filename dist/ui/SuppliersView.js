const KEY = "tp_suppliers";
function getSuppliers() {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
}
function saveSuppliers(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
}
export function renderSuppliers(root) {
    const suppliers = getSuppliers();
    root.innerHTML = `
    <div class="card">
      <h2>Suppliers</h2>

      <form id="supplier-form" class="form-grid">
        <input id="name" placeholder="Supplier Name" required />
        <input id="contact" placeholder="Contact Number" required />
        <button type="submit">Add Supplier</button>
      </form>
    </div>

    <div class="card">
      <h3>Supplier List</h3>

      ${suppliers.length === 0
        ? "<p>No suppliers yet</p>"
        : suppliers.map((s, i) => `
              <div class="list-item">
                <div>
                  <strong>${s.name}</strong>
                  <p>${s.contact}</p>
                </div>
                <button data-id="${i}" class="delete-btn">Delete</button>
              </div>
            `).join("")}
    </div>
  `;
    const form = document.getElementById("supplier-form");
    form.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const contact = document.getElementById("contact").value;
        const updated = [...suppliers, { name, contact }];
        saveSuppliers(updated);
        renderSuppliers(root);
    };
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.getAttribute("data-id"));
            const updated = suppliers.filter((_, i) => i !== id);
            saveSuppliers(updated);
            renderSuppliers(root);
        });
    });
}

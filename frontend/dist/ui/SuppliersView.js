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

      <!-- CLEAN FORM -->
      <form id="supplier-form" class="horizontal-form"
        style="flex-direction: column; align-items: stretch; gap: 12px;">

        <div class="field">
          <label>Supplier Name</label>
          <input id="name" placeholder="Enter supplier name" required />
        </div>

        <div class="field">
          <label>Contact Number</label>
          <input id="contact" placeholder="09xxxxxxxxx" required />
        </div>

        <button type="submit" class="btn-primary" style="align-self:flex-end;">
          Add Supplier
        </button>
      </form>
    </div>

    <div class="card">
      <h3>Supplier List</h3>

      ${suppliers.length === 0
        ? `<p style="margin-top:10px;">No suppliers yet</p>`
        : `
            <div class="list">
              ${suppliers.map((s, i) => `
                <div class="list-row"
                  style="display:flex; justify-content:space-between; align-items:center;">

                  <div>
                    <strong>${s.name}</strong>
                    <div style="font-size:12px; color:#64748b;">
                      ${s.contact}
                    </div>
                  </div>

                  <button class="delete-btn" data-id="${i}">
                    🗑 Delete
                  </button>

                </div>
              `).join("")}
            </div>
          `}
    </div>
  `;
    /* =========================
       ADD SUPPLIER
    ========================= */
    const form = document.getElementById("supplier-form");
    form.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const contact = document.getElementById("contact").value;
        const updated = [...suppliers, { name, contact }];
        saveSuppliers(updated);
        renderSuppliers(root);
    };
    /* =========================
       DELETE SUPPLIER
    ========================= */
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            const updated = suppliers.filter((_, i) => i !== id);
            saveSuppliers(updated);
            renderSuppliers(root);
        });
    });
}

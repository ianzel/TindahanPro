const KEY = "tp_suppliers";

function getSuppliers() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

function saveSuppliers(data: any[]) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function renderSuppliers(root: HTMLElement) {
  const suppliers = getSuppliers();

  root.innerHTML = `
    <div class="card">
      <h2>Suppliers</h2>

      <!-- HORIZONTAL FORM -->
      <form id="supplier-form" class="horizontal-form">
        <input id="name" placeholder="Supplier Name" required />
        <input id="contact" placeholder="Contact Number" required />
        <button type="submit">Add</button>
      </form>
    </div>

    <div class="card">
      <h3>Supplier List</h3>

      ${
        suppliers.length === 0
          ? "<p>No suppliers yet</p>"
          : `
            <div class="list">
              ${suppliers.map((s: any, i: number) => `
                <div class="list-row">
                  <span><strong>${s.name}</strong></span>
                  <span>${s.contact}</span>
                  <button data-id="${i}" class="delete-btn">Delete</button>
                </div>
              `).join("")}
            </div>
          `
      }
    </div>
  `;

  /* ADD */
  const form = document.getElementById("supplier-form") as HTMLFormElement;

  form.onsubmit = (e) => {
    e.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const contact = (document.getElementById("contact") as HTMLInputElement).value;

    const updated = [...suppliers, { name, contact }];
    saveSuppliers(updated);

    renderSuppliers(root);
  };

  /* DELETE */
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number((btn as HTMLElement).getAttribute("data-id"));
      const updated = suppliers.filter((_: any, i: number) => i !== id);
      saveSuppliers(updated);
      renderSuppliers(root);
    });
  });
}
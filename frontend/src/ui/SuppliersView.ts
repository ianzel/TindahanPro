import { SupplierService } from "../services/SupplierService.js";

export async function renderSuppliers(root: HTMLElement) {
  let suppliers: any[] = [];

  const loadSuppliers = async () => {
    suppliers = await SupplierService.list();
  };

  const render = async () => {
    await loadSuppliers();

    root.innerHTML = `
      <div class="card">
        <h2>Suppliers</h2>

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

        ${
          suppliers.length === 0
            ? `<p style="margin-top:10px;">No suppliers yet</p>`
            : suppliers.map((s: any) => `
              <div class="list-row"
                style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #eee;">

                <div>
                  <strong>${s.name}</strong>
                  <div style="font-size:12px; color:#64748b;">
                    ${s.contact}
                  </div>
                </div>

                <button class="delete-btn"
                  data-id="${s.id}"
                  style="
                    background:#dc2626;
                    color:white;
                    border:none;
                    padding:5px 10px;
                    border-radius:6px;
                    cursor:pointer;">
                  Delete
                </button>

              </div>
            `).join("")
        }
      </div>
    `;

    attachEvents();
  };

  const attachEvents = () => {
    const form = document.getElementById("supplier-form") as HTMLFormElement;

    // ✅ CREATE SUPPLIER (API)
    form.onsubmit = async (e) => {
      e.preventDefault();

      await SupplierService.create({
        name: (document.getElementById("name") as HTMLInputElement).value,
        contact: (document.getElementById("contact") as HTMLInputElement).value,
      });

      render();
    };

    // ✅ DELETE SUPPLIER (SAFE EVENT DELEGATION)
    root.onclick = async (e) => {
      const el = e.target as HTMLElement;

      const btn = el.closest(".delete-btn") as HTMLElement;
      if (!btn) return;

      const id = Number(btn.dataset.id);

      await SupplierService.delete(id);

      render();
    };
  };

  render();
}
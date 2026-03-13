import { Supplier } from "../models/Supplier.js";
import { SupplierService } from "../services/SupplierService.js";

export function renderSuppliers(root: HTMLElement) {

  const suppliers = SupplierService.list();

  root.innerHTML = `
    <h2>Suppliers</h2>

    <form id="supplier-form">
      <label>Supplier Name</label>
      <input id="s-name" required />

      <label>Contact</label>
      <input id="s-contact" required />

      <button type="submit">Add Supplier</button>
    </form>

    <h3>Supplier List</h3>

    <ul>
      ${suppliers.map((s: Supplier) =>
        `<li>${s.name} - ${s.contact}
        <button data-del="${s.id}">Delete</button>
        </li>`
      ).join("")}
    </ul>
  `;

  const form = document.getElementById("supplier-form") as HTMLFormElement;

  form.onsubmit = (e) => {
    e.preventDefault();

    const supplier: Supplier = {
      id: crypto.randomUUID(),
      name: (document.getElementById("s-name") as HTMLInputElement).value,
      contact: (document.getElementById("s-contact") as HTMLInputElement).value
    };

    SupplierService.add(supplier);
    renderSuppliers(root);
  };

  root.querySelectorAll("button[data-del]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-del")!;
      SupplierService.remove(id);
      renderSuppliers(root);
    });
  });

}
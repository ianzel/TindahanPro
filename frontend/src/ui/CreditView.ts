import { Credit } from "../models/Credit.js";
import { CreditService } from "../services/CreditService.js";

export function renderCredit(root: HTMLElement) {

  const credits = CreditService.list();

  root.innerHTML = `
    <h2>Customer Credit (Utang)</h2>

    <form id="credit-form">

      <label>Customer Name</label>
      <input id="c-name" required />

      <label>Amount</label>
      <input id="c-amount" type="number" required />

      <button type="submit">Add Credit</button>

    </form>

    <h3>Credit List</h3>

    <ul>
      ${credits.map(c =>
        `<li>
          ${c.customerName} - ₱${c.amount} - ${c.status}
          ${c.status === "unpaid"
            ? `<button data-pay="${c.id}">Mark Paid</button>`
            : ""}
        </li>`
      ).join("")}
    </ul>
  `;

  const form = document.getElementById("credit-form") as HTMLFormElement;

  form.onsubmit = (e) => {

    e.preventDefault();

    const credit: Credit = {
      id: crypto.randomUUID(),
      customerName: (document.getElementById("c-name") as HTMLInputElement).value,
      amount: Number((document.getElementById("c-amount") as HTMLInputElement).value),
      dateISO: new Date().toISOString(),
      status: "unpaid"
    };

    CreditService.add(credit);

    renderCredit(root);
  };

  root.querySelectorAll("button[data-pay]").forEach(btn => {

    btn.addEventListener("click", () => {

      const id = btn.getAttribute("data-pay")!;
      CreditService.markPaid(id);

      renderCredit(root);

    });

  });

}
import { CreditService } from "../services/CreditService.js";

export async function renderCredits(root: HTMLElement) {
  let credits: any[] = [];

  const loadCredits = async () => {
    credits = await CreditService.list();
  };

  const render = async () => {
    await loadCredits();

    root.innerHTML = `
      <div class="card">
        <h2>Credit Management</h2>

        <form id="credit-form" class="horizontal-form"
          style="flex-direction: column; align-items: stretch; gap: 12px;">

          <div class="field">
            <label>Customer Name</label>
            <input id="name" required />
          </div>

          <div class="field">
            <label>Description</label>
            <input id="desc" />
          </div>

          <div class="field">
            <label>Amount</label>
            <input id="amount" type="number" required />
          </div>

          <div class="field">
            <label>Date</label>
            <input id="date" type="date" required />
          </div>

          <button type="submit" class="btn-primary" style="align-self:flex-end;">
            Add Credit
          </button>
        </form>
      </div>

      <div class="card">
        <h3>Credit List</h3>

        ${
          credits.length === 0
            ? `<p style="margin-top:10px;">No credits yet</p>`
            : credits.map((c: any) => `
              <div class="credit-item" style="padding:12px 0; border-bottom:1px solid #f1f5f9;">

                <div style="display:flex; justify-content:space-between;">
                  <strong>${c.customer || "Unknown Customer"}</strong>
                  <span>₱${Number(c.amount).toFixed(2)}</span>
                </div>

                <div style="font-size:13px; color:#64748b; margin-top:4px;">
                  ${c.desc || ""}
                </div>

                <div style="display:flex; justify-content:space-between; margin-top:8px; font-size:12px; color:#94a3b8;">
                  <span>${c.dueDate}</span>

                  <button class="credit-delete-btn" data-id="${c.id}">
                    Delete
                  </button>
                </div>

              </div>
            `).join("")
        }
      </div>
    `;

    attachEvents();
  };

  const attachEvents = () => {
    const form = document.getElementById("credit-form") as HTMLFormElement;

    form.onsubmit = async (e) => {
      e.preventDefault();

      const name = (document.getElementById("name") as HTMLInputElement).value;
      const desc = (document.getElementById("desc") as HTMLInputElement).value;
      const amount = Number((document.getElementById("amount") as HTMLInputElement).value);
      const date = (document.getElementById("date") as HTMLInputElement).value;

      await CreditService.create({
        customerName: name,
        desc: desc, // ✅ FIXED
        amount,
        dueDate: date,
      });

      render();
    };

    root.onclick = async (e) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains("credit-delete-btn")) {
        const id = Number(target.dataset.id);

        await CreditService.delete(id);

        render();
      }
    };
  };

  render();
}
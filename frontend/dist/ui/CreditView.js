import { CreditService } from "../services/CreditService.js";
export async function renderCredits(root) {
    let credits = [];
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

          <button type="submit" class="btn-primary">
            Add Credit
          </button>
        </form>
      </div>

      <div class="card">
        <h3>Credit List</h3>

        ${credits.length === 0
            ? `<p>No credits yet</p>`
            : credits.map((c) => `
              <div style="padding:12px 0; border-bottom:1px solid #eee;">

                <div style="display:flex; justify-content:space-between;">
                  <strong>${c.customer || "Unknown Customer"}</strong>
                  <span>₱${Number(c.amount).toFixed(2)}</span>
                </div>

                <div style="font-size:13px; color:#666;">
                  ${c.desc || ""}
                </div>

                <div style="display:flex; justify-content:space-between; margin-top:8px;">

                  <span>${c.dueDate}</span>

                  <!-- DELETE ONLY -->
                  <button 
                    class="delete-btn"
                    data-id="${c.id}"
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

              </div>
            `).join("")}
      </div>
    `;
        attachEvents();
    };
    const attachEvents = () => {
        const form = document.getElementById("credit-form");
        // CREATE CREDIT
        form.onsubmit = async (e) => {
            e.preventDefault();
            await CreditService.create({
                customerName: document.getElementById("name").value,
                desc: document.getElementById("desc").value,
                amount: Number(document.getElementById("amount").value),
                dueDate: document.getElementById("date").value,
            });
            render();
        };
        // DELETE ONLY (SIMPLE + RELIABLE)
        root.onclick = async (e) => {
            const el = e.target;
            const deleteBtn = el.closest(".delete-btn");
            if (!deleteBtn)
                return;
            const id = Number(deleteBtn.getAttribute("data-id"));
            await CreditService.delete(id);
            render();
        };
    };
    render();
}

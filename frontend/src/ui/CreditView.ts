export async function renderCredits(root: HTMLElement) {
  let credits = JSON.parse(localStorage.getItem("credits") || "[]");

  const render = () => {
    root.innerHTML = `
      <div class="card">
        <h2>Credit Management</h2>

        <!-- ADD CREDIT -->
        <form id="credit-form" class="horizontal-form"
          style="flex-direction: column; align-items: stretch; gap: 12px;">

          <div class="field">
            <label>Customer Name</label>
            <input id="name" required />
          </div>

          <div class="field">
            <label>Description</label>
            <input id="desc" required />
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
            : credits.map((c: any, i: number) => `
              <div class="credit-item" style="padding:12px 0; border-bottom:1px solid #f1f5f9;">

                <!-- TOP -->
                <div style="display:flex; justify-content:space-between;">
                  <strong>${c.name}</strong>
                  <span>₱${Number(c.amount).toFixed(2)}</span>
                </div>

                <!-- DESCRIPTION -->
                <div style="font-size:13px; color:#64748b; margin-top:4px;">
                  ${c.desc}
                </div>

                <!-- BOTTOM -->
                <div style="display:flex; justify-content:space-between; margin-top:8px; font-size:12px; color:#94a3b8;">
                  <span>${c.date}</span>

                  <button class="btn-cancel delete-credit" data-id="${i}">
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

    form.onsubmit = (e) => {
      e.preventDefault();

      credits.push({
        name: (document.getElementById("name") as HTMLInputElement).value,
        desc: (document.getElementById("desc") as HTMLInputElement).value,
        amount: Number((document.getElementById("amount") as HTMLInputElement).value),
        date: (document.getElementById("date") as HTMLInputElement).value,
      });

      localStorage.setItem("credits", JSON.stringify(credits));
      render();
    };

    document.querySelectorAll(".delete-credit").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number((btn as HTMLElement).dataset.id);
        credits.splice(id, 1);
        localStorage.setItem("credits", JSON.stringify(credits));
        render();
      });
    });
  };

  render();
}
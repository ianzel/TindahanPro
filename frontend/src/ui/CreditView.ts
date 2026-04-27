const KEY = "tp_credits";

function getCredits() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

function saveCredits(data: any[]) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function renderCredit(root: HTMLElement) {
  const credits = getCredits();

  root.innerHTML = `
    <div class="card">
      <h2>Credits</h2>

      <!-- HORIZONTAL FORM -->
      <form id="credit-form" class="horizontal-form">
        <input id="customer" placeholder="Customer Name" required />
        <input id="amount" type="number" placeholder="Amount" required />
        <input id="due" type="date" required />
        <button type="submit">Add</button>
      </form>
    </div>

    <div class="card">
      <h3>Credit List</h3>

      ${
        credits.length === 0
          ? "<p>No credits yet</p>"
          : `
            <div class="list">
              ${credits.map((c: any, i: number) => `
                <div class="list-row">
                  <span>${c.customer}</span>
                  <span>₱${c.amount}</span>
                  <span>${c.due}</span>
                  <button data-id="${i}" class="delete-btn">Delete</button>
                </div>
              `).join("")}
            </div>
          `
      }
    </div>
  `;

  /* ADD CREDIT */
  const form = document.getElementById("credit-form") as HTMLFormElement;

  form.onsubmit = (e) => {
    e.preventDefault();

    const customer = (document.getElementById("customer") as HTMLInputElement).value;
    const amount = (document.getElementById("amount") as HTMLInputElement).value;
    const due = (document.getElementById("due") as HTMLInputElement).value;

    const updated = [...credits, { customer, amount, due }];
    saveCredits(updated);

    renderCredit(root);
  };

  /* DELETE */
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number((btn as HTMLElement).getAttribute("data-id"));
      const updated = credits.filter((_: any, i: number) => i !== id);
      saveCredits(updated);
      renderCredit(root);
    });
  });
}
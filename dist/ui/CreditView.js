const KEY = "tp_credit";
function getCredits() {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
}
function saveCredits(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
}
export function renderCredit(root) {
    const credits = getCredits();
    root.innerHTML = `
    <div class="card">
      <h2>Customer Credit</h2>

      <form id="credit-form" class="form-grid">
        <input id="name" placeholder="Customer Name" required />
        <input id="amount" type="number" placeholder="Amount" required />
        <button type="submit">Add Credit</button>
      </form>
    </div>

    <div class="card">
      <h3>Credit List</h3>

      ${credits.length === 0
        ? "<p>No credit records</p>"
        : credits.map((c, i) => `
              <div class="list-item">
                <strong>${c.name}</strong>
                <span class="badge ${c.amount > 0 ? "red" : "green"}">
                  ₱${c.amount}
                </span>
                <button data-id="${i}" class="delete-btn">Delete</button>
              </div>
            `).join("")}
    </div>
  `;
    const form = document.getElementById("credit-form");
    form.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const amount = Number(document.getElementById("amount").value);
        const updated = [...credits, { name, amount }];
        saveCredits(updated);
        renderCredit(root);
    };
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.getAttribute("data-id"));
            const updated = credits.filter((_, i) => i !== id);
            saveCredits(updated);
            renderCredit(root);
        });
    });
}

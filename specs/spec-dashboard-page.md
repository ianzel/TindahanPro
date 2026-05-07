# Page Spec: Dashboard

## Feature Name

Dashboard Overview

---

## Purpose

Provide a real-time overview of store operations, inventory status, sales performance, and profit tracking for the TindahanPro system.

The dashboard helps store owners monitor business activity quickly and make better inventory and financial decisions.

---

## Database Note

This page retrieves and displays aggregated data from the system database including:

* products
* sales
* profit records
* supplier data
* customer credit (“utang”) records

The dashboard updates dynamically based on recorded transactions and inventory changes.

---

## User Story

As a sari-sari store owner, I want to view important business metrics and inventory alerts in one dashboard so that I can easily monitor daily store performance and sales activity.

---

## Current Route

```txt id="o7bpc0"
/dashboard
```

---

## UI Sections

* Sidebar navigation
* Dashboard header
* Filter dropdown (Today / Weekly / Monthly)
* Summary statistic cards
* Sales trend chart
* Sales distribution chart
* Low stock items panel
* Profile dropdown menu
* Dark mode toggle

---

## Functional Requirements

* Display total sales amount.
* Display total profit amount.
* Display total transaction count.
* Display low stock products.
* Display sales trend chart.
* Display sales distribution chart.
* Filter dashboard analytics by:

  * Today
  * Weekly
  * Monthly
* Automatically update dashboard values after new sales are recorded.
* Allow navigation to other modules using sidebar buttons.
* Allow user logout.
* Support dark mode appearance.

---

## API Dependencies

```txt id="h1m2jf"
GET /sales
GET /products
GET /reports
```

---

## Expected Dashboard Data

```txt id="zwp4lu"
totalSales
totalProfit
totalTransactions
lowStockItems
salesTrend
salesDistribution
```

---

## Business Rules

* Profit is calculated using:

```txt id="0xv1yc"
profit = sellingPrice - buyingPrice
```

* Total transaction count is based on recorded sales.
* Low stock products are products with stock less than or equal to minimum stock level.
* Sales charts update depending on selected filter period.
* Dashboard data must reflect real-time inventory changes after sales transactions.

---

## Edge Cases

* No sales recorded yet
* No low stock products
* Empty chart data
* API request failure
* Missing product stock values
* Invalid sales totals
* Network connection issues

---

## Acceptance Criteria

* Dashboard loads without UI errors.
* Summary cards display correct numeric values.
* Sales trend chart renders correctly.
* Sales distribution chart renders correctly.
* Low stock products display properly formatted list items.
* Filter dropdown updates charts and summaries dynamically.
* Dashboard updates after recording a sale.
* Empty states display proper messages when no data exists.
* Dark mode toggle changes dashboard appearance correctly.
Page Spec: Sales
Feature Name

Sales Recording

Purpose

Record sales transactions and automatically update inventory and profit calculations.

Database Note

This page stores sales transaction records and updates product stock levels after every sale.

User Story

As a cashier or store owner, I want to record customer purchases quickly so sales and inventory stay updated automatically.

Current Route
/sales
UI Sections
Sidebar navigation
Record sale form
Product dropdown
Quantity input
Sales history table
Sales summary display
Functional Requirements
Select product from dropdown.
Enter quantity sold.
Automatically calculate total amount.
Automatically calculate profit.
Reduce stock after successful sale.
Display sales history horizontally.
Display transaction date and time.
API Dependencies
GET /sales
POST /sales
DELETE /sales/:id
Expected Sales Data
productId
productName
quantity
unitPrice
unitCost
totalAmount
profit
createdAt
Business Rules
Quantity must be greater than 0.
Cannot sell products with insufficient stock.
Stock updates immediately after recording a sale.
Profit calculation:
profit = (sellingPrice - buyingPrice) × quantity
Edge Cases
Product out of stock
Invalid quantity
Missing product selection
API request failure
Acceptance Criteria
Sales record successfully saves to database.
Stock updates automatically.
Sales history displays correctly.
Profit calculations display accurate values.
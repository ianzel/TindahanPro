Page Spec: Credit
Feature Name

Credit (“Utang”) Management

Purpose

Track customer debts and unpaid balances in the sari-sari store system.

Database Note

This page stores customer credit records including customer names, amounts owed, descriptions, and due dates.

User Story

As a store owner, I want to track customer debts so I can monitor unpaid balances.

Current Route
/credit
UI Sections
Sidebar navigation
Credit form
Credit records list
Delete credit button
Functional Requirements
Add customer credit records.
Record debt amount.
Record due date.
Add debt description.
Delete credit records.
Display unpaid balances.
API Dependencies
GET /credits
POST /credits
DELETE /credits/:id
Expected Credit Data
id
customerName
amount
description
dueDate
Business Rules
Credit amount must be greater than 0.
Customer name cannot be empty.
Edge Cases
Invalid amount values
Empty customer name
Missing due date
API request failure
Acceptance Criteria
Credit records save successfully.
Debt records display correctly.
Delete function removes credit records properly.
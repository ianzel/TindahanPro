# API Specification – TindahanPro

## Products

GET /products
- Returns list of all products

POST /products
- Adds a new product

PUT /products/:id
- Updates product details

DELETE /products/:id
- Deletes a product

## Sales

GET /sales
- Returns all sales records

POST /sales
- Records a new sale

## Suppliers

GET /suppliers
- Returns all suppliers

POST /suppliers
- Adds a supplier

## Credit

GET /credit
- Returns all credit records

POST /credit
- Adds a credit transaction

PUT /credit/:id
- Updates credit status

## Reports

GET /reports/daily
- Returns daily sales summary

GET /reports/profit
- Returns profit report
# Proposed API contract — not yet verified against backend

Base URL configured per platform, same shared HTTP client.
- `GET /api/v1/tailors`: array of tailors or object with `items`
- `GET /api/v1/tailors/:id`: future profile endpoint
- `POST /api/v1/orders`: future authenticated order creation; not wired to UI
- `GET /api/v1/orders`: future authenticated order list

Security: do not trust client role, amount, order status, or quote acceptance. Backend must authenticate, authorize, validate and enforce state transitions. No payments or escrow implemented.

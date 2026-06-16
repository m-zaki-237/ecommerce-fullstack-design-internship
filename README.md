# MERN Ecommerce App

A full-stack ecommerce application built with MongoDB, Express, React (Vite), and Node.js.

---

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Zustand, React Router v6, Axios  
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs

---

## Project Structure

```
mern-ecommerce/
├── client/                   # Vite + React frontend
│   └── src/
│       ├── api/              # Axios API services
│       ├── components/       # Shared UI + layout components
│       ├── data/             # Static fallback data
│       ├── hooks/            # Custom React hooks
│       ├── pages/            # Page components (Home, Listing, etc.)
│       ├── store/            # Zustand global state
│       └── utils/            # Helpers
└── server/                   # Express backend
    ├── config/               # MongoDB connection
    ├── controllers/          # Route logic
    ├── middleware/            # Auth, error, validation
    ├── models/               # Mongoose schemas
    ├── routes/               # Express routers
    ├── seed/                 # Database seeder
    └── utils/                # Token + response helpers
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd mern-ecommerce
npm run install:all
```

### 2. Configure Environment

```bash
# Server env
cp server/.env.example server/.env
```

Edit `server/.env`:
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_ecommerce
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d
```

```bash
# Client env
cp client/.env.example client/.env
```

Edit `client/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed the Database

```bash
npm run seed
```

This creates:
- **Admin:** admin@shop.com / admin123
- **User:** zaki@example.com / user123
- 12 sample products across all categories
- 3 coupons: `SAVE10`, `WELCOME20`, `FLAT50`

### 4. Run in Development

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

---

## API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/auth/register | Public | Register new user |
| POST | /api/auth/login | Public | Login |
| GET | /api/auth/me | Private | Get profile |
| PUT | /api/auth/me | Private | Update profile |
| PUT | /api/auth/wishlist/:id | Private | Toggle wishlist |

### Products
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/products | Public | Get all (filters, pagination, search) |
| GET | /api/products/featured | Public | Get featured products |
| GET | /api/products/category/:cat | Public | Get by category |
| GET | /api/products/:id | Public | Get single product |
| POST | /api/products | Admin | Create product |
| PUT | /api/products/:id | Admin | Update product |
| DELETE | /api/products/:id | Admin | Delete product |
| POST | /api/products/:id/reviews | Private | Add review |

### Cart
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/cart | Private | Get user cart |
| POST | /api/cart | Private | Add item |
| PUT | /api/cart/:itemId | Private | Update quantity |
| DELETE | /api/cart/:itemId | Private | Remove item |
| DELETE | /api/cart | Private | Clear cart |
| PUT | /api/cart/:itemId/save | Private | Save for later |
| PUT | /api/cart/saved/:itemId/move | Private | Move to cart |
| DELETE | /api/cart/saved/:itemId | Private | Remove saved item |
| POST | /api/cart/coupon | Private | Apply coupon |

### Orders
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/orders | Private | Create order from cart |
| GET | /api/orders/myorders | Private | Get my orders |
| GET | /api/orders/:id | Private | Get order details |
| PUT | /api/orders/:id/pay | Private | Mark as paid |
| GET | /api/orders | Admin | Get all orders |
| PUT | /api/orders/:id/status | Admin | Update order status |

### Admin
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/admin/stats | Admin | Dashboard stats |
| GET | /api/admin/users | Admin | All users |
| DELETE | /api/admin/users/:id | Admin | Delete user |
| PUT | /api/admin/users/:id/role | Admin | Change user role |

---

## Query Parameters (GET /api/products)

| Param | Type | Example | Description |
|-------|------|---------|-------------|
| search | string | ?search=camera | Full-text search |
| category | string | ?category=Electronics | Filter by category |
| brand | string | ?brand=Apple,Sony | Filter by brand(s) |
| minPrice | number | ?minPrice=50 | Min price |
| maxPrice | number | ?maxPrice=500 | Max price |
| rating | number | ?rating=4 | Min rating |
| featured | boolean | ?featured=true | Featured only |
| sort | string | ?sort=price_asc | Sort order |
| page | number | ?page=2 | Page number |
| limit | number | ?limit=12 | Items per page |

Sort options: `featured`, `newest`, `price_asc`, `price_desc`, `rating`

---

## Coupon Codes (from seed)

| Code | Type | Value | Min Order |
|------|------|-------|-----------|
| SAVE10 | percentage | 10% off | $50 |
| WELCOME20 | percentage | 20% off | $100 |
| FLAT50 | fixed | $50 off | $200 |

---

## Build for Production

```bash
# Build frontend
npm run build

# Start server (serves API only; deploy client separately or configure Express to serve dist/)
cd server && npm start
```

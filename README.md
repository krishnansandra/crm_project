# ConnectCRM — MERN Stack CRM Assignment

## Features
- Register/login with bcrypt password hashing and JWT
- Protected user profile and customer endpoints
- Create, list, edit, delete customers
- MongoDB/Mongoose models and validation
- Modular controllers, routes, middleware, config
- Responsive React + Tailwind CSS frontend
- Axios API integration, React Router, search and status filtering
- Postman collection included in `postman/CRM-API.postman_collection.json`

## Run locally
1. Install Node.js and run MongoDB Community Server, or use MongoDB Atlas.
2. Copy `server/.env.example` to `server/.env`. Set `MONGO_URI` and a private `JWT_SECRET`.
3. From the project root run `npm run install:all`.
4. Terminal 1: `npm run dev:server`
5. Terminal 2: `npm run dev:client`
6. Open http://localhost:5173

For PowerShell, copy env file with: `Copy-Item server/.env.example server/.env`

## API endpoints
- `GET /` health check
- `POST /api/auth/register` `{ "name":"Sandra", "email":"sandra@example.com", "password":"Pass1234" }`
- `POST /api/auth/login` `{ "email":"sandra@example.com", "password":"Pass1234" }`
- `GET /api/auth/me` (Bearer token)
- `GET /api/customers` (Bearer token; optional `?search=anu&status=Lead`)
- `GET /api/customers/:id`
- `POST /api/customers`
- `PUT /api/customers/:id`
- `DELETE /api/customers/:id`

Customer body example:
`{"name":"Anu Thomas","email":"anu@example.com","phone":"9876543210","company":"ABC Traders","status":"Lead","notes":"Follow up"}`

## Postman
Import the included collection. Register, then login. The login request saves the token to collection variables. Use the token for protected requests. Run customer create before update/delete.

## GitHub
`git init`, `git add .`, `git commit -m "Build MERN CRM application"`. Create a GitHub repository and push using GitHub's displayed instructions. Do not commit `server/.env`.

## Demo video
Show registration, login, create customer, list/search/filter, edit, delete, validation errors, and briefly show Postman and project folders.

This is an educational starter; run and test it locally before submission.

# Event Management Web App

An event management platform that allows users, vendors, and admins to handle event organization, product management, order tracking, and transactions. The app supports three roles: `Admin`, `Vendor`, and `User`, each with specific functionality.

## Features

### Users
- Select vendors for events
- Add products to carts
- Manage guest lists
- Manage product carts
- Track order status

### Vendors
- Edit product information
- Verify transactions

### Admins
- Manage users, vendors, and their memberships

## Tech Stack

- **Frontend**: Next.js (React Framework)
- **Backend**: Node.js with Next.js App Router
- **Database**: PostgreSQL
- **Authentication**: JWT-based login for Users, Vendors, and Admins
- **API**: RESTful APIs using Next.js App Router
- **Token Management**: Secure login and session handling using `LoginTokens` table

## Database Schema

- **Users**: Handles all user roles (Admin, Vendor, User)
- **Vendors**: Vendor-specific information
- **Products**: Details of items vendors offer
- **Carts**: User shopping carts
- **Orders**: Order details and status
- **Transactions**: Tracks payments and verifications
- **LoginTokens**: Stores user login sessions
- **GuestList**: Manages guest lists for events

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Abhay2133/event_management
    ```
   
2. Navigate to the project directory:
    ```bash
    cd event_management
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Create a `.env.local` file in the root directory and add your environment variables:
    ```bash
    DATABASE_URL=postgres://postgres:root@localhost:5432/your-database
    HASH_KEY=your_hash_key
    JWT_SECRET=your_jwt_secret
    ```

5. Run database migrations (under development):
    ```bash
    npx prisma migrate dev
    ```

6. Start the development server:
    ```bash
    npm run dev
    ```

7. Visit `http://localhost:3000` to view the app.

## API Endpoints

### Authentication
- **Admin Login**: `/api/login/admin`
- **User Login**: `/api/login/user`
- **Vendor Login**: `/api/login/vendor`
- **User Signup**: `/api/user/signup`
- **Vendor Signup**: `/api/vendor/signup`

## Usage

- Users can sign up, log in, select vendors, and manage their event details.
- Vendors can log in, manage their products, and verify orders.
- Admins can manage users and vendors, and oversee the platform.

## Contributing

Feel free to contribute to this project by submitting a pull request or opening an issue. All contributions are welcome!

## License

This project is licensed under the MIT License.

---

### Author

Developed by [Your Name](https://github.com/your-username).

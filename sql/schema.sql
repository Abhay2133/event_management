CREATE TABLE Users (
    User_ID SERIAL PRIMARY KEY,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Role VARCHAR(50) CHECK (Role IN ('Vendor', 'User', 'Admin')) NOT NULL,
    Membership BOOLEAN DEFAULT FALSE,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE Vendors (
    Vendor_ID SERIAL PRIMARY KEY,
    User_ID INT REFERENCES Users(User_ID),
    Job VARCHAR(50) NOT NULL
);

CREATE TABLE Products (
    Product_ID SERIAL PRIMARY KEY,
    Vendor_ID INT REFERENCES Vendors(Vendor_ID),
    ProductName VARCHAR(255) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Stock INT NOT NULL
);

CREATE TABLE Carts (
    Cart_ID SERIAL PRIMARY KEY,
    User_ID INT REFERENCES Users(User_ID),
    Status VARCHAR(50) CHECK (Status IN ('Active', 'Ordered')) DEFAULT 'Active'
);

CREATE TABLE Cart_Items (
    CartItem_ID SERIAL PRIMARY KEY,
    Cart_ID INT REFERENCES Carts(Cart_ID),
    Product_ID INT REFERENCES Products(Product_ID),
    Quantity INT NOT NULL
);

CREATE TABLE Orders (
    Order_ID SERIAL PRIMARY KEY,
    Cart_ID INT REFERENCES Carts(Cart_ID),
    User_ID INT REFERENCES Users(User_ID),
    TotalAmount DECIMAL(10, 2) NOT NULL,
    OrderStatus VARCHAR(50) CHECK (OrderStatus IN ('Pending', 'Confirmed', 'Shipped', 'Delivered')) DEFAULT 'Pending'
);

CREATE TABLE Transactions (
    Transaction_ID SERIAL PRIMARY KEY,
    Order_ID INT REFERENCES Orders(Order_ID),
    Vendor_ID INT REFERENCES Vendors(Vendor_ID),
    Amount DECIMAL(10, 2) NOT NULL,
    Verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE LoginTokens (
    Token_ID SERIAL PRIMARY KEY,
    User_ID INT REFERENCES Users(User_ID),
    Token VARCHAR(500) NOT NULL,  -- Stores the token (e.g., JWT or session token)
    Expiry TIMESTAMP NOT NULL,    -- Expiration time for the token
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE GuestList (
    Guest_ID SERIAL PRIMARY KEY,
    User_ID INT REFERENCES Users(User_ID) ON DELETE CASCADE,
    GuestName VARCHAR(255) NOT NULL,
    ContactNumber VARCHAR(15) NOT NULL,
    Added_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

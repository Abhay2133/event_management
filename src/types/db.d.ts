export interface User {
  email: string;
  name: string;
  password: string;
  role?: "Vendor" | "User" | "Admin";
  membership?: boolean;
}

export interface Vendor extends User {
  job:string
}
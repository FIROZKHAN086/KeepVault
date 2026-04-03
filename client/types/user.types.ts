export interface User {
  id: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface RegisterCredentials {
  email: string;
  password?: string;
}

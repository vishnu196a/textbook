export interface AuthenticationState {
  name: string;
  email: string;
  token: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export type UserDetails = Omit<AuthenticationState, 'token'>;

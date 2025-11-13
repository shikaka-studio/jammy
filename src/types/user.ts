export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  created_at: string;
}

export interface UserProfile extends User {
  accessToken?: string;
  tokenExpiresAt?: string;
}

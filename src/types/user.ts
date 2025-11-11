export interface User {
  id: string;
  display_name: string;
  email: string;
  profile_image?: string;
  created_at: string;
}

export interface UserProfile extends User {
  spotify_access_token?: string;
  token_expires_at?: string;
}

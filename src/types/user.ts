export interface User {
  id: string;
  spotify_id: string;
  display_name: string;
  email: string;
  profile_image_url?: string;
  created_at: string;
  access_token?: string;
  product: string;
}

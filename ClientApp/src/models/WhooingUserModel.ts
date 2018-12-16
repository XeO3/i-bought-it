export interface IWhooingUser {
  user_id: number;
  username: string;
  last_ip: string;
  last_login_timestamp: number;
  created_timestamp: number;
  modified_timestamp: number;
  language: string;
  level: string;
  expire: number;
  timezone: string;
  currency: string;
  country: string;
  image_url: string;
  mileage: number;
}

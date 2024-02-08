// General user structure/payload
export interface UserI {
  id: number;
  accessToken?: string;
  email: string;
  username: string;
  name: string;
  image: string;
  roles: string[];
  permissions: string[];
}

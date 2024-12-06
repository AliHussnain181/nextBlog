export interface BlogType {
  _id: string;
  name: string;
  content?: string;
  image: string;
  category: string;
}

export interface UserType {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

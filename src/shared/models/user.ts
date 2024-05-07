export interface User {
  id?: string;
  fullName: string;
  email: string;
  password: string;
  acceptTerms: boolean;
  role: UserRole;
}

export enum UserRole {
  Admin = 'admin',
  Editor = 'editor',
  Viewer = 'viewer'
}

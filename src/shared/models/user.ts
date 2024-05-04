export interface User {
  id?: string;
  fullName: string;
  email: string;
  password: string;
  acceptTerms: boolean;
  role: UserRole;
  remember?: boolean;
}

export enum UserRole {
  Admin = 'admin',
  Editor = 'editor',
  Viewer = 'viewer'
}

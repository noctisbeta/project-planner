export interface AuthProvider {
  signIn(email: string, password: string): Promise<boolean>;
  signUp(email: string, password: string): Promise<boolean>;
  signOut(): Promise<boolean>;
  isAuthenticated(): Promise<boolean>;
}

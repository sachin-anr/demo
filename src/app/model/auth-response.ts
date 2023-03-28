export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: any;
  localId: string;
  registered ? : boolean ;
}

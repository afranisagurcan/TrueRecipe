declare namespace ILogin {
  interface LoginKey {
    email: string;
    password: string;
  }

  interface UserKey {
    userId?: string;
  }
}

export default ILogin;

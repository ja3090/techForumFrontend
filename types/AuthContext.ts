export interface AuthContextType {
  user: {
    user_name: string;
    user_id: number;
    token: string;
    is_admin: boolean;
  } | null;
  loginHandler: ({
    email,
    password,
    setShow,
  }: {
    email: string;
    password: string;
    setShow: (arg: boolean) => void;
  }) => void;
  error: any | null;
  initialized: boolean;
  logoutHandler: (token: string) => void;
}

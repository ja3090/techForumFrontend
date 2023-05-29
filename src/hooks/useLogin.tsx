import { useEffect, useState, useCallback } from "react";
import * as dbService from "../services/dbService";
import Cookies from "js-cookie";
import Cryptr from "cryptr";
import getSecret from "@/utils/getSecret";
import { AxiosResponse } from "axios";
const cryptr = new Cryptr(getSecret(), {
  pbkdf2Iterations: 8000,
  saltLength: 10,
});

export default function useLogin() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const loginHandler = useCallback(
    ({
      email,
      password,
      setShow,
    }: {
      email: string;
      password: string;
      setShow: (arg: boolean) => void;
    }) => {
      dbService
        .login({ email, password })
        .then((res) => onLoginSuccess(res, setShow))
        .catch((err) => {
          setError(err?.response?.data ?? null);
          setTimeout(() => {
            setError(null);
          }, 5000);
        });
    },
    []
  );

  const onLoginSuccess = (
    res: AxiosResponse,
    setShow: (arg: boolean) => void
  ) => {
    const user = res.data.data;
    setUser(user);
    const encryptedUser = cryptr.encrypt(JSON.stringify(user));
    Cookies.set("user", encryptedUser, {
      expires: 1 / 24,
      sameSite: "None",
      secure: true,
    });
    setShow(false);
  };

  const logoutHandler = (token: string) => {
    dbService
      .logout(token)
      .then((_res) => {
        Cookies.remove("user");
        setUser(null);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const user = Cookies.get("user");
    if (!user) return;
    const decryptedUser = cryptr.decrypt(user);
    setUser(JSON.parse(decryptedUser));
  }, []);

  return { logoutHandler, loginHandler, user, error };
}

import { useRouter } from "@tanstack/react-router";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Form } from "../../../components/Form/form";
import { useAuthState } from "../../../state/authState";
import style from "./login.module.sass";
import { IStateLogin, ResponseCode } from "./types/types";

export const Login = (): JSX.Element => {
  const { getUser, setUser } = useAuthState();

  const router = useRouter();
  const [stateLogin, setStateLogin] = useState<IStateLogin>({
    email: "",
    password: "",
  });

  const [code, setCode] = useState<number>();
  function login(step: number) {
    if (step === 1 && checkState()) {
      console.log(code);
      axios
        .post<ResponseCode>("http://localhost:6069/user-svc/verify-code", {
          ...stateLogin,
          code,
        })
        .then((res) => {
          console.log(res.data);
          if (res.status === 201) {
            Cookies.set("token", res.data.accessToken);
            // Const token = Cookies.get('token');
            // if (token) {
            // 	const decodedToken = jwtDecode(token);
            // 	console.log(decodedToken);
            // }

            router.navigate({ to: "/" });
          }
        });
    }

    axios
      .post<IStateLogin>("http://localhost:6069/user-svc/login", stateLogin)
      .then((res) => {
        if (res.status === 201) {
          setUser(stateLogin);
        }
      });
  }

  const checkState = (): boolean => {
    const state = getUser();
    const values = Object.values(state);
    const keys = Object.keys(state);
    for (let i = 0; i < values.length; i++) {
      if (values[i] === "" && keys[i] !== null) {
        return false;
      }
    }

    return true;
  };

  return (
    <div className={style.pageLogin}>
      <Form title="Авторизация" onClick={login.bind(null, 1)}>
        {checkState() ? (
          <>
            <div className="inputBox">
              <input
                key="code"
                type="text"
                onChange={(e) => setCode(Number(e.target.value))}
                required
              />
              <i>Код</i>
            </div>
          </>
        ) : (
          <>
            <div className="inputBox">
              <input
                key="email"
                type="text"
                onChange={(e) =>
                  setStateLogin({ ...stateLogin, email: e.target.value })
                }
                required
              />
              <i>Почта</i>
            </div>
            <div className="inputBox">
              <input
                key="password"
                type="text"
                onChange={(e) =>
                  setStateLogin({ ...stateLogin, password: e.target.value })
                }
                required
              />
              <i>Пароль</i>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};

import { Link, useRouter } from "@tanstack/react-router";
import { AnimateBackground } from "../../../components/animateBackground/animateBackground";
import { Form } from "../../../components/form/form";
import styles from "./login.module.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useLogin } from "../../../hooks/user/useLogin";
import { useVerifyCode } from "../../../hooks/user/useVerifyCode";

export const Login = () => {
  const [serverError, setServerError] = useState<string>("");
  const [loginData, setLoginData] = useState<any>({});
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { mutate: loginMutate, isLoading: loginIsLoading } = useLogin({
    setServerError,
    setLoginData,
  });

  const { mutate: verifyCodeMutate, isLoading: verifyCodeIsLoading } =
    useVerifyCode({ setServerError, router });

  const onSubmitLogin = (data: any) => {
    loginMutate({
      email: data.email,
      password: data.password,
    });
  };

  console.log(loginData);

  return (
    <div className={styles.login}>
      <AnimateBackground>
        {Object.keys(loginData).length > 0 ? (
          <Form
            title="Подтверждение почты"
            onClick={handleSubmit(onSubmit)}
            isLoading={isLoading}
            error={serverError}
          ></Form>
        ) : (
          <Form
            title="Авторизация"
            onClick={handleSubmit(onSubmitLogin)}
            isLoading={loginIsLoading}
            error={serverError}
          >
            <div>
              <div>
                <input
                  key="email"
                  type="text"
                  required
                  {...register("email", {
                    required: "Почта не может быть пустой",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Некорректный формат почты",
                    },
                  })}
                />
                <i>Почта</i>
              </div>

              <p>
                {errors?.email &&
                  (errors?.email?.message?.toString() || "Error!")}
              </p>
            </div>

            <div>
              <div>
                <input
                  key="password"
                  type="password"
                  required
                  {...register("password", {
                    required: "Пароль не может быть пустым",
                  })}
                />
                <i>Пароль</i>
              </div>
              <p>
                {errors?.password &&
                  (errors?.password?.message?.toString() || "Error!")}
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Нет аккаунта ?</span>
              <Link to="/auth/register">Зарегестрироваться</Link>
            </div>
          </Form>
        )}
      </AnimateBackground>
    </div>
  );
};

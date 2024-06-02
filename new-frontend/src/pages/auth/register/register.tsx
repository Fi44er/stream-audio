import { Link, useRouter } from "@tanstack/react-router";
import { AnimateBackground } from "../../../components/animateBackground/animateBackground";
import { Form } from "../../../components/form/form";
import styles from "./register.module.scss";
import { useForm } from "react-hook-form";
import { useVerifyCode } from "../../../hooks/user/useVerifyCode";
import { useRegister } from "../../../hooks/user/useRegister";
import { useState } from "react";

export const Register = () => {
  const [serverError, setServerError] = useState<string>("");
  const [registerData, setRegisterData] = useState<any>({});
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const checkPasswords = (value: string, data: any) => {
    const { password } = data;
    return value === password || "Пароли не совпадают";
  };

  const { mutate: registerMutate, isLoading: registerIsLogin } = useRegister({
    setServerError,
    setRegisterData,
  });

  const { mutate: verifyCodeMutate, isLoading: verifyCodeIsLoading } =
    useVerifyCode({ setServerError, router });

  const onSubmitRegister = (data: any) => {
    setServerError("");
    registerMutate({
      email: data.email,
      password: data.password,
      passwordRepeat: data.passwordRepeat,
    });
  };

  const onSubmitVerifyCode = (data: any) => {
    const { email, password } = registerData;
    verifyCodeMutate({
      email,
      password,
      code: data.code,
    });
  };

  return (
    <div className={styles.register}>
      <AnimateBackground>
        {Object.keys(registerData).length > 0 ? (
          <Form
            title="Подтверждение почты"
            onClick={handleSubmit(onSubmitVerifyCode)}
            isLoading={verifyCodeIsLoading}
            error={serverError}
          >
            <div>
              <div>
                <input
                  key="code"
                  type="text"
                  required
                  {...register("code", {
                    required: "Код не может быть пустой",
                  })}
                />
                <i>Код</i>
              </div>

              <p>
                {errors?.code &&
                  (errors?.code?.message?.toString() || "Error!")}
              </p>
            </div>
          </Form>
        ) : (
          <Form
            title="Регистрация"
            onClick={handleSubmit(onSubmitRegister)}
            isLoading={registerIsLogin}
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

            <div>
              <div>
                <input
                  key="passwordRepeat"
                  type="password"
                  required
                  {...register("passwordRepeat", {
                    validate: checkPasswords,
                  })}
                />
                <i>Повторить пароль</i>
              </div>
              <p>
                {errors?.passwordRepeat &&
                  (errors?.passwordRepeat?.message?.toString() || "Error!")}
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Есть аккаунта ?</span>
              <Link to="/auth/login">Войти</Link>
            </div>
          </Form>
        )}
      </AnimateBackground>
    </div>
  );
};

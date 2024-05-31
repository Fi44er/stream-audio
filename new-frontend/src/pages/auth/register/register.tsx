import { Link } from "@tanstack/react-router";
import { AnimateBackground } from "../../../components/animateBackground/animateBackground";
import { Form } from "../../../components/form/form";
import styles from "./register.module.scss";
import { useForm } from "react-hook-form";

export const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  const checkPasswords = (value: string, data: any) => {
    const { password } = data;
    return value === password || "Пароли не совпадают";
  };

  return (
    <div className={styles.register}>
      <AnimateBackground>
        <Form title="Регистрация" onClick={handleSubmit(onSubmit)}>
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
      </AnimateBackground>
    </div>
  );
};

import "./form.scss";
import { IStateForm } from "./types/types";
import { useRouter, Link } from "@tanstack/react-router";
export const Form = ({ title, children, onClick }: IStateForm): JSX.Element => {
  const router = useRouter();
  const currentPath = router.parseLocation().pathname;
  const link =
    currentPath === "/auth/login"
      ? {
          path: "/auth/registration",
          span: "Не зарегестрированны?",
          linkText: "Регистрация",
        }
      : currentPath === "/auth/registration"
        ? {
            path: "/auth/login",
            span: "Уже есть аккаунт?",
            linkText: "Авторизация",
          }
        : {
            path: "/",
            span: "",
            linkText: "",
          };

  return (
    <section>
      <div className="grid"></div>
      <div className="signin">
        <div className="content">
          <h2>{title}</h2>

          <div className="form">
            {children}

            <div className="links">
              <span>{link.span}</span>{" "}
              <Link to={link.path}>{link.linkText}</Link>
            </div>

            <div className="inputBox submitBox">
              <button onClick={() => router.navigate({ to: "/" })}>
                Назад
              </button>
              <button onClick={onClick}>Отправить</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

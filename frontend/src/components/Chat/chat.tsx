import { Message } from "../Message/message";
import style from "./chat.module.scss";

export const Chat = (): JSX.Element => {
  return (
    <div className={style.chat}>
      <div className={style.messages}>
        <Message
          photo={"/vite.svg"}
          name={"Test"}
          text={"idniudbwqidbw woidcwwcnw icbw"}
        />
        <Message
          photo={"/vite.svg"}
          name={"Test"}
          text={"idniudbwqidbw woidcwwcnw icbw"}
        />
        <Message
          photo={"/vite.svg"}
          name={"Test"}
          text={"idniudbwqidbw woidcwwcnw icbw"}
        />
      </div>

      <div className={style.form}>
        <input type="text" placeholder="Введите сообщение" />
        <button>
          <img src="src/assets/Arrow.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

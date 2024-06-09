import { IStateMessage } from "../chat/types/types";
import style from "./message.module.scss";

export const Message = ({ photo, name, text }: IStateMessage): JSX.Element => {
  return (
    <div className={style.message}>
      <div className={style.photo}>
        <img src={photo} alt="photo" />
      </div>
      <div className={style.info}>
        <p className={style.name}>{name}</p>
        <p className={style.text}>{text}</p>
      </div>
    </div>
  );
};

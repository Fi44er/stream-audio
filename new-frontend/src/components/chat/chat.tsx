import { useEffect, useState } from "react";
import { Message } from "../message/message";
import style from "./chat.module.scss";
import { ChatMessage } from "../../interfaces/chat.interfaces";
import { useForm } from "react-hook-form";

export const Chat = ({
  socket,
  roomId,
}: {
  socket: any;
  roomId: string;
}): JSX.Element => {
  const [data, setData] = useState<ChatMessage[]>([]);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    socket.on("messages", (data: any) => {
      setData(data);
    });
  });
  useEffect(() => {
    socket.on("message", (message: any) => {
      console.log(data);
      const lastId = data[data.length - 1]?.id;
      const newMessage = { id: lastId + 1, ...message };
      setData([...data, newMessage]);
    });
  }, [data]);

  const sendMessage = (data: any) => {
    socket.emit("message", {
      message: data.message,
      userId: 0,
      roomId,
    });
    reset();
  };
  return (
    <div className={style.chat}>
      <div className={style.messages}>
        {data.map((item) => (
          <Message
            key={item.id}
            photo={"/vite.svg"}
            name={item.userId.toString()}
            text={item.message}
          />
        ))}
      </div>

      <form className={style.form} onSubmit={handleSubmit(sendMessage)}>
        <input
          {...register("message", { required: true })}
          type="text"
          placeholder="Введите сообщение"
        />
        <button>
          <img src="src/assets/Arrow.svg" alt="" />
        </button>
      </form>
    </div>
  );
};

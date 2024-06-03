import { useEffect, useState } from "react";
import { Message } from "../message/message";
import styles from "./chat.module.scss";
import { ChatMessage } from "../../interfaces/chat.interfaces";
import { useForm } from "react-hook-form";
import { useChatScroll } from "../../hooks/useChatScroll";
import { Loader } from "../loader/loader";

export const Chat = ({
  socket,
  roomId,
}: {
  socket: any;
  roomId: string;
}): JSX.Element => {
  const [data, setData] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useChatScroll(data);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    socket.on("messages", (data: any) => {
      setData(data);
      setIsLoading(false);
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
    <div className={styles.chat}>
      <div className={styles.messages} ref={ref}>
        {isLoading && (
          <div className={styles.loaderBlock}>
            <Loader />
          </div>
        )}
        {data.map((item) => (
          <Message
            key={item.id}
            photo={"/vite.svg"}
            name={item.userId.toString()}
            text={item.message}
          />
        ))}
      </div>

      <form className={styles.form} onSubmit={handleSubmit(sendMessage)}>
        <input
          {...register("message", { required: true })}
          type="text"
          placeholder="Введите сообщение"
        />
        <button>
          <img src="/icons/Arrow.svg" alt="arrow" />
        </button>
      </form>
    </div>
  );
};

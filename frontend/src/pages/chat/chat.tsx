import {BsFillSendFill} from 'react-icons/bs';
import style from './chat.module.sass';

export const Chat = (): JSX.Element => (
	<div className={style.page_chat}>
		<div className={style.messages}>
			<div className={style.chat}>
				<div className={style.sender}>
					<h3>Сообщение от кого то</h3>
					<p>Lorem ipsum dolor sit amet</p>
				</div>

				<div className={style.recipient}>
					<h3>Сообщение от кого то</h3>
					<p>Lorem ipsum dolor sit amet</p>
				</div>
			</div>
		</div>

		<div className={style.send_message}>
			<input type='text' placeholder='Введите сообщение' />
			<div className={style.send_button}>
				<BsFillSendFill className={style.send_icon} />
			</div>
		</div>
	</div>
);

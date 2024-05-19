import blurIcon from '../../assets/img/linesForm.svg';
import style from './form.module.sass';
import {IStateForm} from './types/types';
export const Form = ({title, children, onClick}: IStateForm): JSX.Element => (
	<div className={style.form}>
		<h2>{title}</h2>
		<img src={blurIcon} className={style.blur}/>
		<div className={style.inputs}>
			{children}
		</div>
		<button className={style.button} onClick={onClick}>Отправить</button>
	</div>
);

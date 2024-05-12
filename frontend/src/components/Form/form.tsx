import {ReactNode} from 'react';
import style from './form.module.sass';

export const Form = ({title, children}: {title: string, children: ReactNode}): JSX.Element => (
	<div className={style.form}>
		<h2>{title}</h2>
		<div className={style.inputs}>
			{children}
		</div>
		<button className={style.button}>Отправить</button>
	</div>
);

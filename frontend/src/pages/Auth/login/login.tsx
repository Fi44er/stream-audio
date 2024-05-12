import {Form} from '../../../components/Form/form';
import style from './login.module.sass';
export const Login = (): JSX.Element => (
	<div className={style.pageLogin}>
		<Form title='Регистрация'>
			{[
				<input key='email' type='text' placeholder='Email' />,
				<input key='password' type='text' placeholder='Password' />,
				<input key='passwordRepeat' type='text' placeholder='PasswordRepeat' />,
			]}
		</Form>
	</div>
);

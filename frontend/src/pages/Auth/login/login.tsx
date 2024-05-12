import {useState} from 'react';
import {Form} from '../../../components/Form/form';
import style from './login.module.sass';
import {IStateLogin} from './types/types';
export const Login = (): JSX.Element => {
	const [stateLogin, setStateLogin] = useState<IStateLogin>({
		email: '',
		password: '',
		passwordRepeat: '',
	});
	console.log(stateLogin);

	return (
		<div className={style.pageLogin}>
			<Form title='Регистрация'>
				<input key='email' type='text' placeholder='Email' onChange={e => setStateLogin({...stateLogin, email: e.target.value})} />
				<input key='password' type='text' placeholder='Password' onChange={e => setStateLogin({...stateLogin, password: e.target.value})}/>
				<input key='passwordRepeat' type='text' placeholder='PasswordRepeat' onChange={e => setStateLogin({...stateLogin, passwordRepeat: e.target.value})}/>
			</Form>
		</div>
	);
};

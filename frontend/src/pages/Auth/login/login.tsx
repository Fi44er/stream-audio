import {useRouter} from '@tanstack/react-router';
import {useState} from 'react';
import {Form} from '../../../components/Form/form';
import {useAuthState} from '../../../state/authState';
import style from './login.module.sass';
import {IStateLogin} from './types/types';
export const Login = (): JSX.Element => {
	const {getUser, setUser} = useAuthState();
	const router = useRouter();
	const [stateLogin, setStateLogin] = useState<IStateLogin>({
		email: '',
		password: '',
		passwordRepeat: '',
	});
	function login() {
		setUser(stateLogin);
		const state = getUser();
		if (state) {
			router.navigate({to: '/'});
			console.log(state);
		}
	}

	return (
		<div className={style.pageLogin}>
			<Form title='Регистрация' onClick={login}>
				<input key='email' type='text' placeholder='Email' onChange={e => setStateLogin({...stateLogin, email: e.target.value})} />
				<input key='password' type='text' placeholder='Password' onChange={e => setStateLogin({...stateLogin, password: e.target.value})}/>
				<input key='passwordRepeat' type='text' placeholder='PasswordRepeat' onChange={e => setStateLogin({...stateLogin, passwordRepeat: e.target.value})}/>
			</Form>
		</div>
	);
};

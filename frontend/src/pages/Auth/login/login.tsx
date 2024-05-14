
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
	const [code, setCode] = useState<number>();
	function login(step: number) {
		if (step === 1 && checkState()) {
			console.log(code);
			// Логика ответа сервера
			router.navigate({to: '/'});
		}

		setUser(stateLogin);
	}

	const checkState = (): boolean => {
		const state = getUser();
		if (state.email === '' || state.password === '' || state.passwordRepeat === '') {
			return false;
		}

		return true;
	};

	return (
		<div className={style.pageLogin}>
			<Form title='Регистрация' onClick={login.bind(null, 1) }>
				{
					checkState() ? (
						<>
							<input key='code' type='text' placeholder='Code' onChange={e => setCode(Number(e.target.value))}/>
						</>
					) : (
						<>
							<input key='email' type='text' placeholder='Email' onChange={e => setStateLogin({...stateLogin, email: e.target.value})} />
							<input key='password' type='text' placeholder='Password' onChange={e => setStateLogin({...stateLogin, password: e.target.value})}/>
							<input key='passwordRepeat' type='text' placeholder='PasswordRepeat' onChange={e => setStateLogin({...stateLogin, passwordRepeat: e.target.value})} />
						</>
					)
				}
			</Form>
		</div>
	);
};

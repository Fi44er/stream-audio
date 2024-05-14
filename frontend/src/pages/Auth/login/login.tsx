
import {useRouter} from '@tanstack/react-router';
import axios from 'axios';
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
	});

	const [code, setCode] = useState<number>();
	function login(step: number) {
		if (step === 1 && checkState()) {
			console.log(code);
			axios.post<IStateLogin>('http://localhost:6069/user-svc/verify-code', {...stateLogin, code}).then(res => {
				console.log(res.data);
			});
			router.navigate({to: '/'});
		}

		axios.post<IStateLogin>('http://localhost:6069/user-svc/login', stateLogin).then(res => {
			if (res.status === 201) {
				setUser(stateLogin);
			}
		});
	}

	const checkState = (): boolean => {
		const state = getUser();
		const values = Object.values(state);
		const keys = Object.keys(state);

		for (let i = 0; i < values.length; i++) {
			if (values[i] === '' && keys[i] !== null) {
				return false;
			}
		}

		return true;
	};

	return (
		<div className={style.pageLogin}>
			<Form title='Авторизация' onClick={login.bind(null, 1) }>
				{
					checkState() ? (
						<>
							<input key='code' type='text' placeholder='Code' onChange={e => setCode(Number(e.target.value))}/>
						</>
					) : (
						<>
							<input key='email' type='text' placeholder='Email' onChange={e => setStateLogin({...stateLogin, email: e.target.value})} />
							<input key='password' type='text' placeholder='Password' onChange={e => setStateLogin({...stateLogin, password: e.target.value})}/>
						</>
					)
				}
			</Form>
		</div>
	);
};

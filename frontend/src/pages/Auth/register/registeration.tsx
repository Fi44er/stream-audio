/* eslint-disable @typescript-eslint/no-unused-vars */

import {useRouter} from '@tanstack/react-router';
import axios from 'axios';
import {useState} from 'react';
import {Form} from '../../../components/Form/form';
import {useAuthState} from '../../../state/authState';
import style from './reg.module.sass';
import {IStateRegister} from './types/types';
export const Registeration = (): JSX.Element => {
	const {getUser, setUser} = useAuthState();
	const router = useRouter();
	const [stateReg, setStateReg] = useState<IStateRegister>({
		email: '',
		password: '',
		passwordRepeat: '',
	});
	const [code, setCode] = useState<number>();

	function reg(step: number) {
		if (step === 1 && checkState()) {
			const {passwordRepeat, ...registerData} = stateReg;
			axios.post<IStateRegister>('http://localhost:6069/user-svc/verify-code', {...registerData, code}).then(res => {
				console.log(res.data);
				if (res.status === 201) {
					router.navigate({to: '/'});
				}
			});
		}

		axios.post<IStateRegister>('http://localhost:6069/user-svc/register', stateReg).then(res => {
			if (res.status === 201) {
				setUser(stateReg);
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
			<Form title='Регистрация' onClick={reg.bind(null, 1) }>
				{
					checkState() ? (
						<>
							<input key='code' type='text' placeholder='Code' onChange={e => setCode(Number(e.target.value))}/>
						</>
					) : (
						<>
							<input key='email' type='text' placeholder='Email' onChange={e => setStateReg({...stateReg, email: e.target.value})} />
							<input key='password' type='text' placeholder='Password' onChange={e => setStateReg({...stateReg, password: e.target.value})} />
							<input key='passwordRepeat' type='text' placeholder='Repeat password' onChange={e => setStateReg({...stateReg, passwordRepeat: e.target.value})} />
						</>
					)
				}
			</Form>
		</div>
	);
};

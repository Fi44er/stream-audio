/* eslint-disable no-unused-vars */
import {create} from 'zustand';
import {IStateLogin} from '../pages/Auth/login/types/types';

type dataUser = Omit<IStateLogin, 'onLogin'>

interface IAuthState {
  user: dataUser
	setUser: (user: IStateLogin) => void
	getUser: () => dataUser
}

export const useAuthState = create<IAuthState>((set, get) => ({
	user: {
		email: '',
		password: '',
		passwordRepeat: '',
	},
	setUser(user: IStateLogin) {
		set({user});
	},
	getUser: () => get().user,
}));

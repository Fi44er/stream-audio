
import {createFileRoute, redirect} from '@tanstack/react-router';
import {Main} from '../pages/main/main';

export const Route = createFileRoute('/')({
	beforeLoad({context}) {
		const {signIn} = context.authentication;
		if (!signIn) {
			throw redirect({to: '/auth/login'});
		}
	},
	component: () => <Main />,
});

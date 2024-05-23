import {createFileRoute} from '@tanstack/react-router';
import {Login} from '../../../pages/Auth/login/login';

export const Route = createFileRoute('/auth/login/')({
	component: () => <Login />,
});

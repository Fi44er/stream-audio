import {createFileRoute} from '@tanstack/react-router';
import {Registeration} from '../../../pages/Auth/register/registeration';

export const Route = createFileRoute('/auth/registration/')({
	component: () => <Registeration />,
});

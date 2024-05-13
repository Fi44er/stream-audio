
import {createFileRoute} from '@tanstack/react-router';
import {Main} from '../pages/main/main';

export const Route = createFileRoute('/')({

	component: () => <Main />,
});

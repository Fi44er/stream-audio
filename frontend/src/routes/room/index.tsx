import {createFileRoute} from '@tanstack/react-router';
import {Room} from '../../pages/room/room';

export const Route = createFileRoute('/room/')({
	component: () => <Room />,
});

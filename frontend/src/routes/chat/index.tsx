import {createFileRoute} from '@tanstack/react-router';
import {Chat} from '../../pages/chat/chat';

export const Route = createFileRoute('/chat/')({
	component: () => <Chat />,
});

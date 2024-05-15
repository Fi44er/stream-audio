import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import {useRef, useState} from 'react';
import {io} from 'socket.io-client';
import {Form} from '../../components/Form/form';
import {IStateCreateRoom, IStateJoinRoom, ResponseJWT} from './types/types';
export const Room = (): JSX.Element => {
	const [stateCreateRoom, setStateCreateRoom] = useState<IStateCreateRoom>({
		ownerId: (0),
		name: (''),
	});
	const statePushRoom = useRef<IStateJoinRoom>({
		roomId: (0),
	});
	const token = Cookies.get('token');
	const test = token?.split(' ')[1];
	console.log(test);

	const socket = io(`http://localhost:6069?token=${test}`);

	function createRoomHandler() {
		if (token) {
			const decodedToken: ResponseJWT = jwtDecode(token);
			console.log(token);

			console.log(decodedToken);
			setStateCreateRoom({...stateCreateRoom, ownerId: decodedToken.id});
			axios.post<IStateCreateRoom>('http://localhost:6069/room-svc/create-room', stateCreateRoom).then(res => {
				const {data} = res;
				if (data.id) {
					statePushRoom.current.roomId = data.id;
				}
			});
		}
	}

	return (
		<>
			<Form title='Создать комнату' onClick={createRoomHandler} >
				<input type='text' placeholder='Название комнаты' onChange={e => setStateCreateRoom({...stateCreateRoom, name: e.target.value})} />
			</Form>
		</>
	);
};

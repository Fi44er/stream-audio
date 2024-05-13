import {Link} from '@tanstack/react-router';
import {AuthIcon} from '../../assets/img/icons/AuthIcon';
import {HomeIcon} from '../../assets/img/icons/HomeIcon';
import {RoomIcon} from '../../assets/img/icons/RoomIcon';
import {useAuthState} from '../../state/authState';
import style from './sideMenu.module.sass';
export const SideMenu = (): JSX.Element => {
	const {getUser} = useAuthState();
	const state = getUser();
	function checkState(): boolean {
		if (state.email === '' || state.password === '' || state.passwordRepeat === '') {
			return false;
		}

		return true;
	}

	return (
		<div className={style.sideMenu}>
			{checkState() ? (
				<div className={style.pages}>
					<div className={style.home}>
						<HomeIcon />
						<Link to='/chat'>Главная</Link>
					</div>
					<div className={style.room}>
						<RoomIcon />
						<Link to='/chat'>Создать комнату</Link>
					</div>
				</div>
			) : (
				<div className={style.pages}>
					<div className={style.auth}>
						<AuthIcon/>
						<Link to='/auth/login'>Авторизация</Link>
					</div>
				</div>
			)}

		</div>
	);
};

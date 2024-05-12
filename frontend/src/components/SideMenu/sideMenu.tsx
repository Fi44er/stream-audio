import {Link} from '@tanstack/react-router';
import {HomeIcon} from '../../assets/img/icons/HomeIcon';
import {RoomIcon} from '../../assets/img/icons/RoomIcon';
import style from './sideMenu.module.sass';

export const SideMenu = (): JSX.Element => (
	<div className={style.sideMenu}>
		<div className={style.pages}>
			<div className={style.home}>
				<HomeIcon/>
				<Link to='/chat'>Главная</Link>
			</div>
			<div className={style.room}>
				<RoomIcon/>
				<Link to='/chat'>Создать комнату</Link>
			</div>
		</div>
	</div>
);

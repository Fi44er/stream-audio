/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import {SideMenu} from '../../components/SideMenu/sideMenu';
import style from './main.module.sass';
export const Main = (): JSX.Element => {
	const fdl = 'f';
	return (
		<div className={style.main}>
			<SideMenu />
			<div className={style.content}>block</div>
		</div>
	);
};

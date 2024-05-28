import { SideMenu } from "../../components/SideMenu/sideMenu";
import style from "./main.module.scss";
export const Main = (): JSX.Element => (
  <div className={style.main}>
    <SideMenu />
    <div className={style.content}>block</div>
  </div>
);

import {ReactNode} from 'react';

export type IStateForm = {
  title: string,
  children: ReactNode,
  onClick?: () => void
}

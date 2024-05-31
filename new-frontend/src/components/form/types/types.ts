import { ReactNode } from "react";

export type FormProps = {
  title?: string;
  children?: ReactNode;
  onClick?: () => void;
};

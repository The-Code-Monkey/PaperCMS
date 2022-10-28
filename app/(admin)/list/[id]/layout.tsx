import {cloneElement, ReactElement} from "react";

interface Props {
  children: ReactElement;
  params: Record<string, string>;
}

const Layout = ({ children, params }: Props) => {
  return cloneElement(children, {
    params
  });
}

export default Layout;
import { Box } from '@techstack/components';
import {NavItemType} from "../../../types";
interface Props {
  menu: Array<NavItemType>;
  style: Record<string, string>;
}

const Nav = ({ menu, style }: Props) => {
  return (
    <Box d='flex' {...style}>
      {menu.map(item => {
        return <Box key={item[1]}>{item[0]}</Box>;
      })}
    </Box>
  );
};

export default Nav;

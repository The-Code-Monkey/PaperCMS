'use client';

import { Box } from '@techstack/components';

import { capitalizeFirstLetter } from '../../../../utils';

interface Props {
  tid: string;
  id: string;
}

const Header = ({ tid, id }: Props) => {
  return (
    <Box borderBottom='1' mb='3' pb='3'>
      Editing: {capitalizeFirstLetter(tid)} - {id}
    </Box>
  );
};

export default Header;

'use client';

import { Box } from '@techstack/components';

import { capitalizeFirstLetter } from '../../../../utils';

interface Props {
  tid: string;
  id: string;
}

const Header = ({ tid, id }: Props) => {
  return (
    <Box borderBottom='1' p='1em' pb='3' bg='neutrals.5'>
      Editing: {capitalizeFirstLetter(tid)} - {id}
    </Box>
  );
};

export default Header;

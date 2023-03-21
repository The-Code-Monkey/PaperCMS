'use client';

import { Box, Button } from '@techstack/components';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface Props {
  id: string;
}

const Header = ({ id }: Props) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/edit/${id}/new`);
  }, [id, router]);

  return (
    <Box
      d='flex'
      borderBottom='1'
      borderColor='neutrals.10'
      p='1em'
      py='3'
      bg='neutrals.7'
      justifyContent='flex-end'
    >
      <Button iconName='plus' h='0' variant='default' onClick={handleClick}>
        Add entry
      </Button>
    </Box>
  );
};

export default Header;

import { Box, Button } from '@techstack/components';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { capitalizeFirstLetter } from '../pages';

interface Props {
  id?: string;
  tid: string;
  noEntry?: boolean;
}

const Header = ({ id, tid, noEntry = false }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const isListPage = pathname.includes('/list');

  const handleClick = useCallback(() => {
    router.push(`/edit/${id}/new`);
  }, [id, router]);

  const navigateToEditor = () => {
    router.push(`/editor/${tid}/${id}`);
  };

  return (
    <Box
      d='flex'
      borderBottom='1'
      borderColor='neutrals.10'
      p='1em'
      py='3'
      bg='neutrals.7'
      h='10'
      justifyContent={!!tid ? undefined : 'flex-end'}
      alignItems={'center'}
    >
      {!!id ? (
        <>
          Editing: {capitalizeFirstLetter(tid)} - {id}
        </>
      ) : (
        <>{capitalizeFirstLetter(tid)}</>
      )}
      {tid === 'pages' && !isListPage && (
        <Button
          ml='auto'
          pos='absolute'
          right='3'
          top='8px'
          onClick={navigateToEditor}
        >
          Preview Editor
        </Button>
      )}
      {!tid && !noEntry && (
        <Button iconName='Plus' h='0' variant='default' onClick={handleClick}>
          Add entry
        </Button>
      )}
    </Box>
  );
};

export default Header;

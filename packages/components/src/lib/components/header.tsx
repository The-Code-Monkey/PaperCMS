import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Box, Button } from '@techstack/components';
import {capitalizeFirstLetter} from "../pages/pageUtils";

interface Props {
  id: string;
  tid?: string;
}

const Header = ({ id, tid }: Props) => {
  const router = useRouter();

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
      {!!tid && <>Editing: {capitalizeFirstLetter(tid)} - {id}</>}
      {tid === 'pages' && (
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
      {!tid && <Button iconName='plus' h='0' variant='default' onClick={handleClick}>
        Add entry
      </Button>}
    </Box>
  );
};

export default Header;

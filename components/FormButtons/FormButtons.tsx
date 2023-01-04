import { Box, Button } from '@techstack/components';

interface Props {
  onCancelClick: () => void;
  onSaveClick: () => void;
}

const FormButtons = ({ onCancelClick, onSaveClick }: Props) => {
  return (
    <Box
      d='flex'
      flexDir='row'
      justifyContent='space-between'
      px='1em'
      py='3'
      bg='neutrals.10'
      h='10'
    >
      <Button onClick={onSaveClick} intent='success'>
        Save
      </Button>
      <Button onClick={onCancelClick} intent='error'>
        Cancel
      </Button>
    </Box>
  );
};

export default FormButtons;

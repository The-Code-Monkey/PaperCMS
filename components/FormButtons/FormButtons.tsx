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
    >
      <Button onClick={onSaveClick}>Save</Button>
      <Button onClick={onCancelClick}>Cancel</Button>
    </Box>
  );
};

export default FormButtons;

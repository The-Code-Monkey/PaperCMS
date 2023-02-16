import { Box } from '@techstack/components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';

import { EditorWrapper, StyledAccordion } from './styled';

interface Props {
  value: string;
  onChange: (e: any) => void;
  name?: string;
}

const Editor = ({ value, onChange, name }: Props) => {
  const handleOnChange = (value?: string) => {
    onChange({
      target: {
        name,
        value,
      },
    });
  };

  return (
    <Box d='flex' flexDir='column' w='full'>
      <StyledAccordion
        title={
          value
            ?.split('</h1>')[0]
            .replace(/(<h1>|<\/h1>)/g, '')
            .replace('&amp;', '&') ?? 'Content'
        }
        maxHeight={7000}
      >
        <EditorWrapper>
          <ReactQuill theme={'snow'} value={value} onChange={handleOnChange} />
        </EditorWrapper>
      </StyledAccordion>
    </Box>
  );
};

export default Editor;

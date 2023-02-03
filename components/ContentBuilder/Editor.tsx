import dynamic from 'next/dynamic';
import * as commands from '@uiw/react-md-editor/lib/commands';
import { ChangeEvent } from 'react';
import { Box } from '@techstack/components';

import { center, h1, h2, h3, h4, h5, h6 } from './customCommands';
import { EditorWrapper, StyledAccordion } from './styled';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default),
  { ssr: false }
);

interface Props {
  value: string;
  onChange: (e: any) => void;
  name?: string;
}

const Editor = ({ value, onChange, name }: Props) => {
  const handleOnChange = (
    value?: string,
    e?: ChangeEvent<HTMLTextAreaElement>
  ) => {
    onChange({
      target: {
        name,
        value: e?.target.value,
      },
    });
  };

  return (
    <Box d='flex' flexDir='column' w='full'>
      <StyledAccordion
        title={value?.split('\n')[0].replace(/#/g, '') ?? 'Editor Collapsed'}
        maxHeight={7000}
      >
        <EditorWrapper>
          <MDEditor
            height={500}
            value={value}
            onChange={handleOnChange}
            commands={[
              commands.bold,
              commands.italic,
              commands.strikethrough,
              commands.hr,
              commands.group([h1, h2, h3, h4, h5, h6], {
                name: 'title',
                groupName: 'title',
                buttonProps: { 'aria-label': 'Insert title' },
              }),
              commands.divider,
              commands.link,
              commands.quote,
              commands.code,
              commands.codeBlock,
              commands.image,
              commands.divider,
              commands.orderedListCommand,
              commands.unorderedListCommand,
              commands.checkedListCommand,
              center,
            ]}
            autoFocus={false}
          />
        </EditorWrapper>
      </StyledAccordion>
    </Box>
  );
};

export default Editor;

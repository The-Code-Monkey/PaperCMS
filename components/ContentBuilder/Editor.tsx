import dynamic from 'next/dynamic';
import * as commands from '@uiw/react-md-editor/lib/commands';
import { ChangeEvent } from 'react';
import { Box } from '@techstack/components';

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
              commands.group(
                [
                  {
                    ...commands.title1,
                    icon: (
                      <div style={{ fontSize: 15, textAlign: 'left' }}>H1</div>
                    ),
                  },
                  {
                    ...commands.title2,
                    icon: (
                      <div style={{ fontSize: 15, textAlign: 'left' }}>H2</div>
                    ),
                  },
                  {
                    ...commands.title3,
                    icon: (
                      <div style={{ fontSize: 15, textAlign: 'left' }}>H3</div>
                    ),
                  },
                  {
                    ...commands.title4,
                    icon: (
                      <div style={{ fontSize: 15, textAlign: 'left' }}>H4</div>
                    ),
                  },
                  {
                    ...commands.title5,
                    icon: (
                      <div style={{ fontSize: 15, textAlign: 'left' }}>H5</div>
                    ),
                  },
                  {
                    ...commands.title6,
                    icon: (
                      <div style={{ fontSize: 15, textAlign: 'left' }}>H6</div>
                    ),
                  },
                ],
                {
                  name: 'title',
                  groupName: 'title',
                  buttonProps: { 'aria-label': 'Insert title' },
                }
              ),
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
            ]}
            autoFocus={false}
          />
        </EditorWrapper>
      </StyledAccordion>
    </Box>
  );
};

export default Editor;
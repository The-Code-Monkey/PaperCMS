import dynamic from 'next/dynamic';
import * as commands from '@uiw/react-md-editor/lib/commands';
import { ChangeEvent } from 'react';

import { DefaultRecordType } from '../../app/utils';

import { EditorWrapper, StyledAccordion } from './styled';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default),
  { ssr: false }
);

interface Props {
  field: DefaultRecordType;
  onChange: (e: any) => void;
}

const Editor = ({ field, onChange }: Props) => {
  const handleOnChange = (
    value?: string,
    e?: ChangeEvent<HTMLTextAreaElement>
  ) => {
    onChange(e);
  };

  return (
    <StyledAccordion
      title={
        field.value?.split('\n')[0].replace(/#/g, '') ?? 'Editor Collapsed'
      }
      maxHeight={7000}
    >
      <EditorWrapper>
        <MDEditor
          height={500}
          value={field.value}
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
  );
};

export default Editor;

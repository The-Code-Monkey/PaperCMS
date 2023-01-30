import { Box, Input } from '@techstack/components';
import { memo, useCallback } from 'react';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import * as commands from '@uiw/react-md-editor/lib/commands';

const Editor = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default),
  { ssr: false }
);

import {
  CarouselRecordType,
  DefaultRecordType,
  ImageRecordType,
  RecordType,
} from '../../app/utils';

import ImageUploader from './ImageUploader';
import CarouselBuilder from './CarouselBuilder';

interface Props {
  field: RecordType;
  handleOnChange: (e: any, index: number) => void;
  handleOnChangeType: (e: any, index: number) => void;
  blockTypes: Array<string>;
  index: number;
}

const InputRenderer = ({
  field,
  handleOnChange,
  handleOnChangeType,
  blockTypes,
  index,
}: Props) => {
  const onChangeType = useCallback(
    (e: any) => {
      handleOnChangeType(e, index);
    },
    [handleOnChangeType, index]
  );

  const onChange = useCallback(
    (e: any) => {
      handleOnChange(e, index);
    },
    [handleOnChange, index]
  );

  const renderInput = () => {
    switch (field.type) {
      case 'carousel': {
        return (
          <CarouselBuilder
            field={field as CarouselRecordType}
            onChange={onChange}
          />
        );
      }
      case 'image-text': {
        return (
          <Box d='flex' flexDir='column' w='full'>
            <Box d='flex' flex='50%' gap='5'>
              <ImageUploader
                field={field as ImageRecordType}
                handleOnChange={onChange}
              />
              <Input
                name={`${field.id}_text`}
                value={field.value}
                onChange={onChange}
                type={'textarea'}
              />
            </Box>
            <Box<'label'>>
              Image on left:
              <Input
                name={`${field.id}_checkbox`}
                onChange={onChange}
                type='checkbox'
              />
            </Box>
          </Box>
        );
      }
      case 'image': {
        return (
          <ImageUploader
            field={field as ImageRecordType}
            handleOnChange={onChange}
          />
        );
      }
      case 'textarea': {
        return (
          <Box>
            <Editor
              value={field.value}
              onChange={(_, e) => onChange(e)}
              extraCommands={[
                commands.group(
                  [
                    {
                      ...commands.title1,
                      icon: (
                        <div style={{ fontSize: 15, textAlign: 'left' }}>
                          H1
                        </div>
                      ),
                    },
                    {
                      ...commands.title2,
                      icon: (
                        <div style={{ fontSize: 15, textAlign: 'left' }}>
                          H2
                        </div>
                      ),
                    },
                    {
                      ...commands.title3,
                      icon: (
                        <div style={{ fontSize: 15, textAlign: 'left' }}>
                          H3
                        </div>
                      ),
                    },
                    {
                      ...commands.title4,
                      icon: (
                        <div style={{ fontSize: 15, textAlign: 'left' }}>
                          H4
                        </div>
                      ),
                    },
                    {
                      ...commands.title5,
                      icon: (
                        <div style={{ fontSize: 15, textAlign: 'left' }}>
                          H5
                        </div>
                      ),
                    },
                    {
                      ...commands.title6,
                      icon: (
                        <div style={{ fontSize: 15, textAlign: 'left' }}>
                          H6
                        </div>
                      ),
                    },
                  ],
                  {
                    name: 'title',
                    groupName: 'title',
                    buttonProps: { 'aria-label': 'Insert title' },
                  }
                ),
                commands.codeBlock,
                commands.codeEdit,
              ]}
            />
          </Box>
        );
      }
      default: {
        field = field as DefaultRecordType;

        return (
          <>
            <Input
              name={`${field.id}`}
              value={field.value}
              onChange={!field.type ? onChangeType : onChange}
              type={field.type as any}
              placeholder={!field.type ? 'Type / to select a block' : undefined}
              list={!field.type ? 'blocks' : undefined}
            />
            {!field.type && (
              <datalist id='blocks'>
                {blockTypes.map(type => (
                  <option key={type} value={type} />
                ))}
              </datalist>
            )}
          </>
        );
      }
    }
  };

  return renderInput();
};

export default memo(InputRenderer);

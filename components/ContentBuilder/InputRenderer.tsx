import { Box, Input } from '@techstack/components';
import { memo, useCallback } from 'react';

import { RecordType } from '../../app/utils';

import ImageUploader from './ImageUploader';

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
      case 'image-text': {
        return (
          <Box d='flex' flexDir='column' w='full'>
            <Box d='flex' flex='50%' gap='5'>
              <ImageUploader field={field} handleOnChange={onChange} />
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
        return <ImageUploader field={field} handleOnChange={onChange} />;
      }
      default: {
        return (
          <>
            <Input
              name={`${field.id}`}
              value={field.value}
              onChange={!field.type ? onChangeType : onChange}
              type={field.type as any}
              placeholder={!field.type ? 'Type / to select a block' : undefined}
              // @ts-ignore
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

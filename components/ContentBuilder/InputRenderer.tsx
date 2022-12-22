import { Box, Input } from '@techstack/components';
import { memo, useCallback } from 'react';

import { RecordType } from '../../app/utils';

import ImageUploader from './ImageUploader';

interface Props {
  field: RecordType;
  handleOnChange: (e: any, index: number) => void;
  blockTypes: Array<string>;
  index: number;
}

const InputRenderer = ({ field, handleOnChange, blockTypes, index }: Props) => {
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
                defaultValue={field.value}
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
              defaultValue={field.value}
              onChange={onChange}
              type={field.type as any}
              // @ts-ignore
              placeholder={!field.type && 'Type / to select a block'}
              list={!field.type && 'blocks'}
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

import { Box, Input } from '@techstack/components';
import { ChangeEvent } from 'react';
import { ImageRecordType, RecordType } from "@nucleus-cms/utils";

import Editor from './Editor';
import ImageUploader from './ImageUploader';
import { StyledAccordion } from './styled';

interface Props {
  field: ImageRecordType;
  onChange: (e: {
    target: {
      value: RecordType;
    };
  }) => void;
}

const ImageWithText = ({ field, onChange }: Props) => {
  const handleOnChange = (
    value: string | boolean | Array<string> | FileList,
    name: string
  ) => {
    const e = {
      target: {
        value: {
          ...(field.value ?? {}),
          [name]: value,
        },
      },
    };

    onChange(e);
  };

  const handleCheckboxOnChange = (name: string) => (e: boolean) => {
    handleOnChange(e, name);
  };

  const handleOnChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    handleOnChange(target.files, 'images');
  };

  return (
    <Box d='flex' flexDir='column' w='full'>
      <StyledAccordion title='Settings'>
        <Box d='flex' flexDir='row' gap='5'>
          <Box pt='1'>{field.value?.img_left ? 'Right' : 'Left'} Image</Box>
          <Input
            value={field.value?.img_left ? 'checked' : 'unchecked'}
            name='img_left'
            onChange={handleCheckboxOnChange('img_left')}
            type='checkbox'
          />
        </Box>
      </StyledAccordion>
      <StyledAccordion title='Content'>
        <Box d='flex' flex='50%' flexDir='column' gap='5'>
          <ImageUploader
            field={field as ImageRecordType}
            handleOnChange={handleOnChangeImage}
          />
          <Editor
            name='content'
            value={`${field.value?.content ?? ''}`}
            onChange={e => handleOnChange(e.target.value, e.target.name)}
          />
        </Box>
      </StyledAccordion>
    </Box>
  );
};

export default ImageWithText;

import { Box, Input } from '@techstack/components';
import Image from 'next/image';
import { useCallback, useRef } from 'react';

import { ImageRecordType } from '../../app/utils';

interface Props {
  field: ImageRecordType;
  handleOnChange: (e: any) => void;
}

const ImageUploader = ({ field, handleOnChange }: Props) => {
  const handleOnClick = useCallback(() => {
    document.getElementById(`image-upload-${field.id}`)?.click();
  }, [field.id]);

  return (
    <>
      <Box minH='15' position='relative' flex='1'>
        {field.url && (
          <Image
            src={field.url}
            alt={'uploaded image'}
            fill
            style={{ objectFit: 'contain' }}
            onClick={handleOnClick}
          />
        )}
      </Box>
      <Input
        name={`${field.id}`}
        onChange={handleOnChange}
        type={'file'}
        accept='image/*'
        placeholder={!field.type ? 'Type / to select a block' : undefined}
        hidden={!!field.url}
        id={`image-upload-${field.id}`}
      />
    </>
  );
};

export default ImageUploader;

import { Box, Input } from '@techstack/components';
import Image from 'next/image';

import { ImageRecordType } from '../../app/utils';

interface Props {
  field: ImageRecordType;
  handleOnChange: (e: any) => void;
}

const ImageUploader = ({ field, handleOnChange }: Props) => {
  return field.url ? (
    <Box minH='15' position='relative' flex='1'>
      <Image
        src={field.url}
        alt={'uploaded image'}
        fill
        style={{ objectFit: 'contain' }}
      />
    </Box>
  ) : (
    <Input
      name={`${field.id}`}
      onChange={handleOnChange}
      type={'file'}
      accept='image/*'
      placeholder={!field.type ? 'Type / to select a block' : undefined}
    />
  );
};

export default ImageUploader;

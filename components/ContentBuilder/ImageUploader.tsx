import { Input } from '@techstack/components';

import { RecordType } from '../../app/utils';

interface Props {
  field: RecordType;
  handleOnChange: (e: any) => void;
}

const ImageUploader = ({ field, handleOnChange }: Props) => {
  return (
    <Input
      name={`${field.id}`}
      value={field.value}
      onChange={handleOnChange}
      type={'file'}
      accept='image/*'
      placeholder={!field.type ? 'Type / to select a block' : undefined}
    />
  );
};

export default ImageUploader;

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
      defaultValue={field.value}
      onChange={handleOnChange}
      // @ts-ignore
      type={'file'}
      accept='image/*'
      // @ts-ignore
      placeholder={!field.type && 'Type / to select a block'}
      list={!field.type && 'blocks'}
    />
  );
};

export default ImageUploader;

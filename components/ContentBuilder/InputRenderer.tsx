import { Input } from '@techstack/components';
import { memo, useCallback } from 'react';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

import {
  CarouselRecordType,
  DefaultRecordType,
  ImageRecordType,
  RecordType,
} from '../../app/utils';

import ImageUploader from './ImageUploader';
import CarouselBuilder from './CarouselBuilder';
import Editor from './Editor';
import ImageWithText from './ImageWithText';

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
          <ImageWithText field={field as ImageRecordType} onChange={onChange} />
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
        return <Editor value={`${field.value}`} onChange={onChange} />;
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
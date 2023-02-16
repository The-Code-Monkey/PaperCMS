import { Box, Icon, Input, Interactable } from '@techstack/components';
import { memo, useCallback } from 'react';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { v4 as uuid } from 'uuid';

import {
  CarouselRecordType,
  DefaultRecordType,
  ImageRecordType,
  InnerSectionType,
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

  const handleOnClick = useCallback(
    (e: any) => {
      handleOnChange(
        {
          target: {
            value: [
              {
                id: uuid(),
                order: 0,
              },
            ],
          },
        },
        index
      );
    },
    [handleOnChange, index]
  );

  const handleOnChangeInnerSection = useCallback(
    (e: any, innerIndex: number) => {
      const newValue = [...(field as InnerSectionType).value];

      newValue[innerIndex].value = e.target.value;

      onChange({
        target: {
          value: newValue,
        },
      });
    },
    [field, onChange]
  );

  const handleOnChangeInnerType = useCallback(
    (e: any, innerIndex: number) => {
      const newValue = [...(field as InnerSectionType).value];

      newValue[innerIndex].type = e.target.value.replace('/', '');
      newValue[innerIndex].value = undefined;

      onChange({
        target: {
          value: newValue,
        },
      });
    },
    [field, onChange]
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
        return <Editor value={field.value as string} onChange={onChange} />;
      }
      case 'innerSection': {
        field = field as InnerSectionType;

        return field.value.length > 0 ? (
          <>
            {field.value.map((innerField, innerIndex) => (
              <InputRenderer
                key={innerField.id}
                field={innerField}
                handleOnChange={handleOnChangeInnerSection}
                blockTypes={blockTypes}
                handleOnChangeType={handleOnChangeInnerType}
                index={innerIndex}
              />
            ))}
          </>
        ) : (
          <Interactable
            w={'full'}
            h={'15'}
            d='flex'
            alignItems={'center'}
            justifyContent={'center'}
            onClick={handleOnClick}
          >
            <Icon name={'plussquare'} />
          </Interactable>
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

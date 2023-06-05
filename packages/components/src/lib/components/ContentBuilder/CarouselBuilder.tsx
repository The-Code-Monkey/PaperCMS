import { CarouselRecordType, useDB } from '@nucleus-cms/utils';
import { Box, Input, Carousel, Button, Divider } from '@techstack/components';
import { ChangeEvent } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import ImageUploader from './ImageUploader';
import { StyledAccordion } from './styled';

interface Props {
  field: CarouselRecordType;
  onChange: (e: {
    target: {
      value: {
        images?: string[];
        titles?: string[];
        singleTitle: boolean;
        autoPlay: boolean;
        blur?: string;
        shadow?: string;
        showArrows: boolean;
        showIndicators: boolean;
        showStatus: boolean;
        showThumbs: boolean;
        height: string | number;
      };
    };
  }) => void;
}
const CarouselBuilder = ({ field, onChange }: Props) => {
  const DB = useDB();

  const handleOnChange = (
    value: string | boolean | Array<string>,
    name: string
  ) => {
    onChange({
      target: {
        value: {
          ...field.value,
          [name]: value,
        },
      },
    });
  };

  const handleOnChangeTitle =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const titles = [...(field?.value?.titles ?? [])];
      titles[index] = e.target.value;
      handleOnChange(titles, 'titles');
    };

  const handleOnChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const images = await DB.upload(e.target.files, `pages/carousel`);

      handleOnChange(
        images.filter(img => img.url !== null).map(img => img.url as string),
        'images'
      );
    }
  };

  const handleAddTitle = () => {
    const length = field?.value?.titles?.length ?? 0;
    handleOnChangeTitle(length)({
      target: { value: '' },
    } as ChangeEvent<HTMLInputElement>);
  };

  const handleCheckboxOnChange = (name: string) => (e: boolean) => {
    if (name === 'singleTitle' && e && field.value.titles === undefined) {
      handleOnChange([''], 'titles');
    }

    handleOnChange(e, name);
  };

  return (
    <Box d='flex' flexDir='column' w='full'>
      <>
        <StyledAccordion title={'Settings'} maxHeight={500}>
          <Box d='flex' flexDir='row' flex='50%' gap='5' mt='3'>
            <Box d='flex' flexDir='row' gap='5'>
              <Box pt='1'>Single Title:</Box>
              <Input
                value={field?.value?.singleTitle ? 'checked' : 'unchecked'}
                type='checkbox'
                name='singleTitle'
                onChange={handleCheckboxOnChange('singleTitle')}
              />
            </Box>
            <Box d='flex' flexDir='row' gap='5'>
              <Box pt='1'>Autoplay:</Box>
              <Input
                value={field?.value?.autoPlay ? 'checked' : 'unchecked'}
                type='checkbox'
                name='autoPlay'
                onChange={handleCheckboxOnChange('autoPlay')}
              />
            </Box>
            <Box d='flex' flexDir='row' gap='5'>
              <Box pt='1'>Arrows:</Box>
              <Input
                value={field?.value?.showArrows ? 'checked' : 'unchecked'}
                type='checkbox'
                name='showArrows'
                onChange={handleCheckboxOnChange('showArrows')}
              />
            </Box>
            <Box d='flex' flexDir='row' gap='5'>
              <Box pt='1'>Indicators:</Box>
              <Input
                value={field?.value?.showIndicators ? 'checked' : 'unchecked'}
                type='checkbox'
                name='showIndicators'
                onChange={handleCheckboxOnChange('showIndicators')}
              />
            </Box>
            <Box d='flex' flexDir='row' gap='5'>
              <Box pt='1'>Status:</Box>
              <Input
                value={field?.value?.showStatus ? 'checked' : 'unchecked'}
                type='checkbox'
                name='showStatus'
                onChange={handleCheckboxOnChange('showStatus')}
              />
            </Box>
            <Box d='flex' flexDir='row' gap='5'>
              <Box pt='1'>Thumbs:</Box>
              <Input
                value={field?.value?.showThumbs ? 'checked' : 'unchecked'}
                type='checkbox'
                name='showThumbs'
                onChange={handleCheckboxOnChange('showThumbs')}
              />
            </Box>
          </Box>
          <Divider />
          <StyledAccordion title={'Titles'} maxHeight={500}>
            <Box d='flex' mt='3' gap='4' flexDir='column'>
              <Box pt='1'>Titles:</Box>
              {field?.value?.titles?.map((title, index) => {
                return (
                  <Input
                    key={index}
                    value={title ?? ''}
                    type='text'
                    name='title'
                    onChange={handleOnChangeTitle(index)}
                  />
                );
              })}
              <Button h='10' alignSelf='start' onClick={handleAddTitle}>
                Add Title
              </Button>
            </Box>
          </StyledAccordion>
          <StyledAccordion title={'Images'} maxHeight={500}>
            <Box d='flex' mt='3' gap='4' flexDir='column'>
              <ImageUploader
                field={{
                  url: field.value.images,
                }}
                multiple
                handleOnChange={handleOnChangeImage}
              />
            </Box>
          </StyledAccordion>
        </StyledAccordion>
        <StyledAccordion title={'Preview'} maxHeight={1000}>
          <Carousel
            images={field?.value?.images ?? []}
            titles={field?.value?.titles ?? []}
            singleTitle={field?.value?.singleTitle}
            autoPlay={field?.value?.autoPlay}
            blur={field?.value?.blur ?? ''}
            shadow={field?.value?.shadow ?? ''}
            showArrows={field?.value?.showArrows}
            showIndicators={field?.value?.showIndicators}
            showStatus={field?.value?.showStatus}
            showThumbs={field?.value?.showThumbs}
            height={field?.value?.height ?? '21'}
          />
          <Box mb={field?.value?.showThumbs ? '14' : undefined}>&nbsp;</Box>
        </StyledAccordion>
      </>
    </Box>
  );
};

export default CarouselBuilder;

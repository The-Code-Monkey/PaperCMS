import { Box, Input, Carousel } from '@techstack/components';
import { ChangeEvent } from 'react';
import { CarouselRecordType } from '../../app/utils';



interface Props {
  field: CarouselRecordType;
  onChange: (e: any) => void;
}
const CarouselBuilder = ({ field, onChange }: Props) => {
  console.log(field);

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
      if (titles?.[index]) {
        titles[index] = e.target.value;
      }
      handleOnChange(titles, 'titles');
    };

  const handleCheckboxOnChange = (name: string) => (e: boolean) => {
    handleOnChange(e, name);
  };

  return (
    <Box d='flex' flexDir='column' w='full'>
      <>
        <Box d='flex' flex='50%' gap='5'>
          Carousel Builder:
        </Box>
        <Box d='flex' flex='50%' gap='5' mt='3'>
          <>
            <label>
              Single Title
              <Input
                value={field?.value?.singleTitle ? 'checked' : 'unchecked'}
                type='checkbox'
                name='singleTitle'
                onChange={handleCheckboxOnChange('singleTitle') as any}
              />
            </label>

            {field?.value?.['singleTitle'] && (
              <label>
                Title
                {field?.value?.titles.map((title, index) => {
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
              </label>
            )}
          </>
        </Box>
        <Carousel
          images={field?.value?.images ?? []}
          titles={field?.value?.titles ?? []}
          singleTitle={field?.value?.singleTitle}
          autoPlay={field?.value?.autoPlay}
          blur={field?.value?.blur}
          shadow={field?.value?.shadow}
          showArrows={field?.value?.showArrows}
          showIndicators={field?.value?.showIndicators}
          showStatus={field?.value?.showStatus}
          showThumbs={field?.value?.showThumbs}
          height={field?.value?.height}
        />
      </>
    </Box>
  );
};

export default CarouselBuilder;

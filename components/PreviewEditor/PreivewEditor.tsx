'use client';

import { Box, Carousel, CarouselProps } from '@techstack/components';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

import { InnerSectionType, RecordType } from '../../app/utils';
import FormButtons from '../FormButtons';
import useDB from '../../db';

import { SiteThemeContext } from './context';
import Nav from './components/Nav';
import Editor from './fields/Editor';
import ElementsAside from './ElementsAside';
import InnerSection from './elements/InnerSection';

interface Props {
  fields: Array<Record<string, string>>;
  data: Record<string, Array<RecordType> | string>;
  tid: string;
  id: string;
}

const PreviewEditor = ({ fields, data, tid, id }: Props) => {
  const router = useRouter();
  const DB = useDB();
  const SiteConfig = useContext(SiteThemeContext);
  const [isPublishing, setIsPublishing] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<[string, boolean]>([
    '',
    false,
  ]);

  const contentIndex = fields.findIndex(
    field => field.column_name === 'content'
  );

  const [content, setContent] = useState<Array<RecordType>>(
    (contentIndex !== -1 ? data.content : []) as Array<RecordType>
  );

  const handleOnChangeEditor = (index: string, value: string) => {
    const contentIndex = content.findIndex(item => item.id === index);
    if (contentIndex !== -1) {
      setContent(prevState => {
        const newState = [...prevState];
        newState[contentIndex].value = value;
        return newState;
      });
    }
  };

  const handleOnChange = (index: string) => (value: any) => {
    const contentIndex = content.findIndex(item => item.id === index);
    if (contentIndex !== -1) {
      setContent(prevState => {
        const newState = [...prevState];
        newState[contentIndex].value = value;
        return newState;
      });
    }
  };

  const handleOnHoverChange = (hoveredElement: string, isTop: boolean) => {
    setHoveredElement([hoveredElement, isTop]);
  };

  const handleOnReorder = (thisId: string, thatId: string, top: boolean) => {
    const thisContentIndex = content.findIndex(item => item.id === thisId);
    const thisContent = content[thisContentIndex];
    const thatContentIndex = content.findIndex(item => item.id === thatId);
    if (top && thatContentIndex !== -1 && thisContentIndex !== -1) {
      setContent(prevState => {
        const newState = [...prevState];
        newState.splice(thisContentIndex, 1);
        newState.splice(
          thatContentIndex < thisContentIndex
            ? thatContentIndex
            : thatContentIndex - 1,
          0,
          thisContent
        );
        return newState;
      });
    } else if (!top && thatContentIndex !== -1 && thisContentIndex !== -1) {
      setContent(prevState => {
        const newState = [...prevState];
        newState.splice(thisContentIndex, 1);
        newState.splice(
          thatContentIndex < thisContentIndex
            ? thatContentIndex + 1
            : thatContentIndex,
          0,
          thisContent
        );
        return newState;
      });
    }

    handleOnHoverChange('', false);
  };

  const handleSave = async () => {
    setIsPublishing(true);

    if (content) {
      const newData: Props['data'] = {
        ...data,
        content,
      };
      if (id === 'new') {
        delete newData.id;
        newData.created_at = new Date().toDateString();
      }

      const { error } = await DB.put(
        tid as any,
        newData,
        id === 'new' ? undefined : id
      );

      if (!error) {
        setIsPublishing(false);
      }
    }
  };

  const handleCancel = () => {
    router.push(`/edit/${tid}/${id}`);
  };

  const handleAddElement = (element: RecordType, index: number) => {
    setContent(prevState => {
      const newState = [...prevState];
      newState.splice(index, 0, element);
      return newState;
    });
  };

  return (
    <>
      <FormButtons
        onCancelClick={handleCancel}
        onSaveClick={handleSave}
        disabledSave={isPublishing}
        saveLabel={isPublishing ? 'Publishing...' : 'Publish'}
        cancelLabel='Close'
        flexDir='row-reverse'
      />
      <Box d='flex' flexDir='row' flex='1'>
        <ElementsAside onAddElement={handleAddElement} />
        <Box d='flex' flexDir='column' flex='1'>
          <Box
            border='1'
            borderColor='red'
            flex='1'
            height='full'
            {...(SiteConfig?.styles.body ?? {})}
          >
            <Nav
              menu={SiteConfig?.menu ?? []}
              style={SiteConfig?.styles.nav ?? {}}
            />
            {content.map(item => {
              switch (item.type) {
                case 'textarea': {
                  return (
                    <Editor
                      item={item}
                      styles={{ ...(SiteConfig?.styles.content ?? {}) }}
                      onChange={handleOnChangeEditor}
                      onHoverChange={handleOnHoverChange}
                      hoveredElement={hoveredElement}
                      onReorder={handleOnReorder}
                    />
                  );
                }
                case 'carousel': {
                  return (
                    <Carousel {...(item.value as unknown as CarouselProps)} />
                  );
                }
                case 'innerSection': {
                  return (
                    <InnerSection
                      key={item.id}
                      {...(item as InnerSectionType)}
                      onChange={handleOnChange(item.id)}
                      onHoverChange={handleOnHoverChange}
                      hoveredElement={hoveredElement}
                      onReorder={handleOnReorder}
                    />
                  );
                }
                default: {
                  return <>{item.type}</>;
                }
              }
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PreviewEditor;

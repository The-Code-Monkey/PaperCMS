'use client';

import { Box, Carousel, CarouselProps } from '@techstack/components';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

import { DefaultRecordType, RecordType } from '../../app/utils';
import FormButtons from '../FormButtons';
import useDB from '../../db';

import { SiteThemeContext } from './context';
import Nav from './components/Nav';
import Editor from './fields/Editor';

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

  const contentIndex = fields.findIndex(
    field => field.column_name === 'content'
  );

  const [content, setContent] = useState<Array<DefaultRecordType>>(
    (contentIndex !== -1 ? data.content : []) as Array<DefaultRecordType>
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

  const handleSave = async () => {
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
        data,
        id === 'new' ? undefined : id
      );

      if (!error) {
        router.push(`/list/${tid}`);
      }
    }
  };

  const handleCancel = () => {
    router.push(`/list/${tid}`);
  };

  return (
    <>
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
                  />
                );
              }
              case 'carousel': {
                return (
                  <Carousel {...(item.value as unknown as CarouselProps)} />
                );
              }
              default: {
                return null;
              }
            }
          })}
        </Box>
      </Box>
      <FormButtons onCancelClick={handleCancel} onSaveClick={handleSave} />
    </>
  );
};

export default PreviewEditor;

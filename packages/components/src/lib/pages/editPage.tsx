import { useDB, RecordType } from '@nucleus-cms/utils';
import { Box, Input } from '@techstack/components';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

import { ContentBuilder, FormButtons, Header } from '../components';

import { formatFieldNames, getFieldType } from './pageUtils';
import { StyledMain } from './styled';

interface Props {
  data: Record<string, Array<RecordType>>;
  fields: Array<Record<string, string>>;
  tid: string;
  id: string;
}

const EditForm = ({ data, tid, id, fields }: Props) => {
  const router = useRouter();
  const DB = useDB();

  const [formData, setFormData] = useState<Record<
    string,
    string | Array<RecordType>
  > | null>(null);

  const handleFieldUpdate = (e: ChangeEvent<HTMLInputElement> | boolean) => {
    if (typeof e === 'boolean') {
    } else {
      setFormData(prevState => {
        const newState = { ...prevState };
        newState[e.target.name] = e.target.value;
        return newState;
      });
    }
  };

  const handleContentUpdate = (value: Array<RecordType>) => {
    setFormData(prevState => {
      const newState = { ...prevState };
      newState.content = value;
      return newState;
    });
  };

  const handleCancel = () => {
    router.push(`/list/${tid}`);
  };

  const handleSave = async () => {
    if (formData) {
      const data = { ...formData };
      if (id === 'new') {
        delete data.id;
        data.created_at = new Date().toDateString();

        await DB.put('menu', {
          title: data.title,
          link: data.link as string,
          created_at: data.created_at,
        });
      }

      const { error } = await DB.put(tid, data, id === 'new' ? undefined : id);

      if (!error) {
        router.push(`/list/${tid}`);
      }
    }
  };

  useEffect(() => {
    setFormData(data);
  }, [data]);

  console.log(fields, data, formData);

  return (
    <StyledMain>
      <Header tid={tid} id={id} />
      <Box<'form'>
        as='form'
        textAlign='left'
        flex='1'
        bg='neutrals.5'
        overflowY='auto'
      >
        <Box d='flex' flex='1' gap='6' flexDir='column'>
          {formData &&
            fields.map(field => {
              const type = getFieldType(field.data_type);
              const name = field.column_name;

              console.log(type, formData[name]);

              if (type === 'object' && !Array.isArray(formData[name]))
                return null;

              return type === 'object' ? (
                <ContentBuilder
                  content={formData[name] as Array<RecordType>}
                  onChange={handleContentUpdate}
                  tid={tid}
                  title={
                    tid === 'page' ? (formData['title'] as string) : undefined
                  }
                />
              ) : (
                <Box<'label'> key={name} as='label'>
                  {formatFieldNames(name)}
                  <Input
                    name={name}
                    defaultValue={formData[name] as string}
                    onChange={handleFieldUpdate}
                    type={type}
                    disabled={name === 'id' || name === 'created_at'}
                    mt='2'
                    required
                  />
                </Box>
              );
            })}
        </Box>
      </Box>
      <FormButtons onCancelClick={handleCancel} onSaveClick={handleSave} />
    </StyledMain>
  );
};

export default EditForm;

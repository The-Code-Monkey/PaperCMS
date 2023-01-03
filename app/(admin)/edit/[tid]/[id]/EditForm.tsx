'use client';

import { Box, Input } from '@techstack/components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { formatFieldNames, getFieldType, RecordType } from '../../../../utils';
import ContentBuilder from '../../../../../components/ContentBuilder';
import FormButtons from '../../../../../components/FormButtons';
import useDB from '../../../../../db';

interface Props {
  data: Record<string, string>;
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

  const handleFieldUpdate = (e: any) => {
    setFormData(prevState => {
      const newState = { ...prevState };
      newState[e.target.name] = e.target.value;
      return newState;
    });
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

  useEffect(() => {
    setFormData(data);
  }, [data]);

  return (
    <>
      <Box<'form'>
        as='form'
        textAlign='left'
        flex='1'
        d='flex'
        gap='6'
        flexDirection='column'
        bg='neutrals.5'
      >
        {formData &&
          fields.map(field => {
            const type = getFieldType(field.data_type);
            const name = field.column_name;

            return (
              <Box<'label'> key={name} as='label'>
                {type === 'object' ? (
                  <ContentBuilder
                    content={formData[name] as Array<RecordType>}
                    onChange={handleContentUpdate}
                  />
                ) : (
                  <>
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
                  </>
                )}
              </Box>
            );
          })}
      </Box>
      <FormButtons onCancelClick={handleCancel} onSaveClick={handleSave} />
    </>
  );
};

export default EditForm;

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
  tid: string;
  id: string;
}

const EditForm = ({ data, tid, id }: Props) => {
  const router = useRouter();
  const DB = useDB<Record<string, string>>();

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
      const { error } = await DB.put(tid as any, formData, id);

      if (!error) {
        router.push(`/list/${tid}`);
      }
    }
  };

  useEffect(() => {
    if (formData === null) {
      setFormData(data);
    }
  }, [data, formData]);

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
          Object.keys(data ?? {}).map(field => {
            const type = getFieldType(formData[field]);

            return (
              <Box<'label'> key={field} as='label'>
                {type === 'object' ? (
                  <ContentBuilder
                    content={formData[field] as Array<RecordType>}
                    onChange={handleContentUpdate}
                  />
                ) : (
                  <>
                    {formatFieldNames(field)}
                    <Input
                      name={field}
                      defaultValue={formData[field] as string}
                      onChange={handleFieldUpdate}
                      type={type}
                      disabled={field === 'id' || field === 'created_at'}
                      mt='2'
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

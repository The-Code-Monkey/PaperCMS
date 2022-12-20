'use client';

import { Box, Input } from '@techstack/components';
import { useEffect, useState } from 'react';

import { getFieldType, RecordType } from '../../../../utils';
import ContentBuilder from '../../../../../components/ContentBuilder';

interface Props {
  data: Record<string, string>;
}

const EditForm = ({ data }: Props) => {
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
      console.log(newState);
      return newState;
    });
  };

  useEffect(() => {
    if (formData === null) {
      setFormData(data);
    }
  }, [data, formData]);

  return (
    <Box<'form'>
      as='form'
      textAlign='left'
      flex='1'
      d='flex'
      gap='6'
      flexDirection='column'
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
                <Input
                  name={field}
                  defaultValue={formData[field] as string}
                  onChange={handleFieldUpdate}
                  type={type}
                  disabled={field === 'id' || field === 'created_at'}
                  mt='2'
                />
              )}
            </Box>
          );
        })}
    </Box>
  );
};

export default EditForm;

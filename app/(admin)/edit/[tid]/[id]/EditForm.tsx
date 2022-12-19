'use client';

import { Box, Input } from '@techstack/components';
import { useEffect, useState } from 'react';

import { formatFieldNames } from '../../../../utils';

interface Props {
  data: Record<string, string>;
}

const getFieldType = (fieldType: string): 'text' | 'textarea' => {
  switch (fieldType) {
    case 'object': {
      return 'textarea';
    }
    default: {
      return 'text';
    }
  }
};

const EditForm = ({ data }: Props) => {
  const [formData, setFormData] = useState<Record<string, string>>(null);

  const handleFieldUpdate = (e: any) => {
    console.log(e.target.name, e.target.value);
    setFormData(prevState => {
      const newState = { ...prevState };
      newState[e.target.name] = e.target.value;
      console.log(newState);
      return newState;
    });
  };

  useEffect(() => {
    if (formData === null) {
      console.log('HERE');
      setFormData(data);
    }
  }, [data, formData]);

  useEffect(() => {
    console.log('formData', formData);
  }, [formData]);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

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
          console.log(formData[field]);
          return (
            <Box<'label'> key={field} as='label'>
              {formatFieldNames(field)}
              <Input
                name={field}
                // @ts-ignore
                defaultValue={formData[field]}
                onChange={handleFieldUpdate}
                type={getFieldType(typeof formData[field])}
                mt='2'
              />
            </Box>
          );
        })}
    </Box>
  );
};

export default EditForm;

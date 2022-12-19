'use client';

import { Box, Input } from '@techstack/components';
import { useEffect, useState } from 'react';
import moment from 'moment';

import { formatFieldNames } from '../../../../utils';

interface Props {
  data: Record<string, string>;
}

const getFieldType = (
  value: string | number | Record<string, unknown> | Array<unknown>
): 'text' | 'textarea' | 'number' | 'object' | 'select' | 'date' => {
  switch (true) {
    case Array.isArray(value): {
      return 'select';
    }
    case !Number.isNaN(parseInt(value as string, 10)) &&
      !`${value}`.includes('+'): {
      return 'number';
    }
    case typeof value === 'object': {
      return 'object';
    }
    case moment(value as string).isValid(): {
      return 'date';
    }
    case typeof value === 'string' && value.length >= 300: {
      return 'textarea';
    }
    default: {
      return 'text';
    }
  }
};

const EditForm = ({ data }: Props) => {
  const [formData, setFormData] = useState<Record<string, string> | null>(null);

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
                type={getFieldType(formData[field]) as any}
                disabled={field === 'id' || field === 'created_at'}
                mt='2'
              />
            </Box>
          );
        })}
    </Box>
  );
};

export default EditForm;

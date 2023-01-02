export const capitalizeFirstLetter = ([first, ...rest]: any) =>
  (first === undefined ? '' : first.toUpperCase()) +
  rest
    .join('')
    .split('-')
    .map((str: string, i: number) => {
      if (i === 0) return str;
      return capitalizeFirstLetter(str);
    })
    .join(' ');

export const formatFieldNames = (value: string) => {
  if (value === 'id') return 'ID';

  return value
    .split('_')
    .map(str => capitalizeFirstLetter(str))
    .join(' ');
};

export const getFieldType = (
  value: string
): 'text' | 'textarea' | 'number' | 'object' | 'date' | 'checkbox' => {
  switch (value) {
    case 'int':
    case 'bigint': {
      return 'number';
    }
    case 'json': {
      // if (Array.isArray(value)) {
      //   return 'array';
      // }
      return 'object';
    }
    case 'varchar': {
      return 'textarea';
    }
    // case 'timestamp with time zone': {
    //   return 'time';
    // }
    case 'date': {
      return 'date';
    }
    case 'bool': {
      return 'checkbox';
    }
    default: {
      return 'text';
    }
  }
};

export type RecordType = {
  id: string;
  type?: string;
  value?: string;
  order: number;
};

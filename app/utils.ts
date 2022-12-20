export const capitalizeFirstLetter = ([first, ...rest]: any) =>
  first === undefined ? '' : first.toUpperCase() + rest.join('');

export const formatFieldNames = (value: string) => {
  if (value === 'id') return 'ID';

  return value
    .split('_')
    .map(str => capitalizeFirstLetter(str))
    .join(' ');
};

export const getFieldType = (
  value: string | number | Record<string, unknown> | Array<unknown>
): 'text' | 'textarea' | 'number' | 'object' | 'date' => {
  switch (true) {
    case !Number.isNaN(parseInt(value as string, 10)) &&
      !`${value}`.includes('+'): {
      return 'number';
    }
    case typeof value === 'object': {
      return 'object';
    }
    // case Array.isArray(value): {
    //   return 'select';
    // }
    case typeof value === 'string' && value.length >= 300: {
      return 'textarea';
    }
    default: {
      return 'text';
    }
  }
};

export type RecordType = {
  id: string;
  type: string;
  value: string;
  order: number;
};
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

export const capitalizeFirstLetter = ([first, ...r]: string) => {
  const rest = r as unknown as string;

  return (
    (first === undefined ? '' : first.toUpperCase()) +
    (rest.length === 0
      ? ''
      : rest
          .split(/(?=[A-Z])/g)
          .map((str: string, i: number) => {
            if (i === 0) return str;
            return capitalizeFirstLetter(str);
          })
          .join(' '))
  );
};

export const formatFieldNames = (value: string) => {
  if (value === 'id') return 'ID';

  return value
    .split('_')
    .map(str => capitalizeFirstLetter(str))
    .join(' ');
};

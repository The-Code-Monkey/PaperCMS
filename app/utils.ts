export const capitalizeFirstLetter = ([first, ...rest]: any) =>
  first === undefined ? '' : first.toUpperCase() + rest.join('');

export const formatFieldNames = (value: string) => {
  if (value === 'id') return 'ID';

  return value
    .split('_')
    .map(str => capitalizeFirstLetter(str))
    .join(' ');
};

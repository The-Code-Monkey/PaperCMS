import { RecordType, ImageRecordType } from '@nucleus-cms/utils';

export type NavItemType = {
  id: number;
  parent: number;
  droppable: boolean;
  text: string;

  link: string;
};

export const isImageRecordType = (
  record: RecordType
): record is ImageRecordType =>
  (record as ImageRecordType).type === 'image' ||
  (record as ImageRecordType).type === 'image-text';

export type CarouselRecordType = {
  id: string;
  order: number;
  type: 'carousel';
  value: {
    images?: Array<string>;
    titles?: Array<string>;
    singleTitle: boolean;
    autoPlay: boolean;
    blur?: string;
    shadow?: string;
    showArrows: boolean;
    showIndicators: boolean;
    showStatus: boolean;
    showThumbs: boolean;
    height: string | number;
  };
};

export type DefaultRecordType = {
  id: string;
  type?: string;
  value?: string;
  order: number;
};

export type InnerSectionType = {
  id: string;
  order: number;
  type: 'inner-section';
  value?: Array<RecordType>;
};

export type ImageRecordType = {
  id?: string;
  type?: 'image' | 'image-text';
  value?: Record<string, unknown>;
  order?: number;
  url?: string | Array<string>;
};

export const isImageRecordType = (
  record: RecordType
): record is ImageRecordType =>
  (record as ImageRecordType).type === 'image' ||
  (record as ImageRecordType).type === 'image-text';

export type RecordType =
  | DefaultRecordType
  | ImageRecordType
  | CarouselRecordType
  | InnerSectionType;

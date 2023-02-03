import { CSSProperties, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import { EditorWrapper } from '../styled';
import useOnClickOutside from '../../../utils/useOnClickOutside';
import { DefaultRecordType } from '../../../app/utils';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default),
  { ssr: false }
);

const MDViewer = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default.Markdown),
  { ssr: false }
);

interface Props {
  item: DefaultRecordType;
  styles: Record<string, string>;
  onChange: (index: string, value: string) => void;
}
const Editor = ({ item, styles, onChange }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const clickOutsideRef = useRef(null);

  useOnClickOutside(clickOutsideRef, () => setIsEditing(false));

  const handleOnChange = (index: string) => (value: any) => {
    onChange(index, value);
  };

  if (isEditing) {
    return (
      <div ref={clickOutsideRef}>
        <MDEditor
          value={item.value as string}
          onChange={handleOnChange(item.id)}
          preview='edit'
        />
      </div>
    );
  }
  return (
    <EditorWrapper {...(styles ?? {})} onClick={() => setIsEditing(true)}>
      <MDViewer source={item.value as string} />
    </EditorWrapper>
  );
};

export default Editor;

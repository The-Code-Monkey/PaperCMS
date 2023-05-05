import { PreviewEditor } from '../components';

import { StyledMain } from './styled';

const editorPage = ({ fieldData, tid, id, data }) => {
  return (
    <StyledMain>
      <PreviewEditor
        fields={fieldData ?? []}
        tid={tid}
        id={id}
        data={id === 'new' ? {} : data?.[0] ?? {}}
      />
    </StyledMain>
  );
};

export default editorPage;

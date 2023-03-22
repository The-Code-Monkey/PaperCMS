import {StyledMain} from "./styled";
import {PreviewEditor} from "../components";

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
  )
}

export default editorPage;

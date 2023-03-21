import { Header, ListTable } from '../components';

import { StyledMain } from './styled';

interface Props {
  id: string;
  fieldData: Record<string, string>[];
  data: Record<string, string>[];
}

const ListPage = ({ id, data, fieldData }: Props) => {
  return (
    <StyledMain>
      <Header id={id} />
      <ListTable data={data} id={id} fieldData={fieldData} />
    </StyledMain>
  );
};

export default ListPage;

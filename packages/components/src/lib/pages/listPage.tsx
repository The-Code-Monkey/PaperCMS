import { Header, ListTable } from '../components';

import { StyledMain } from './styled';

interface Props {
  tid: string;
  fieldData: Record<string, string>[];
  data: Record<string, string>[];
}

const ListPage = ({ tid, data, fieldData }: Props) => {
  return (
    <StyledMain>
      <Header tid={tid} />
      <ListTable data={data} tid={tid} fieldData={fieldData} />
    </StyledMain>
  );
};

export default ListPage;

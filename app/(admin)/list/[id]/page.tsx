import { PageProps } from '../../../../utils/pageTypes';
import { StyledMain } from '../../styled';
import useDB from '../../../../db';

import ListTable from './ListTable';
import Header from './Header';

const List = async ({ params }: PageProps) => {
  const { id } = params ?? {};
  const DB = useDB();
  const { data } = await DB.get<Record<string, string>[]>(id as any);

  return (
    <StyledMain>
      <Header id={id} />
      <ListTable data={data} id={id} />
    </StyledMain>
  );
};

export default List;

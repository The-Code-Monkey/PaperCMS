import { PageProps } from '../../../../utils/pageTypes';
import useDB from '../../../../db';

import ListTable from './ListTable';

const List = async ({ params }: PageProps) => {
  const { id } = params ?? {};
  const DB = useDB();
  const { data } = await DB.get(id as any);

  return <ListTable data={data} id={id} />;
};

export default List;

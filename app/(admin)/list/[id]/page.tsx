import { PageProps } from '../../../../utils/pageTypes';
import useDB from '../../../../db';

import ListTable from './ListTable';

const List = async ({ params }: PageProps) => {
  const DB = useDB();
  const { data } = await DB.get(params?.id ?? ('' as any));

  return (
    <div>
      <ListTable data={data} id={params?.id ?? null} />
    </div>
  );
};

export default List;

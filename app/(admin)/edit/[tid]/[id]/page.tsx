import { PageProps } from '../../../../../utils/pageTypes';
import useDB from '../../../../../db';

import EditForm from './EditForm';
import Header from './Header';

const Edit = async ({ params }: PageProps) => {
  const { tid, id } = params ?? {};

  const DB = useDB<Record<string, string>>();
  const { data } = await DB.get(tid as any, ['id', id]);

  console.log(data?.[0]);

  return (
    <div>
      <Header tid={tid} id={id} />
      <EditForm data={data?.[0] ?? {}} />
    </div>
  );
};

export default Edit;

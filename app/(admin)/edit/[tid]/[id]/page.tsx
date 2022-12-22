import { PageProps } from '../../../../../utils/pageTypes';
import useDB from '../../../../../db';

import EditForm from './EditForm';
import Header from './Header';

const Edit = async ({ params }: PageProps) => {
  const { tid, id } = params ?? {};

  const DB = useDB<Record<string, string>>();
  const { data } = await DB.get(tid as any, ['id', id]);

  return (
    <>
      <Header tid={tid} id={id} />
      <EditForm tid={tid} id={id} data={data?.[0] ?? {}} />
    </>
  );
};

export default Edit;

import { Suspense } from 'react';

import { PageProps } from '../../../../../utils/pageTypes';
import useDB from '../../../../../db';
import { StyledMain } from '../../../styled';

import EditForm from './EditForm';
import Header from './Header';

const Edit = async ({ params }: PageProps) => {
  const { tid, id } = params ?? {};

  const DB = useDB<Record<string, string>>();

  const { data: fieldData } = await DB.dbFunction('get_table_fields', {
    name: tid,
  });

  const { data } = await DB.get(tid as any, {
    where: ['id', id],
  });

  console.log(fieldData);

  return (
    <Suspense>
      <StyledMain>
        <Header tid={tid} id={id} />
        <EditForm
          tid={tid}
          id={id}
          data={id === 'new' ? {} : data?.[0] ?? {}}
          fields={[fieldData] as any}
        />
      </StyledMain>
    </Suspense>
  );
};

export default Edit;

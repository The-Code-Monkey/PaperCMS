import { Suspense } from 'react';

import { PageProps } from '../../../../../utils/pageTypes';
import useDB from '../../../../../db';
import { StyledMain } from '../../../styled';

import EditForm from './EditForm';
import Header from './Header';

const Edit = async ({ params }: PageProps) => {
  const { tid, id } = params ?? {};

  const DB = useDB();

  const { data: fieldData } = await DB.dbFunction<Record<string, string>[]>(
    'get_table_fields',
    {
      name: tid,
    }
  );

  const { data } = await DB.get<Record<string, string>[]>(tid as any, {
    where: ['id', id],
  });

  return (
    <Suspense>
      <StyledMain>
        <Header tid={tid} id={id} />
        <EditForm
          tid={tid}
          id={id}
          data={id === 'new' ? {} : data?.[0] ?? {}}
          fields={fieldData ?? []}
        />
      </StyledMain>
    </Suspense>
  );
};

export default Edit;

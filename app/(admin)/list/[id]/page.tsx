import { Suspense } from 'react';

import { PageProps } from '../../../../utils/pageTypes';
import useDB from '../../../../db';
import { StyledMain } from '../../styled';

import ListTable from './ListTable';
import Header from './Header';

const List = async ({ params }: PageProps) => {
  const { id } = params ?? {};
  const DB = useDB<Record<string, unknown>>();
  const { data } = await DB.get(id as any);

  return (
    <Suspense>
      <StyledMain>
        <Header id={id} />
        <ListTable data={data} id={id} />
      </StyledMain>
    </Suspense>
  );
};

export default List;

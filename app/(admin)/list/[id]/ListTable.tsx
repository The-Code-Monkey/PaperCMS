'use client';

import { use } from 'react';
import { Box, Table } from '@techstack/components';

import useDB from '../../../../db';
import { PageParams } from '../../../../utils/pageTypes';

interface Props {
  params: PageParams;
}

const ListTable = ({ params }: Props) => {
  console.log(params.id);

  const id = params.id;

  const DB = useDB();

  const getData = async (): Promise<Record<string, unknown>[] | null> => {
    const { data } = await DB.get(id as any);

    return data;
  };

  const data = use(getData());

  return (
    <Box>
      Table {id}
      {data && <Table data={data} columns={Object.keys(data[0])} />}
    </Box>
  );
};

export default ListTable;

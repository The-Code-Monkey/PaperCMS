'use client';

import { Box, Table } from '@techstack/components';

interface Props {
  data: Record<string, unknown>[] | null;
  id: string | null;
}

const ListTable = ({ data, id }: Props) => {

  const columns = Object.keys(data?.[0] ?? {});

  columns.push('edit');

  return (
    <Box>
      Table {id}
      {data && <Table data={data} columns={columns} />}
    </Box>
  );
};

export default ListTable;

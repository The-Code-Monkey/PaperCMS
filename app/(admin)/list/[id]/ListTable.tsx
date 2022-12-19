'use client';

import { Box, Button, Table } from '@techstack/components';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  data: Record<string, unknown>[] | null;
  id: string | null;
}

const ListTable = ({ data, id }: Props) => {
  const router = useRouter();

  const columns = [...Object.keys(data?.[0] ?? {}), 'edit'];

  const handleEditClick = useCallback(
    (rid: string) => {
      router.push(`/edit/${id}/${parseInt(rid, 10) + 1}`);
    },
    [router, id]
  );

  return (
    <Box>
      Table {id}
      {data && (
        <Table data={data} columns={columns} onEditClick={handleEditClick} />
      )}
    </Box>
  );
};

export default ListTable;

'use client';

import { Box, Table } from '@techstack/components';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  data: Record<string, unknown>[] | null;
  id: string | null;
}

const ListTable = ({ data, id }: Props) => {
  const router = useRouter();
  const [columns] = useState(() => {
    const newState = [...Object.keys(data?.[0] ?? {}), 'edit'];

    const contentIndex = newState.findIndex(item => item === 'content');
    if (contentIndex !== -1) newState.splice(contentIndex, 1);
    return newState;
  });

  const handleEditClick = useCallback(
    (rid: string) => {
      router.push(`/edit/${id}/${parseInt(rid, 10) + 1}`);
    },
    [router, id]
  );

  return (
    <Box p='1em' bg='neutrals.5' flex='1'>
      {data && (
        <Table data={data} columns={columns} onEditClick={handleEditClick} />
      )}
    </Box>
  );
};

export default ListTable;

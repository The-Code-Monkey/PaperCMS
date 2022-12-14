'use client';

import { Box, Table } from '@techstack/components';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import useDB from '../../../../db';

interface Props {
  data: Record<string, string>[] | null;
  id: string | null;
}

const ListTable = ({ data, id }: Props) => {
  const router = useRouter();
  const DB = useDB();
  const [columns] = useState(() => {
    const newState = [...Object.keys(data?.[0] ?? {})];

    if (id === 'code') {
      newState.push('delete');
    } else {
      newState.push('edit-delete');
    }

    const contentIndex = newState.findIndex(item => item === 'content');
    if (contentIndex !== -1) newState.splice(contentIndex, 1);
    return newState;
  });

  const handleEditClick = useCallback(
    (row: Record<string, unknown>) => {
      if (row.id) {
        router.push(`/edit/${id}/${row.id}`);
      }
    },
    [router, id]
  );

  const handleDeleteClick = useCallback(
    async (row: Record<string, unknown>) => {
      const { error } = await DB.remove(id as any, row.id as string);

      if (!error) {
        router.refresh();
      }
    },
    [DB, id, router]
  );

  if (!data) return null;

  return (
    <Box p='1em'>
      <Table
        data={data}
        columns={columns}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
    </Box>
  );
};

export default ListTable;

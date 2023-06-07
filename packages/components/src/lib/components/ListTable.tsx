import { useDB } from '@nucleus-cms/db';
import { Box, Table } from '@techstack/components';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

interface Props {
  data: Record<string, string>[] | null;
  tid: string | null;
  fieldData: Record<string, string>[] | null;
}

const ListTable = ({ data, tid, fieldData }: Props) => {
  const router = useRouter();
  const DB = useDB();
  // const [columns] = useState(() => {
  //   const newState = [...Object.keys(data?.[0] ?? {})];
  //
  //   if (id === 'code') {
  //     newState.push('delete');
  //   } else {
  //     newState.push('edit-delete');
  //   }
  //
  //   const contentIndex = newState.findIndex(item => item === 'content');
  //   if (contentIndex !== -1) newState.splice(contentIndex, 1);
  //   return newState;
  // });

  const handleEditClick = useCallback(
    (row: Record<string, unknown>) => {
      if (row['id']) {
        router.push(`/edit/${tid}/${row['id']}`);
      }
    },
    [router, tid]
  );

  const handleDeleteClick = useCallback(
    async (row: Record<string, unknown>) => {
      const { error } = await DB.remove(tid, row['id'] as string);

      if (!error) {
        router.refresh();
      }
    },
    [DB, tid, router]
  );

  const columns: Array<string> = useMemo(() => {
    const result = (fieldData ?? []).map(field => field['column_name']);

    if ((data?.length ?? 0) > 0) {
      if (tid === 'code') {
        result.push('delete');
      } else {
        result.push('edit-delete');
      }
    }

    const contentIndex = result.findIndex(item => item === 'content');
    if (contentIndex !== -1) result.splice(contentIndex, 1);
    const metaIndex = result.findIndex(item => item === 'meta');
    if (metaIndex !== -1) result.splice(metaIndex, 1);

    return result;
  }, [data?.length, fieldData, tid]);

  const dataFallback = useMemo(
    () => [
      columns
        .filter(column => column !== 'edit' && column !== 'edit-delete')
        .map(column => ({ key: column }))
        .reduce(
          (obj: Record<string, unknown>, item) => (
            (obj[item.key] = 'empty'), obj
          ),
          {}
        ),
    ],
    [columns]
  );

  if (!data) return null;

  return (
    <Box p='1em'>
      <Table
        data={data.length === 0 ? dataFallback : data}
        columns={columns}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
    </Box>
  );
};

export default ListTable;

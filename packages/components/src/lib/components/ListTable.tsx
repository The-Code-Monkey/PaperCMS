import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Box, Table } from '@techstack/components';
import { useDB } from '../utils';

interface Props {
  data: Record<string, string>[] | null;
  id: string | null;
  fieldData: Record<string, string>[] | null;
}

const ListTable = ({ data, id, fieldData }: Props) => {
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

  const columns: Array<string> = useMemo(() => {
    const result = (fieldData ?? []).map(field => field.column_name);

    if ((data?.length ?? 0) > 0) {
      if (id === 'code') {
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
  }, [data?.length, fieldData, id]);

  const dataFallback = useMemo(
    () => [
      columns
        .filter(column => column !== 'edit' && column !== 'edit-delete')
        .map(column => ({ key: column }))
        .reduce(
          (obj: Record<string, any>, item) => ((obj[item.key] = 'empty'), obj),
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
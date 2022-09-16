import { Box, Table } from '@techstack/components';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';

import AdminLayout from '../../layouts/Admin';
import DB from '../../db';
import supabase from '../../db/supabase';

interface Props {
  data: Array<any>;
  error: null | string;
}

const List = ({ data, error }: Props) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Box w='full'>
      This is a list for {id}
      <Table columns={Object.keys(data[0])} data={data} />
    </Box>
  );
};

List.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default List;

export const getServerSideProps: GetServerSideProps<
  {},
  { id: string }
> = async context => {
  const id = context.params?.id ?? 'null';

  const { data, error } = await DB().then(db => db.get(id))

  return {
    props: {
      data,
      error,
    },
  };
};

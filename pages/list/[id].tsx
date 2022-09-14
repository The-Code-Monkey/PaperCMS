import { Box, Table } from '@techstack/components';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';

import AdminLayout from '../../layouts/Admin';
import supabase from '../../db/supabase';

interface Props {
  data: Array<any>;
  error: null | string;
}

const List = ({ data, error }: Props) => {
  const router = useRouter();
  const { id } = router.query;

  console.log(Object.keys(data[0]), error);

  return (
    <Box>
      This is a list for {id}
      {/*// @ts-ignore*/}
      <Table
        columns={Object.keys(data[0]).map(key => ({
          Header: key,
          accessor: key,
        }))}
        data={data}
      />
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

  const { data, error } = await supabase.from(id).select('*');

  return {
    props: {
      data,
      error,
    }, // will be passed to the page component as props
  };
};

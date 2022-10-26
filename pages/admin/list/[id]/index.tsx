import { Box, Table } from '@techstack/components';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import useDB from '../../../../db';

const List = () => {
  // const params = useSearchParams()
  // const id = params.get('id')!;
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<null | Array<any>>();
  const DB = useDB();

  useEffect(() => {
    const getData = async () => {
      const { data } = await DB.get(id as string);

      setData(data);
    };

    if (id) {
      getData();
    }
  }, [id, DB]);

  return (
    <Box w='full'>
      This is a list for {id}
      {data && <Table columns={Object.keys(data[0])} data={data} />}
    </Box>
  );
};

export default List;

'use client'

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import useDB from "../../../../db";

const ListTable = () => {
  const params = useSearchParams()
  const id = params.get('id')!;

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
    <div>
      Table {id}
      {data}
    </div>
  )
}

export default ListTable
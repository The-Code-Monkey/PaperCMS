'use client'

import {useSearchParams} from "next/navigation";
import { use, useEffect, useState} from "react";
import useDB from "../../../../db";
import {Box, Table} from "@techstack/components";

interface Props {
  params: Record<string, string>
}

const ListTable = ({ params }: Props) => {
  console.log(params.id)

  const id = params.id;

  const DB = useDB();

  const getData = async (): Promise<Record<string, unknown>[] | null> => {
    const { data } = await DB.get(id);

    console.log(data)

    return data;
  };

  const data = use(getData());

  return (
    <Box>
      Table {id}
      {data && <Table data={data} columns={Object.keys(data[0])} />}
    </Box>
  )
}

export default ListTable
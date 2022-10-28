'use client'

import {Box} from "@techstack/components";
import ListTable from "./ListTable";

interface Props {
  params: Record<string, string>
}

const List = ({ params }: Props) => {
  return (
    <Box w="screenWidth">
      <ListTable params={params} />
    </Box>
  );
};

export default List;

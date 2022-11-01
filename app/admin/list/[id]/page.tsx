'use client'

import {Box} from "@techstack/components";
import ListTable from "./ListTable";
import {PageProps} from "../../../../utils/pageTypes";

const List = ({ params }: PageProps) => {
  return (
    <Box w="screenWidth">
      <ListTable params={params ?? {}} />
    </Box>
  );
};

export default List;

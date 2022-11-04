'use client';

import { Box } from '@techstack/components';

import { PageProps } from '../../../../utils/pageTypes';

import ListTable from './ListTable';

const List = ({ params }: PageProps) => {
  return (
    <Box w='screenWidth'>
      <ListTable params={params ?? {}} />
    </Box>
  );
};

export default List;

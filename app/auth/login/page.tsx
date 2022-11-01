'use client'

import {Box} from "@techstack/components";
import Form from './Form';

const Page = () => {
  return (
    <Box
      w={['3/4', '3/4', '1/2', '1/2']}
      d='flex'
      placeContent='center'
      mx='auto'
      flex='1'
      h='full'
    >
      <Form />
    </Box>
  );
};

export default Page;

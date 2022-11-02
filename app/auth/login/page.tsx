'use client'

import Form from './Form';
import {Box} from "@techstack/components";

const Page = () => {
  return (
    <Box
      w={['3/4', '3/4', '1/2', '1/2']}
      d='flex'
      alignItems="center"
      justifyContent="center"
      mx='auto'
      flex='1'
      h='full'
    >
      <Form />
    </Box>
  );
};

export default Page;

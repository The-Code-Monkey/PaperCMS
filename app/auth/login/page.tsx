import { StyledMain } from '../../(admin)/styled';

import Form from './Form';

const Page = () => {
  return (
    <StyledMain
      w={['3/4', '3/4', '1/2', '1/2']}
      justifyContent='center'
      alignItems='center'
    >
      <Form />
    </StyledMain>
  );
};

export default Page;

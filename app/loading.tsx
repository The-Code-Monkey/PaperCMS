import { StyledLoader } from './styled';
import { StyledMain } from './(admin)/styled';

const Loading = () => {
  return (
    <StyledMain justifyContent='center' alignItems='center'>
      <StyledLoader />
    </StyledMain>
  );
};

export default Loading;

import { StyledMain } from './(admin)/styled';
import { StyledLoader } from './styled';

const Loading = () => {
  return (
    <StyledMain justifyContent='center' alignItems='center'>
      <StyledLoader />
    </StyledMain>
  );
};

export default Loading;

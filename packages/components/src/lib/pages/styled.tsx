import { Box, BoxProps } from '@techstack/components';
import { ReactNode } from 'react';

interface StyledMainProps extends BoxProps {
  children: ReactNode;
}

export const StyledMain = ({ children, ...rest }: StyledMainProps) => (
  <Box<'main'>
    d='flex'
    flex='1'
    p='0'
    m='0'
    w='w-16'
    flexDir='column'
    {...rest}
  >
    {children}
  </Box>
);

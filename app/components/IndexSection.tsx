import type { HTMLAttributes, PropsWithChildren } from 'react';
import type { DefaultProps } from '@mantine/core';
import { Box } from '@mantine/core';

interface IndexSectionProps
  extends HTMLAttributes<HTMLDivElement>,
    DefaultProps {
  id: string;
}

export const IndexSection = ({
  id,
  children,
  ...rest
}: PropsWithChildren<IndexSectionProps>) => {
  return (
    <Box id={id} {...rest}>
      {children}
    </Box>
  );
};

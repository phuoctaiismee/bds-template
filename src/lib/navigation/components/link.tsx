import { default as NextLink } from 'next/link';
import React, { FC } from 'react';

type LinkProps = React.ComponentProps<typeof NextLink>;

const Link: FC<LinkProps> = (props) => {
  return <NextLink {...props} />;
};

export default Link;

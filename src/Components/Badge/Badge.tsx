import React from 'react';
import { BadgeProps } from './Badge.type';
import { StyledBadge } from './Badge.style';


export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'danger',
  shape = 'rounded',
  ...rest
}) => {
  return (
    <StyledBadge variant={variant} shape={shape} {...rest}>
      {children}
    </StyledBadge>
  );
};

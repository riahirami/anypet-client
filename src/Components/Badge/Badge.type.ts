
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    variant?: 'info' | 'success' | 'warning' | 'danger';
    shape?: 'circle' | 'rounded';
  }
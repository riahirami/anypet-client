export interface SnackbarProps {
    title: any;
    severity: 'error' | 'warning' | 'info' | 'success';
    onClose?: () => void;
    variant?:'filled' | 'standard' | 'outlined' 

  }
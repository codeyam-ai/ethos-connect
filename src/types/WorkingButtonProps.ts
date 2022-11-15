import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface WorkingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isWorking?: boolean,
    workingComponent?: ReactNode 
}
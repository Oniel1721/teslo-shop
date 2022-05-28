import { FC as FunctionalComponent, ReactElement } from 'react';
import { ReactNode } from 'react';

type FunctionalComponentProps = { 
    children?: ReactNode,
    key?: string | number
}

export interface FC<T = {}> extends FunctionalComponent<T & FunctionalComponentProps> {
    (props: T & FunctionalComponentProps, context?: any): ReactElement<any, any> | null;
}
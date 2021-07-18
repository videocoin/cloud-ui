import React, { FC, HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import {
  extractPaddingValues,
  extractMarginValues,
  extractFlexStyle,
  extractAlignmentsValues,
} from './modifiers';

export interface ViewProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  margin?: number | 'auto';
  marginL?: number | 'auto';
  marginT?: number | 'auto';
  marginR?: number | 'auto';
  marginB?: number | 'auto';
  marginH?: number | 'auto';
  marginV?: number | 'auto';
  padding?: number;
  paddingL?: number;
  paddingT?: number;
  paddingR?: number;
  paddingB?: number;
  paddingH?: number;
  paddingV?: number;
  reverse?: boolean;
  flex?: number | string;
  flexG?: number;
  flexS?: number;
  column?: boolean;
  row?: boolean;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  center?: boolean;
  centerV?: boolean;
  centerH?: boolean;
  base?: boolean;
  spread?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  wrap?: boolean;
}
const BaseView = ({
  children,
  className,
  as: Comp = 'div',
  onClick,
}: ViewProps) => (
  // eslint-disable-next-line
  // @ts-ignore
  <Comp className={className} onClick={onClick}>
    {children}
  </Comp>
);

const View: FC<ViewProps> = styled(BaseView)`
  ${(props) => extractPaddingValues(props)};
  ${(props) => extractMarginValues(props)};
  ${(props) => extractFlexStyle(props)};
  ${(props) => extractAlignmentsValues(props)};
  ${({ wrap }) => wrap && 'flex-wrap: wrap'};
  min-width: 1px;
`;

export default View;

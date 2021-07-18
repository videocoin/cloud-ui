import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import Colors, { TColors } from 'styles/Colors';
import View, { ViewProps } from 'components/UI/View';

const subtitle = css`
  font-size: 22px;
  line-height: 1.66;
  font-weight: 600;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
`;

const title = css`
  color: ${Colors.violet90};
  font-size: 40px;
  line-height: 1.4;
  font-weight: 800;
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;
const title2 = css`
  font-size: 32px;
  line-height: 1.5;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const display1 = css`
  font-size: 72px;
  line-height: 1.22;
  letter-spacing: 2px;
  font-weight: bold;
  font-family: 'Teko', sans-serif;
  color: ${Colors.violet90};
  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

const display2 = css`
  font-size: 64px;
  line-height: 1.25;
  letter-spacing: 1.2px;
  font-weight: bold;
  font-family: 'Teko', sans-serif;
  color: ${Colors.violet80};
  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const display3 = css`
  font-size: 56px;
  line-height: 1.28;
  letter-spacing: 2px;
  font-weight: bold;
  font-family: 'Teko', sans-serif;
  color: ${Colors.violet80};
  @media (max-width: 768px) {
    font-size: 36px;
    line-height: 52px;
  }
`;

const body = css`
  font-size: 20px;
  line-height: 1.8;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 2;
  }
`;

const caption = css`
  font-size: 12px;
  line-height: 2.333;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const smallBodyAlt = css`
  font-size: 16px;
  line-height: 2;
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const smallBody = css`
  font-size: 16px;
  line-height: 2;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const bodyAlt = css`
  font-size: 20px;
  line-height: 1.8;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 32px;
  }
`;

const gradient = css`
  background: linear-gradient(
    296.01deg,
    #7234c8 2.5%,
    #f53568 48.18%,
    #fa6e37 105.69%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

type Variant =
  | 'subtitle'
  | 'display2'
  | 'display3'
  | 'body'
  | 'title'
  | 'smallBodyAlt'
  | 'display1'
  | 'bodyAlt'
  | 'smallBody'
  | 'title2'
  | 'caption';

const variants: Record<Variant, any> = {
  subtitle,
  display2,
  body,
  title,
  smallBodyAlt,
  display1,
  bodyAlt,
  smallBody,
  title2,
  caption,
  display3,
};

interface TextProps {
  variant?: Variant;
  withGradient?: boolean;
  uppercase?: boolean;
  align?: string;
  color?: TColors;
}

const TextBase = styled(View)<TextProps>`
  ${({ variant = 'body' }) => variants[variant]};
  ${({ withGradient }) => withGradient && gradient};
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};
  text-align: ${({ align }) => align};
  color: ${({ color }) => color && Colors[color]};
  strong {
    font-weight: bold;
  }
  a {
    color: ${Colors.violet50};
  }
  white-space: pre-line;
`;

const Text = ({
  children,
  ...props
}: TextProps & {
  children: ReactNode;
} & ViewProps) => {
  return <TextBase {...props}>{children}</TextBase>;
};

export default Text;

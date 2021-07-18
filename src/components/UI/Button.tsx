import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import Colors from 'styles/Colors';

const regular = css`
  height: 56px;
  padding: 0 28px;
  font-size: 16px;
  @media (max-width: 768px) {
    padding: 0 21px;
  }
`;

const large = css`
  height: 72px;
  padding: 0 36px;
  font-size: 20px;
`;

const primary = css`
  .content {
    color: #ffffff;
    background: ${Colors.violet50};
  }
`;

const secondary = css`
  .content {
    background: #fff;
    color: ${Colors.violet90};
    .arrow {
      background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 4l9 8.296L8 20' stroke='%23290F4D' stroke-width='2' stroke-linejoin='bevel'/%3E%3C/svg%3E%0A");
    }
  }
  .inner-border {
    position: absolute;
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    left: 8px;
    top: 8px;
    z-index: 1;
    border-radius: 9px;
    background: linear-gradient(
      180deg,
      rgba(113, 48, 204, 0.54) 0%,
      #7130cc 100%
    );
  }
`;

const styles: Record<string, any> = {
  regular,
  large,
  primary,
  secondary,
};

const BaseButton = styled.button<{
  btnTheme?: string;
  size?: string;
  disabled?: boolean;
}>`
  position: relative;
  border: none;
  padding: 9px;
  border-radius: 12px;
  background: transparent;
  ${({ btnTheme = 'primary' }) => styles[btnTheme]};
  .top-border {
    border-radius: 12px;
    display: block;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.73) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }
  .middle-border {
    border-radius: 12px;
    display: block;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    background: hsla(265, 19%, 89%, 0.5);
    position: absolute;
    left: 1px;
    top: 1px;
    z-index: 1;
  }
  .content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    font-weight: bold;
    border-radius: 8px;
    font-family: inherit;
    text-align: center;
    line-height: 20px;
    ${({ size = 'regular' }) => styles[size]};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    white-space: nowrap;
    width: 100%;
  }
  .arrow {
    width: 24px;
    height: 24px;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 4l9 8.296L8 20' stroke='%23EEE3FF' stroke-width='2' stroke-linejoin='bevel'/%3E%3C/svg%3E%0A");
    margin-left: 8px;
  }
`;

const Button = ({
  children,
  simple = false,
  hideArrow = false,
  ...props
}: {
  children: ReactNode;
  btnTheme?: string;
  size?: string;
  disabled?: boolean;
  simple?: boolean;
  hideArrow?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <BaseButton {...props}>
    <span className="content">
      {children}
      {!hideArrow && <span className="arrow" />}
    </span>
    {!simple && <span className="top-border" />}
    {!simple && <span className="middle-border" />}
    <span className="inner-border" />
  </BaseButton>
);

export default Button;

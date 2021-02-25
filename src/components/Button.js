// Generic button
import React from 'react';
import classNames from 'classnames';
import 'components/Button.scss';

export default function Button(props) {
  const { confirm, danger, disabled, onClick } = props;
  const buttonClass = classNames(
    'button',
    { 'button--danger': danger },
    { 'button--confirm': confirm }
  );
  return (
    <button disabled={disabled} onClick={onClick} className={buttonClass}>
      {props.children}
    </button>
  );
}

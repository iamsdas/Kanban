import { ReactNode } from 'react';

const OutlineButton = (props: {
  onClickCB: () => void;
  icon?: ReactNode;
  label?: string;
  noBorder?: boolean;
}) => {
  return (
    <button
      onClick={props.onClickCB}
      className={`hover:text-neutral-400  text-neutral-600 font-semibold flex p-2 rounded-lg gap-1 items-center justify-between ${
        props.noBorder ?? false
          ? ''
          : 'border-2 border-neutral-500 hover:border-neutral-300'
      }`}>
      {props.icon && <span>{props.icon}</span>}
      {props.label && <span> {props.label}</span>}
    </button>
  );
};

export default OutlineButton;

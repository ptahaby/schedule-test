import React, { FC } from 'react';
import { Store, OnChangeDispatch, TypeAction } from '../../../../types';

type Props = {
  type: TypeAction;
  name: keyof Store;
  label: string;
  value: number;
  onChange: OnChangeDispatch;
};

const HoursSelect: FC<Props> = ({ name, type, label, value, onChange }) => {
  const onClickHandle = (e: React.MouseEvent<HTMLElement>, data: number) => {
    e.stopPropagation();
    e.preventDefault();
    onChange(type, { [name]: data });
  };
  return (
    <div>
      <div className="input-group mb-3">
        <button
          className="btn btn-outline-primary"
          type="button"
          id="button-addon1"
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            onClickHandle(e, value === 0 ? 0 : value - 1);
          }}
        >
          -
        </button>
        <input
          type="text"
          className="form-control text-center"
          placeholder=""
          aria-label="Example text with button addon"
          aria-describedby="button-addon1"
          value={value}
          onChange={() => {}}
        />
        <span className="input-group-text">{label}</span>
        <button
          className="btn btn-outline-primary"
          type="button"
          id="button-addon1"
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            onClickHandle(e, value + 1);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default React.memo(HoursSelect);

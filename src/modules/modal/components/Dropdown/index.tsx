import React, { FC, useState } from 'react';
import {
  Store,
  OnChangeDispatch,
  DropdownItem,
  TypeAction,
} from '../../../../types';

type Props = {
  name: keyof Store;
  type: TypeAction;
  value: number | string | null;
  options: Array<DropdownItem>;
  placeholder: string;
  onChange: OnChangeDispatch;
};

const Dropdown: FC<Props> = ({
  name,
  type,
  value,
  options,
  onChange,
  placeholder,
}) => {
  const [data, setData] = useState<DropdownItem>(() => {
    return options.filter((item) => item.value === value)[0];
  });

  const handlerOnChange = (item: DropdownItem) => {
    setData(item);
    onChange(type, { [name]: item.value });
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {data?.value ? data?.label : placeholder}
      </button>
      <ul className="dropdown-menu">
        {options.map((item) => (
          <li key={item.value + item.label}>
            <a
              className="dropdown-item"
              onClick={(e) => {
                e.preventDefault();
                handlerOnChange(item);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Dropdown);

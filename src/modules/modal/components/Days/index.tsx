import React, { FC } from 'react';
import { OnChangeDispatch, Store, TypeAction } from '../../../../types';
import { workDays, specialDays } from '../../../../mock';

type Props = {
  name: keyof Store;
  type: TypeAction;
  value: Array<number>;
  onChange: OnChangeDispatch;
};

const Days: FC<Props> = ({ value, onChange, name, type }) => {
  const changeHandler = (data: number | Array<number>) => {
    let array = [];
    if (Array.isArray(data)) {
      array = Array.from(new Set(data.concat(value)));
    } else {
      if (value.includes(data)) {
        array = value.filter((i) => i !== data);
      } else {
        array = [...value, data];
      }
    }
    onChange(type, { [name]: array.sort((a, b) => a - b) });
  };

  return (
    <div className="btn-group w-100" role="group">
      {specialDays.map((day) => (
        <button
          key={day.label}
          type="button"
          className="btn btn-outline-primary"
          onClick={() => {
            changeHandler(day.value);
          }}
        >
          {day.label}
        </button>
      ))}
      {workDays.map((day, index) => (
        <React.Fragment key={index}>
          <input
            type="checkbox"
            checked={value.includes(day.value)}
            className="btn-check"
            id={`btncheck${index}`}
            onChange={() => {
              changeHandler(day.value);
            }}
          />
          <label
            className="btn btn-outline-primary"
            htmlFor={`btncheck${index}`}
          >
            {day.label}
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default React.memo(Days);

import React, { useState, FC } from 'react';
import DatePicker from 'react-datepicker';
import { OnChangeDispatch, Store, TypeAction } from '../../../../types';

type Props = {
  name: keyof Store;
  value: { start: Date | null; end: Date | null };
  type: TypeAction.UPDATE_DATE;
  onChange: OnChangeDispatch;
};
const DateByHours: FC<Props> = ({ value, onChange, name, type }) => {
  const [startDate, setStartDate] = useState(value.start || new Date());
  return (
    <div>
      <div className="input-group mb-3">
        <DatePicker
          dateFormat="dd.MM.yyyy"
          selected={startDate}
          minDate={new Date()}
          onChange={(date: Date) => {
            setStartDate(date);
            onChange(type, { [name]: { start: date, end: value.end } });
          }}
          className="form-control"
        />
        <span className="input-group-text">До</span>
        <DatePicker
          dateFormat="dd.MM.yyyy"
          selected={value.end}
          minDate={startDate}
          onChange={() => {}}
          className="form-control"
        />
      </div>
    </div>
  );
};

export default React.memo(DateByHours);

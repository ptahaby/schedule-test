import React, { useState, FC } from 'react';
import DatePicker from 'react-datepicker';
import { OnChangeDispatch, Store, TypeAction } from '../../../../types';

type Props = {
  name: keyof Store;
  type: TypeAction.UPDATE_TIME;
  value: { start: Date | null; end: Date | null };
  typeHours: number;
  hoursInDay: number;
  breakMinTime: number;
  onChange: OnChangeDispatch;
};
const TimePicker: FC<Props> = ({
  name,
  type,
  value,
  typeHours,
  hoursInDay,
  breakMinTime,
  onChange,
}) => {
  const [startDate, setStartDate] = useState(value.start || new Date());

  const endDate = new Date(
    startDate.getTime() + (hoursInDay * typeHours + breakMinTime) * 60 * 1000,
  );

  return (
    <div className="input-group">
      <div className="flex">
        <DatePicker
          dateFormat="HH:mm"
          timeIntervals={typeHours}
          selected={value.start}
          minDate={new Date()}
          showTimeSelect
          showTimeSelectOnly
          onChange={(date: Date) => {
            setStartDate(date);
            onChange(type, {
              [name]: {
                start: date,
                end: new Date(
                  date.getTime() +
                    (hoursInDay * typeHours + breakMinTime) * 60 * 1000,
                ),
              },
            });
          }}
          className="form-control flex"
        />
      </div>

      <span className="input-group-text">До</span>
      <div className="flex">
        <DatePicker
          dateFormat="HH:mm"
          selected={endDate}
          minDate={startDate}
          showTimeSelect
          showTimeSelectOnly
          onChange={() => {}}
          className="form-control"
        />
      </div>
    </div>
  );
};

export default React.memo(TimePicker);

import React, { useState, FC } from 'react';
import DatePicker from 'react-datepicker';
import { OnChangeDispatch, Store, TypeAction } from '../../../../types';
import { updateTime } from '../../../../utils/getDateTime';

type Props = {
  name: keyof Store;
  type: TypeAction.UPDATE_TIME;
  value: { start: Date | null; end: Date | null };
  typeOfHours: number;
  hoursInDay: number;
  breakMinTime: number;
  onChange: OnChangeDispatch;
};
const TimePicker: FC<Props> = ({
  name,
  type,
  value,
  typeOfHours,
  hoursInDay,
  breakMinTime,
  onChange,
}) => {
  const [startDate, setStartDate] = useState(value.start || new Date());

  return (
    <div className="input-group">
      <div className="flex">
        <DatePicker
          dateFormat="HH:mm"
          timeIntervals={typeOfHours}
          selected={value.start}
          minDate={new Date()}
          showTimeSelect
          showTimeSelectOnly
          onChange={(date: Date) => {
            setStartDate(date);
            onChange(type, {
              [name]: {
                start: date,
                end: updateTime({
                  startTime: date,
                  hoursInDay,
                  typeOfHours,
                  breakMinTime,
                }),
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
          selected={value.end}
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

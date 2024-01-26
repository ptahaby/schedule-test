import React, { FC, FormEvent, useCallback } from 'react';
import styles from './styles.module.css';
import Dropdown from './components/Dropdown';
import HoursSelect from './components/HoursSelect';
import Days from './components/Days';
import DatePicker from './components/DatePicker';
import TimePicker from './components/TimePicker';
import { TypeAction, Store } from '../../types';
import {
  optionsTypeOfHours,
  optionsBreakMinTime,
  optionsRoom,
  optionsTeacher,
} from '../../mock';
import { Action } from '../../reducer';

type Props = {
  onRequestClose: () => void;
  store: Store;
  dispatch: React.Dispatch<Action>;
};
const Modal: FC<Props> = ({ onRequestClose, store, dispatch }) => {
  const onChange = useCallback((type: TypeAction, payload: Partial<Store>) => {
    dispatch({ type, payload });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(store);
    onRequestClose();
  };
  return (
    <div className={`${styles.modalBackground} modal fade show `}>
      <div className={styles.modalContainer}>
        <div className="modal-header">
          <h5 className="modal-title">Редактирования расписания</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => onRequestClose()}
          ></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="container ">
              <div className="row">
                <div className="col mb-3">
                  <Dropdown
                    name="typeOfHours"
                    type={TypeAction.UPDATE_TYPE_OF_HOURS}
                    value={store.typeOfHours}
                    onChange={onChange}
                    options={optionsTypeOfHours}
                    placeholder="Select data"
                  />
                </div>
                <div className="col mb-3">
                  <HoursSelect
                    name="countOfHours"
                    type={TypeAction.UPDATE_COUNT_OF_HOURS}
                    label="Всего часов"
                    value={store.countOfHours}
                    onChange={onChange}
                  />
                </div>
                <div className="col mb-3">
                  <DatePicker
                    name="date"
                    type={TypeAction.UPDATE_DATE}
                    value={store.date}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col mb-3">
                  <Days
                    name="days"
                    type={TypeAction.UPDATE_DAYS}
                    value={store.days}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col mb-3">
                  <Dropdown
                    name="breakMinTime"
                    type={TypeAction.UPDATE_BREAK_MIN_TIME}
                    value={store.breakMinTime}
                    onChange={onChange}
                    options={optionsBreakMinTime}
                    placeholder="Select time break"
                  />
                </div>
                <div className="col mb-3">
                  <HoursSelect
                    name="hoursInDay"
                    type={TypeAction.UPDATE_HOURS_IN_DAY}
                    label="Часов в день"
                    value={store.hoursInDay}
                    onChange={onChange}
                  />
                </div>
                <div className="col mb-3">
                  <TimePicker
                    name="time"
                    type={TypeAction.UPDATE_TIME}
                    value={store.time}
                    onChange={onChange}
                    typeHours={store.typeOfHours}
                    hoursInDay={store.hoursInDay}
                    breakMinTime={store.breakMinTime}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col mb-3">
                  <Dropdown
                    name="teacher"
                    type={TypeAction.UPDATE_TEACHER}
                    value={store.teacher}
                    onChange={onChange}
                    options={optionsTeacher}
                    placeholder="Select teacher"
                  ></Dropdown>
                </div>
                <div className="col mb-3">
                  <Dropdown
                    name="room"
                    type={TypeAction.UPDATE_ROOM}
                    value={store.room}
                    onChange={onChange}
                    options={optionsRoom}
                    placeholder="Select room"
                  />
                </div>
              </div>
            </div>
            <div className="text-bg-warning p-3">
              Выбор преподователя и аудитории не обязателен
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => onRequestClose()}
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

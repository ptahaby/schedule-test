import React, { FC, useState, useReducer } from 'react';
import { createPortal } from 'react-dom';
import Modal from './modules/modal';

import { reducer, initialStore } from './reducer';

const App: FC = () => {
  const [store, dispatch] = useReducer(reducer, initialStore);

  const [open, setModalOpen] = useState(false);

  return (
    <div className="App">
      {open &&
        createPortal(
          <Modal
            onRequestClose={() => setModalOpen(false)}
            store={store}
            dispatch={dispatch}
          />,
          document.getElementById('modal-root')!,
        )}

      <div className="container">
        <div className="row">
          <div className="col text-center">
            <button
              type="button"
              className="btn btn-primary btn-lg mt-5"
              onClick={() => setModalOpen(true)}
            >
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

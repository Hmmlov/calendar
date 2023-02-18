import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/index';
import { store } from './store';
export const CalendarApp = () => {
  return (
    <Provider store={store}> {/* para consumir el store, con el provider */}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
};

import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';


const tempEvent =  {
    _id: new Date().getTime(),
    title: 'Cumpleaños del jefe',
    notes: 'Hay que comprar el pastel',
    start: new Date(),//monento en el que nosotros queremos que comience el evento, si es requerido.
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user:{
      _id: '123',
      name: 'Miguel',
    }
}

export const CalendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload } ) => { //estraemos el payload
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, {payload}) => {
            state.events.push(payload);
            state.activeEvent = null;
        }   
    }
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent } = CalendarSlice.actions;
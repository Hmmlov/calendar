import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';


const tempEvent =  {
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
        increment: (state, /* action */ ) => {
            state.counter += 1;
        },
    }
});

// Action creators are generated for each case reducer function
export const { increment } = CalendarSlice.actions;
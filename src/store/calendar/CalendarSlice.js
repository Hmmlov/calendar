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
        },
        onUpdateEvent: (state, { payload } ) => { //estraemos el payload de la acción
            state.events = state.events.map(event => {
                if(event._id === payload._id){ //
                    return payload;
                }
                return event;
            }); //regresa un nuevo arreglo basado el retorno de este arreglo "state.events"
        },
    }
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent } = CalendarSlice.actions;
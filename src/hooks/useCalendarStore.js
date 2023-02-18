import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent} from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const {events, activeEvent} = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) =>{
        dispatch(onSetActiveEvent(calendarEvent) );
    }

    const startSavingEvent = async(calendarEvent) => {
        // LLegar al backend

        // Todo bien

        if(calendarEvent._id) {
            //Actualizando
            dispatch(onUpdateEvent({...calendarEvent}) );
        }else{
            //Creando
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime()}) );
        }
    }

    const startDeletingEvent = () => {
        //LLegar al backend
        dispatch(onDeleteEvent() );
    }

  return {
    //Propiedades
    events,
    activeEvent,
    hasEventSelected : !!activeEvent, //si esto es null va a regregar 'false' y si esto tiene un objeto va regresar 'true'
    //Métodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  }
}

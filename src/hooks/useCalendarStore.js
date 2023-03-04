import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent} from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const {events, activeEvent} = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth );

    const setActiveEvent = (calendarEvent) =>{
        dispatch(onSetActiveEvent(calendarEvent) );
    }

    const startSavingEvent = async(calendarEvent) => {
        // Todo: Update event
        

        // Todo bien

        try {
            if( calendarEvent.id ) {
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);// este es solo el endpoint
                //Actualizando
                dispatch(onUpdateEvent({...calendarEvent, user}) );
                return
            }
            const {data} = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) );
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }

    }

    const startDeletingEvent = async() => {
        //LLegar al backend
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);// este es solo el endpoint
            dispatch(onDeleteEvent() );
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }
    }

    const startLoadingEvents = async() => {
        //
        try {
            const {data} = await calendarApi.get('/events');
            const  events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events))
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
    }

  return {
    //Propiedades
    events,
    activeEvent,
    hasEventSelected : !!activeEvent, //si esto es null va a regregar 'false' y si esto tiene un objeto va regresar 'true'
    //Métodos
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  }
}

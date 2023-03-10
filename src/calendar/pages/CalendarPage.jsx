
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours} from 'date-fns'
import { CalendarEvent, FabAddNew, FabDelete, Navbar } from '../index';
import { localizer, getMessagesES } from '../../helpers';
import { useEffect, useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks/index';




const onViewChanged = (event) => {
  localStorage.setItem('lastView', event);
}

export const CalendarPage = () => {

  const {user} = useAuthStore();

  const {openDateModal} = useUiStore(); //llamamos la método, cuando hagamos "doble click"
  
  const { events, setActiveEvent, startLoadingEvents }  = useCalendarStore(); //nuestros eventos

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const onDoubleClick = ( event ) => {
    /* console.log({doubleClick: event}); */
    openDateModal();
  }

  const onSelect = (event) => {
    /* console.log({click: event}); */
    setActiveEvent(event); //este es el evento que lo activa
    
  }

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);


    const style ={
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return {
      style
    }
  }  

  useEffect(() => {
    
    startLoadingEvents();

  }, [])
  
  return (
    <>
      <Navbar/>

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px )' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew/>
      <FabDelete/>
    </>
  )
}

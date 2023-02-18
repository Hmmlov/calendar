
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours} from 'date-fns'
import { CalendarEvent, Navbar } from '../index';
import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore } from '../../hooks';

const events = [{
  title: 'Cumpleaños del jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),//monento en el que nosotros queremos que comience el evento, si es requerido.
  end: addHours( new Date(), 2 ),
  bgColor: '#fafafa',
  user:{
    _id: '123',
    name: 'Miguel',
  }
}]


const onSelect = (event) => {
  /* console.log({click: event}); */
  
}

const onViewChanged = (event) => {
  localStorage.setItem('lastView', event);
}

export const CalendarPage = () => {

  const {openDateModal, closeDateModal} = useUiStore(); //llamamos la método, cuando hagamos "doble click"

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const onDoubleClick = ( event ) => {
    /* console.log({doubleClick: event}); */
    openDateModal();
  }

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style ={
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return {
      style
    }
  }  


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
    </>
  )
}

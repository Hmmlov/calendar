
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours} from 'date-fns'
import { Navbar } from '../index';
import { localizer, getMessagesES } from '../../helpers';

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



export const CalendarPage = () => {



  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log({event, start, end, isSelected});

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
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px )' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
      />

    </>
  )
}

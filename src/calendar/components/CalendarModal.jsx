import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
/* datePicker */
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es'; //esto es el idioma español
import Swal from 'sweetalert2';
import { useCalendarStore, useUiStore } from '../../hooks/index';
registerLocale('es', es) // idioma en español

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {

  const {isDateModalOpen, closeDateModal} = useUiStore();
  const { activeEvent } = useCalendarStore()
  
  const [formSubmitted, setFormSubmitted] = useState(false)

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  })

  const titleClass = useMemo(() => {
    if(!formSubmitted) return ''; //Si el formularioSubmitted no se a disparado, vamos a hacer un return de un string vacío
    return (formValues.title.length > 0) //si el formValues.title.length es mayor a 0, vamos a regresar el is-valid también un string vacío , caso contrario is-invalid. Este valor se va a memorizar unicamente si el titulo cambia o el formSubmitted cambía.
        ? ''
        : 'is-invalid';

  }, [formValues.title, formSubmitted])

  useEffect(() => {
    
    if(activeEvent !== null){
      setFormValues({...activeEvent});
    }

  }, [activeEvent])
  

  const onInputChanged = ({target}) => {
    setFormValues({
        ...formValues, 
        [target.name]: target.value
    })
  }

  const onCloseModal = () => {
    console.log("Cerrando modal");
    closeDateModal();
  };

  const onDatechanged =(event, changing)=>{
    setFormValues({
        ...formValues,
        [changing]: event
    })
  }

  const onSubmit = () => {
    event.preventDefault();
    setFormSubmitted(true);//El formluario a sido intentado de postear

    const difference = differenceInSeconds(formValues.end, formValues.start);

    //condicional si no es un número, o la diferencia es menor a 0 , muestra el error
    if ( isNaN(difference) || difference <= 0) {
        Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
        return;
    }
    //Si esto es menor o igual a 0, no va a hacer nada y mostrar un error en pantalla 

    if ( formValues.title.length <= 0 ) return;
    console.log(formValues);

    //Todo: 
    //Cerrar el modal
    // Remover errores en pantalla

  }
  
  return (
    <Modal
      isOpen={ isDateModalOpen } //para abrir el modal
      onRequestClose={ onCloseModal }
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>{/* para que no haga el refresh al momento de darle a guardar al formulario */}
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            onChange={(event) => onDatechanged(event, 'start') }
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(event) => onDatechanged(event, 'end') }
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${ titleClass }`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}

          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

import { addHours, differenceInSeconds } from 'date-fns';
import { useState } from 'react';
import Modal from 'react-modal';
/* datePicker */
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es'; //esto es el idioma español
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
  const [isOpen, setIsOpen] = useState(true);

  const [formValues, setFormValues] = useState({
    title: 'Miguel Martin',
    notes: 'Conde',
    start: new Date(),
    end: addHours(new Date(), 2),
  })

  const onInputChanged = ({target}) => {
    setFormValues({
        ...formValues, 
        [target.name]: target.value
    })
  }

  const onCloseModal = () => {
    console.log("Cerrando modal");
    setIsOpen(false); //para cerrar el modal
  };

  const onDatechanged =(event, changing)=>{
    setFormValues({
        ...formValues,
        [changing]: event
    })
  }

  const onSubmit = () => {
    event.preventDefault();
  
    const difference = differenceInSeconds(formValues.end, formValues.start);

    //condicional si no es un número, o la diferencia es menor a 0 , muestra el error
    if ( isNaN(difference) || difference <= 0) {
        console.log('Error en fechas');
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
      isOpen={isOpen} //para abrir el modal
      onRequestClose={onCloseModal}
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
            className="form-control"
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

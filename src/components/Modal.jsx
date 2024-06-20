import { useEffect, useState } from 'react';
import './Modal.css'

const Modal = ({ name, isOpen, onClose, onConfirm }) => {
    const [show, setShow] = useState(false);
  
    useEffect(() => {
      if (isOpen) {
        setShow(true);
      } else {
        setShow(false);
      }
    }, [isOpen]);
    if (!isOpen) { return null }

    return (
        <div className={`modal ${show ? 'show' : 'hide'}`}>
            <div className='modal-content'>
                <p>The person {name} already exists. Would you like to update this persons number?</p>
                <span className='clalert dialog.ose' onClick={onClose}>&tiems</span>
                <div>
                    <button onClick={onConfirm}>Update</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;
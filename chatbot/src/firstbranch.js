import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const HelloWorldModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow  = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Search123
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Hello Priya</Modal.Title>
        </Modal.Header>
        <Modal.Body>I Love My Family </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HelloWorldModal;

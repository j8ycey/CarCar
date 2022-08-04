import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'


export default function TechnicianForm(props) {
  const [newTechnician, setNewTechnician] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const data = {
      name: event.target.name.value,
      employee_id: event.target.employee_id.value,
    }
    console.log(data)

    const url = 'http://localhost:8080/api/technicians/'
    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      const newData = await response.json()
      console.log(newData)
      event.target.name.value = ""
      event.target.employee_id.value = ""
      setNewTechnician(newData.technicians)
    }
  }
  useEffect(() => {
    if (!!newTechnician.name) {
      setShowSuccess(true)
    }
  }, [newTechnician])

  function Success(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Success!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>New Technician Created</h4>
          <br />
          <h5>Name: {props.technician.name}</h5>
          <h5>Employee ID: {props.technician.employee_id}</h5>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={props.onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create Technician</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  required
                  name='name'
                  id='name'
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  aria-label="Name"
                />
                <label htmlFor="name" className="form-floating-label">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  required
                  name='employee_id'
                  id='employee_id'
                  type="number"
                  className="form-control"
                  placeholder="Employee ID"
                  aria-label="Employee ID"
                />
                <label htmlFor="employee_id" className="form-floating-label">Employee ID</label>
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Success
        show={showSuccess}
        onHide={() => {
          setShowSuccess(false)
        }}
        technician={newTechnician}
      />
    </>

  )
}
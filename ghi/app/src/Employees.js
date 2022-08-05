import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'


export default function Employees(props) {
  const [showAlert, setShowAlert] = useState(false);


  async function handleTechSubmit(event) {
    event.preventDefault()
    const name = event.target.first_name.value + " " + event.target.last_name.value
    const data = {
      name: name,
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
      event.target.first_name.value = ""
      event.target.last_name.value = ""
      event.target.employee_id.value = ""
      setShowAlert(true)
    }
  }

  async function handleSellerSubmit(event) {
    event.preventDefault()
    const data = {
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      employee_id: event.target.employee_id.value,
    }

    const url = 'http://localhost:8090/api/salesmen/'
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
      event.target.first_name.value = ""
      event.target.last_name.value = ""
      event.target.employee_id.value = ""
      setShowAlert(true)
    }
  }

  return (
    <>
      <div className="row shadow gx-5 mt-5 py-4">
        <Alert key='success' variant='success' className={showAlert ? "" : "d-none"} onClick={() => setShowAlert(false)} dismissible>
          Successfully Created!
        </Alert>
        <div className="col">
          <h1 align="center">Create Technician</h1>
          <form onSubmit={handleTechSubmit}>
            <div className="form-floating mb-3">
              <input
                required
                name='first_name'
                id='name'
                type="text"
                className="form-control"
                placeholder="First Name"
                aria-label="Last Name"
              />
              <label htmlFor="first_name" className="form-floating-label">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                required
                name='last_name'
                id='name'
                type="text"
                className="form-control"
                placeholder="Last Name"
                aria-label="Last Name"
              />
              <label htmlFor="last_name" className="form-floating-label">Last Name</label>
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
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Submit
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
            </div>
          </form>
        </div>
        <div className="col">
          <h1 align="center">Create Salesman</h1>
          <form onSubmit={handleSellerSubmit}>
            <div className="form-floating mb-3">
              <input
                required
                name='first_name'
                type="text"
                className="form-control"
                placeholder="First Name"
              />
              <label htmlFor="first_name" className="form-floating-label">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                required
                name='last_name'
                type="text"
                className="form-control"
                placeholder="Last Name"
              />
              <label htmlFor="last_name" className="form-floating-label">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                required
                name='employee_id'
                type="number"
                className="form-control"
                placeholder="Employee ID"
              />
              <label htmlFor="employee_id" className="form-floating-label">Employee ID</label>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Submit
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
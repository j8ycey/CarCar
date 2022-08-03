import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function AppointmentForm(props) {
  const navigate = useNavigate()
  const [technicians, setTechnicians] = useState([])

  async function requestTechnicians() {
    const response = await fetch('http://localhost:8080/api/technicians/')
    if (response.ok) {
      const data = await response.json()
      setTechnicians(data.technicians)
    }
  }

  useEffect(() => {requestTechnicians() }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    const data = {
      vin: event.target.vin.value,
      customer: event.target.customer.value,
      appointment_time: event.target.appointment_time.value,
      reason: event.target.reason.value,
      technician: event.target.technician.value,
    }
    console.log(data)
  
    const url = 'http://localhost:8080/api/appointments/'
    const fetchConfig = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      const newAppointment = await response.json()
      console.log(newAppointment)
      navigate('/appointment')
    }
  }

  return (
    <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create Appointment</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                required
                name='vin'
                id='vin'
                type="text"
                className="form-control"
                placeholder="VIN"
                aria-label="VIN"
                />
                <label htmlFor="vin" className="form-floating-label">VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input
                required
                name='customer'
                id='customer'
                type="text"
                className="form-control"
                placeholder="Customer"
                aria-label="Customer"
                />
                <label htmlFor="customer" className="form-floating-label">Customer</label>
              </div>
              <div className="form-floating mb-3">
                <input
                required
                name='appointment_time'
                id='appointment_time'
                type="datetime-local"
                className="form-control"
                placeholder="Date/Time"
                aria-label="Date/Time"
                />
                <label htmlFor="appointment_time" className="form-floating-label">Date/Time</label>
              </div>
              <div className="form-floating mb-3">
                <input
                required
                name='reason'
                id='reason'
                type="text"
                className="form-control"
                placeholder="Reason for appointment"
                aria-label="Reason for appointment"
                />
                <label htmlFor="reason" className="form-floating-label">Reason for appointment</label>
              </div>
              <div className="form-floating mb-2">
                <select
                  required
                  name='technician'
                  id='technician'
                  className="form-select">
                  <option value="">Choose a technician</option>
                  {technicians.map(technician => <option key={technician.employee_id} value={technician.employee_id}>{technician.name}</option>)}
                </select>
                <label htmlFor="technician" className="form-floating-label">Technician</label>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
      </>
  )


}
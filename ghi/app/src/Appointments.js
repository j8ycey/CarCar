import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'

export default function Appointments(props) {
  const [allAppointments, setAllAppointments] = useState([])
  const [filterBySearchAppts, setFilterBySearchAppts] = useState([])
  const [filterByCompleteAppts, setFilterByCompleteAppts] = useState([])
  const [search, setSearch] = useState('')
  const [checked, setChecked] = useState(false)
  const [technicians, setTechnicians] = useState([])
  const [showAlert, setShowAlert] = useState(false)


  async function requestAppointments() {
    const response = await fetch('http://localhost:8080/api/appointments/')
    if (response.ok) {
      const data = await response.json()
      setAllAppointments(data.appointments)
    }
  }
  async function requestTechnicians() {
    const response = await fetch('http://localhost:8080/api/technicians/')
    if (response.ok) {
      const data = await response.json()
      setTechnicians(data.technicians)
    }
  }
  useEffect(() => {
    requestAppointments()
    requestTechnicians()
  }, [])

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
      requestAppointments()
      setShowAlert(true)
    }
  }

  function handleChecked() {
    if (!checked) {
      const incompleteAppointments = allAppointments.filter(appointment => !appointment.completed)
      setFilterByCompleteAppts(incompleteAppointments)
    }
    else {
      setFilterByCompleteAppts(allAppointments)
    }
  }
  useEffect(() => { handleChecked() }, [allAppointments, checked])


  function searchFilter() {
    const searchedAppointments = filterByCompleteAppts.filter(appointment => appointment.vin.toLowerCase().includes(search.toLowerCase()))
    setFilterBySearchAppts(searchedAppointments)
  }
  useEffect(() => { searchFilter() }, [filterByCompleteAppts, search])


  function handleChange(event) {
    setSearch(event.target.value)
  }


  async function completeAppointment(id) {
    const response = await fetch(`http://localhost:8080/api/appointments/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedAppointments = [...allAppointments]
      const index = updatedAppointments.findIndex(appointment => appointment.id === id)
      updatedAppointments[index].completed = true
      setAllAppointments(updatedAppointments)

    }
  }


  async function deleteAppointment(id) {
    const response = await fetch(`http://localhost:8080/api/appointments/${id}`, {
      method: 'DELETE'
    })
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedAppointments = [...allAppointments].filter(appointment => appointment.id !== id)
      setAllAppointments(updatedAppointments)
    }
  }


  return (
    <>
      <div className="row my-4">
        <div className=".col-xs-6 .col-sm-3">
          <div className="shadow p-4 mt-3">



            <div className="row mb-3">
              <Alert key='success' variant='success' className={showAlert ? "" : "d-none"} onClick={() => setShowAlert(false)} dismissible>
                Successfully Created!
              </Alert>
              <h1 align="center">Create Appointment</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-2">
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
                <div className="form-floating mb-2">
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
                <div className="form-floating mb-2">
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
                <div className="form-floating mb-2">
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
                <div className="form-floating mb-4">
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
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Submit
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </button>
                </div>
              </form>
            </div>


            <div className="my-5">
              <h1 align="center">Appointments</h1>
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="check"
                  onClick={() => { setChecked(!checked) }}
                />
                <label className="form-check-label" htmlFor="check"><strong>Include Completed Appointments</strong></label>
              </div>
              <input
                type="search"
                id="search"
                className="form-control"
                placeholder="Search Appointments by VIN"
                onChange={handleChange}
                aria-label="Search"
              />
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>VIN</th>
                  <th>Customer</th>
                  <th>Date/Time</th>
                  <th>Technician</th>
                  <th>Service Reason</th>
                  <th className="text-center">VIP</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Cancel</th>
                </tr>
              </thead>
              <tbody>
                {filterBySearchAppts.map(appointment => (
                  <tr key={appointment.id}>
                    <td>{appointment.vin}</td>
                    <td>{appointment.customer}</td>
                    <td>{new Date(appointment.appointment_time).toLocaleString()}</td>
                    <td>{appointment.technician.name}</td>
                    <td>{appointment.reason}</td>
                    <td align="center"><img src={appointment.vip ? '/star-fill.svg' : '/star.svg'} /></td>
                    <td align="center">
                      {appointment.completed ? "Completed" : <button className="btn btn-warning" onClick={() => completeAppointment(appointment.id)}>Complete Task</button>}
                    </td>
                    <td align="center">
                      {appointment.completed ? "---" : <button className="btn btn-danger" onClick={() => deleteAppointment(appointment.id)}>Cancel</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
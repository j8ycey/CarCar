import React, { useState, useEffect} from 'react'

export default function AppointmentList(props) {
const [filteredAppointments, setFilteredAppointments] = useState([])
const [allAppointments, setAllAppointments] = useState([])
const [search, setSearch] = useState('')

async function requestAppointments() {
  const response = await fetch('http://localhost:8080/api/appointments/')
  if (response.ok) {
    const data = await response.json()
    setFilteredAppointments(data.appointments)
    setAllAppointments(data.appointments)
  }
}

useEffect(() => {requestAppointments()}, [])

async function handleChange(event) {
  setSearch(event.target.value)
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

useEffect(() => {
  setFilteredAppointments(allAppointments)}, [allAppointments])

useEffect(() => {
  const filteredAppointments = allAppointments.filter(appointment => appointment.vin.toLowerCase().includes(search.toLowerCase()))
  setFilteredAppointments(filteredAppointments)}, [search])

  return (
    <>
      <div className="row">
        <div className=".col-xs-6 .col-sm-3">
          <div className="shadow p-4 mt-4">
          <div className="mb-3">
            <h1 align="center">Appointment List</h1>
          <input
            type="search"
            id="search"
            className="form-control"
            placeholder="Enter VIN"
            onChange={handleChange}
            aria-label="Search"
          />
      </div>
      <table className="table table-striped">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Customer</th>
              <th>Date/Time</th>
              <th>Technician</th>
              <th>Service Reason</th>
              <th>VIP</th>
              <th>Status</th>
              <th>Cancel</th>
            </tr>
          </thead>

          <tbody>
            {filteredAppointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.vin}</td>
                <td>{appointment.customer}</td>
                <td>{new Date(appointment.appointment_time).toLocaleString()}</td>
                <td>{appointment.technician.name}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.vip ? "Yes" : "No"}</td>
                <td>{appointment.completed ? "Finished" : "Pending"}</td>
                <td><button className="btn btn-danger" onClick={() => deleteAppointment(appointment.id)}>Cancel</button></td>
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
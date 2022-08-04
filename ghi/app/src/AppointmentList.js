import React, { useState, useEffect } from 'react'

export default function AppointmentList(props) {
  const [allAppointments, setAllAppointments] = useState([])
  const [filterBySearchAppts, setFilterBySearchAppts] = useState([])
  const [filterByCompleteAppts, setFilterByCompleteAppts] = useState([])
  const [search, setSearch] = useState('')
  const [checked, setChecked] = useState(false)


  async function requestAppointments() {
    const response = await fetch('http://localhost:8080/api/appointments/')
    if (response.ok) {
      const data = await response.json()
      setAllAppointments(data.appointments)
    }
  }
  useEffect(() => { requestAppointments() }, [])


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
      <div className="row">
        <div className=".col-xs-6 .col-sm-3">
          <div className="shadow p-4 mt-4">
            <div className="mb-3">
              <h1 align="center">Appointment List</h1>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="check"
                  onClick={() => { setChecked(!checked) }}
                />
                <label className="form-check-label" htmlFor="check">View Completed Appointments</label>
              </div>
              <input
                type="search"
                id="search"
                className="form-control"
                placeholder="Enter VIN"
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
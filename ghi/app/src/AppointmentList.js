import React, { useState, useEffect, useRef } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { Modal } from 'react-bootstrap'

export default function AppointmentList(props) {
const [appointments, setAppointments] = useState([]);
const [allAppointments, setAllAppointments] = useState([]); 
const navigate = useNavigate()

async function requestAppointments() {
  const response = await fetch('http://localhost:8080/api/appointments/')
  if (response.ok) {
    const data = await response.json()
    setAppointments(data.appointments)
    setAllAppointments(data.appointments)
  }
}

useEffect(() => {requestAppointments()}, [])

async function handleChange(event) {
  const search = event.target.value
  const filteredAppointments = allAppointments.filter(appointment => appointment.vin.toLowerCase().includes(search.toLowerCase()))
  setAppointments(filteredAppointments)
}

async function handleSubmit(event) {
  event.preventDefault()
  const data = [...appointments]
  console.log(data)

  const url = 'http://localhost:8080/api/appointments/'
  const fetchConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  }
  const response = await fetch(url, fetchConfig)
  if (response.ok) {
    const newAppointment = await response.json()
    console.log(newAppointment)
    // navigate('/appointment')
    // const cleared = {
    //     vin: '',
    //     customer: '',
    //     appointment_time: '',
    //     reason: '',
    //     status: '',
    //     technician: '',
    // }
  }
}


  return (
    <>
      <div className="mb-3">
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
            </tr>
          </thead>

          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.vin}</td>
                <td>{appointment.customer}</td>
                <td>{appointment.appointment_time}</td>
                <td>{appointment.technician.name}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.vip ? "Yes" : "No"}</td>
                <td>{appointment.completed ? "Finished" : "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  )
}
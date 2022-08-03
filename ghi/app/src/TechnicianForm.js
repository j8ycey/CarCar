import React, { useState, useEffect} from 'react'


export default function TechnicianForm(props) {

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
      const newTechnician = await response.json()
      console.log(newTechnician)
    }
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
    </>
      
  )
}
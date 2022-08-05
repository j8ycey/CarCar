import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'

export default function Sales(props) {
  // State variables for creating new sale
  const [salesmen, setSalesmen] = useState([])
  const [customers, setCustomers] = useState([])
  const [automobiles, setAutomobiles] = useState([])
  const [filteredAutos, setFilteredAutos] = useState([])
  const [models, setModels] = useState([])
  const [filteredModels, setFilteredModels] = useState([])
  const [selectedModel, setSelectedModel] = useState("")
  const [manufacturers, setManufacturers] = useState([])
  const [selectedManu, setSelectedManu] = useState("")

  // State variables for creating new customer
  const [USStates, setUSStates] = useState([])

  // State varaibles for showAlerting success message on form submits
  const [showAlert, setShowAlert] = useState(false);

  // State variables for sales history
  const [allSales, setAllSales] = useState([])
  const [salesmanSales, setSalesmanSales] = useState([])
  const [salesmanId, setSalesmanId] = useState('')

  async function requestSales() {
    const response = await fetch('http://localhost:8090/api/sales/')
    if (response.ok) {
      const data = await response.json()
      setAllSales(data.sales)
    }
  }
  async function requestSalesmen() {
    const response = await fetch('http://localhost:8090/api/salesmen/')
    if (response.ok) {
      const data = await response.json()
      setSalesmen(data.salesmen)
    }
  }
  async function requestCustomers() {
    const response = await fetch('http://localhost:8090/api/customers/')
    if (response.ok) {
      const data = await response.json()
      setCustomers(data.customers)
    }
  }
  async function requestAutomobiles() {
    const response = await fetch('http://localhost:8090/api/automobiles/')
    if (response.ok) {
      const data = await response.json()
      const availableCars = data.automobiles.filter(car => !car.sold)
      setAutomobiles(availableCars)
    }
  }
  async function requestModels() {
    const response = await fetch('http://localhost:8090/api/models/')
    if (response.ok) {
      const data = await response.json()
      setModels(data.models)
    }
  }
  async function requestManufacturers() {
    const response = await fetch('http://localhost:8090/api/manufacturers/')
    if (response.ok) {
      const data = await response.json()
      setManufacturers(data.manufacturers)
    }
  }
  async function requestStates() {
    const response = await fetch('http://localhost:8090/api/states/')
    if (response.ok) {
      const data = await response.json()
      setUSStates(data.states)
    }
  }
  useEffect(() => {
    requestSales()
    requestSalesmen()
    requestCustomers()
    requestAutomobiles()
    requestModels()
    requestManufacturers()
    requestStates()
  }, [])

  function selectSalesman(event) {
    setSalesmanId(event.target.value)
  }

  function handleFilter() {
    if (!!salesmanId) {
      const filteredSales = allSales.filter(sale => sale.salesman.employee_id === parseInt(salesmanId))
      setSalesmanSales(filteredSales)
    }
    else {
      setSalesmanSales(allSales)
    }
  }
  useEffect(handleFilter, [allSales, salesmanId])

  function chooseManu(event) {
    setSelectedManu(event.target.value)
  }

  function filterDropdownModels() {
    const m = models.filter(model => model.manufacturer === selectedManu)
    setFilteredModels(m)
    setSelectedModel("")
  }
  useEffect(filterDropdownModels, [selectedManu])

  function chooseModel(event) {
    setSelectedModel(event.target.value)
  }

  function filterDropdownAutos() {
    const autos = automobiles.filter(auto => auto.model === selectedModel)
    setFilteredAutos(autos)
  }
  useEffect(filterDropdownAutos, [selectedModel])

  async function handleCustomer(event) {
    event.preventDefault()
    const data = {
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      phone: event.target.phone.value,
      street: event.target.street.value,
      city: event.target.city.value,
      state: event.target.state.value,
      zipcode: event.target.zipcode.value,
    }
    console.log(data)
    const url = 'http://localhost:8090/api/customers/'
    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      const newCustomer = await response.json()
      console.log(newCustomer)
      event.target.first_name.value = ""
      event.target.last_name.value = ""
      event.target.phone.value = ""
      event.target.street.value = ""
      event.target.city.value = ""
      event.target.state.value = ""
      event.target.zipcode.value = ""

      setShowAlert(true)
    }
  }

  async function handleSale(event) {
    event.preventDefault()
    const data = {
      automobile: event.target.vin.value,
      salesman: event.target.salesman.value,
      customer: event.target.customer.value,
      price: event.target.price.value,
    }
    const url = 'http://localhost:8090/api/sales/'
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
      event.target.vin.value = ""
      event.target.salesman.value = ""
      event.target.customer.value = ""
      event.target.price.value = ""

      requestSales()
      setShowAlert(true)
    }
  }

  return (
    <>
      <div className="row shadow my-5 justify-content-center">
        <div className="row py-4">
          <Alert key='success' variant='success' className={showAlert ? "" : "d-none"} onClick={() => setShowAlert(false)} dismissible>
            Successfully Created!
          </Alert>

          {/* NEW CUSTOMER FORM */}

          <div className="col">
            <h1 align="center">Add Customer</h1>
            <form onSubmit={handleCustomer}>
              <div className="form-floating mb-2">
                <input
                  required
                  name='first_name'
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                />
                <label htmlFor="first_name" className="form-floating-label">First Name</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  required
                  name='last_name'
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                />
                <label htmlFor="last_name" className="form-floating-label">Last Name</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  required
                  name='phone'
                  type="text"
                  className="form-control"
                  placeholder="Phone #"
                />
                <label htmlFor="phone" className="form-floating-label">Phone #</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  required
                  name='street'
                  type="text"
                  className="form-control"
                  placeholder="Street Address"
                />
                <label htmlFor="street" className="form-floating-label">Street Address</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  required
                  name='city'
                  type="text"
                  className="form-control"
                  placeholder="City"
                />
                <label htmlFor="city" className="form-floating-label">City</label>
              </div>
              <div className="row">
                <div className="col-sm">
                  <div className="form-floating mb-2">
                    <select required name="state" className="form-control">
                      <option value="">Select State</option>
                      {USStates.map(state => (
                        <option key={state.abbreviation} value={state.abbreviation}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="state" className="form-floating-label">State</label>
                  </div>
                </div>
                <div className="col-sm">
                  <div className="form-floating mb-2">
                    <input
                      required
                      name='zipcode'
                      type="text"
                      className="form-control"
                      placeholder="Zip Code"
                    />
                    <label htmlFor="zipcode" className="form-floating-label">Zip Code</label>
                  </div>
                </div>
              </div>
              <div className='text-center'>
                <button type="submit" className="btn btn-primary">Add Customer</button>
              </div>
            </form>
          </div>

          {/* NEW SALE FORM */}

          <div className="col">
            <h1 align="center">New Sale</h1>
            <form onSubmit={handleSale}>
              <div className="form-floating mb-2">
                <select required name="salesman" className="form-control">
                  <option value="">Select salesman</option>
                  {salesmen.map(salesman => (
                    <option key={salesman.employee_id} value={salesman.employee_id}>
                      {salesman.first_name + " " + salesman.last_name}
                    </option>
                  ))}
                </select>
                <label htmlFor="salesman" className="form-floating-label">Salesman</label>
              </div>
              <div className="form-floating mb-2">
                <select required name="customer" className="form-control">
                  <option value="">Select customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                      {customer.first_name + " " + customer.last_name}
                    </option>
                  ))}
                </select>
                <label htmlFor="customer" className="form-floating-label">Customer</label>
              </div>
              <div className="form-floating mb-2">
                <select required name="manufacturer" className="form-control" onChange={chooseManu}>
                  <option value="">Manufacturer</option>
                  {manufacturers.map(brand => (
                    <option key={brand.id} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="manufacturer" className="form-floating-label">Manufacturer</label>
              </div>
              <div className="form-floating mb-2">
                <select required name="model" className="form-control" onChange={chooseModel}>
                  <option value="">Model</option>
                  {filteredModels.map(model => (
                    <option key={model.id} value={model.name}>
                      {model.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="model" className="form-floating-label">Model</label>
              </div>
              <div className="form-floating mb-2">
                <select required name="vin" className="form-control">
                  <option value="">Select VIN</option>
                  {filteredAutos.map(automobile => (
                    <option key={automobile.vin} value={automobile.vin}>
                      {automobile.vin}
                    </option>
                  ))}
                </select>
                <label htmlFor="vin" className="form-floating-label">Vehicle VIN</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  required
                  name='price'
                  type="number"
                  className="form-control"
                  placeholder="Sale Price"
                />
                <label htmlFor="price" className="form-floating-label">Sale Price</label>
              </div>
              <div className='text-center'>
                <button type="submit" className="btn btn-primary">Create Sale</button>
              </div>
            </form>
          </div>
        </div>

        {/* SALES HISTORY LIST */}

        <div className="row mt-2">
          <div className="p-4 mt-4">
            <div className="mb-3">
              <h1 align="center">Sales Records</h1>
              <select className="form-control" onChange={selectSalesman}>
                <option value="">Select Salesman</option>
                {salesmen.map(salesman => (
                  <option key={salesman.employee_id} value={salesman.employee_id}>
                    {salesman.first_name + " " + salesman.last_name}
                  </option>
                ))}
              </select>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Salesman</th>
                  <th>Customer</th>
                  <th>Vehicle VIN</th>
                  <th>Sale Price</th>
                </tr>
              </thead>
              <tbody>
                {salesmanSales.map(sale => (
                  <tr key={sale.id}>
                    <td>{sale.salesman.employee_id}</td>
                    <td>{sale.salesman.first_name + " " + sale.salesman.last_name}</td>
                    <td>{sale.customer.first_name + " " + sale.customer.last_name}</td>
                    <td>{sale.automobile.vin}</td>
                    <td>{"$" + sale.price + ".00"}</td>
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
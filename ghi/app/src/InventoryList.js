import React, { useState, useEffect, useRef } from 'react'
import { Modal } from 'react-bootstrap'

export default function InventoryList(props) {
  const [manufacturers, setManufactures] = useState([])
  const [models, setModels] = useState([])
  const [automobiles, setAutomobiles] = useState([])

  const [selectedManufacturers, setSelectedManufacturers] = useState([])
  const [selectedModels, setSelectedModels] = useState([])
  const [f_models, setF_models] = useState([])
  const [f_automobiles, setF_automobiles] = useState([])
  const [modelIsChecked, setModelIsChecked] = useState({})

  const [formShow, setFormShow] = useState({})
  const [manuUpdating, setManuUpdating] = useState(false)
  const [modelUpdating, setModelUpdating] = useState(false)
  const [carUpdating, setCarUpdating] = useState(false)

  async function requestManufacturers() {
    const manuResponse = await fetch('http://localhost:8100/api/manufacturers/')
    if (manuResponse.ok) {
      const data = await manuResponse.json()
      setManufactures(data.manufacturers)
    }
  }

  async function requestModels() {
    const modelResponse = await fetch('http://localhost:8100/api/models/')
    if (modelResponse.ok) {
      const data = await modelResponse.json()
      setModels(data.models)
    }
  }

  async function requestCars() {
    const carResponse = await fetch('http://localhost:8100/api/automobiles/')
    if (carResponse.ok) {
      const data = await carResponse.json()
      setAutomobiles(data.autos)
    }
  }

  useEffect(() => {
    requestManufacturers()
    requestModels()
    requestCars()
  }, [])

  function ManufacturerForm(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {!!props.updating ? "Update " : "Add New "} Manufacturer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="manufacturerForm" onSubmit={handleSubmit}>
            <input type="hidden" name="type" value="manufacturers" />
            <input type="hidden" name="edit" value={props.updating.id} />
            <div className="form-floating mb-2">
              <input type="text" className="form-control" name="name" placeholder="Manufacturer Name" defaultValue={props.updating.name} />
              <label htmlFor="name">Manufacturer Name</label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button form="manufacturerForm" onClick={() => {handleDelete("manufacturers", props.updating.id)}} className={"btn btn-danger" + (!!props.updating ? "" : " d-none")}>Delete</button>
          <button form="manufacturerForm" className="btn btn-primary">{!!props.updating ? "Update" : "Create"}</button>
        </Modal.Footer>
      </Modal>
    );
  }

  function ModelForm(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          {!!props.updating ? "Update " : "Add New "} Model
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="modelForm" onSubmit={handleSubmit}>
            <input type="hidden" name="type" value="models" />
            <input type="hidden" name="edit" value={props.updating.id} />
            <div className="mb-2">
              <select required className="form-select" name="manufacturer_id" defaultValue={!!props.updating ? props.updating.manufacturer.id : ""}>
                <option value="">Choose a manufacturer</option>
                {manufacturers.map(manufacturer => {
                  return <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                })}
              </select>
            </div>
            <div className="form-floating mb-2">
              <input type="text" className="form-control" name="name" placeholder="Model Name" defaultValue={props.updating.name} />
              <label htmlFor="name">Model Name</label>
            </div>
            <div className="form-floating mb-2">
              <input type="text" className="form-control" name="picture_url" placeholder="Picture URL" defaultValue={props.updating.picture_url} />
              <label htmlFor="picture_url">Picture URL</label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button form="modelForm" onClick={() => {handleDelete("models", props.updating.id)}} className={"btn btn-danger" + (!!props.updating ? "" : " d-none")}>Delete</button>
          <button form="modelForm" className="btn btn-primary">{!!props.updating ? "Update" : "Create"}</button>
        </Modal.Footer>
      </Modal>
    );
  }

  function CarForm(props) {
    const [carFormModels, setCarFormModels] = useState([])

    function handleCarFormManufacturer(event) {
      const filteredModels = [...models].filter(model => model.manufacturer.id === parseInt(event.target.value))
      setCarFormModels(filteredModels)
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Car
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="carForm" onSubmit={handleSubmit}>
            <input type="hidden" name="type" value="automobiles" />
            <div className="mb-2">
              <select required className="form-select" name="manufacturer_id" onChange={handleCarFormManufacturer}>
                <option value="">Choose a manufacturer</option>
                {manufacturers.map(manufacturer => {
                  return <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                })}
              </select>
            </div>
            <div className="mb-2">
              <select required className="form-select" name="model_id">
                <option value="">Choose a model</option>
                {carFormModels.map(model => {
                  return <option key={model.id} value={model.id}>{model.name}</option>
                })}
              </select>
            </div>
            <div className="form-floating mb-2">
              <input type="text" className="form-control" name="color" placeholder="Color" />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-2">
              <input type="number" className="form-control" name="year" placeholder="Year" min="1900" max="2100" />
              <label htmlFor="year">Year</label>
            </div>
            <div className="form-floating mb-2">
              <input type="text" className="form-control" name="vin" placeholder="VIN no." />
              <label htmlFor="vin">VIN no.</label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button form="carForm" className="btn btn-primary">Create</button>
        </Modal.Footer>
      </Modal>
    );
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const type = form.type.value
    const editId = form.edit.value
    let data = {}
    if (type === "manufacturers") {
      data = {
        name: event.target.name.value
      }
    }
    else if (type === "models") {
      data = {
        name: form.name.value,
        picture_url: form.picture_url.value,
        manufacturer_id: form.manufacturer_id.value
      }
    }
    else {
      data = {
        model_id: form.model_id.value,
        color: form.color.value,
        year: form.year.value,
        vin: form.vin.value
      }
    }
    const url = `http://localhost:8100/api/${type}/${!!editId?editId+'/':""}`
    const fetchConfig = {
      method: !!editId ? 'PUT' : 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      setFormShow({ [type]: false })
      setManuUpdating({})
      setModelUpdating({})
      setCarUpdating({})

      if (type === "manufacturers") {
        requestManufacturers()
      }
      else if (type === "models") {
        requestModels()
      }
      else {
        requestCars()
      }
    }
  }

  async function handleDelete(type, id) {
    const url = `http://localhost:8100/api/${type}/${id}/`
    const fetchConfig = {method: 'DELETE'}
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      setFormShow({ [type]: false })
      setManuUpdating({})
      setModelUpdating({})
      setCarUpdating({})

      if (type === "manufacturers") {
        requestManufacturers()
      }
      else if (type === "models") {
        requestModels()
      }
      else {
        requestCars()
      }
    }
  }

  useEffect(() => {
    if (!!manuUpdating) {
      setFormShow({ manufacturers: true })
    }
  }, [manuUpdating])

  useEffect(() => {
    if (!!modelUpdating) {
      setFormShow({ models: true })
    }
  }, [modelUpdating])

  useEffect(() => {
    if (!!carUpdating) {
      setFormShow({ automobiles: true })
    }
  }, [carUpdating])

  function handleSelectManufacturer(event) {
    const manufacturerId = parseInt(event.target.value)
    const updatedFilters = [...selectedManufacturers]
    if (updatedFilters.includes(manufacturerId)) {
      const idx = updatedFilters.indexOf(manufacturerId)
      updatedFilters.splice(idx, 1)
    }
    else {
      updatedFilters.push(manufacturerId)
    }
    setSelectedManufacturers(updatedFilters)
  }

  function handleSelectModel(event) {
    const modelId = parseInt(event.target.value)
    setModelIsChecked({ ...modelIsChecked, [modelId]: !modelIsChecked[modelId] })
    const updatedFilters = [...selectedModels]
    if (updatedFilters.includes(modelId)) {
      const idx = updatedFilters.indexOf(modelId)
      updatedFilters.splice(idx, 1)
    }
    else {
      updatedFilters.push(modelId)
    }
    setSelectedModels(updatedFilters)
  }

  function filterModels() {
    if (selectedManufacturers.length < 1) {
      setF_models(models)
    } else {
      setF_models(models.filter(model => selectedManufacturers.includes(model.manufacturer.id)))
      const notDisplayed = models.filter(model => !selectedManufacturers.includes(model.manufacturer.id))
      const clearChecks = { ...modelIsChecked }
      let clearUnselectedModels = [...selectedModels]
      notDisplayed.map(model => {
        clearChecks[model.id] = false
        clearUnselectedModels = clearUnselectedModels.filter(id => id !== model.id)
      })
      setModelIsChecked(clearChecks)
      setSelectedModels(clearUnselectedModels)
    }
  }

  function filterAutomobiles() {
    if (selectedModels.length < 1) {
      if (selectedManufacturers.length < 1) {
        setF_automobiles(automobiles)
      } else {
        setF_automobiles(automobiles.filter(car => selectedManufacturers.includes(car.model.manufacturer.id)))
      }
    } else {
      setF_automobiles(automobiles.filter(car => selectedModels.includes(car.model.id)))
    }
  }

  useEffect(filterModels, [selectedManufacturers, models])
  useEffect(filterAutomobiles, [selectedManufacturers, modelIsChecked, automobiles])

  return (
    <>
      <div className="row mt-5">
        <div className="col-2">
          <h4 align="center">Manufacturers</h4>
          <div style={{ textAlign: "right" }}>
            <button onClick={() => setFormShow({ manufacturers: true })} className="btn btn-primary btn-sm" style={{ marginRight: 15 }}>Add New</button>
          </div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th style={{ width: 10 }}>fil.</th>
                  <th>Brands</th>
                  <th style={{ width: 10 }}>edit</th>
                </tr>
              </thead>
              <tbody>
                {manufacturers.map(manufacturer => {
                  return (
                    <tr key={manufacturer.id}>
                      <td><input className="form-check-input" type="checkbox" value={manufacturer.id} onChange={handleSelectManufacturer} /></td>
                      <td>{manufacturer.name}</td>
                      <td align="center">
                        <img onClick={() => { setManuUpdating(manufacturer) }} src="/pencil-square.svg" alt="edit" style={{ cursor: 'pointer' }} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-5">
          <h4 align="center">Models</h4>
          <div style={{ textAlign: "right" }}>
            <button onClick={() => setFormShow({ models: true })} className="btn btn-primary btn-sm" style={{ marginRight: 15 }}>Add New</button>
          </div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th style={{ width: 10 }}>fil.</th>
                  <th>Manufacturer</th>
                  <th>Model Name</th>
                  <th>Image</th>
                  <th style={{ width: 10 }}>edit</th>
                </tr>
              </thead>
              <tbody>
                {f_models.map(model => {
                  return (
                    <tr key={model.id}>
                      <td><input className="form-check-input" type="checkbox" value={model.id} checked={modelIsChecked[model.id]} onChange={handleSelectModel} /></td>
                      <td>{model.manufacturer.name}</td>
                      <td>{model.name}</td>
                      <td><img src={model.picture_url} alt={model.name} width="150" /></td>
                      <td align="center">
                        <img onClick={() => { setModelUpdating(model) }} src="/pencil-square.svg" alt="edit" style={{ cursor: 'pointer' }} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-5">
          <h4 align="center">Cars</h4>
          <div style={{ textAlign: "right" }}>
            <button onClick={() => setFormShow({ automobiles: true })} className="btn btn-primary btn-sm" style={{ marginRight: 15 }}>Add New</button>
          </div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Manufacturer</th>
                  <th>Model</th>
                  <th>Color</th>
                  <th>Year</th>
                  <th>VIN</th>
                  <th style={{ width: 10 }}>edit</th>
                </tr>
              </thead>
              <tbody>
                {f_automobiles.map(car => {
                  return (
                    <tr key={car.id}>
                      <td>{car.model.manufacturer.name}</td>
                      <td>{car.model.name}</td>
                      <td>{car.color}</td>
                      <td>{car.year}</td>
                      <td>{car.vin}</td>
                      <td align="center">
                        <img onClick={() => { setCarUpdating(car) }} src="/pencil-square.svg" alt="edit" style={{ cursor: 'pointer' }} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ManufacturerForm
        show={formShow.manufacturers}
        onHide={() => setFormShow({ manufacturers: false })}
        updating={manuUpdating}
      />
      <ModelForm
        show={formShow.models}
        onHide={() => setFormShow({ models: false })}
        updating={modelUpdating}
      />
      <CarForm
        show={formShow.automobiles}
        onHide={() => setFormShow({ automobiles: false })}
        updating={carUpdating}
      />
    </>
  )
}
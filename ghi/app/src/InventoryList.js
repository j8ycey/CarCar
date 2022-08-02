import React, {useState, useEffect, useRef} from 'react'

export default function InventoryList(props) {
  const [manufacturers, setManufactures] = useState([])
  const [models, setModels] = useState([])
  const [cars, setCars] = useState([])

  useEffect(() => {
    (async () => {
      const manuResponse = await fetch('http://localhost:8100/api/manufacturers/')
      if (manuResponse.ok) {
        const data = await manuResponse.json()
        setManufactures(data.manufacturers)
      }
      const modelResponse = await fetch('http://localhost:8100/api/models/')
      if (modelResponse.ok) {
        const data = await modelResponse.json()
        setModels(data.models)
      }
      const carResponse = await fetch('http://localhost:8100/api/automobiles/')
      if (carResponse.ok) {
        const data = await carResponse.json()
        setCars(data.autos)
      }
    })()
  }, [])

  return (
    <div className="container text-center">
      <div className="row mt-5">
        <div className="col-2">
          <h4>Manufacturers</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Brands</th>
              </tr>
            </thead>
            <tbody>
              {manufacturers.map(manufacturer => {
                return (
                  <tr key={manufacturer.id}>
                    <td>{manufacturer.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col-5">
          <h4>Models</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Manufacturer</th>
                <th>Model Name</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {models.map(model => {
                return (
                  <tr key={model.id}>
                    <td>{model.manufacturer.name}</td>
                    <td>{model.name}</td>
                    <td><img src={model.picture_url} alt={model.name} width="150" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col-5">
          <h4>Cars</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Manufacturer</th>
                <th>Model</th>
                <th>Color</th>
                <th>Year</th>
                <th>VIN</th>
              </tr>
            </thead>
            <tbody>
              {cars.map(car => {
                return (
                  <tr key={car.id}>
                    <td>{car.model.manufacturer.name}</td>
                    <td>{car.model.name}</td>
                    <td>{car.color}</td>
                    <td>{car.year}</td>
                    <td>{car.vin}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


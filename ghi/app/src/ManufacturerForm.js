import React from 'react'
import { renderMatches } from 'react-router-dom'

class ManufacturerForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    async handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    async handleSubmit(event) {
      event.preventDefault();
      const data = { ...this.state }
      console.log(data)

      const url = 'http://localhost:8100/api/manufacturers/'
      const fetchConfig = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      }

      const response = await fetch(url, fetchConfig)
      if (response.ok) {
        const newManufacturer = await response.json()
        console.log(newManufacturer)
        const cleared = {
          name: '',
        }
        this.setState(cleared)
      }
    }
    render() {
      return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add Manufacturer</h1>
              <form onSubmit={this.handleSubmit}>
                <div className="form-floating mb-3">
                  <input placeholder="Name" type="text" className="form-control" id="namer" name="name" value={this.state.name} onChange={this.handleChange} />
                  <label htmlFor="manufacturer">Manufacturer</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>

    )
  }
}

export default ManufacturerForm;
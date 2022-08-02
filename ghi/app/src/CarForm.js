import React from 'react'

class carForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        color: '',
        year: '',
        vin: '',
        models: [],
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    async componentDidMount() {
      const url = 'http://localhost:8100/api/models/'
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        this.setState({ models: data.models })
      }
    }

    async handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    async handleSubmit(event) {
      event.preventDefault();
      const data = { ...this.state }
      delete data.models
      console.log(data, 'submitted')

      const url = 'http://localhost:8100/api/automobiles/'
      const fetchConfig = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      }

      const response = await fetch(url, fetchConfig)
      if (response.ok) {
        const newcar = await response.json()
        console.log(newcar,'response ok')
        const cleared = {
          color: '',
          year: '',
          vin: '',
          model: '',
        }
        this.setState(cleared)
      }
    }
    render() {
      return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add Car</h1>
              <form onSubmit={this.handleSubmit}>
                <div className="form-floating mb-3">
                  <input placeholder="Color" type="text" className="form-control" id="color" name="color" value={this.state.color} onChange={this.handleChange} />
                  <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                  <input placeholder="Year" type="number" className="form-control" id="year" name="year" value={this.state.year} onChange={this.handleChange} />
                  <label htmlFor="year">Year</label>
                </div>
                <div className="mb-3">
                <select onChange={this.handleChange} value={this.state.model} name="model" required id="model" className="form-select">
                  <option value="">Model</option>
                  {this.state.models.map(model => {
                    return <option key={model.id} value={model.id}>{model.name}</option>
                  })}
                </select>
                </div>
                <div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>

    )
  }
}

export default carForm;
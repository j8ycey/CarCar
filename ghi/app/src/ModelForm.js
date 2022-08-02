import React from 'react'

class modelForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        picture_url: '',
        manufacturers: [],
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    async componentDidMount() {
      const url = 'http://localhost:8100/api/manufacturers/'
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        this.setState({ manufacturers: data.manufacturers })
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
      delete data.manufacturers
      console.log(data, 'submitted')

      const url = 'http://localhost:8100/api/models/'
      const fetchConfig = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      }

      const response = await fetch(url, fetchConfig)
      if (response.ok) {
        const newModel = await response.json()
        console.log(newModel,'response ok')
        const cleared = {
          name: '',
          picture_url: '',
          manufacturer: '',
        }
        this.setState(cleared)
      }
    }
    render() {
      return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add Model</h1>
              <form onSubmit={this.handleSubmit}>
                <div className="form-floating mb-3">
                  <input placeholder="Name" type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleChange} />
                  <label htmlFor="model">Model</label>
                </div>
                <div className="form-floating mb-3">
                  <input placeholder="Picture URL" type="url" className="form-control" id="picture_url" name="picture_url" value={this.state.picture_url} onChange={this.handleChange} />
                  <label htmlFor="picture_url">Picture URL</label>
                </div>
                <div className="mb-3">
                <select onChange={this.handleChange} value={this.state.manufacturer} name="manufacturer" required id="manufacturer" className="form-select">
                  <option value="">Manufacturer</option>
                  {this.state.manufacturers.map(manufacturer => {
                    return <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
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

export default modelForm;
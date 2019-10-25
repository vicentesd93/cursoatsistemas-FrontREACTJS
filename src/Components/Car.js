import React, { Component } from 'react';

class CarForm extends Component{
	constructor(){
		super();
		this.state = {
      "id": null,
      "brand": "",
      "chassis_number": "",
      "model": "",
      "price": 0,
      "ref": React.createRef()
		}
	  this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
handleSubmit(e) {
    e.preventDefault();
    if (this.state.id == null) {
      fetch('http://localhost:8080/car' ,{method: 'POST',
        body: JSON.stringify({
        "brand": this.state.brand,
        "chassis_number": this.state.chassis_number,
        "model": this.state.model,
        "price": this.state.price
        }), 
        headers:{'Content-Type': 'application/json;charset=UTF-8'}
      });
    } else {
      fetch('http://localhost:8080/car/'+this.state.id ,{method: 'PUT',
        body: JSON.stringify({
        "brand": this.state.brand,
        "chassis_number": this.state.chassis_number,
        "model": this.state.model,
        "price": this.state.price
        }), 
        headers:{'Content-Type': 'application/json;charset=UTF-8'}
      });
    }
    this.setState({
      "brand": "",
      "chassis_number": "",
      "model": "",
      "price": 0
    });
    window.location.reload();
}

handleInputChange(e) {
    const {value, name} = e.target;
    this.setState({
      [name]: value
    });
}

render() {
    return (
      <div className="card">
        <form ref={this.state.ref} onSubmit={this.handleSubmit} className="card-body">
          <div className="form-group">
            <input
              type="text"
              name="chassis_number"
              className="form-control"
              value={this.state.chassis_number}
              onChange={this.handleInputChange}
              placeholder="chassis_number"
              />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="brand"
              className="form-control"
              value={this.state.brand}
              onChange={this.handleInputChange}
              placeholder="brand"
              />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="model"
              className="form-control"
              value={this.state.model}
              onChange={this.handleInputChange}
              placeholder="model"
              />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="price"
              className="form-control"
              value={this.state.price}
              onChange={this.handleInputChange}
              placeholder="price"
              />
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    )
  }
}

class CarItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      "id": this.props.id,
      "brand": this.props.brand,
      "chassis_number": this.props.chassis_number,
      "model": this.props.model,
      "price": this.props.price,
      "ref": React.createRef()
    }
  }
  deleteCar(id){
    fetch('http://localhost:8080/car/'+id,{method: 'DELETE'});
    window.location.reload();
  }
  editCar(id){
    return this.state;
  }
  render(){
    return(
        <div className="col md-4">
          <div className="card mt-4">
            <div className="card-header">
              <h3> {this.state.chassis_number}</h3>
              <spam className="badge badge-pill badge-info ml-2">
              {this.state.price} €/dia
              </spam>
            </div>
            <div className="card-body">
              <p>{this.state.brand} {this.state.model}</p>
            </div>
            <button className="btn btn-danger" onClick={() => this.deleteCar(this.state.id)}>
            Delete
            </button>
            <button className="btn btn-info" onClick={this.props.edit}>
            Edit
            </button>
          </div>
        </div>
        )
  }
}

export {CarForm,CarItem};


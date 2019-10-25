import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import Car, {CarForm,CarItem}  from './Components/Car.js';

class App extends Component{
  constructor(){
    super();
    this.state = {
      cars:[]
    }
    this.refCarForm = React.createRef();
  }

  async componentDidMount() {
    await fetch('http://localhost:8080/car/list')
    .then(response => response.json())
    .then((cars) => {
        this.setState({ cars: cars })
      })
  }

  render(){
    const cars = this.state.cars.map((car) => {
      return(
        <CarItem ref={this.refCarItem} id={car.id} chassis_number={car.chassis_number} 
        brand={car.brand} model={car.model} price={car.price} 
        edit={() => {
          var currentCarForm = this.refCarForm.current;
          currentCarForm.setState({
            "id": car.id,
            "brand": car.brand,
            "chassis_number": car.chassis_number,
            "model": car.model,
            "price": car.price,
          })
        }} />
      )
    });

    return (
        <div className="App">
          <nav className="navbar navbar-dark bg-dark">
          <a href="" className="text-white">
            Cars
            <spam className="badge badge-pill badge-light ml-2">
              {this.state.cars.length}
              </spam>
          </a>
          </nav>
          <div className="container">
          <div className="row mt-4 mb-4">
            {cars}
          </div>
            <CarForm ref={this.refCarForm}/>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </div>
      );
  }
}

export default App;

import React from 'react';
import axios from 'axios';
import PokemonList from './PokemonList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemon: [],
      types: 'Sort by Type',
    }
    this.onChangeValue = this.onChangeValue.bind(this);
    this.getAll = this.getAll.bind(this);
    this.onClickShowAll = this.onClickShowAll.bind(this);
  }

  onClickShowAll() {
    this.getAll()
  }

  onChangeValue(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    axios.get('/api')
      .then((results) => {
        var result = results.data.filter(item => item.type === this.state.types)
        this.setState({
          pokemon: result
        })
      })
      .catch((err) => { console.error(err) })
  }

  getAll() {
    axios.get('/api')
    .then((results) => {
      this.setState({
        pokemon: results.data
      })
    })
    .catch((err) => { console.error(err) })
  }

  componentDidMount() {
    this.getAll();
  }

  render() {
    return (
      <div>
        <h1>Fullstack Pokedex!</h1>
        <button onClick={this.onClickShowAll}>Show All</button>
        <select name="types" onChange={this.onChangeValue}>
          <option>Sort by Type</option>
          <option>Grass</option>
          <option>Fire</option>
          <option>Water</option>
        </select>
        <div>
          <PokemonList pokemon={this.state.pokemon} getAll={this.getAll} />
        </div>
      </div>
    )
  }
}

export default App;
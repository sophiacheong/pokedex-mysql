import React from 'react';
import axios from 'axios';
import PokemonList from './PokemonList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemon: [],
      types: 'Sort by Type',
      typesList: [],
      newName: '',
      photo: '',
      photoId: 0,
      typeId: 0
    }
    this.onChangeValue = this.onChangeValue.bind(this);
    this.getAll = this.getAll.bind(this);
    this.onClickShowAll = this.onClickShowAll.bind(this);
    this.newPokemonName = this.newPokemonName.bind(this);
    this.getAllTypes = this.getAllTypes.bind(this);
    this.addingPokemon = this.addingPokemon.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.getPhotoId = this.getPhotoId.bind(this);
  }

  getPhotoId() {
    axios.get('/api/photo')
      .then((results) => {
        this.setState({
          photoId: results.data[results.data.length-1].id + 1
        })
      })
  }

  addingPokemon() {
    axios.post('/api/photo', {
      img: this.state.photo
    })
      .then(() => {
        axios.get('/api/photo')
        .then((results) => {
          this.setState({
            photoId: results.data[results.data.length-1].id
          })
        })
      })
      .then(() =>
        axios.post('/api', {
          "name": this.state.newName,
          "typeNum": Number(this.state.typeId),
          "imageNum": Number(this.state.photoId)
        })
          .then(() => {
            alert('Added Pokemon')
          })
      )
        .then(() => {
          this.getAll();
        })
        .catch((err) => {console.error(err)})
  }

  newPokemonName(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getAllTypes() {
    axios.get('/types')
      .then((result) => {
        this.setState({
          typesList: result.data
        })
      })
      .catch((err) => console.error(err))
  }

  onClickShowAll() {
    this.getAll()
  }

  onChangeType(e) {
    this.setState({
      typeId: e.target.options.selectedIndex + 1
    })
  }

  onChangeValue(e) {
    this.setState({
      [e.target.name]: e.target.value,
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
    this.getAllTypes();
    this.getPhotoId();
  }

  render() {
    return (
      <div>
        <h1>Fullstack Pokedex!</h1>
        <button onClick={this.onClickShowAll}>Show All</button>
        <select name="types" onChange={this.onChangeValue}>
          {this.state.typesList.map((item, index) => (
            <option key={index}>{item.type}</option>
          ))}
        </select>
        <div>
          <input name="newName" placeholder="name" onChange={this.newPokemonName} />
          <input name="photo" placeholder="Photo IMG" onChange={this.newPokemonName} />
          <select name="types" onChange={this.onChangeType}>
            {this.state.typesList.map((item) => (
              <option key={item.id}>{item.type}</option>
            ))}
          </select>
          <button onClick={this.addingPokemon}>Add Pokemon</button>
        </div>
        <div>
          <PokemonList pokemon={this.state.pokemon} getAll={this.getAll} />
        </div>
      </div>
    )
  }
}

export default App;
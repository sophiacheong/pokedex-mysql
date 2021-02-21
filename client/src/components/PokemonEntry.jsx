import React from 'react';
import axios from 'axios';

class PokemonEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      viewForm: false
    }
    this.onClickView = this.onClickView.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onUpdateClick = this.onUpdateClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick(id) {
    axios.delete(`/api/${id}`)
      .then(() => {
        alert('Deleted...')
      })
      .then(() => {
        this.props.getAll()
      })
      .catch((err) => console.error(err))
  }

  onUpdateClick(id) {
    axios.patch(`/api/${id}`, {
      name: this.state.name
    })
      .then(() => {
        alert('Name Updated!')
      })
      .then(() => {
        this.props.getAll()
      })
      .catch((err) => {console.error(err)})
  }

  onClickView() {
    this.setState({
      viewForm: !this.state.viewForm
    })
  }

  onChangeValue(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    if (this.state.viewForm) {
      return (
        <div>
        <h3>
          <input name="name" onChange={this.onChangeValue} />
          <button onClick={() => {
            this.onUpdateClick(this.props.item.id)
            this.onClickView()
          }}>Change Name</button>
          <button onClick={this.onClickView}>Cancel</button>
        </h3>
        <img src={this.props.item.img}></img>
        <div>Type: {this.props.item.type}</div>
        <button onClick={() => {this.onDeleteClick(this.props.item.id)}}> Delete Pokemon :( </button>
      </div>
      )
    } else {
      return (
        <div>
          <h3 onClick={this.onClickView}>
            {this.props.item.name}
          </h3>
          <img src={this.props.item.img}></img>
          <div>Type: {this.props.item.type}</div>
          <div>
            <button onClick={() => {this.onDeleteClick(this.props.item.id)}}>Delete Pokemon :( </button>
          </div>
        </div>
      )
    }
  }
}

export default PokemonEntry;
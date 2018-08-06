import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      toBuyList: [],
      cartList: [],
      error: ''
    }
  }

  onChange = e => this.setState({input: e.target.value, error: ''})
  onSubmit = e => {
    const {input, toBuyList, cartList} = this.state
    const trimmedInput = input.trim()
    const inToBuyList = toBuyList.some(item => item.toLowerCase() === trimmedInput.toLowerCase())
    const inCartList = cartList.some(item => item.toLowerCase() === trimmedInput.toLowerCase())
    if (!inCartList && !inToBuyList) {
      this.setState({toBuyList: [...toBuyList, trimmedInput], input: ''})
    } else {
      this.setState({error: 'This item is already in the list.'})
    }
    e.preventDefault()
  }
  moveBetweenLists = e => {
    const {cartList, toBuyList} = this.state
    const value = e.target.value
    if (e.target.checked) {
      const index = toBuyList.indexOf(value)
      if (index >= 0) {
        this.setState({cartList: [...cartList, value], toBuyList: toBuyList.filter((el, i) => i !== index)})
      }
    } else {
      const index = cartList.indexOf(value)
      if (index >= 0) {
        this.setState({toBuyList: [...toBuyList, value], cartList: cartList.filter((el, i) => i !== index)})
      }
    }
  }

  render() {
    const {input, cartList, toBuyList, error} = this.state
    return (
      <div>
        <form style={{margin: '40px 0', display: 'flex', justifyContent: 'center'}} onSubmit={this.onSubmit}>
          <input type="text" value={input} onChange={this.onChange}/>
          <button type="submit">Add to List</button>
        </form>
        <p style={{color: 'red', display: 'flex', justifyContent: 'center'}}>{error}</p>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <div style={{border: '1px solid black', padding: '40px'}}>
            <h1>Need to Buy</h1>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              {toBuyList.map(el => (<span><input type="checkbox" value={el} checked={false} onClick={this.moveBetweenLists}/>{el}</span>))}
            </div>
          </div>
          <div style={{border: '1px solid black', padding: '40px'}}>
            <h1>In My Cart</h1>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              {cartList.map(el => (<span><input type="checkbox" value={el} checked={true} onClick={this.moveBetweenLists}/>{el}</span>))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';

class App extends Component {
// No need to send props to super unless you are accessing this.props in the constructor
// Furthermore since there is no API call in the constructor, we can forego it entirely  
  
//   constructor(props) { 
//     super(props) 
//     this.state = {
//       input: '',
//       toBuyList: [],
//       cartList: [],
//       error: ''
//     }
//   }
  
  state = {
    input: '',
    toBuyList: [],
    cartList: [],
    error: ''
  }

  // Instead of taking in the whole event, we can destructure the target
  onChange = ({ target }) => this.setState({ input: target.value, error: '' })

  onSubmit = e => {
    // This should always be the first call
    e.preventDefault()
    
    const {input, toBuyList, cartList} = this.state
    const trimmedInput = input.trim()
    const inToBuyList = toBuyList.some(item => item.toLowerCase() === trimmedInput.toLowerCase())
    const inCartList = cartList.some(item => item.toLowerCase() === trimmedInput.toLowerCase())
    if (!inCartList && !inToBuyList) {
      this.setState({ toBuyList: [...toBuyList, trimmedInput], input: '' })
    } else {
      this.setState({ error: 'This item is already in the list.' })
    }
  }
  
  // Same as above, destructure target, this is purely syntactic sugar and isn't a requirement.
  moveBetweenLists = ({ target }) => {
    const {cartList, toBuyList} = this.state
    // You can destructure this
    const { value } = target
    if (target.checked) {
      const index = toBuyList.indexOf(value)
      // >= is two arithmetic expressions, computationally its hardly different
      // but since 0 is a valid value, let's do index > -1
      if (index > -1) {
        this.setState({ cartList: [...cartList, value], toBuyList: toBuyList.filter((el, i) => i !== index) })
      }
    } else {
      const index = cartList.indexOf(value)
      if (index > -1) {
        this.setState({ toBuyList: [...toBuyList, value], cartList: cartList.filter((el, i) => i !== index) })
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

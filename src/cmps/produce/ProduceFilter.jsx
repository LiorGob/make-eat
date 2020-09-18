import React, {Component} from 'react'

export class ProduceFilter extends Component{

state ={
    name: ''
}


onHandleChange = ({ target }) => {
    const field = target.name
    const value = target.value
    this.setState({ [field]: value }, () => this.props.onSetFilter(this.state))

}

render() {
    const { name } = this.state
    return (
        <div className="produce-filter">
            <input className="name-filter" name="name" autoComplete="off" value={name} onChange={this.onHandleChange} placeholder="Enter produce name" />
      
        </div>
    )

}












}
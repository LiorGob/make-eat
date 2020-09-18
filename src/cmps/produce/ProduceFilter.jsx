import React, { Component } from 'react'

export class ProduceFilter extends Component {

    state = {
        name: ''
    }


    onHandleChange = ({ target }) => {
        const { produceList, getFilterProduceList,filterField} = this.props
        const field = target.name
        const value = target.value
        let filteredList = produceList.filter((produce) => produce[filterField].toLowerCase().includes(value.toLowerCase()))
        getFilterProduceList && getFilterProduceList(filteredList)

        this.setState(prevState => ({ ...prevState, [field]: value }))
    }

    render() {
        const { name } = this.state
        return (
            <div className="produce-filter">
                <input type="text" className="name-filter" name="name" autoComplete="off" value={name} onChange={this.onHandleChange} placeholder="Search produce" />

            </div>
        )

    }

}

// const mapStateToProps = state => {
//     return {
//         filterBy: state.produceReducer.filterBy,
//     }
// }



// export const ProduceFilter = connect(mapStateToProps)(_ProduceFilter)
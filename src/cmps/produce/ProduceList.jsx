import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadProduces } from '../../store/actions/produceActions.js'



class _ProduceList extends Component {

    componentDidMount() {
        this.props.loadProduces()
    }
   
    render() {
        const {produces} = this.props
        console.log(produces);
        return (
            <div className="produce-container">
                <ul>
                {
                    produces.map((produce) => {
                        return <li key={produce._id}>
                            <Link to={`/produce/`}>{produce.name}</Link>
                            </li>
                    })
                }
                </ul>
            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        produces: state.produceReducer.produces
    }
}



const mapDispatchToProps = {
    loadProduces
}



export const ProduceList = connect(mapStateToProps, mapDispatchToProps)(_ProduceList)

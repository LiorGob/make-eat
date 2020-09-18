import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadProduces } from '../../store/actions/produceActions.js'
import { ProduceFilter } from './ProduceFilter'



class _ProduceList extends Component {


    state = {
        filterBy: null

    }

    componentDidMount() {
        
        this.props.loadProduces()
    }

    loadProduces = () => {
        this.props.loadProduces(this.state.filterBy)
    }

    onChange = ({ target }) => {
        const newState = JSON.parse(JSON.stringify(this.state));
        newState.addVal = target.value;
        this.setState(newState)
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => this.loadProduces())
    }


    render() {
        const {produces} = this.props
        console.log(produces);
        return (
            
            <div className="produce-container">
                 <ProduceFilter onSetFilter={this.onSetFilter} />
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

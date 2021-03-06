import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadProduces } from '../../store/actions/produceActions.js'

class _ProduceList extends Component {

    state = {
        filterBy: '',
        filterProduceList: []
    }

    async componentDidMount() {
        await this.props.loadProduces()
        const { produces } = this.props
        this.setState({ filterProduceList: produces }, () => console.log())
    }

    loadProduces = () => {
        this.props.loadProduces(this.state.filterBy)
    }

    onChange = ({ target }) => {
        const newState = JSON.parse(JSON.stringify(this.state));
        newState.addVal = target.value;
        this.setState(newState)
    }

    render() {
        // const { produces } = this.props
        return (
            <div className="produce-container">
                <ul>
                    {
                        this.state.filterProduceList.map((produce) => {
                            return <li key={produce._id ? produce._id : produce.produceId}>

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

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../store/actions/userActions'

class _UserDetails extends Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.id);
    }

    render() {
        const {user} = this.props;
        return (
            <div>
                {user.fullName}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    }
}

const mapDispatchToProps = {
    getUser
}



export const UserDetails = connect(mapStateToProps, mapDispatchToProps)(_UserDetails)
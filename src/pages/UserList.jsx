import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadUsers } from '../store/actions/userActions'

class _UserList extends Component {
    
    state = {

    }
    
    componentDidMount() {
        this.props.loadUsers();
    }
    
    render() {
        const {users} = this.props;
        return (
            <div className="users-container">
                <ul>
                {
                    users.map((user) => {
                        return <li key={user._id}>
                            <Link to={`/user/${user._id}`}>{user.fullName}</Link>
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
        users: state.userReducer.users
    }
}

const mapDispatchToProps = {
    loadUsers
}



export const UserList = connect(mapStateToProps, mapDispatchToProps)(_UserList)
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { closeNotification } from '../store/actions/notificationActions';

class _Notification extends Component {
    render() {
        const { txt, type } = this.props.msg;
        return (<div>
            {
            txt && <div className={`notification-box ${type}`}>
                {txt}
                <button onClick={this.props.closeNotification}>Close</button>
            </div>
            }
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        msg: state.notificationReducer.msg
    }
}

const mapDispatchToProps = {
    closeNotification
}

export const Notification = connect(mapStateToProps, mapDispatchToProps)(_Notification)
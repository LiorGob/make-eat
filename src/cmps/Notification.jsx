import React from 'react';
import { connect } from 'react-redux'
import { closeNotification } from '../store/actions/notificationActions';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FavoritesIcon } from '../cmps/icons/FavoritesIcon';

function _Notification(props) {
    const handleClose = () => {
        props.closeNotification();
    };

    function getMsgIcon(iconName) {
        switch (iconName) {
            case 'favorites':
                return <FavoritesIcon style={{ fontSize: 40 }}/>;
            default:
                return <FavoritesIcon style={{ fontSize: 40 }}/>;
        }
    }
    const useStyles = makeStyles((theme) => ({
        modal: {},
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            width: '50%'
        },
    }));
    const classes = useStyles();

    const { txt } = props.msg;
    const open = (txt != null);
    // const [setTimer] = useState({});

    // const setTimer = () => {
    //     setTimeout(handleClose, 3000);
    // }
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal + ' notification'}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper + ' notification-content'}>
                        <div className="notification-icon">{props.msg.icon && getMsgIcon(props.msg.icon)}</div>
                    <h4 id="transition-modal-title">
                        {txt}</h4>
                </div>
            </Fade>
        </Modal>        
    )
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
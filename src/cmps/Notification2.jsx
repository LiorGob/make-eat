import React from 'react';
import { connect } from 'react-redux'
import { closeNotification } from '../store/actions/notificationActions';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { FavoritesIcon } from '../cmps/icons/FavoritesIcon';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
        padding: '0.3em',
        fontSize: '0.5em'
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);


function _Notification2(props) {

    const handleClose = () => {
        props.closeNotification();
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    function getMsgIcon(iconName) {
        switch (iconName) {
            case 'favorites':
                return <FavoritesIcon style={{ fontSize: 40 }} />;
            default:
                return <FavoritesIcon style={{ fontSize: 40 }} />;
        }
    }
    const { txt, type } = props.msg;
    
    var [open, setOpen] = React.useState(false);
    open = (txt != null);
    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}/>
                <DialogContent>
                    <Typography gutterBottom>
                        {props.msg.icon && getMsgIcon(props.msg.icon)}
                        {txt}
          </Typography>
                    
                </DialogContent>
               
            </Dialog>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        msg: state.notificationReducer.msg
    }
}

const mapDispatchToProps = {
    closeNotification
}

export const Notification2 = connect(mapStateToProps, mapDispatchToProps)(_Notification2)
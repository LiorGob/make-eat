import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ColorButton = withStyles((theme) => ({
    root: {
        color: '#ff385c',
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: 'rgba(245, 0, 87, 0.04)',
        },
    },
}))(Button);

export default function SecondaryButton({ onClick, text, classes, startIcon, endIcon, variant }) {
    return (
        <ColorButton variant={variant} color="secondary"
            className={`btn btn-primary${classes ? ' ' + classes : ''}`}
            onClick={onClick}
            startIcon={startIcon}
            endIcon={endIcon}
        >
            {text}
        </ColorButton>
    );
}

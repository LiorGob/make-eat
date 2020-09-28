import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ColorButton = withStyles((theme) => ({
    root: {
        color: '#fff',
        backgroundColor: '#ff385c',
        '&:hover': {
            backgroundColor: '#d4003d',
        },
    },
}))(Button);

export default function PrimaryButton({onClick, text, classes}) {
    return (
        <ColorButton variant="contained" color="primary" className={classes} onClick={onClick}>
            {text}
        </ColorButton>
    );
}

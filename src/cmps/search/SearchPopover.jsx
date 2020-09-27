import React from 'react';
import Popover from '@material-ui/core/Popover';
import Search from './Search';

export function SearchPopover(props) {
    const { onClose, open, anchorEl } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Popover
            id="search-popover-container"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 100, left: 502 }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <div className="search-popover">
                <Search onDoSearch={handleClose} />
            </div>
        </Popover>
    );
}
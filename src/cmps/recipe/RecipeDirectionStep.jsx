import React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export function RecipeDirectionStep({ direction, idx, onDirectionCheck, directionChecked }) {

    function onCheck() {
        return onDirectionCheck(idx)
    }

    let iconClass = directionChecked ? 'check-color' : 'uncheck-color'

    return (
        <li className="clean-list">
            <FormControlLabel
                control={<Checkbox icon={<CheckCircleIcon className={iconClass} />} onClick={onCheck} />}
                label={`Step ${idx + 1}`}
            />
            <div><p>{direction}</p></div>
        </li>
    )
}

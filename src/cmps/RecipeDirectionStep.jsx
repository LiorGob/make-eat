import React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export function RecipeDirectionStep({ direction, idx, onDirectionCheck, directionChecked }) {

    function onCheck() {
        return onDirectionCheck(idx)
    }

    let iconClass = directionChecked ? 'check-color' : 'uncheck-color'

    return (
        <div>
            <li className="clean-list" key={idx} >
                <label className="inline-flex">
                    <CheckCircleIcon className={iconClass} onClick={onCheck} />
                    <span className="font-bold">Step {idx + 1}</span>
                </label>
                <div><p>{direction}</p></div></li>
        </div>
    )
}

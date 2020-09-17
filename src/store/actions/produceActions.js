import {produceService} from '../../services/produceService'

export function loadProduces(filterBy) {
    return async dispatch => {
        try {
            const produces = await produceService.query(filterBy);
            console.log(produces);
            dispatch({ type: 'GET_PRODUCES', produces })
        }
        catch (err) {
            console.log('ProduceAction:err in loadProduces', err);
        }
    };
}


export function getProduce(id) {
    return async dispatch => {
        const produce = await produceService.getById(id)
        dispatch({ type: 'GET_PRODUCE', produce })
        console.log(produce);
    }
}
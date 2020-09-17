import httpService from './httpService'

export const produceService={
    query,
    getById,
    remove,
    save
}


function query(filterBy) {
if (filterBy) var queryStr = `?name=${filterBy.name}&sort=anaAref`;
    return httpService.get(`produce${queryStr || ''}`);
}

function getById(produceId) {
    return httpService.get(`produce/${produceId}`)
}

function remove(produceId) {
    return httpService.delete(`produce/${produceId}`)
}

async function save(produce) {
    if (produce._id) {
        return httpService.put(`produce/${produce._id}`, produce)
    }
    else {
        return  httpService.post('produce', produce)
    }
}

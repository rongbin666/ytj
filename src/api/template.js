import axios from './request'

export function list(data){
    return axios({
        url: '/api/app/template/element/list',
        method: 'get',
        params: data
    })
}
export function exist_by_name(name, id){
    return axios({
        url: '/api/app/template/element/exist_by_name',
        method: 'post',
        data: {
            name: name,
            id: id
        }
    })
}
export function exist_by_title(title, id){
    return axios({
        url: '/api/app/template/element/exist_by_title',
        method: 'post',
        data: {
            title: title,
            id: id
        }
    })
}
export function create(data){
    return axios({
        url: '/api/app/template/element/create',
        method: 'post',
        data: data
    })
}
export function update(data){
    return axios({
        url: '/api/app/template/element/update',
        method: 'post',
        data: data
    })
}
export function getData(data){
    return axios({
        url: '/api/app/template/element/get',
        method: 'get',
        params: data
    })
}
export function remove(data){
    return axios({
        url: '/api/app/template/element/delete',
        method: 'post',
        data: data
    })
}
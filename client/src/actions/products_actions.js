import axios from 'axios';
import { 
    GET_PRODUCTS,
    GET_PRODUCTS_BY_SELL, 
    GET_PRODUCTS_BY_ARRIVAL, 
    GET_RANDOM_PRODUCT,
    GET_BRANDS,
    ADD_BRAND,
    ADD_PRODUCT,
    CLEAR_PRODUCT,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL,
    UPDATE_PRODUCT_DETAIL,
    GET_MODELS, 
    GET_FOOTWEARS,
    ADD_FOOTWEAR,
    GET_PRODUCTS_TO_SHOP
} from './types';

import { PRODUCT_SERVER } from '../components/utils/misc';

export function getProductDetail(id){

    const request = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
    .then(response=>{
        return response.data[0]
    });

    return {
        type: GET_PRODUCT_DETAIL,
        payload: request
    }

}

export function updateProductDetail(dataToSubmit,id){
    const request = axios.post(`${PRODUCT_SERVER}/articles_by_id?id=${id}`,dataToSubmit)
    .then(response => response.data);
    
    return {
        type: UPDATE_PRODUCT_DETAIL,
        payload: request
    }
}

export function clearProductDetail(){
    return {
        type: CLEAR_PRODUCT_DETAIL,
        payload: ''
    }
}

export function getProducts(){
    // /articles?sortBy=createdAt&order-desc&limit=13
    const request = axios.get(`${PRODUCT_SERVER}/articles`)
                    .then(response => response.data);
    return {
        type: GET_PRODUCTS,
        payload: request
    }
}

export function getProductsBySell(){
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
                    .then(response => response.data);
    return {
        type: GET_PRODUCTS_BY_SELL,
        payload: request
    }
}

export function getProductByArrival(){
    // /articles?sortBy=createdAt&order-desc&limit=13
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=16`)
                    .then(response => response.data);
    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }
}

export function getRandomProduct(){
    const request = axios.get(`${PRODUCT_SERVER}/articles_random`)
                    .then(response => response.data);
    return {
        type: GET_RANDOM_PRODUCT,
        payload: request
    }
}

export function getBrands(){
    const request = axios.get(`${PRODUCT_SERVER}/brands`)
                    .then(response => response.data);
    return {
        type: GET_BRANDS,
        payload: request
    }
}

export function addBrand(dataToSubmit, existingBrands){
    const request = axios.post(`${PRODUCT_SERVER}/brand`,dataToSubmit)
                    .then(resposne =>{
                        let brands = [
                            ...existingBrands,
                            resposne.data.brand
                        ];
                        return {
                            success: resposne.data.success,
                            brands
                        }
                    })
    return {
        type: ADD_BRAND,
        payload: request
    }
}

export function getFootwears(){
    const request = axios.get(`${PRODUCT_SERVER}/footwears`)
                    .then(response => response.data);
    return {
        type: GET_FOOTWEARS,
        payload: request
    }
}

export function addFootwear(dataToSubmit, existingFootwears){
    const request = axios.post(`${PRODUCT_SERVER}/footwear`,dataToSubmit)
                    .then(resposne =>{
                        let footwears = [
                            ...existingFootwears,
                            resposne.data.footwear
                        ];
                        return {
                            success: resposne.data.success,
                            footwears
                        }
                    })
    return {
        type: ADD_FOOTWEAR,
        payload: request
    }
}

export function addProduct(dataToSubmit){
    const request = axios.post(`${PRODUCT_SERVER}/article`,dataToSubmit)
                    .then(response => response.data);
                    
    return {
        type: ADD_PRODUCT,
        payload: request
    }
}

export function clearProduct(){
    return {
        type: CLEAR_PRODUCT,
        payload: ''
    }
}
// ///////////////////////////////////////////////////
// CATEGORIES
// //////////////////////////////////////////////////

export function getProductsToShop(id, skip, limit, filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }
    const request = axios.post(`${PRODUCT_SERVER}/shop?brand=${id}`,data)
                    .then(response => {
                        let newState = [
                            ...previousState,
                            ...response.data.articles
                        ]
                    
                        return {
                            size: response.data.size,
                            articles: newState
                        }
                    });
    return {
        type: GET_PRODUCTS_TO_SHOP,
        payload: request
    }
}

export function getModels(id){
    const request = axios.get(`${PRODUCT_SERVER}/articles_by_model?brand=${id}&sortBy=model`)
                    .then(response => response.data);
                    
    return {
        type: GET_MODELS,
        payload: request
    }
}



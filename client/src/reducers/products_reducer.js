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
    UPDATE_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL,
    GET_MODELS, 
    GET_FOOTWEARS,
    ADD_FOOTWEAR,
    GET_PRODUCTS_TO_SHOP
} from '../actions/types';

export default function(state={},action){
    switch(action.type){
        case GET_PRODUCTS:
            return {...state, getProd: action.payload}
        case GET_PRODUCTS_BY_SELL:
            return {...state, bySell: action.payload }
        case GET_PRODUCTS_BY_ARRIVAL:
            return {...state, byArrival: action.payload }
        case GET_RANDOM_PRODUCT:
            return {...state, randomProduct: action.payload}
        case GET_BRANDS:
            return {...state, brands: action.payload}
        case ADD_BRAND:
            return {...state, addBrand: action.payload.success, brands:action.payload.brands}
        case ADD_PRODUCT:
            return {...state, adminAddProduct: action.payload }
        case CLEAR_PRODUCT:
            return {...state, adminAddProduct: action.payload }
        case GET_PRODUCT_DETAIL:
            return {...state, prodDetail: action.payload }
        case UPDATE_PRODUCT_DETAIL:
            return {...state, updateDetail: action.payload}
        case CLEAR_PRODUCT_DETAIL:
            return {...state, prodDetail: action.payload }
        case GET_PRODUCTS_TO_SHOP:
            return {
                ...state,
                toShop: action.payload.articles,
                toShopSize: action.payload.size
            }
        case GET_MODELS:
            return {...state, models: action.payload }
        case GET_FOOTWEARS:
            return {...state, footwears: action.payload }
        case ADD_FOOTWEAR:
            return {...state, addFootwear: action.payload.success, footwears:action.payload.footwears}
        default:
            return state;
    }
}
import {SET_PRODUCT} from '../commons/Constant';

const initialState = {
    page: 1,
    product_name: ''
};

export default function spinReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCT:
            return {
                page: action.data.page,
                product_name: action.data.product_name
            };

        default :
            return state;
    }
}

import {SET_PRODUCT_COLLECT} from '../commons/Constant';

const initialState = {
    page: 1
};

export default function productCollectReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCT_COLLECT:
            return {
                page: action.data.page
            };

        default :
            return state;
    }
}

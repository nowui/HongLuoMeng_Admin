import {SET_BRAND_APPLY} from '../commons/Constant';

const initialState = {
    page: 1
};

export default function brandApplyReducer(state = initialState, action) {
    switch (action.type) {
        case SET_BRAND_APPLY:
            return {
                page: action.data.page
            };

        default :
            return state;
    }
}

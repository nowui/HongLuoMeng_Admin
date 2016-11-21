import {SET_ORDER} from '../commons/Constant';

const initialState = {
    page: 1,
    group_id: ''
};

export default function orderReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ORDER:
            return {
                page: action.data.page
            };

        default :
            return state;
    }
}

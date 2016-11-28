import {SET_ACTIVITY} from '../commons/Constant';

const initialState = {
    page: 1
};

export default function brandReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ACTIVITY:
            return {
                page: action.data.page
            };

        default :
            return state;
    }
}

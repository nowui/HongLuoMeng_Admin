import {SET_ADMIN} from '../commons/Constant';

const initialState = {
    page: 1
};

export default function adminReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ADMIN:
            return {
                page: action.data.page
            };

        default :
            return state;
    }
}

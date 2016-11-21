import {SET_MEMBER} from '../commons/Constant';

const initialState = {
    page: 1
};

export default function memberReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MEMBER:
            return {
                page: action.data.page
            };

        default :
            return state;
    }
}

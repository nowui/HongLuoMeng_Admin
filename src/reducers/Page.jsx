import {SET_PAGE} from '../commons/Constant';

const initialState = {
    page: 1
};

export default function pageReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PAGE:
            return {
                page: action.data.page
            };

        default :
            return state;
    }
}

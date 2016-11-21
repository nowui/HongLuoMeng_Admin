import {SET_CATEGORY} from '../commons/Constant';

const initialState = {
    page: 1
};

export default function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CATEGORY:
            return {
                page: action.data.page
            };

        default :
            return state;
    }
}

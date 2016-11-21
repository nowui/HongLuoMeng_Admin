import {SET_CATEGORY_ATTRIBUTE} from '../commons/Constant';

const initialState = {
    page: 1
};

export default function categoryAttributeReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CATEGORY_ATTRIBUTE:
            return {
                page: action.data.page
            };

        default :
            return state;
    }
}

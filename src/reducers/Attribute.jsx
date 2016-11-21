import {SET_ATTRIBUTE} from '../commons/Constant';

const initialState = {
    page: 1
};

export default function attributeReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ATTRIBUTE:
            return {
                page: action.data.page
            };

        default :
            return state;
    }
}

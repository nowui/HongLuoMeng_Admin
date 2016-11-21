import {SET_OPERATION} from '../commons/Constant';

const initialState = {
    page: 1,
    menu_id: ''
};

export default function operationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_OPERATION:
            return {
                page: action.data.page,
                menu_id: action.data.menu_id
            };

        default :
            return state;
    }
}

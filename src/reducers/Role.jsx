import {SET_ROLE} from '../commons/Constant';

const initialState = {
    page: 1,
    group_id: ''
};

export default function roleReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ROLE:
            return {
                page: action.data.page,
                group_id: action.data.group_id
            };

        default :
            return state;
    }
}

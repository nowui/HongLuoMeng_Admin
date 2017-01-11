import {SET_RANKING} from '../commons/Constant';

const initialState = {
    page: 1
};

export default function rankingReducer(state = initialState, action) {
    switch (action.type) {
        case SET_RANKING:
            return {
                page: action.data.page
            };

        default :
            return state;
    }
}

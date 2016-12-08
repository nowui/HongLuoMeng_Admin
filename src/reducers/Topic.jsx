import {SET_TOPIC} from '../commons/Constant';

const initialState = {
    page: 1
};

export default function topicReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TOPIC:
            return {
                page: action.data.page
            };

        default :
            return state;
    }
}

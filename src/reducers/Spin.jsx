import {SET_SPIN} from '../commons/Constant';

const initialState = {
    isLoad: false
};

export default function spinReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SPIN:
            return {
                isLoad: action.data.isLoad
            };

        default :
            return state;
    }
}

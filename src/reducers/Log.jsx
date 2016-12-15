import {SET_LOG} from '../commons/Constant';

const initialState = {
    page: 1,
    log_url: '',
    log_code: '',
    log_platform: ''
};

export default function logReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOG:
            return {
                page: action.data.page,
                log_url: action.data.log_url,
                log_code: action.data.log_code,
                log_platform: action.data.log_platform
            };

        default :
            return state;
    }
}

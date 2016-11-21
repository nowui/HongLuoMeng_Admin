import { SET_LOG } from '../commons/Constant'

const initialState = {
  page: 1
}

export default function logReducer (state = initialState, action) {
    switch(action.type) {
        case SET_LOG:
            return {
              page : action.data.page
            };

        default : return state;
    }
}

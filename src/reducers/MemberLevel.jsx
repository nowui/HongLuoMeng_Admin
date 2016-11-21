import { SET_MEMBER_LEVEL } from '../commons/Constant'

const initialState = {
  page: 1
}

export default function memberLevelReducer (state = initialState, action) {
    switch(action.type) {
        case SET_MEMBER_LEVEL:
            return {
              page : action.data.page
            };

        default : return state;
    }
}

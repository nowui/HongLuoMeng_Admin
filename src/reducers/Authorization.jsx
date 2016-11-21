import { SET_AUTHORIZATION } from '../commons/Constant'

const initialState = {
  page: 1
}

export default function authorizationReducer (state = initialState, action) {
    switch(action.type) {
        case SET_AUTHORIZATION:
            return {
              page : action.data.page
            };

        default : return state;
    }
}

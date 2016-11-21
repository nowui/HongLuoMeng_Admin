import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import spinReducer from './Spin';
import brandReducer from './Brand';
import productReducer from './Product';
import authorizationReducer from './Authorization';
import adminReducer from './Admin';
import logReducer from './Log';
import attributeReducer from './Attribute';
import memberReducer from './Member';
import operationReducer from './Operation';
import roleReducer from './Role';
import memberLevelReducer from './MemberLevel';
import orderReducer from './Order';

const rootReducer = combineReducers({
    spinReducer,
    brandReducer,
    productReducer,
    authorizationReducer,
    adminReducer,
    logReducer,
    attributeReducer,
    memberReducer,
    operationReducer,
    roleReducer,
    memberLevelReducer,
    orderReducer,
    routing: routerReducer
});

export default rootReducer;

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
import brandApplyReducer from './BrandApply';
import categoryReducer from './Category';
import categoryAttributeReducer from './CategoryAttribute';
import activityReducer from './Activity';
import topicReducer from './Topic';
import pageReducer from './Page';
import productCollectReducer from './ProductCollect';
import rankingReducer from './Ranking';

const rootReducer = combineReducers({
    spinReducer,
    brandReducer,
    brandApplyReducer,
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
    categoryReducer,
    categoryAttributeReducer,
    activityReducer,
    topicReducer,
    pageReducer,
    productCollectReducer,
    rankingReducer,
    routing: routerReducer
});

export default rootReducer;

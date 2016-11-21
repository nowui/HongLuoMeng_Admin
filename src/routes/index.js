import React, { PropTypes } from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import Reducers from '../reducers/Index'

import NotFound from '../views/NotFound'
import Login from '../views/Login'
import Logout from '../views/Logout'
import Main from '../views/Main'
import Index from '../views/Index'

import ProductIndex from '../views/product/Index'
import ProductDetail from '../views/product/Detail'
import ProductCategoryIndex from '../views/product/category/Index'
import ProductCategoryDetail from '../views/product/category/Detail'
import ProductCategoryAttributeIndex from '../views/product/category/attribute/Index'
import ProductCategoryAttributeDetail from '../views/product/category/attribute/Detail'

import BrandIndex from '../views/brand/Index'
import BrandDetail from '../views/brand/Detail'
import BrandCategoryIndex from '../views/brand/category/Index'
import BrandCategoryDetail from '../views/brand/category/Detail'
import BrandApplyIndex from '../views/brand/apply/Index'
import BrandApplyDetail from '../views/brand/apply/Detail'

import AuthorizationIndex from '../views/authorization/Index'
import AuthorizationDetail from '../views/authorization/Detail'

import AdminIndex from '../views/admin/Index'
import AdminDetail from '../views/admin/Detail'
import AdminAuthorization from '../views/admin/authorization'

import GroupIndex from '../views/group/Index'
import GroupDetail from '../views/group/Detail'

import MenuIndex from '../views/menu/Index'
import MenuDetail from '../views/menu/Detail'

import LogIndex from '../views/log/Index'
import LogDetail from '../views/log/Detail'

import AttributeIndex from '../views/attribute/Index'
import AttributeDetail from '../views/attribute/Detail'

import OperationIndex from '../views/operation/Index'
import OperationDetail from '../views/operation/Detail'

import RoleIndex from '../views/role/Index'
import RoleDetail from '../views/role/Detail'
import RoleAuthorization from '../views/role/authorization'

import MemberIndex from '../views/member/Index'
import MemberDetail from '../views/member/Detail'
import MemberLevelIndex from '../views/memberlevel/Index'
import MemberLevelDetail from '../views/memberlevel/Detail'

import CategoryList from '../views/category/List'
import CategoryEdit from '../views/category/Edit'

import OrderIndex from '../views/order/Index'
import OrderDetail from '../views/order/Detail'

import Helper from '../commons/Helper'

const validate = function(next, replace, callback) {
    if (!Helper.getToken() && next.location.pathname != '/login') {
        replace('/login')
    }
    callback()
}

const store = createStore(Reducers)

const history = syncHistoryWithStore(browserHistory, store)

const Routes = ({history = history}) => <Provider store={store}>
  <Router history={history}>
    <Route path="/" onEnter={validate}>
        <IndexRedirect to="index" />
        <Route component={Main}>
            <Route path="index" component={Index}></Route>
            <Route path="product/index" component={ProductIndex}></Route>
            <Route path="product/add" component={ProductDetail}></Route>
            <Route path="product/edit/:product_id" component={ProductDetail}></Route>
            <Route path="product/category/index" component={ProductCategoryIndex}></Route>
            <Route path="product/category/add/:parent_id" component={ProductCategoryDetail}></Route>
            <Route path="product/category/edit/:category_id" component={ProductCategoryDetail}></Route>
            <Route path="product/category/attribute/index/:category_id" component={ProductCategoryAttributeIndex}></Route>
            <Route path="product/category/attribute/add/:category_id" component={ProductCategoryAttributeDetail}></Route>
            <Route path="product/category/attribute/edit/:category_id/:attribute_id" component={ProductCategoryAttributeDetail}></Route>

            <Route path="brand/index" component={BrandIndex}></Route>
            <Route path="brand/add" component={BrandDetail}></Route>
            <Route path="brand/category/index" component={BrandCategoryIndex}></Route>
            <Route path="brand/category/add/:parent_id" component={BrandCategoryDetail}></Route>
            <Route path="brand/category/edit/:category_id" component={BrandCategoryDetail}></Route>
            <Route path="brand/edit/:brand_id" component={BrandDetail}></Route>
            <Route path="brand/apply/index" component={BrandApplyIndex}></Route>
            <Route path="brand/apply/edit/:brand_id/:user_id" component={BrandApplyDetail}></Route>

            <Route path="authorization/index" component={AuthorizationIndex}></Route>
            <Route path="authorization/edit/:authorization_id" component={AuthorizationDetail}></Route>

            <Route path="admin/index" component={AdminIndex}></Route>
            <Route path="admin/add" component={AdminDetail}></Route>
            <Route path="admin/edit/:admin_id" component={AdminDetail}></Route>
            <Route path="admin/authorization/:user_id" component={AdminAuthorization}></Route>

            <Route path="group/index" component={GroupIndex}></Route>
            <Route path="group/add/:parent_id" component={GroupDetail}></Route>
            <Route path="group/edit/:category_id" component={GroupDetail}></Route>

            <Route path="menu/index" component={MenuIndex}></Route>
            <Route path="menu/add/:parent_id" component={MenuDetail}></Route>
            <Route path="menu/edit/:category_id" component={MenuDetail}></Route>

            <Route path="log/index" component={LogIndex}></Route>
            <Route path="log/edit/:log_id" component={LogDetail}></Route>

            <Route path="attribute/index" component={AttributeIndex}></Route>
            <Route path="attribute/add" component={AttributeDetail}></Route>
            <Route path="attribute/edit/:attribute_id" component={AttributeDetail}></Route>

            <Route path="operation/index" component={OperationIndex}></Route>
            <Route path="operation/add/:menu_id" component={OperationDetail}></Route>
            <Route path="operation/edit/:operation_id" component={OperationDetail}></Route>

            <Route path="role/index" component={RoleIndex}></Route>
            <Route path="role/add/:group_id" component={RoleDetail}></Route>
            <Route path="role/edit/:role_id" component={RoleDetail}></Route>
            <Route path="role/authorization/:role_id" component={RoleAuthorization}></Route>

            <Route path="member/index" component={MemberIndex}></Route>
            <Route path="member/edit/:member_id" component={MemberDetail}></Route>
            <Route path="member/level/index" component={MemberLevelIndex}></Route>
            <Route path="member/level/add" component={MemberLevelDetail}></Route>
            <Route path="member/level/edit/:member_level_id" component={MemberLevelDetail}></Route>

            <Route path="category/list" component={CategoryList}></Route>
            <Route path="category/add" component={CategoryEdit}></Route>
            <Route path="category/edit/:category_id" component={CategoryEdit}></Route>

            <Route path="order/index" component={OrderIndex}></Route>
            <Route path="order/edit/:order_id" component={OrderDetail}></Route>
        </Route>
        <Route path="login" component={Login}></Route>
        <Route path="logout" component={Logout}></Route>
        <Route path="*" component={NotFound}></Route>
    </Route>
  </Router>
 </Provider>

Routes.propTypes = {
    history: PropTypes.any,
}

export default Routes

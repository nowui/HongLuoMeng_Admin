import React, {Component} from 'react';
import {withRouter} from 'react-router';
import CategoryAttributeIndex from '../../../category/attribute/Index';

class ProductCategoryAttributeIndex extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onSelectMenu('/product/category/index');
    }

    render() {
        return (
            <CategoryAttributeIndex category_id={this.props.params.category_id} breadcrumb={'商品分类列表'} name={'商品分类属性'}/>
        )
    }
}

export default withRouter(ProductCategoryAttributeIndex);
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import CategoryAttributeDetail from '../../../category/attribute/Detail'

class ProductCategoryAttributeDetail extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.onSelectMenu('/product/category/index')
    }

    render() {
        return (
            <CategoryAttributeDetail category_id={this.props.params.category_id} attribute_id={this.props.params.attribute_id} breadcrumb={'商品分类列表'} name={'商品分类属性'} />
        )
    }
}

export default withRouter(ProductCategoryAttributeDetail)
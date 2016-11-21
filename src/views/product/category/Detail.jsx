import React, { Component } from 'react'
import { withRouter } from 'react-router'
import CategoryDetail from '../../category/Detail'

class ProductCategoryDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            category_id: '',
            parent_id: ''
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/product/category/index')

        if (this.props.route.path.indexOf('edit') > -1) {
            this.setState({
                category_id: this.props.params.category_id
            })
        } else {
            this.setState({
                parent_id: this.props.params.parent_id
            })
        }
    }

    render() {
        return (
            <CategoryDetail category_id={this.state.category_id} parent_id={this.state.parent_id} category_key={'product'} sub_url={'/category'} category_name={'商品分类'} />
        )
    }
}

export default withRouter(ProductCategoryDetail)
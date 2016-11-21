import React, {Component} from 'react';
import {withRouter} from 'react-router';
import CategoryIndex from '../../category/Index';

class ProductCategoryIndex extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onSelectMenu('/brand/category/index');
    }

    render() {
        return (
            <CategoryIndex category_key={'brand'} sub_url={'/category'} category_name={'品牌分类'} operation={[]}/>
        )
    }
}

export default withRouter(ProductCategoryIndex);
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import CategoryIndex from '../category/Index'

class CategoryList extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.onSelectMenu('/category/list')
    }

    render() {
        return (
            <CategoryIndex category_key={''} sub_url={'/category'} category_name={'系统分类'} operation={[]} />
        )
    }
}

export default withRouter(CategoryList)
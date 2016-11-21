import React, { Component } from 'react'
import { withRouter } from 'react-router'
import CategoryDetail from '../category/Detail'

class GroupDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            category_id: '',
            parent_id: ''
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/group/index')

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
            <CategoryDetail category_id={this.state.category_id} parent_id={this.state.parent_id} category_key={'group'} sub_url={''} category_name={'分组'} />
        )
    }
}

export default withRouter(GroupDetail)
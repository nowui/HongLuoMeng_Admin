import React, {Component} from 'react';
import {withRouter} from 'react-router';
import CategoryDetail from '../category/Detail';

class CategoryEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category_id: '',
            parent_id: ''
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/category/list');

        if (this.props.route.path.indexOf('edit') > -1) {
            this.setState({
                category_id: this.props.params.category_id
            });
        } else {
            this.setState({
                parent_id: this.props.params.parent_id
            });
        }
    }

    render() {
        return (
            <CategoryDetail category_id={this.state.category_id} parent_id={this.state.parent_id} category_key={''}
                            sub_url={'/category'} category_name={'系统分类'}/>
        )
    }
}

export default withRouter(CategoryEdit);
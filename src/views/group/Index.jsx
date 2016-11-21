import React, {Component} from 'react';
import {withRouter} from 'react-router';
import CategoryIndex from '../category/Index';

class GroupIndex extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onSelectMenu('/group/index');
    }

    render() {
        return (
            <CategoryIndex category_key={'group'} sub_url={''} category_name={'分组'} operation={[]}/>
        )
    }
}

export default withRouter(GroupIndex);
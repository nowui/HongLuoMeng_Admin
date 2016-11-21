import React, {Component} from 'react';
import {withRouter} from 'react-router';
import CategoryIndex from '../category/Index';

class MenuIndex extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onSelectMenu('/menu/index');
    }

    render() {
        return (
            <CategoryIndex category_key={'menu'} sub_url={''} category_name={'菜单'} operation={[]}/>
        )
    }
}

export default withRouter(MenuIndex);
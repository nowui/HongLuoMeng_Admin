import React, { Component } from 'react'
import { withRouter } from 'react-router'

import Helper from '../commons/Helper'

class Logout extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        Helper.logout()

        this.props.router.push({
            pathname: '/login',
            query: {

            }
        })
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default withRouter(Logout)
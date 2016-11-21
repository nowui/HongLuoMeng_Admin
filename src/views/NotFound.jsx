import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Button} from 'antd';
import styles from './NotFound.less';

class NotFound extends Component {

    handleSubmit(event) {
        event.preventDefault();

        window.history.back();
    }

    render() {
        return (
            <div className={styles.normal}>
                <div className={styles.container}>
                    <h1 className={styles.title}>404</h1>
                    <p className={styles.desc}>未找到该页面</p>
                    <Button type="primary" style={{
                        marginTop: 5
                    }} onClick={this.handleSubmit}>返回上一页</Button>
                </div>
            </div>
        )
    }
}

export default withRouter(NotFound);

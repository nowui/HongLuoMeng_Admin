import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Table, Button} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN, SET_BRAND_APPLY} from '../../../commons/Constant';
import {setAction} from '../../../actions/Index';
import Helper from '../../../commons/Helper';

import styles from '../../Style.less';

class BrandApplyIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: this.props.brandApplyReducer.page,
            total: 0,
            list: []
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/brand/apply/index');

        this.load(this.state.page);
    }

    componentWillUnmount() {
        this.props.setAction(SET_BRAND_APPLY, {
            page: this.state.page,
        });
    }

    onChange = function (currentPage) {
        this.load(currentPage);
    }

    load = function (currentPage) {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/brand/apply/list',
            data: {
                page: currentPage,
                limit: Helper.limit
            },
            success: function (data) {
                self.setState({
                    page: currentPage,
                    total: data.total,
                    list: data.list
                });
            },
            complete: function () {
                self.props.setAction(SET_SPIN, {
                    isLoad: false
                });
            }
        })
    }

    review = function (brand_id, user_id) {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/brand/apply/review',
            data: {
                brand_id: brand_id,
                user_id: user_id
            },
            success: function (data) {
                self.load(self.state.page);
            },
            complete: function () {
                self.props.setAction(SET_SPIN, {
                    isLoad: false
                });
            }
        });
    }

    onClickEdit(brand_id, user_id) {
        this.props.router.push({
            pathname: '/brand/apply/edit/' + brand_id + '/' + user_id,
            query: {}
        });
    }

    render() {
        const columns = [{
            title: '会员名称',
            dataIndex: 'member_real_name',
            key: 'member_real_name'
        }, {
            title: '品牌名称',
            dataIndex: 'brand_name',
            key: 'brand_name'
        }, {
            title: '申请状态',
            dataIndex: 'brand_apply_review_status',
            key: 'brand_apply_review_status'
        }, {
            title: '申请时间',
            dataIndex: 'system_create_time',
            key: 'system_create_time'
        }, {
            width: 150,
            title: '操作',
            dataIndex: '',
            render: (text, record, index) => (
                <span>
                  <a onClick={this.onClickEdit.bind(this, record.brand_id, record.user_id)}>查看</a>
                    {
                        record.brand_apply_review_status ?
                            ''
                            :
                            <span>
                      <span className="ant-divider"/>
                      <a onClick={this.onClickEdit.bind(this, record.brand_id, record.user_id)}>待审核</a>
                    </span>
                    }
                </span>
            )
        }];

        const pagination = {
            current: this.state.page,
            total: this.state.total,
            pageSize: Helper.limit,
            onChange: this.onChange.bind(this)
        };

        return (
            <div>
                <Row className={styles.contentTitle}>
                    <Col span={12}>
                        <h2>品牌代理申请列表</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button type="default" icon="reload" size="default" className="button-reload"
                                onClick={this.load.bind(this, this.state.page)}>刷新</Button>
                    </Col>
                </Row>

                <div className={styles.contentMain}>
                    <Table columns={columns} dataSource={this.state.list} pagination={pagination}/>
                </div>
            </div>
        )
    }
}

export default withRouter(connect((state) => state, {
    setAction
})(BrandApplyIndex));
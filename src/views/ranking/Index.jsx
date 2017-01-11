import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Table, Button, Popconfirm, Form, Select} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN, SET_RANKING} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class RankingIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: this.props.rankingReducer.page,
            total: 0,
            list: []
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/ranking/index');

        this.load(this.state.page);
    }

    componentWillUnmount() {
        this.props.setAction(SET_RANKING, {
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
            url: '/ranking/list',
            data: {
                page: currentPage,
                limit: Helper.limit,
                ranking_type: self.props.form.getFieldValue('ranking_type')
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
        });
    }

    onClicReload() {
        this.load(this.state.page);
    }

    onClickAdd() {
        this.props.router.push({
            pathname: '/ranking/add',
            query: {}
        });
    }

    onClickEdit(ranking_id) {
        this.props.router.push({
            pathname: '/ranking/edit/' + ranking_id,
            query: {}
        });
    }

    onClickDel(ranking_id) {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/ranking/delete',
            data: {
                ranking_id: ranking_id
            },
            success: function (data) {
                Helper.notificationSuccess();

                self.load(self.state.page);
            },
            complete: function () {
                self.props.setAction(SET_SPIN, {
                    isLoad: false
                });
            }
        });
    }

    render() {
        const FormItem = Form.Item;
        const Option = Select.Option;
        const {getFieldDecorator} = this.props.form;

        const columns = [{
            width: 100,
            title: '类型',
            dataIndex: 'ranking_type',
            key: 'ranking_type',
            render: (text, record, index) => (
                <span>
                    {record.ranking_type == 'RED' ? '红榜' : '黑榜'}
                </span>
            )
        }, {
            width: 100,
            title: '排名',
            dataIndex: 'ranking_sort',
            key: 'ranking_sort'
        }, {
            title: '名称',
            dataIndex: 'ranking_name',
            key: 'ranking_name'
        }, {
            width: 100,
            title: '操作',
            dataIndex: '',
            render: (text, record, index) => (
                <span>
                  <a onClick={this.onClickEdit.bind(this, record.ranking_id)}>修改</a>
                  <span className="ant-divider"/>
                  <Popconfirm title={Helper.delete} okText={Helper.yes} cancelText={Helper.no}
                              onConfirm={this.onClickDel.bind(this, record.ranking_id)}>
                    <a>删除</a>
                  </Popconfirm>
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
                        <h2>排行榜列表</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button type="default" icon="reload" size="default" className={styles.buttonReload}
                                onClick={this.onClicReload.bind(this)}>刷新</Button>
                        <Button type="primary" icon="plus-circle" size="default"
                                onClick={this.onClickAdd.bind(this)}>新增</Button>
                    </Col>
                </Row>

                <Form horizontal className={styles.contentSearch}>
                    <Row>
                        <Col sm={8}>
                            <FormItem {...Helper.formItemSearchLayout} label="排名类型" className={styles.contentSearchFormItem}>
                                {getFieldDecorator('ranking_type', {
                                    initialValue: ''
                                })(
                                    <Select style={{
                                        width: Helper.inputSearchWidth
                                    }} placeholder="排名类型">
                                        <Option key="RED" value="RED">红榜</Option>
                                        <Option key="BLACK" value="BLACK">黑榜</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>

                        </Col>
                    </Row>
                </Form>

                <div className={styles.contentSearchMain + ' ' + styles.contentMainSearchPaddingTop}>
                    <Table columns={columns} dataSource={this.state.list} pagination={pagination} bordered/>
                </div>
            </div>
        )
    }
}

RankingIndex = Form.create({})(RankingIndex);

export default withRouter(connect((state) => state, {
    setAction
})(RankingIndex));
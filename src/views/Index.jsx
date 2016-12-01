import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Icon} from 'antd';
import createG2 from 'g2-react';
import {Stat} from 'g2';
import {connect} from 'react-redux';
import {setAction} from '../actions/Index';

import styles from './Style.less';

const data1 = [
    {
        "time": "11/1",
        "price": 10,
        "名称": "流入量"
    },
    {
        "time": "11/1",
        "price": 30,
        "名称": "流出量"
    },
    {
        "time": "11/2",
        "price": 12,
        "名称": "流入量"
    },
    {
        "time": "11/2",
        "price": 32,
        "名称": "流出量"
    },
    {
        "time": "11/3",
        "price": 11,
        "名称": "流入量"
    },
    {
        "time": "11/3",
        "price": 35,
        "名称": "流出量"
    },
    {
        "time": "11/4",
        "price": 15,
        "名称": "流入量"
    },
    {
        "time": "11/4",
        "price": 40,
        "名称": "流出量"
    },
    {
        "time": "11/5",
        "price": 20,
        "名称": "流入量"
    },
    {
        "time": "11/5",
        "price": 42,
        "名称": "流出量"
    },
    {
        "time": "11/6",
        "price": 22,
        "名称": "流入量"
    },
    {
        "time": "11/6",
        "price": 35,
        "名称": "流出量"
    },
    {
        "time": "11/7",
        "price": 21,
        "名称": "流入量"
    },
    {
        "time": "11/7",
        "price": 36,
        "名称": "流出量"
    },
    {
        "time": "11/8",
        "price": 25,
        "名称": "流入量"
    },
    {
        "time": "11/8",
        "price": 31,
        "名称": "流出量"
    },
    {
        "time": "11/9",
        "price": 31,
        "名称": "流入量"
    },
    {
        "time": "11/9",
        "price": 35,
        "名称": "流出量"
    },
    {
        "time": "11/10",
        "price": 32,
        "名称": "流入量"
    },
    {
        "time": "11/10",
        "price": 36,
        "名称": "流出量"
    },
    {
        "time": "11/11",
        "price": 28,
        "名称": "流入量"
    },
    {
        "time": "11/11",
        "price": 40,
        "名称": "流出量"
    },
    {
        "time": "11/12",
        "price": 29,
        "名称": "流入量"
    },
    {
        "time": "11/12",
        "price": 42,
        "名称": "流出量"
    },
    {
        "time": "11/13",
        "price": 40,
        "名称": "流入量"
    },
    {
        "time": "11/13",
        "price": 40,
        "名称": "流出量"
    },
    {
        "time": "11/14",
        "price": 41,
        "名称": "流入量"
    },
    {
        "time": "11/14",
        "price": 38,
        "名称": "流出量"
    },
    {
        "time": "11/15",
        "price": 45,
        "名称": "流入量"
    },
    {
        "time": "11/15",
        "price": 40,
        "名称": "流出量"
    }
];

const data2 = [{
    "name": 14513,
    "carat": 1.35,
    "城市": "上海",
    "color": "J",
    "clarity": "VS2",
    "depth": 61.4,
    "table": 57,
    "price": 5862,
    "x": 7.1,
    "y": 7.13,
    "z": 4.37
}, {
    "name": 28685,
    "carat": 0.3,
    "城市": "北京",
    "color": "G",
    "clarity": "VVS1",
    "depth": 64,
    "table": 57,
    "price": 678,
    "x": 4.23,
    "y": 4.27,
    "z": 2.72
}, {
    "name": 50368,
    "carat": 0.75,
    "城市": "上海",
    "color": "F",
    "clarity": "SI2",
    "depth": 59.2,
    "table": 60,
    "price": 2248,
    "x": 5.87,
    "y": 5.92,
    "z": 3.49
}, {
    "name": 7721,
    "carat": 0.26,
    "城市": "上海",
    "color": "F",
    "clarity": "VS1",
    "depth": 60.9,
    "table": 57,
    "price": 580,
    "x": 4.13,
    "y": 4.11,
    "z": 2.51
}, {
    "name": 31082,
    "carat": 0.33,
    "城市": "杭州",
    "color": "H",
    "clarity": "VVS1",
    "depth": 61.4,
    "table": 59,
    "price": 752,
    "x": 4.42,
    "y": 4.44,
    "z": 2.72
}, {
    "name": 26429,
    "carat": 1.52,
    "城市": "上海",
    "color": "G",
    "clarity": "VVS1",
    "depth": 62.4,
    "table": 55,
    "price": 15959,
    "x": 7.3,
    "y": 7.39,
    "z": 4.58
}, {
    "name": 35900,
    "carat": 0.32,
    "城市": "上海",
    "color": "G",
    "clarity": "IF",
    "depth": 61.3,
    "table": 54,
    "price": 918,
    "x": 4.41,
    "y": 4.47,
    "z": 2.72
}, {
    "name": 27015,
    "carat": 2.25,
    "城市": "上海",
    "color": "I",
    "clarity": "SI2",
    "depth": 62.4,
    "table": 57,
    "price": 17143,
    "x": 8.39,
    "y": 8.32,
    "z": 5.21
}, {
    "name": 30760,
    "carat": 0.25,
    "城市": "杭州",
    "color": "E",
    "clarity": "VVS2",
    "depth": 62.5,
    "table": 59,
    "price": 740,
    "x": 4.04,
    "y": 4.02,
    "z": 2.52
}, {
    "name": 2205,
    "carat": 1.02,
    "城市": "杭州",
    "color": "H",
    "clarity": "I1",
    "depth": 62.5,
    "table": 60,
    "price": 3141,
    "x": 6.39,
    "y": 6.41,
    "z": 4
}, {
    "name": 25584,
    "carat": 2.01,
    "城市": "广东",
    "color": "H",
    "clarity": "SI2",
    "depth": 62.9,
    "table": 55,
    "price": 14426,
    "x": 8.03,
    "y": 8.09,
    "z": 5.07
}, {
    "name": 16788,
    "carat": 0.9,
    "城市": "上海",
    "color": "D",
    "clarity": "VS2",
    "depth": 61.2,
    "table": 56,
    "price": 6689,
    "x": 6.2,
    "y": 6.26,
    "z": 3.81
}, {
    "name": 2468,
    "carat": 0.71,
    "城市": "上海",
    "color": "D",
    "clarity": "VS1",
    "depth": 62.2,
    "table": 55,
    "price": 3192,
    "x": 5.71,
    "y": 5.74,
    "z": 3.56
}, {
    "name": 6508,
    "carat": 1.01,
    "城市": "广东",
    "color": "G",
    "clarity": "SI1",
    "depth": 62.3,
    "table": 59,
    "price": 4064,
    "x": 6.34,
    "y": 6.37,
    "z": 3.96
}, {
    "name": 44895,
    "carat": 0.5,
    "城市": "广东",
    "color": "E",
    "clarity": "VS2",
    "depth": 63.4,
    "table": 58,
    "price": 1629,
    "x": 5.06,
    "y": 5.04,
    "z": 3.2
}, {
    "name": 20653,
    "carat": 1.26,
    "城市": "上海",
    "color": "H",
    "clarity": "VVS2",
    "depth": 61.8,
    "table": 56,
    "price": 8941,
    "x": 6.9,
    "y": 6.93,
    "z": 4.28
}, {
    "name": 38210,
    "carat": 0.43,
    "城市": "上海",
    "color": "F",
    "clarity": "SI1",
    "depth": 61.7,
    "table": 54,
    "price": 1016,
    "x": 4.9,
    "y": 4.86,
    "z": 3.01
}, {
    "name": 13359,
    "carat": 0.24,
    "城市": "广东",
    "color": "E",
    "clarity": "VS2",
    "depth": 62.1,
    "table": 59,
    "price": 419,
    "x": 3.98,
    "y": 4.01,
    "z": 2.48
}, {
    "name": 3260,
    "carat": 0.7,
    "城市": "广东",
    "color": "E",
    "clarity": "VS1",
    "depth": 60.7,
    "table": 57,
    "price": 3358,
    "x": 5.72,
    "y": 5.75,
    "z": 3.48
}, {
    "name": 46272,
    "carat": 0.54,
    "城市": "上海",
    "color": "G",
    "clarity": "VS1",
    "depth": 61.8,
    "table": 54,
    "price": 1754,
    "x": 5.22,
    "y": 5.24,
    "z": 3.23
}, {
    "name": 23875,
    "carat": 2.03,
    "城市": "广东",
    "color": "J",
    "clarity": "SI2",
    "depth": 61.7,
    "table": 61,
    "price": 11968,
    "x": 8.04,
    "y": 8.18,
    "z": 5
}, {
    "name": 17434,
    "carat": 1.41,
    "城市": "杭州",
    "color": "D",
    "clarity": "SI2",
    "depth": 61.1,
    "table": 56,
    "price": 6988,
    "x": 7.19,
    "y": 7.15,
    "z": 4.38
}, {
    "name": 25,
    "carat": 0.31,
    "城市": "广东",
    "color": "J",
    "clarity": "SI1",
    "depth": 58.1,
    "table": 62,
    "price": 353,
    "x": 4.44,
    "y": 4.47,
    "z": 2.59
}, {
    "name": 22130,
    "carat": 1.5,
    "城市": "广东",
    "color": "I",
    "clarity": "VS1",
    "depth": 62.2,
    "table": 59,
    "price": 10164,
    "x": 7.27,
    "y": 7.3,
    "z": 4.53
}, {
    "name": 53295,
    "carat": 0.3,
    "城市": "广东",
    "color": "I",
    "clarity": "VVS1",
    "depth": 60.5,
    "table": 60,
    "price": 552,
    "x": 4.32,
    "y": 4.34,
    "z": 2.62
}, {
    "name": 44404,
    "carat": 0.55,
    "城市": "上海",
    "color": "H",
    "clarity": "SI1",
    "depth": 61.4,
    "table": 56,
    "price": 1584,
    "x": 5.28,
    "y": 5.31,
    "z": 3.25
}, {
    "name": 40387,
    "carat": 0.42,
    "城市": "上海",
    "color": "D",
    "clarity": "VVS2",
    "depth": 61.7,
    "table": 57,
    "price": 1132,
    "x": 4.8,
    "y": 4.82,
    "z": 2.97
}, {
    "name": 11416,
    "carat": 1.5,
    "城市": "其他",
    "color": "H",
    "clarity": "SI2",
    "depth": 66,
    "table": 64,
    "price": 5000,
    "x": 7.1,
    "y": 6.97,
    "z": 4.64
}, {
    "name": 47315,
    "carat": 0.23,
    "城市": "广东",
    "color": "E",
    "clarity": "VVS2",
    "depth": 61.5,
    "table": 59,
    "price": 530,
    "x": 3.95,
    "y": 3.98,
    "z": 2.44
}, {
    "name": 5724,
    "carat": 0.25,
    "城市": "广东",
    "color": "E",
    "clarity": "VVS2",
    "depth": 63,
    "table": 55,
    "price": 575,
    "x": 4,
    "y": 4.03,
    "z": 2.53
}, {
    "name": 30624,
    "carat": 0.3,
    "城市": "杭州",
    "color": "D",
    "clarity": "SI2",
    "depth": 60.2,
    "table": 60,
    "price": 447,
    "x": 4.32,
    "y": 4.35,
    "z": 2.61
}, {
    "name": 9803,
    "carat": 0.9,
    "城市": "广东",
    "color": "D",
    "clarity": "VS2",
    "depth": 63,
    "table": 62,
    "price": 4668,
    "x": 6.06,
    "y": 6.13,
    "z": 3.84
}, {
    "name": 46497,
    "carat": 0.5,
    "城市": "广东",
    "color": "F",
    "clarity": "VVS2",
    "depth": 60.4,
    "table": 61,
    "price": 1778,
    "x": 5.12,
    "y": 5.14,
    "z": 3.1
}, {
    "name": 45329,
    "carat": 0.32,
    "城市": "杭州",
    "color": "E",
    "clarity": "SI1",
    "depth": 61.2,
    "table": 58,
    "price": 524,
    "x": 4.37,
    "y": 4.42,
    "z": 2.69
}, {
    "name": 22424,
    "carat": 1.57,
    "城市": "广东",
    "color": "H",
    "clarity": "SI1",
    "depth": 59.6,
    "table": 58,
    "price": 10447,
    "x": 7.61,
    "y": 7.65,
    "z": 4.55
}, {
    "name": 3143,
    "carat": 0.7,
    "城市": "上海",
    "color": "E",
    "clarity": "SI1",
    "depth": 61.6,
    "table": 56,
    "price": 3330,
    "x": 5.7,
    "y": 5.72,
    "z": 3.52
}, {
    "name": 6815,
    "carat": 1.01,
    "城市": "其他",
    "color": "E",
    "clarity": "SI2",
    "depth": 64.7,
    "table": 55,
    "price": 4118,
    "x": 6.37,
    "y": 6.3,
    "z": 4.1
}, {
    "name": 5947,
    "carat": 0.72,
    "城市": "上海",
    "color": "E",
    "clarity": "VS1",
    "depth": 61.1,
    "table": 57,
    "price": 3947,
    "x": 5.78,
    "y": 5.81,
    "z": 3.54
}, {
    "name": 9084,
    "carat": 1.07,
    "城市": "杭州",
    "color": "G",
    "clarity": "SI2",
    "depth": 62,
    "table": 59,
    "price": 4523,
    "x": 6.54,
    "y": 6.5,
    "z": 4.04
}, {
    "name": 36793,
    "carat": 0.34,
    "城市": "上海",
    "color": "E",
    "clarity": "VS2",
    "depth": 62.6,
    "table": 57,
    "price": 956,
    "x": 4.47,
    "y": 4.45,
    "z": 2.79
}, {
    "name": 4943,
    "carat": 0.76,
    "城市": "上海",
    "color": "D",
    "clarity": "SI1",
    "depth": 62.3,
    "table": 55,
    "price": 3732,
    "x": 5.81,
    "y": 5.84,
    "z": 3.63
}, {
    "name": 52525,
    "carat": 0.8,
    "城市": "上海",
    "color": "F",
    "clarity": "SI2",
    "depth": 62.4,
    "table": 57,
    "price": 2529,
    "x": 5.92,
    "y": 5.97,
    "z": 3.71
}, {
    "name": 46417,
    "carat": 0.55,
    "城市": "上海",
    "color": "D",
    "clarity": "VS2",
    "depth": 61,
    "table": 56,
    "price": 1768,
    "x": 5.31,
    "y": 5.28,
    "z": 3.23
}, {
    "name": 35997,
    "carat": 0.42,
    "城市": "广东",
    "color": "G",
    "clarity": "VS1",
    "depth": 59.4,
    "table": 59,
    "price": 921,
    "x": 4.86,
    "y": 4.9,
    "z": 2.9
}, {
    "name": 25539,
    "carat": 1.5,
    "城市": "广东",
    "color": "G",
    "clarity": "VVS1",
    "depth": 63.1,
    "table": 62,
    "price": 14361,
    "x": 7.25,
    "y": 7.23,
    "z": 4.57
}, {
    "name": 2361,
    "carat": 0.9,
    "城市": "上海",
    "color": "J",
    "clarity": "VS1",
    "depth": 62.5,
    "table": 55,
    "price": 3175,
    "x": 6.18,
    "y": 6.14,
    "z": 3.85
}, {
    "name": 23147,
    "carat": 1.02,
    "城市": "杭州",
    "color": "E",
    "clarity": "VVS1",
    "depth": 61.5,
    "table": 59,
    "price": 11163,
    "x": 6.46,
    "y": 6.41,
    "z": 3.96
}, {
    "name": 39674,
    "carat": 0.42,
    "城市": "上海",
    "color": "G",
    "clarity": "VS2",
    "depth": 62.1,
    "table": 56,
    "price": 1087,
    "x": 4.84,
    "y": 4.79,
    "z": 2.99
}, {
    "name": 42947,
    "carat": 0.3,
    "城市": "广东",
    "color": "F",
    "clarity": "SI2",
    "depth": 63.4,
    "table": 56,
    "price": 506,
    "x": 4.29,
    "y": 4.26,
    "z": 2.71
}, {
    "name": 23762,
    "carat": 1.51,
    "城市": "杭州",
    "color": "F",
    "clarity": "SI1",
    "depth": 61.4,
    "table": 58,
    "price": 11817,
    "x": 7.43,
    "y": 7.35,
    "z": 4.54
}, {
    "name": 47355,
    "carat": 0.5,
    "城市": "上海",
    "color": "E",
    "clarity": "VS2",
    "depth": 63.8,
    "table": 54,
    "price": 1845,
    "x": 5.07,
    "y": 5.05,
    "z": 3.23
}, {
    "name": 35598,
    "carat": 0.31,
    "城市": "上海",
    "color": "H",
    "clarity": "VVS1",
    "depth": 62.7,
    "table": 54,
    "price": 907,
    "x": 4.38,
    "y": 4.33,
    "z": 2.73
}, {
    "name": 43086,
    "carat": 0.61,
    "城市": "上海",
    "color": "I",
    "clarity": "VS2",
    "depth": 62,
    "table": 54,
    "price": 1380,
    "x": 5.44,
    "y": 5.49,
    "z": 3.39
}, {
    "name": 15471,
    "carat": 1.58,
    "城市": "杭州",
    "color": "F",
    "clarity": "SI2",
    "depth": 59.1,
    "table": 59,
    "price": 6194,
    "x": 7.68,
    "y": 7.59,
    "z": 4.51
}, {
    "name": 29072,
    "carat": 0.34,
    "城市": "杭州",
    "color": "D",
    "clarity": "VS2",
    "depth": 59.3,
    "table": 59,
    "price": 687,
    "x": 4.55,
    "y": 4.59,
    "z": 2.71
}, {
    "name": 20868,
    "carat": 1.27,
    "城市": "杭州",
    "color": "E",
    "clarity": "VS2",
    "depth": 61.2,
    "table": 59,
    "price": 9086,
    "x": 7.02,
    "y": 6.97,
    "z": 4.28
}, {
    "name": 51424,
    "carat": 0.85,
    "城市": "北京",
    "color": "J",
    "clarity": "VS1",
    "depth": 63.6,
    "table": 57,
    "price": 2372,
    "x": 6.01,
    "y": 5.94,
    "z": 3.8
}, {
    "name": 27320,
    "carat": 2.18,
    "城市": "杭州",
    "color": "G",
    "clarity": "SI2",
    "depth": 61.9,
    "table": 60,
    "price": 17841,
    "x": 8.24,
    "y": 8.29,
    "z": 5.12
}];

const Line = createG2(chart => {
    chart.line().position('time*price').color('名称').shape('spline').size(2);
    chart.render();
});

const Pie = createG2(chart => {
    chart.coord('theta');
    chart.intervalStack().position(Stat.summary.proportion()).color('城市');
    chart.render();
});

class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            total: 0,
            list: [],
            width: 900,
            height: 350,
            plotCfg: {
                margin: [10, 100, 50, 120],
            }
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/index');
    }

    render() {
        return (
            <div>
                <Row className={styles.contentTitle}>
                    <Col span={12}>
                        <h2>系统首页</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                    </Col>
                </Row>

                <div className={styles.contentMain}>
                    <Row className={styles.contentBoxes}>
                        <Col span={24} className={styles.contentBoxesTitle}>
                            <div><h3>数据统计</h3></div>
                        </Col>
                        <Col span={6} className={styles.contentBoxesCol}>
                            <div className={styles.indexCircle} style={{
                                borderColor: '#2db7f5',
                                backgroundColor: '#2db7f5'
                            }}>
                                <Icon type="notification" className={styles.indexIcon}/>
                            </div>
                            <div className={styles.indexText}>待发货订单</div>
                            <div className={styles.indexNumber}>000</div>
                        </Col>
                        <Col span={6} className={styles.contentBoxesCol}>
                            <div className={styles.indexCircle} style={{
                                borderColor: '#52d2e5',
                                backgroundColor: '#52d2e5'
                            }}>
                                <Icon type="shopping-cart" className={styles.indexIcon}/>
                            </div>
                            <div className={styles.indexText}>昨日订单</div>
                            <div className={styles.indexNumber}>000</div>
                        </Col>
                        <Col span={6} className={styles.contentBoxesCol}>
                            <div className={styles.indexCircle} style={{
                                borderColor: '#fd8c4a',
                                backgroundColor: '#fd8c4a'
                            }}>
                                <Icon type="pay-circle-o" className={styles.indexIcon}/>
                            </div>
                            <div className={styles.indexText}>昨日交易额</div>
                            <div className={styles.indexNumber}>000000.00</div>
                        </Col>
                        <Col span={6} className={styles.contentBoxesCol}>
                            <div className={styles.indexCircle} style={{
                                borderColor: '#ab97d2',
                                backgroundColor: '#ab97d2'
                            }}>
                                <Icon type="user" className={styles.indexIcon}/>
                            </div>
                            <div className={styles.indexText}>昨日用户注册数</div>
                            <div className={styles.indexNumber}>000</div>
                        </Col>
                    </Row>

                    <Row style={{
                        marginTop: '18px',
                        marginBottom: '18px'
                    }}>
                        <Col span={16}>
                            <Row className={styles.contentBoxes}>
                                <Col span={24} className={styles.contentBoxesCol}>
                                    <div><h3>流量走势</h3></div>
                                </Col>
                                <Col span={24} className={styles.contentBoxesCol} style={{
                                    paddingTop: '0px'
                                }}>
                                    <Line data={data1} forceFit={true} width={300} height={300} plotCfg={{
                                        margin: [10, 65, 30, 30]
                                    }} ref="myChart1">
                                    </Line>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8}>
                            <Row className={styles.contentBoxes} style={{
                                marginLeft: '18px'
                            }}>
                                <Col span={24} className={styles.contentBoxesCol}>
                                    <div><h3>区域分布</h3></div>
                                </Col>
                                <Col span={24} className={styles.contentBoxesCol} style={{
                                    paddingTop: '0px'
                                }}>
                                    <Pie data={data2} forceFit={true} width={300} height={300} plotCfg={{
                                        margin: [10, 60, 10, 10]
                                    }} ref="myChart2"/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default withRouter(connect((state) => state, {
    setAction
})(Index));
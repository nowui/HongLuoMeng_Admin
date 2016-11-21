import React from 'react';
import {Modal, Button, Upload, Icon, Spin, Pagination} from 'antd';
import Cropper from 'react-cropper';

import Helper from '../commons/Helper';

import styles from './ModalImage.less';
import 'cropperjs/dist/cropper.css';

let activeMap = new Map();
const limit = 40;

class ModalImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoad: false,
            visible: false,
            isUploadProduct: false,
            page: 1,
            total: 0,
            list: [],
            src: ''
        }
    }

    componentDidMount() {

    }

    check = function (list) {
        let array = list;

        for (let i = 0; i < array.length; i++) {
            array[i].active = false;

            for (let key of activeMap.keys()) {
                if (array[i].url == key) {
                    array[i].active = true;
                }
            }
        }

        this.setState({
            list: array
        });
    }

    load = function (currentPage) {
        let self = this;

        self.setState({
            isLoad: true
        });

        Helper.ajax({
            url: '/upload/list',
            data: {
                page: currentPage,
                limit: limit
            },
            success: function (data) {
                for (let i = 0; i < data.list.length; i++) {
                    data.list[i].url = Helper.host + data.list[i].url;
                    data.list[i].active = false;
                }

                self.setState({
                    page: currentPage,
                    total: data.total
                });

                self.check(data.list);
            },
            complete: function () {
                self.setState({
                    isLoad: false
                });
            }
        })
    };

    onChangePage = function (currentPage) {
        this.load(currentPage);
    };

    onClickOk() {
        let array = [];

        for (let key of activeMap.keys()) {
            array.push(key);
        }

        activeMap.clear();

        this.check(this.state.list);

        this.setState({
            visible: false
        });

        this.props.onClickSubmitImage(array);
    }

    onClickOpen() {
        this.load(1);

        this.setState({
            visible: true
        });
    }

    onClickProduct() {
        this.setState({
            isUploadProduct: true
        });
    }

    onClickNormal() {
        this.setState({
            isUploadProduct: false
        });
    }

    onClickCancel() {
        this.setState({
            visible: false
        });
    }

    onClickActive(url) {
        if (activeMap.has(url)) {
            activeMap.delete(url);
        } else {
            activeMap.set(url, '');
        }

        this.check(this.state.list);
    }

    onChangeCropper(event) {
        let files;
        if (event.dataTransfer) {
            files = event.dataTransfer.files;
        } else if (event.target) {
            files = event.target.files;
        }

        const reader = new FileReader();

        reader.onload = () => {
            this.setState({
                src: reader.result
            });
        }

        reader.readAsDataURL(files[0]);
    }

    onChange(info) {
        if (info.file.status === 'done') {
            this.load(this.state.page);
        }
    }

    onClickUpload() {
        if (this.state.src == '') {
            return;
        }

        let self = this;

        self.setState({
            isLoad: true
        });

        Helper.ajax({
            url: '/upload/base64',
            data: {
                data: this.cropper.getCroppedCanvas().toDataURL()
            },
            success: function (data) {

            },
            complete: function () {
                self.setState({
                    isLoad: false,
                    isUploadProduct: false
                });

                self.load(1);
            }
        })
    }

    render() {
        const props = {
            name: 'file',
            multiple: true,
            showUploadList: false,
            accept: 'image/jpg,image/jpeg,image/png,image/gif',
            action: Helper.host + '/upload/image',
            headers: {
                'token': Helper.getToken(),
                'platform': Helper.platform,
                'version': Helper.version
            },
            onChange: this.onChange.bind(this)
        }

        return (
            <Modal title="我的图片" width={910} visible={this.state.visible} closable={false} maskClosable={false}
                   onOk={this.onClickOk} onCancel={this.onClickCancel} footer={[
                <Button key="product" type="ghost" size="default" icon="cloud-upload"
                        onClick={this.onClickProduct.bind(this)}
                        style={{float: 'left', marginLeft: 5}}>上传等比例图片</Button>,
                <div key="normal" style={{float: 'left', marginLeft: 10}}>
                    <Upload {...props}>
                        <Button type="ghost" onClick={this.onClickNormal.bind(this)}>
                            <Icon type="cloud-upload"/>上传普通图片
                        </Button>
                    </Upload>
                </div>,
                <Button key="back" type="ghost" size="default" icon="cross-circle"
                        onClick={this.onClickCancel.bind(this)}>关闭</Button>,
                <Button key="submit" type="primary" size="default" icon="check-circle"
                        onClick={this.onClickOk.bind(this)}>确定</Button>
            ]}>
                <Spin size="large" spinning={this.state.isLoad}>
                    {
                        this.state.isUploadProduct ?
                            <div style={{minHeight: 570}}>
                                <Cropper
                                    style={{height: 500, width: '100%'}}
                                    aspectRatio={1 / 1}
                                    preview=".img-preview"
                                    guides={false}
                                    src={this.state.src}
                                    ref={cropper => {
                                        this.cropper = cropper;
                                    }}
                                />
                                <br/>
                                <input type="file" onChange={this.onChangeCropper.bind(this)}/>
                                <br/>
                                <Button key="submit" type="primary" size="default" icon="check-circle"
                                        onClick={this.onClickUpload.bind(this)}>上传</Button>
                            </div>
                            :
                            ''
                    }
                    <div style={{display: this.state.isUploadProduct ? 'none' : 'block', minHeight: 545}}>
                        <div style={{clear: 'both', display: 'table', content: ''}}>
                            {
                                this.state.list.map(function (item) {
                                    return (
                                        <div key={item.url}
                                             className={"ant-upload-list ant-upload-list-picture-card " + styles.card}>
                                            <div className="ant-upload-list-item ant-upload-list-item-done"
                                                 style={{padding: '0px'}}>
                                                <div
                                                    className={"ant-upload-list-item-info " + styles.info + " " + (item.active ? styles.active : "")}
                                                    onClick={this.onClickActive.bind(this, item.url)}>
                                                    <a className="ant-upload-list-item-thumbnail" style={{
                                                        backgroundImage: 'url(' + item.url + ')',
                                                        backgroundPosition: 'center',
                                                        backgroundSize: 'contain',
                                                        backgroundRepeat: 'no-repeat'
                                                    }}>
                                                    </a>
                                                </div>
                                                <i className={"anticon anticon-check " + styles.check}
                                                   style={item.active ? {} : {display: 'none'}}
                                                   onClick={this.onClickActive.bind(this, item.url)}/>
                                            </div>
                                        </div>
                                    )
                                }.bind(this))
                            }
                        </div>
                        <div style={{height: '25px'}}>
                            <div style={{float: 'right'}}>
                                <Pagination pageSize={limit} current={this.state.page} total={this.state.total}
                                            onChange={this.onChangePage.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </Spin>
            </Modal>
        )
    }
}

export default ModalImage;

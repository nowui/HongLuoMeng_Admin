import React from 'react';
import ModalImage from './ModalImage';

import Helper from '../commons/Helper';

import styles from './InputImage.less';

class InputImage extends React.Component {
    constructor(props) {
        super(props);
    }

    onClickOpenImage() {
        this.refs.modalImage.onClickOpen();
    }

    onClickSubmitImage(list) {
        let array = [];

        for (let i = 0; i < list.length; i++) {
            let isNotExit = true;

            for (let k = 0; k < this.props.value.length; k++) {
                if (list[i] == this.props.value[k]) {
                    isNotExit = false;

                    break;
                }
            }

            if (isNotExit) {
                list[i] = list[i].replace(Helper.host, '');

                array.push(list[i]);
            }
        }

        if (this.props.limit == 0) {
            this.props.onChangeImage(this.props.value.concat(array));
        } else {
            let a = [];

            for (let k = 0; k < array.length; k++) {
                if (k < this.props.limit) {
                    a.push(array[k]);
                }
            }

            this.props.onChangeImage(a);
        }
    }

    onClickCloseImage(url) {
        let index = -1;
        let array = this.props.value;

        for (let i = 0; i < array.length; i++) {
            if (array[i] == url) {
                index = i;
            }
        }

        array.splice(index, 1);

        this.props.onChangeImage(array);
    }

    render() {
        return (
            <div>
                <div style={{clear: 'both', display: 'table', content: '', minHeight: 100}}>
                    {
                        this.props.value.map(function (item, index) {
                            return (
                                <div key={index}
                                     className={"ant-upload-list ant-upload-list-picture-card " + styles.card}
                                     style={{overflow: 'visible'}}>
                                    <div className="ant-upload-list-item ant-upload-list-item-done"
                                         style={{padding: '0px'}}>
                                        <div className="ant-upload-list-item-info">
                                            <a className="ant-upload-list-item-thumbnail" style={{
                                                backgroundImage: 'url(' + Helper.host + item + ')',
                                                backgroundPosition: 'center',
                                                backgroundSize: 'contain',
                                                backgroundRepeat: 'no-repeat'
                                            }}>
                                            </a>
                                        </div>
                                    </div>
                                    <i className={"anticon anticon-cross-circle " + styles.close}
                                       onClick={this.onClickCloseImage.bind(this, item)}/>
                                </div>
                            )
                        }.bind(this))
                    }
                    <div className="ant-upload ant-upload-select ant-upload-select-picture-card"
                         style={{marginBottom: '0px'}} onClick={this.onClickOpenImage.bind(this)}>
            <span role="button" className="rc-upload">
              <i className={"anticon anticon-plus " + styles.icon}/>
              <div className={styles.text}>添加照片</div>
            </span>
                    </div>
                </div>
                <ModalImage ref="modalImage" onClickSubmitImage={this.onClickSubmitImage.bind(this)}/>
            </div>
        )
    }
}

InputImage.propTypes = {
    limit: React.PropTypes.number,
    value: React.PropTypes.array.isRequired,
    onChangeImage: React.PropTypes.func.isRequired
};

InputImage.defaultProps = {
    limit: 0,
    value: []
};

export default InputImage;

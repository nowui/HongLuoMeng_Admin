import React from 'react'
import ReactDOM from 'react-dom'
import ModalImage from './ModalImage'

class HtmlEditor extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let self = this

    tinymce.init({
      selector: 'textarea#editable',
      height: 500,
      toolbar: 'fontselect fontsizeselect | bold italic underline strikethrough removeformat | mybutton | code',
      menubar: false,
      resize: false,
      border_width: 1,
      convert_urls: false,
      statusbar: false,
      elementpath: false,
      visual: false,
      keep_values: false,
      show_system_default_font: false,
      forced_root_block: 'div',
      plugins: 'code image imagetools code',
      setup: function (editor) {
        self.editor = editor

        editor.addButton('mybutton', {
          icon: 'image',
          tooltip: 'Insert image',
          onclick: function () {
            self.refs.modalImage.onClickOpen()
          }
        })

        editor.on('change', (e) => {
          self.props.onChangeContent(editor.getContent())
        })

        editor.on('init', (e) => {

        })
      }
    })
  }

  componentWillUnmount() {
    this.editor.remove()
  }

  init(content) {
    let self = this

    setTimeout(function() {
      self.editor.setContent(content)
    }, 1000)
  }

  onClickSubmitImage(list) {
    let html = ''

    for(let i = 0; i < list.length; i++) {
      html += '<img src="' + list[i] + '" />'
    }

    this.editor.insertContent(html)
  }

  onChangeContent(e, editor) {
    this.props.onChangeContent(editor.getContent())
  }

  render() {
    const config = {
      menubar: false,
      toolbar1: 'fontselect fontsizeselect | bold italic underline strikethrough removeformat | forecolor backcolor',
      toolbar2: false,
      statusbar: false
    }
    return (
      <div>
        <textarea id="editable"></textarea>
        <ModalImage ref="modalImage" onClickSubmitImage={this.onClickSubmitImage.bind(this)} />
      </div>
    )
  }
}

HtmlEditor.propTypes = {
    onChangeContent: React.PropTypes.func.isRequired
}

export default HtmlEditor

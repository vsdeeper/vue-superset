<template>
  <div class="tinymce-editor">
    <editor v-model="myValue"
      :init="init"
      :disabled="disabled"
      @onClick="onClick">
    </editor>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/media'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/link'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
export default {
  name: 'tinymce-editor',
  components: {
    Editor
  },
  data () {
    return {
      myValue: this.value,
      init: {
        language: this.language,
        base_url: this.baseUrl,
        height: this.height,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          if (this.uploadHandlerMode === 'base64') {
            // 转base64方法
            const filename = blobInfo.filename()
            const idx = filename.lastIndexOf('.')
            const format = filename.slice(idx + 1)
            const img = 'data:image/' + format + ';base64,' + blobInfo.base64()
            success(img)
          } else {
            // 和服务端交互方法
            const files = blobInfo.blob()
            this.$http.upload('/uploadFileToOss', files, this.uploadOptions).then(d => {
              const url = d.url[0]
              success(url)
            }).catch(err => {
              failure(err)
            })
          }
        }
      }
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    language: {
      type: String,
      default: 'zh_CN'
    },
    value: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 300
    },
    baseUrl: {
      type: String,
      default: './tinymce/'
    },
    uploadHandlerMode: {
      type: String,
      default: 'http' // http|base64
    },
    uploadPath: {
      type: String,
      default: '/uploadFileToOss'
    },
    uploadOptions: {
      type: Object,
      default () {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'link lists image imagetools media wordcount'
    },
    toolbar: {
      type: [String, Array],
      default: 'undo redo | fontsizeselect | fontselect | formatselect | link bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image imagetools media | removeformat'
    }
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    onClick (e) {
      this.$emit('onClick', e, tinymce)
    },
    clear () {
      this.myValue = ''
    }
  },
  watch: {
    myValue (n) {
      this.$emit('input', n)
    },
    value (n) {
      this.myValue = n
    }
  }
}
</script>

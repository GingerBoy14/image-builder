import PropTypes from 'prop-types'
import { useState } from 'react'
import { Button, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import { v5 as uuidv5, v4 as uuidv4 } from 'uuid'
import storage from '~/services/storage'

const STORAGE_URL = 'backgrounds/'

/**
 * @info Uploader (27 Mar 2021) // CREATION DATE
 *
 * @comment Uploader - React component.
 *
 * @since 28 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const Uploader = (props) => {
  // [INTERFACE]
  const { onUploaded } = props
  // [COMPONENT_STATE_HOOKS]
  const [loading, setLoading] = useState(false)

  // [HELPER_FUNCTIONS]
  const onUploadAvatar = async (data) => {
    const { file } = data
    setLoading(true)
    try {
      const MY_NAMESPACE = uuidv4()
      const avatarRef = storage
        .ref()
        .child(STORAGE_URL + uuidv5(file.name, MY_NAMESPACE))
        .put(file)

      avatarRef.on(
        'state_changed',
        () => {},
        () => {},
        async () => {
          try {
            const imageURL = await avatarRef.snapshot.ref.getDownloadURL()
            onUploaded(imageURL)
          } catch (error) {
            console.log(error.message)
          }
          setLoading(false)
        }
      )
    } catch (error) {
      message.error(error.message)
    }
  }

  // [TEMPLATE]
  return (
    <ImgCrop rotate>
      <Upload showUploadList={false} customRequest={onUploadAvatar}>
        <Button size="small" loading={loading} icon={<UploadOutlined />}>
          Upload
        </Button>
      </Upload>
    </ImgCrop>
  )
}

Uploader.propTypes = {
  onUploaded: PropTypes.func
}

export default Uploader

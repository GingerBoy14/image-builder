import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { Button, Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import { v5 as uuidv5, v4 as uuidv4 } from 'uuid'
import { ScissorOutlined, UploadOutlined } from '@ant-design/icons'
import storage from '~/services/storage'

const STORAGE_URL = 'backgrounds/'

/**
 * @info Uploader (27 Mar 2021) // CREATION DATE
 *
 * @comment Uploader - React component.
 *
 * @since 02 Apr 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const Uploader = (props) => {
  // [INTERFACE]
  const { onUploaded, withCrop, isLoading } = props

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

  // [USE_EFFECTS]
  useEffect(() => isLoading?.(loading), [loading, isLoading])

  // [TEMPLATE]
  if (withCrop) {
    return (
      <ImgCrop rotate>
        <Upload showUploadList={false} customRequest={onUploadAvatar}>
          <Button size="small" loading={loading} icon={<ScissorOutlined />}>
            With crop
          </Button>
        </Upload>
      </ImgCrop>
    )
  } else {
    return (
      <Upload showUploadList={false} customRequest={onUploadAvatar}>
        <Button size="small" loading={loading} icon={<UploadOutlined />}>
          Without crop
        </Button>
      </Upload>
    )
  }
}

Uploader.propTypes = {
  onUploaded: PropTypes.func,
  withCrop: PropTypes.bool,
  isLoading: PropTypes.func
}

export default Uploader

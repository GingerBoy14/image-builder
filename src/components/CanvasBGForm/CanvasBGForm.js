import PropTypes from 'prop-types'
import { Title, Row, Col, Box, Text, Remove } from 'antd-styled'
import ColorPicker from '../ColorPicker'
import Uploader from '../Uploader'
import { CloseCircleOutlined } from '@ant-design/icons'
import { Space } from 'antd'

/**
 * @info CanvasBgForm (27 Mar 2021) // CREATION DATE
 *
 * @comment CanvasBgForm - React component.
 *
 * @since 27 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const CanvasBgForm = (props) => {
  // [INTERFACES]
  const { onColorSelect, onImageUpload, onImageReset, background } = props

  // [HELPER_FUNCTIONS]
  const onColorChange = (color) => {
    onColorSelect(color.hex)
  }

  // [TEMPLATE]
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Title level={3}>Background</Title>
      </Col>
      <Col span={24}>
        <ColorPicker color={background.color} onChange={onColorChange} />
      </Col>
      <Col span={24}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="baseline">
          <Text>Image</Text>
          <Space size={!background.imageURL ? 0 : 'small'}>
            <Uploader onUploaded={onImageUpload} />
            {background.imageURL && (
              <Remove
                size="small"
                type="text"
                shape="default"
                tooltip="Remove background image"
                popconfirmPlacement="left"
                tooltipPlacement="left"
                itemName="image"
                question="Remove"
                onSubmit={onImageReset}
                icon={<CloseCircleOutlined />}
              />
            )}
          </Space>
        </Box>
      </Col>
    </Row>
  )
}

CanvasBgForm.propTypes = {
  background: PropTypes.shape({
    color: PropTypes.string,
    imageURL: PropTypes.string
  }),
  onColorSelect: PropTypes.func
}

export default CanvasBgForm

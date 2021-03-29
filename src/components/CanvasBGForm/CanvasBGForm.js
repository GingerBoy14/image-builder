import PropTypes from 'prop-types'
import { Title, Row, Col, Box, Text } from 'antd-styled'
import ColorPicker from '../ColorPicker'
import Uploader from '../Uploader'

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
  const { onColorSelect, onImageUpload, color } = props

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
        <ColorPicker color={color} onChange={onColorChange} />
      </Col>
      <Col span={24}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="baseline">
          <Text>Image</Text>
          <Uploader onUploaded={onImageUpload} />
        </Box>
      </Col>
    </Row>
  )
}

CanvasBgForm.propTypes = {
  color: PropTypes.string,
  onColorSelect: PropTypes.func
}

export default CanvasBgForm

import PropTypes from 'prop-types'
import { Title, Row, Col } from 'antd-styled'
import ColorPicker from '../ColorPicker'

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
  const { onColorSelect, color } = props

  // [HELPER_FUNCTIONS]
  const onColorChange = (color) => {
    onColorSelect(color.hex)
  }

  // [TEMPLATE]
  return (
    <Row>
      <Col span={24}>
        <Title level={3}>Background</Title>
      </Col>
      <Col flex={1}>
        <ColorPicker color={color} onChange={onColorChange} />
      </Col>
    </Row>
  )
}

CanvasBgForm.propTypes = {
  color: PropTypes.string,
  onColorSelect: PropTypes.func
}

export default CanvasBgForm

import PropTypes from 'prop-types'
import { Row, Col, Checkbox } from 'antd'
import { Box, Text } from 'antd-styled'
import { Remove } from 'antd-styled'
import { DeleteOutlined } from '@ant-design/icons'
import { PositionSelect } from '~/components/selects'
import ColorPicker from '~/components/ColorPicker'
import { POSITION_KEYS } from '~/constants'

/**
 * @info FiguresForm (05 Apr 2021) // CREATION DATE
 *
 * @comment FiguresForm - React component.
 *
 * @since 06 Apr 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const FiguresForm = (props) => {
  // [INTERFACE]
  const { onFormDelete, position } = props

  // [TEMPLATE]
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Box display="flex" justifyContent="space-between" alighIntems="center">
          <Text>Random</Text>
          <Checkbox />
        </Box>
      </Col>
      <Col span={24}>
        <ColorPicker />
      </Col>
      <Col span={24}>
        <PositionSelect value={position} />
      </Col>
      <Col span={24}>
        <Remove
          type="primary"
          size="small"
          shape="default"
          icon={<DeleteOutlined />}
          itemName="figure"
          onSubmit={onFormDelete}
          block>
          Delete figure
        </Remove>
      </Col>
    </Row>
  )
}

FiguresForm.propTypes = {
  position: PropTypes.oneOf(POSITION_KEYS),
  onFormDelete: PropTypes.func
}

export default FiguresForm

import PropTypes from 'prop-types'
import { Title, Row, Col } from 'antd-styled'
import { InputNumber } from 'antd'

/**
 * @info SizeForm (27 Mar 2021) // CREATION DATE
 *
 * @comment SizeForm - React component.
 *
 * @since 05 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const SizeForm = (props) => {
  // [INTERFACES]
  const { onSizeChange, dimension } = props

  // [HELPER_FUNCTION]
  const setWidth = (width) => {
    onSizeChange({ ...dimension, width })
  }
  const setHeight = (height) => {
    onSizeChange({ ...dimension, height })
  }

  // [TEMPLATE]
  return (
    <Row>
      <Col span={24}>
        <Title level={3}>Size</Title>
      </Col>
      <Col span={24}>
        <Row wrap={false}>
          <Col flex={1}>
            <SizeInput onChange={setWidth} value={dimension.width} />
          </Col>
          <Col flex={1}>
            <SizeInput onChange={setHeight} value={dimension.height} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const SizeInput = (props) => (
  <InputNumber
    min={0}
    formatter={(value) => `${value} px`}
    parser={(value) => value.replace('px', '')}
    style={{ width: '100%' }}
    {...props}
  />
)

SizeForm.propTypes = {
  onSizeChange: PropTypes.func
}

export default SizeForm

import PropTypes from 'prop-types'
import { Col, Row } from 'antd'
import { Remove } from 'antd-styled'
import { DeleteOutlined } from '@ant-design/icons'
import { PositionSelect } from '~/components/selects'
import Uploader from '~/components/Uploader'

/**
 * @info TypographyForm (05 Apr 2021) // CREATION DATE
 *
 * @comment TypographyForm - React component.
 *
 * @since 06 Apr 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const ImagesForm = (props) => {
  // [INTERFACE]
  const { onFormDelete, position } = props

  // [TEMPLATE]
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Uploader />
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
          itemName="image"
          onSubmit={onFormDelete}
          block>
          Delete image
        </Remove>
      </Col>
    </Row>
  )
}

ImagesForm.propTypes = {
  onFormDelete: PropTypes.func
}

export default ImagesForm

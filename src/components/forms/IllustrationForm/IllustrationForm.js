import PropTypes from 'prop-types'
import { Col, Row, Title } from 'antd-styled'
import { Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

/**
 * @info TypographyForm (05 Apr 2021) // CREATION DATE
 *
 * @comment TypographyForm - React component.
 *
 * @since 05 Apr 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const IllustrationForm = (props) => {
  return (
    <Row>
      <Col span={24}>
        <Title level={3}>Illustrations</Title>
      </Col>
      <Col span={24}>
        <Row>
          <Col flex={1}>
            <Button icon={<PlusCircleOutlined />} block>
              Add image
            </Button>
          </Col>
          <Col flex={1}>
            <Button icon={<PlusCircleOutlined />} block>
              Add figure
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

IllustrationForm.propTypes = {}

export default IllustrationForm

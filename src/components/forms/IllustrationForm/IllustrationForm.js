import PropTypes from 'prop-types'
import { useState } from 'react'
import { Col, Row, Title } from 'antd-styled'
import { Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import ImagesForm from '~/components/forms/ImagesForm'
import FiguresForm from '~/components/forms/FiguresForm'
import { POSITION_KEYS } from '~/constants'

/**
 * @info TypographyForm (05 Apr 2021) // CREATION DATE
 *
 * @comment TypographyForm - React component.
 *
 * @since 06 Apr 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const FORM_TYPES_MAP = {
  FIGURE: { name: 'FIGURE', Form: FiguresForm },
  IMAGE: { name: 'IMAGE', Form: ImagesForm }
}

const IllustrationForm = (props) => {
  // [COMPONENT_STATE_HOOKS]
  const [items, setItem] = useState([])

  // [HELPER_FUNCTIONS]
  const onFigureFormAdd = () => {
    const id = uuidv4()

    const figureForm = {
      id,
      type: FORM_TYPES_MAP.FIGURE.name,
      formData: { figure: null, position: POSITION_KEYS[0], color: '' }
    }

    setItem([...items, figureForm])
  }
  const onImageFormAdd = () => {
    const id = uuidv4()

    const imageForm = {
      id,
      type: FORM_TYPES_MAP.IMAGE.name,
      formData: {
        imageURL: 'null',
        position: POSITION_KEYS[0]
      }
    }

    setItem([...items, imageForm])
  }

  // [TEMPLATE]
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Title level={3}>Illustrations</Title>
      </Col>
      <Col span={24}>
        <Row>
          <Col flex={1}>
            <Button
              icon={<PlusCircleOutlined />}
              onClick={onImageFormAdd}
              block>
              Add image
            </Button>
          </Col>
          <Col flex={1}>
            <Button
              icon={<PlusCircleOutlined />}
              onClick={onFigureFormAdd}
              block>
              Add figure
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          {items.map((item) => {
            const { id, type, formData } = item
            const onDelete = () => {
              const filteredItems = _.filter(items, (form) => form.id !== id)
              setItem(filteredItems)
            }
            const Form = FORM_TYPES_MAP[type].Form

            return (
              <Col span={24}>
                <Form onFormDelete={onDelete} {...formData} />
              </Col>
            )
          })}
        </Row>
      </Col>
    </Row>
  )
}

IllustrationForm.propTypes = {}

export default IllustrationForm

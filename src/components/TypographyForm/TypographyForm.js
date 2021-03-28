import PropTypes from 'prop-types'
import { Input, InputNumber, Select } from 'antd'
import { Title, Row, Col, Box, Text } from 'antd-styled'
import ColorPicker from '../ColorPicker'
import { POSITION_KEYS } from '~/constants'

const { TextArea } = Input

/**
 * @info TypographyForm (27 Mar 2021) // CREATION DATE
 *
 * @comment TypographyForm - React component.
 *
 * @since 27 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const TypographyForm = (props) => {
  const { textConfig, setTextConfig } = props

  const onColorChange = (color) => {
    setTextConfig({ ...textConfig, color: color.hex })
  }

  return (
    <Row>
      <Col span={24}>
        <Title level={3}>Typography</Title>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Input
              value={textConfig.titleText}
              placeholder="Title"
              onChange={(e) => {
                if (e.target.value) {
                  setTextConfig({ ...textConfig, titleText: e.target.value })
                } else {
                  setTextConfig({ ...textConfig, titleText: undefined })
                }
              }}
            />
          </Col>
          <Col span={24}>
            <TextArea
              value={textConfig.subTitleText}
              placeholder="Subtitle"
              onChange={(e) => {
                if (e.target.value) {
                  setTextConfig({ ...textConfig, subTitleText: e.target.value })
                } else {
                  setTextConfig({ ...textConfig, subTitleText: undefined })
                }
              }}
            />
          </Col>
          <Col span={24}>
            <Box display="flex" justifyContent="space-between">
              <Text>Title Font Size</Text>
              <InputNumber
                value={textConfig.titleFontSize}
                onChange={(size) =>
                  setTextConfig({ ...textConfig, titleFontSize: size })
                }
              />
            </Box>
          </Col>
          <Col span={24}>
            <Box display="flex" justifyContent="space-between">
              <Text>Sub Title Font Size</Text>
              <InputNumber
                value={textConfig.subTitleFontSize}
                onChange={(size) =>
                  setTextConfig({ ...textConfig, subTitleFontSize: size })
                }
              />
            </Box>
          </Col>
          <Col span={24}>
            <Box display="flex" justifyContent="space-between">
              <Text>Position</Text>
              <Select
                options={POSITION_KEYS.map((positionKey) => ({
                  label: positionKey,
                  value: positionKey
                }))}
                onSelect={(value) =>
                  setTextConfig({ ...textConfig, placement: value })
                }
                value={textConfig.placement}
              />
            </Box>
          </Col>
          <Col span={24}>
            <ColorPicker color={textConfig.color} onChange={onColorChange} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

TypographyForm.propTypes = {
  textConfig: PropTypes.shape({
    placement: PropTypes.oneOf(POSITION_KEYS),
    color: PropTypes.string,
    titleText: PropTypes.string,
    subTitleText: PropTypes.string,
    subTitleFontSize: PropTypes.number,
    titleFontSize: PropTypes.number
  }),
  setTextConfig: PropTypes.func
}

export default TypographyForm

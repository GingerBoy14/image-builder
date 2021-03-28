import PropTypes from 'prop-types'
import { Input, InputNumber, Select } from 'antd'
import { Title, Row, Col, Box, Text } from 'antd-styled'
import ColorPicker from '../ColorPicker'
import { POSITION_KEYS } from '~/constants'
import FontPicker from 'font-picker-react'

const { TextArea } = Input

/**
 * @info TypographyForm (27 Mar 2021) // CREATION DATE
 *
 * @comment TypographyForm - React component.
 *
 * @since 28 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
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
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="baseline">
              <Text>Text Font Family</Text>
              <FontPicker
                apiKey={process.env.REACT_APP_GOOGLE_FONT_API_KEY}
                activeFontFamily={textConfig.textFontFamily}
                limit={100}
                sort="popularity"
                onChange={(nextFont) =>
                  setTextConfig({
                    ...textConfig,
                    textFontFamily: nextFont.family
                  })
                }
              />
            </Box>
          </Col>
          <Col span={24}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="baseline">
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
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="baseline">
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
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="baseline">
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
    titleFontSize: PropTypes.number,
    textFontFamily: PropTypes.string
  }),
  setTextConfig: PropTypes.func
}

export default TypographyForm

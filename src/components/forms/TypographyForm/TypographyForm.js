import PropTypes from 'prop-types'
import { useState } from 'react'
import { Input, InputNumber, Select, Space } from 'antd'
import { Title, Row, Col, Box, Text } from 'antd-styled'
import { FontColorsOutlined, FontSizeOutlined } from '@ant-design/icons'
import _ from 'lodash'
import { PositionSelect, FontFamilySelect } from '~/components/selects'
import ColorPicker from '~/components/ColorPicker'
import { POSITION_KEYS, FONT_WEIGHTS } from '~/constants'
import GoogleFontLoader from 'react-google-font-loader'

const { TextArea } = Input

/**
 * @info TypographyForm (27 Mar 2021) // CREATION DATE
 *
 * @comment TypographyForm - React component.
 *
 * @since 04 Apr 2021 ( v.0.0.7 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

let fonts = []

const TypographyForm = (props) => {
  // [INTERFACES]
  const { textConfig, setTextConfig } = props

  // [COMPONENT_STATE_HOOKS]
  const [loading, setLoading] = useState(true)
  const [weights, setWeights] = useState([])

  // [HELPER_FUNCTION]
  const onColorChange = (color) => {
    setTextConfig({ ...textConfig, color })
  }
  const onFontsLoaded = (allFonts, defaultWeight) => {
    fonts = allFonts
    setTextConfig({
      ...textConfig,
      textFontFamily: fonts[0]?.font,
      textFontWeight: defaultWeight
    })
    setWeights(fonts[0]?.weights)
    setLoading(false)
  }

  // [TEMPLATE]
  return (
    <>
      <GoogleFontLoader fonts={fonts} />
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
                  setTextConfig({
                    ...textConfig,
                    titleText: e.target.value || undefined
                  })
                }}
              />
            </Col>
            <Col span={24}>
              <TextArea
                value={textConfig.subTitleText}
                placeholder="Subtitle"
                onChange={(e) => {
                  setTextConfig({
                    ...textConfig,
                    subTitleText: e.target.value || undefined
                  })
                }}
              />
            </Col>
            <Col span={24}>
              <FontFamilySelect
                value={textConfig.textFontFamily}
                onFontsLoaded={onFontsLoaded}
                onFontSelect={(fontFamily, fonts) => {
                  setTextConfig({
                    ...textConfig,
                    textFontFamily: fontFamily,
                    textFontWeight: FONT_WEIGHTS['regular'].value
                  })
                  setWeights(_.find(fonts, ['font', fontFamily])?.weights)
                }}
              />
            </Col>
            <Col span={24}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center">
                <Text>Text Font Weight</Text>
                <Select
                  value={textConfig.textFontWeight}
                  options={weights?.map((weight) => ({
                    label: (
                      <Text
                        style={{
                          fontWeight: FONT_WEIGHTS[weight].value,
                          fontStyle: FONT_WEIGHTS[weight]?.style
                        }}>
                        {FONT_WEIGHTS[weight].label}
                      </Text>
                    ),
                    value: FONT_WEIGHTS[weight].value
                  }))}
                  loading={loading}
                  onSelect={(weight) => {
                    setTextConfig({
                      ...textConfig,
                      textFontWeight: weight
                    })
                  }}
                  style={{ minWidth: '150px' }}
                />
              </Box>
            </Col>
            <Col span={24}>
              <FontSizeInput
                label="Title Font Size"
                value={textConfig.titleFontSize}
                onChange={(size) =>
                  setTextConfig({ ...textConfig, titleFontSize: size })
                }
              />
            </Col>
            <Col span={24}>
              <FontSizeInput
                label="Sub Title Font Size"
                value={textConfig.subTitleFontSize}
                onChange={(size) =>
                  setTextConfig({ ...textConfig, subTitleFontSize: size })
                }
              />
            </Col>
            <Col span={24}>
              <PositionSelect
                onSelect={(value) =>
                  setTextConfig({ ...textConfig, placement: value })
                }
                value={textConfig.placement}
              />
            </Col>
            <Col span={24}>
              <ColorPicker
                color={textConfig.color}
                onChange={onColorChange}
                icon={<FontColorsOutlined />}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

const FontSizeInput = (props) => {
  const { label, ...rest } = props
  return (
    <Box display="flex" justifyContent="space-between" alignItems="baseline">
      <Space>
        <FontSizeOutlined />
        <Text>{label}</Text>
      </Space>
      <InputNumber {...rest} />
    </Box>
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

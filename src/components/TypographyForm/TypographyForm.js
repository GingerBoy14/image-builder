import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Input, InputNumber, Select } from 'antd'
import { Title, Row, Col, Box, Text } from 'antd-styled'
import ColorPicker from '../ColorPicker'
import { POSITION_KEYS } from '~/constants'
import GoogleFontLoader from 'react-google-font-loader'
import _ from 'lodash'

const { TextArea } = Input

/**
 * @info TypographyForm (27 Mar 2021) // CREATION DATE
 *
 * @comment TypographyForm - React component.
 *
 * @since 3 Apr 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */
const fonts = []

const FONT_WEIGHTS = {
  100: { label: 'thin', value: 100 },
  200: { label: 'extra-light', value: 200 },
  300: { label: 'light', value: 300 },
  regular: { label: 'regular', value: 400 },
  500: { label: 'medium', value: 500 },
  600: { label: 'semi-bold', value: 600 },
  700: { label: 'bold', value: 700 },
  800: { label: 'extra-bold', value: 800 },
  900: { label: 'black', value: 900 },
  italic: { label: 'italic', value: 'italic', style: 'italic' }
}

const TypographyForm = (props) => {
  // [INTERFACES]
  const { textConfig, setTextConfig } = props

  // [COMPONENT_STATE_HOOKS]
  const [loading, setLoading] = useState(false)
  const [weights, setWeights] = useState([])

  // [HELPER_FUNCTION]
  const onColorChange = (color) => {
    setTextConfig({ ...textConfig, color: color.hex })
  }

  // [COMPUTED]
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${process.env.REACT_APP_GOOGLE_FONT_API_KEY}`
      )
      const googleFonts = await response.json()
      fonts.push(
        ...googleFonts.items.slice(0, 20).map((font) => ({
          font: font.family,
          weights: font.variants.filter(
            (variant) =>
              (variant.match(/^[0-9]+$/) || variant.match(/^[a-zA-Z]+$/)) &&
              variant
          )
        }))
      )
      setTextConfig({
        ...textConfig,
        textFontFamily: fonts[0]?.font
      })
      setWeights(fonts[0]?.weights)
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) return <div>loading</div>
  return (
    <Row>
      <GoogleFontLoader fonts={fonts} />
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
              alignItems="center">
              <Text>Text Font Family</Text>
              <Select
                defaultValue={fonts[0]?.font}
                options={fonts.map((font) => ({
                  label: font.font,
                  value: font.font
                }))}
                onSelect={(fontFamily) => {
                  setTextConfig({
                    ...textConfig,
                    textFontFamily: fontFamily
                  })
                  setWeights(_.find(fonts, ['font', fontFamily])?.weights)
                }}
                style={{ width: '200px' }}
              />
            </Box>
          </Col>
          <Col span={24}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center">
              <Text>Text Font Weight</Text>
              <Select
                defaultValue={
                  FONT_WEIGHTS['regular']?.value ||
                  FONT_WEIGHTS[weights[0]]?.value
                }
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
                onSelect={(weight) => {
                  setTextConfig({
                    ...textConfig,
                    textFontWeight: weight
                  })
                }}
                style={{ width: '100px' }}
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

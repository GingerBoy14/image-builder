import { useState, useRef } from 'react'
import { Button, Space } from 'antd'
import { Layout, Content, Sider, Row, Col, Box } from 'antd-styled'
import { Layer, Stage, Text, Group, Image, Rect } from 'react-konva'
import useImage from 'use-image'
import { saveAs } from 'file-saver'
import dataURLtoBlob from 'dataurl-to-blob'
import SizeForm from './components/SizeForm'
import CanvasBgForm from './components/CanvasBGForm'
import TypographyForm from './components/TypographyForm'

import { POSITIONS } from './constants'
import { SaveOutlined } from '@ant-design/icons'

// [DEFAULT_STATE_VALUES]
const INITIAL_TEXT_CONFIG = {
  color: 'black',
  titleFontSize: 24,
  subTitleFontSize: 16,
  placement: Object.keys(POSITIONS)[0]
}
const INITIAL_BACKGROUND = { color: 'white' }
const INITIAL_DIMENSION = { width: 500, height: 500 }

/**
 * @info App (27 Mar 2021) // CREATION DATE
 *
 * @comment App - React component.
 *
 * @since 29 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

function App() {
  // [COMPONENTS_STATE_HOOKS]
  const canvasRef = useRef(null)
  const [dimension, setDimension] = useState(INITIAL_DIMENSION)
  const [background, setBackground] = useState(INITIAL_BACKGROUND)
  const [textConfig, setTextConfig] = useState(INITIAL_TEXT_CONFIG)
  const [image] = useImage(background.imageURL, 'Anonymous')

  // [HELPER_FUNCTIONS]
  const saveToFile = () => {
    const data = canvasRef.current.toDataURL()
    const blob = dataURLtoBlob(data)
    saveAs(blob, 'image.png')
  }
  const reset = () => {
    setTextConfig(INITIAL_TEXT_CONFIG)
    setBackground(INITIAL_BACKGROUND)
    setDimension(INITIAL_DIMENSION)
  }
  console.log()
  // [TEMPLATE]
  return (
    <Layout height="100vh">
      <Content>
        <Row align="middle" justify="center" height="100%">
          <Col>
            <Stage
              ref={canvasRef}
              width={dimension.width}
              height={dimension.height}
              style={{
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '4px'
              }}>
              <Layer>
                <Rect
                  width={dimension.width}
                  height={dimension.height}
                  fill={background.color}
                />
                {image && <Image image={image} />}
              </Layer>

              {(textConfig.titleText || textConfig.subTitleText) && (
                <Layer>
                  <Item dimension={dimension} position={textConfig.placement}>
                    {textConfig.titleText && (
                      <Text
                        text={textConfig.titleText}
                        fontSize={textConfig.titleFontSize}
                        fill={textConfig.color}
                        fontFamily={textConfig.textFontFamily}
                        align="center"
                        width={dimension.width / 3}
                      />
                    )}
                    {textConfig.subTitleText && (
                      <Text
                        y={textConfig.titleText && textConfig.titleFontSize}
                        text={textConfig.subTitleText}
                        fontFamily={textConfig.textFontFamily}
                        fontSize={textConfig.subTitleFontSize}
                        fill={textConfig.color}
                        width={dimension.width / 3}
                      />
                    )}
                  </Item>
                </Layer>
              )}
            </Stage>
          </Col>
        </Row>
      </Content>
      <Sider bg="#fff" width="25%" p={3}>
        <Row gutter={[8, 16]}>
          <Col flex={1}>
            <Box display="flex" justifyContent="flex-end">
              <Space>
                <Button
                  icon={<SaveOutlined />}
                  type="primary"
                  onClick={saveToFile}>
                  Save
                </Button>
                <Button type="primary" onClick={reset}>
                  Reset
                </Button>
              </Space>
            </Box>
          </Col>
          <Col flex={1}>
            <SizeForm onSizeChange={setDimension} dimension={dimension} />
          </Col>
          <Col flex={1}>
            <TypographyForm
              textConfig={textConfig}
              setTextConfig={setTextConfig}
            />
          </Col>
          <Col flex={1}>
            <CanvasBgForm
              onColorSelect={(color) => setBackground({ ...background, color })}
              onImageUpload={(imageURL) =>
                setBackground({ ...background, imageURL })
              }
              color={background.color}
            />
          </Col>
        </Row>
      </Sider>
    </Layout>
  )
}

const Item = (props) => {
  const { dimension, position, children } = props

  const itemDimension = {
    width: dimension.width / 3,
    height: dimension.height / 3
  }

  return (
    <Group
      width={itemDimension.width}
      height={itemDimension.height}
      {...POSITIONS[position].calc(itemDimension, dimension)}>
      {children}
    </Group>
  )
}

export default App

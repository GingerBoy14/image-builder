import { Layout, Content, Sider, Box, Row, Col } from 'antd-styled'
import SizeForm from './components/SizeForm'
import 'antd/dist/antd.css'
import { useState } from 'react'
import CanvasBgForm from './components/CanvasBGForm'
import TypographyForm from './components/TypographyForm/TypographyForm'

function App() {
  const [dimension, setDimension] = useState({ width: 0, height: 0 })
  const [color, setColor] = useState('white')

  return (
    <Layout height="100vh">
      <Content>
        <Row align="middle" justify="center" height="100%">
          <Col>
            <Box
              width={dimension.width}
              height={dimension.height}
              bg={color}
              borderColor="rgba(0,0,0,0.1)"
              borderWidth="1px"
              borderStyle="solid"
              borderRadius={3}
            />
          </Col>
        </Row>
      </Content>
      <Sider bg="#fff" width="25%" p={3}>
        <Row gutter={[8, 16]}>
          <Col flex={1}>
            <SizeForm onSizeChange={setDimension} dimension={dimension} />
          </Col>
          <Col flex={1}>
            <TypographyForm />
          </Col>
          <Col flex={1}>
            <CanvasBgForm onColorSelect={setColor} color={color} />
          </Col>
        </Row>
      </Sider>
    </Layout>
  )
}

export default App

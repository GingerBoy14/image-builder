import { Layout, Content, Sider, Box, Row, Col } from 'antd-styled'
import SizeForm from './components/SizeForm'
import 'antd/dist/antd.css'
import { useState } from 'react'

function App() {
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  return (
    <Layout height="100vh">
      <Content>
        <Row align="middle" justify="center" height="100%">
          <Col>
            <Box
              width={dimension.width}
              height={dimension.height}
              bg="#fff"
              borderColor="rgba(0,0,0,0.1)"
              borderWidth="1px"
              borderStyle="solid"
              borderRadius={3}
            />
          </Col>
        </Row>
      </Content>
      <Sider bg="#fff" width="25%" p={3}>
        <SizeForm onSizeChange={setDimension} />
      </Sider>
    </Layout>
  )
}

export default App

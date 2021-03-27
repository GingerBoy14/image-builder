import { Layout, Content, Sider, Box, Row, Col } from 'antd-styled'
import 'antd/dist/antd.css'

function App() {
  return (
    <Layout height="100vh">
      <Content>
        <Row align="middle" justify="center" height="100%">
          <Col>
            <Box
              width="30vh"
              height="30vh"
              bg="#fff"
              borderColor="rgba(0,0,0,0.1)"
              borderWidth="1px"
              borderStyle="solid"
              borderRadius={3}
            />
          </Col>
        </Row>
      </Content>
      <Sider bg="#fff" p={3}>
        config
      </Sider>
    </Layout>
  )
}

export default App

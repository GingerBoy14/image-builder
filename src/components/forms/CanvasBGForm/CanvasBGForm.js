import PropTypes from 'prop-types'
import { Button, Popover, Select, Space } from 'antd'
import { Title, Row, Col, Box, Text, Remove } from 'antd-styled'
import { CloseCircleOutlined, UploadOutlined } from '@ant-design/icons'
import ColorPicker from '~/components/ColorPicker'
import Uploader from '~/components/Uploader'

/**
 * @info CanvasBgForm (27 Mar 2021) // CREATION DATE
 *
 * @comment CanvasBgForm - React component.
 *
 * @since 04 Apr 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const IMAGE_SETTINGS = [
  {
    label: 'original',
    value: 'original',
    func: () => ({ width: undefined, height: undefined })
  },

  {
    label: 'stretch',
    value: 'stretch',
    func: ({ dw, dh }) => ({ width: dw, height: dh })
  }
]

const CanvasBgForm = (props) => {
  // [INTERFACES]
  const {
    onColorSelect,
    onImageUpload,
    onImageReset,
    onImageFitChange,
    background
  } = props

  // [HELPER_FUNCTIONS]
  const onColorChange = (color) => {
    onColorSelect(color)
  }

  // [COMPUTED_PROPERTIES]
  const popoverContent = (
    <Row>
      <Col>
        <Uploader onUploaded={onImageUpload} />
      </Col>
      <Col>
        <Uploader onUploaded={onImageUpload} withCrop />
      </Col>
    </Row>
  )

  // [TEMPLATE]
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Title level={3}>Background</Title>
      </Col>
      <Col span={24}>
        <ColorPicker color={background.color} onChange={onColorChange} />
      </Col>
      <Col span={24}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="baseline">
          <Text>Image</Text>
          <Space size={!background.imageURL ? 0 : 'small'}>
            <Popover
              placement="topRight"
              title="Select option"
              content={popoverContent}>
              <Button size="small" type="text" icon={<UploadOutlined />}>
                Upload
              </Button>
            </Popover>

            {background.imageURL && (
              <Remove
                size="small"
                type="text"
                shape="default"
                tooltip="Remove background image"
                popconfirmPlacement="left"
                tooltipPlacement="left"
                itemName="image"
                question="Remove"
                onSubmit={onImageReset}
                icon={<CloseCircleOutlined />}
              />
            )}
          </Space>
        </Box>
      </Col>
      {background.imageURL && (
        <Col span={24}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center">
            <Text>Image-fit</Text>
            <Select
              options={IMAGE_SETTINGS}
              defaultValue={IMAGE_SETTINGS[0].label}
              onChange={onImageFitChange}
              style={{ minWidth: '100px' }}
            />
          </Box>
        </Col>
      )}
    </Row>
  )
}

CanvasBgForm.propTypes = {
  background: PropTypes.shape({
    color: PropTypes.string,
    imageURL: PropTypes.string
  }),
  onColorSelect: PropTypes.func
}

export default CanvasBgForm

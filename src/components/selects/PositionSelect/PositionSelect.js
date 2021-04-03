import PropTypes from 'prop-types'
import { Box, Text } from 'antd-styled'
import { Select, Space } from 'antd'
import { BorderlessTableOutlined } from '@ant-design/icons'
import { POSITION_KEYS } from '~/constants'

/**
 * @info PositionSelect (03 Apr 2021) // CREATION DATE
 *
 * @comment PositionSelect - React component.
 *
 * @since 03 Apr 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const PositionSelect = (props) => (
  <Box display="flex" justifyContent="space-between">
    <Space>
      <BorderlessTableOutlined />
      <Text>Position</Text>
    </Space>
    <Select
      options={POSITION_KEYS.map((positionKey) => ({
        label: positionKey,
        value: positionKey
      }))}
      {...props}
    />
  </Box>
)

PositionSelect.propTypes = {
  onSelect: PropTypes.func,
  value: PropTypes.any
}

export default PositionSelect

import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import { Space } from 'antd'
import { Box, Text } from 'antd-styled'
import { ChromePicker } from 'react-color'
import { BgColorsOutlined } from '@ant-design/icons'
import { useOutsideClick } from '~/hooks'

/**
 * @info TypographyForm (27 Mar 2021) // CREATION DATE
 *
 * @comment TypographyForm - React component.
 *
 * @since 03 Apr 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const ColorPicker = (props) => {
  // [INTERFACES]
  const { icon, onChange, ...rest } = props

  // [COMPONENT_STATE_HOOKS]
  const pickerRef = useRef(null)
  const [pickerVisible, setPickerVisible] = useState(false)

  // [ADDITIONAL_HOOKS]
  useOutsideClick(pickerRef, () => setPickerVisible(false))

  // [HELPER_FUNCTIONS]
  const onColorSelect = (color) => {
    const rgba = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    onChange?.(rgba, color)
  }

  return (
    <Box display="flex" justifyContent="space-between">
      <Space>
        {icon ?? <BgColorsOutlined />}
        <Text>Color</Text>
      </Space>
      <Box
        width="50px"
        borderRadius={3}
        bg={props.color}
        cursor="pointer"
        borderColor="rgba(0,0,0,0.1)"
        borderWidth="1px"
        borderStyle="solid"
        onClick={() => setPickerVisible(!pickerVisible)}
      />
      {pickerVisible && (
        <div
          ref={pickerRef}
          style={{
            zIndex: 1000,
            position: 'absolute',
            right: 0,
            top: '100%'
          }}>
          <Box m={3} mt={1}>
            <ChromePicker onChange={onColorSelect} {...rest} />
          </Box>
        </div>
      )}
    </Box>
  )
}

ColorPicker.propTypes = {
  color: PropTypes.string,
  onChange: PropTypes.func
}

export default ColorPicker

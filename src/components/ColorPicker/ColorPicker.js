import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from 'antd-styled'
import { ChromePicker } from 'react-color'

function useOutsideAlerter(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback])
}

const ColorPicker = (props) => {
  // [COMPONENT_STATE_HOOKS]
  const pickerRef = useRef(null)
  const [pickerVisible, setPickerVisible] = useState(false)

  // [ADDITIONAL_HOOKS]
  useOutsideAlerter(pickerRef, () => setPickerVisible(false))

  return (
    <Box display="flex" justifyContent="space-between">
      <Text>Color</Text>
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
            <ChromePicker {...props} />
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

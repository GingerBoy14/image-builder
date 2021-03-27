import PropTypes from 'prop-types'
import { useState, useEffect, useRef } from 'react'
import { Title, Box, Row, Col, Text } from 'antd-styled'
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

/**
 * @info CanvasBgForm (27 Mar 2021) // CREATION DATE
 *
 * @comment CanvasBgForm - React component.
 *
 * @since 27 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const CanvasBgForm = (props) => {
  // [INTERFACES]
  const { onColorSelect, color } = props

  // [COMPONENT_STATE_HOOKS]
  const pickerRef = useRef(null)
  const [pickerVisible, setPickerVisible] = useState(false)

  // [ADDITIONAL_HOOKS]
  useOutsideAlerter(pickerRef, () => setPickerVisible(false))

  // [HELPER_FUNCTIONS]
  const onColorChange = (color) => {
    onColorSelect(color.hex)
  }

  // [TEMPLATE]
  return (
    <Row>
      <Col span={24}>
        <Title level={3}>Background</Title>
      </Col>
      <Col flex={1}>
        <Box display="flex" justifyContent="space-between">
          <Text>Color</Text>
          <Box
            width="50px"
            borderRadius={3}
            bg={color}
            cursor="pointer"
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
                <ChromePicker
                  color={color}
                  onChange={onColorChange}
                  styles={{ zIndex: 1000, position: 'absolute' }}
                />
              </Box>
            </div>
          )}
        </Box>
      </Col>
    </Row>
  )
}

CanvasBgForm.propTypes = {
  color: PropTypes.string,
  onColorSelect: PropTypes.func
}

export default CanvasBgForm

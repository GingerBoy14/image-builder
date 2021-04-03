import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Select } from 'antd'
import { Box, Text } from 'antd-styled'
import GoogleFontLoader from 'react-google-font-loader'
import { FONT_WEIGHTS } from '~/constants'

/**
 * @info FontFamilySelect (03 Apr 2021) // CREATION DATE
 *
 * @comment FontFamilySelect - React component.
 *
 * @since 03 Apr 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const fonts = []

const FontFamilySelect = (props) => {
  // [INTERFACES]
  const { onFontsLoaded, onFontSelect } = props

  // [COMPONENT_STATE_HOOKS]
  const [loading, setLoading] = useState(false)

  // [HELPER_FUNCTIONS]
  const onSelect = (fontFamily) => {
    onFontSelect?.(fontFamily, fonts)
  }

  // [USE_EFFECTS]
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
      onFontsLoaded?.(fonts, FONT_WEIGHTS.regular.value)

      setLoading(false)
    }

    fetchData()
  }, [])

  // [TEMPLATE]
  return (
    <>
      <GoogleFontLoader fonts={fonts} />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text>Text Font Family</Text>
        <Select
          showSearch
          loading={loading}
          options={fonts.map((font) => ({
            label: font.font,
            value: font.font
          }))}
          onSelect={onSelect}
          {...props}
          style={{ minWidth: '150px' }}
        />
      </Box>
    </>
  )
}

FontFamilySelect.propTypes = {
  onFontsLoaded: PropTypes.func,
  onFontSelect: PropTypes.func
}

export default FontFamilySelect

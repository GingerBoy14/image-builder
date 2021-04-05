import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Select } from 'antd'
import { Box, Text } from 'antd-styled'
import { FONT_WEIGHTS } from '~/constants'

/**
 * @info FontFamilySelect (03 Apr 2021) // CREATION DATE
 *
 * @comment FontFamilySelect - React component.
 *
 * @since 05 Apr 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const googleFonts = []

const FontFamilySelect = (props) => {
  // [INTERFACES]
  const { onFontsLoaded, onFontSelect } = props

  // [COMPONENT_STATE_HOOKS]
  const [loading, setLoading] = useState(false)
  const [children, setChildren] = useState([])
  const [fonts, setFonts] = useState([])
  const [isSearch, setIsSearch] = useState(false)
  const [searchChildren, setSearchChildren] = useState([])

  // [HELPER_FUNCTIONS]
  const getNewFonts = () => {
    setLoading(true)
    const newFonts = [...children]
    newFonts.push(
      ...fonts.slice(0, 10).map((font) => (
        <Select.Option value={font.font} key={font.font}>
          {font.font}
        </Select.Option>
      ))
    )
    setFonts(fonts.slice(10))
    setChildren(newFonts)
    setLoading(false)
  }

  const onSelect = (fontFamily) => {
    onFontSelect?.(fontFamily, googleFonts)
  }

  const onScroll = (event) => {
    const target = event.target
    !loading &&
      Math.ceil(target.scrollTop + target.offsetHeight) ===
        target.scrollHeight &&
      getNewFonts()
  }

  const onSearch = (string) => {
    setIsSearch(string)
    setSearchChildren(
      googleFonts.map(
        (font) =>
          font.font.includes(string) && (
            <Select.Option value={font.font} key={font.font}>
              {font.font}
            </Select.Option>
          )
      )
    )
  }

  // [USE_EFFECTS]
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${process.env.REACT_APP_GOOGLE_FONT_API_KEY}`
      )
      const responseFonts = await response.json()
      googleFonts.push(
        ...responseFonts.items.map((font) => ({
          font: font.family,
          weights: font.variants.filter(
            (variant) =>
              (variant.match(/^[0-9]+$/) || variant.match(/^[a-zA-Z]+$/)) &&
              variant
          )
        }))
      )
      setChildren(
        googleFonts.slice(0, 10).map((font) => (
          <Select.Option value={font.font} key={font.font}>
            {font.font}
          </Select.Option>
        ))
      )
      setFonts(googleFonts.slice(10))

      onFontsLoaded?.(googleFonts, FONT_WEIGHTS.regular.value)
      setLoading(false)
    }

    fetchData()
  }, [])

  // [TEMPLATE]
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Text>Text Font Family</Text>
      <Select
        showSearch
        loading={loading}
        onSelect={onSelect}
        onSearch={onSearch}
        onPopupScroll={onScroll}
        {...props}
        style={{ minWidth: '150px' }}>
        {!isSearch &&
          !loading &&
          children && [
            ...children,
            <Select.Option key="loading" disabled>
              Loading...
            </Select.Option>
          ]}
        {isSearch && searchChildren && searchChildren}
      </Select>
    </Box>
  )
}

FontFamilySelect.propTypes = {
  onFontsLoaded: PropTypes.func,
  onFontSelect: PropTypes.func
}

export default FontFamilySelect

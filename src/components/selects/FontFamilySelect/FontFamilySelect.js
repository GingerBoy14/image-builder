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
 * @since 04 Apr 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const fonts = []

const FontFamilySelect = (props) => {
  // [INTERFACES]
  const { onFontsLoaded, onFontSelect } = props

  // [COMPONENT_STATE_HOOKS]
  const [loading, setLoading] = useState(false)
  const [children, setChildren] = useState([])
  const [page, setPage] = useState(10)

  // [HELPER_FUNCTIONS]
  const getNewFonts = () => {
    setLoading(true)
    const newFonts = [...children]
    newFonts.push(
      ...fonts.slice(page, page + 10).map((font) => (
        <Select.Option value={font.font} key={font.font}>
          {font.font}
        </Select.Option>
      ))
    )
    setChildren(newFonts)
    setLoading(false)
  }

  const onSelect = (fontFamily) => {
    onFontSelect?.(fontFamily, fonts)
  }

  const onScroll = (event) => {
    const target = event.target
    setPage((prev) => prev + 1)

    !loading &&
      target.scrollTop + target.offsetHeight === target.scrollHeight &&
      getNewFonts()
  }

  const onSearch = (val) => {
    console.log(val)
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
        ...googleFonts.items.map((font) => ({
          font: font.family,
          weights: font.variants.filter(
            (variant) =>
              (variant.match(/^[0-9]+$/) || variant.match(/^[a-zA-Z]+$/)) &&
              variant
          )
        }))
      )
      setChildren(
        fonts.slice(0, 10).map((font) => (
          <Select.Option value={font.font} key={font.font}>
            {font.font}
          </Select.Option>
        ))
      )
      setPage((prev) => prev + 1)

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
          onSelect={onSelect}
          onSearch={onSearch}
          onPopupScroll={onScroll}
          {...props}
          style={{ minWidth: '150px' }}>
          {!loading &&
            children && [
              ...children,
              <Select.Option key="loading" disabled>
                Loading...
              </Select.Option>
            ]}
        </Select>
      </Box>
    </>
  )
}

FontFamilySelect.propTypes = {
  onFontsLoaded: PropTypes.func,
  onFontSelect: PropTypes.func
}

export default FontFamilySelect

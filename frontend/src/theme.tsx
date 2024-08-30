import { extendTheme } from '@chakra-ui/react'

const Theme = extendTheme({
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  fontWeights: {
    heading: 'semibold',
    body: 'semibold',
  },
})

export default Theme
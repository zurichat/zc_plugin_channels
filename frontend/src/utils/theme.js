import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    colors: {
      neutral: {
        500: '#BEBEBE',
        200: '#EBEBEB',
        100: '#F9F9F9'
      }
    },
    global: {
      'a, button': {
        _focus: {
          outline: 'none',
        },
      }
    },
  },
})

export { theme }

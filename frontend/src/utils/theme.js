import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    colors: {
      neutral: {
        900: '',
        800: '',
        700: '',
        600: '#242424',
        500: '#3A3A3A',
        400: '#8B8B8B',
        300: '#BEBEBE',
        200: '#EBEBEB',
        100: '#F9F9F9'
      }
    },
    global: {
      'a, button': {
        _focus: {
          outline: 'none',
        }
      },
      'svg': {
        color: '#8B8B8B'
      }
    },
  },
})

export { theme }

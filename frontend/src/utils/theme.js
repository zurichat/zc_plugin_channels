import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      'a, button': {
        _focus: {
          outline: 'none',
        },
      },
    },
  },
})

export { theme }

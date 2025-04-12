'use client'

import { createTheme } from '@mui/material/styles'

export const muiTheme = createTheme({
  typography: {
    fontFamily: 'var(--font-inter)',
    fontSize: 14,
    fontWeightRegular: 400
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {}
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiButton: {
      variants: [
        {
          props: { size: 'small' },
          style: {
            minHeight: 32,
            padding: '0 16px',
            fontSize: 14
          }
        },
        {
          props: { size: 'medium' },
          style: {
            minHeight: 40,
            padding: '0 20px',
            fontSize: 16
          }
        },
        {
          props: { size: 'large' },
          style: {
            minHeight: 48,
            padding: '0 24px',
            fontSize: 18
          }
        },
        {
          props: { color: 'primary' },
          style: {
            backgroundColor: 'var(--color-primary)',

            '&:hover': {
              backgroundColor: 'var(--color-primary)'
            }
          }
        },
        {
          props: { color: 'secondary' },
          style: {
            backgroundColor: 'var(--color-gray-100)',
            color: 'var(--color-black-secondary)',

            '&:hover': {
              backgroundColor: 'var(--color-gray-100)'
            }
          }
        },
        {
          props: { color: 'success' },
          style: {
            backgroundColor: 'var(--color-green)',

            '&:hover': {
              backgroundColor: 'var(--color-green)'
            }
          }
        },
        {
          props: { color: 'error' },
          style: {
            backgroundColor: 'var(--color-red)',

            '&:hover': {
              backgroundColor: 'var(--color-red)'
            }
          }
        }
      ]
    },
    MuiTab: {
      styleOverrides: {
        root: {
          position: 'relative',
          zIndex: 10,
          maxWidth: '100%',
          minHeight: 40,
          borderRadius: 4,
          padding: '0 20px',
          flexGrow: 1,
          fontSize: 16,
          textTransform: 'none',
          border: 'none',
          color: 'var(--color-black-secondary)',
          transition: 'color 0.1s ease-in',

          '&.Mui-selected': {
            color: 'var(--color-white)'
          }
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: '100%',
          backgroundColor: 'var(--color-black-primary)',
          borderRadius: 4
        },
        root: {
          position: 'relative',
          width: '100%',
          minHeight: 40,
          borderRadius: 4,
          border: '1px solid rgb(217, 217, 217)',
          boxSizing: 'border-box'
        }
      }
    },
    MuiInputAdornment: {
      defaultProps: {
        classes: {
          root: 'input-adornment'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          position: 'static',
          transform: 'none',
          color: 'var(--color-gray-300)',
          whiteSpace: 'wrap',

          '&.Mui-focused': {
            color: 'var(--color-gray-300)'
          }
        }
      }
    },
    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
        variant: 'standard'
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: 'none'
        }
      }
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          transform: 'none',
          borderRadius: 4
        }
      }
    }
  }
})

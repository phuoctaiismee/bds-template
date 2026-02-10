'use client';
import { Grow, ThemeProvider } from '@mui/material';
import { extendTheme, styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { viVN } from '@mui/x-date-pickers/locales';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FC, PropsWithChildren } from 'react';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.background.default,
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: '#ebf1f5',
    ...theme.applyStyles('dark', {
      backgroundColor: '#30404d',
    }),
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'rgba(206,217,224,.5)',
    ...theme.applyStyles('dark', {
      background: 'rgba(57,75,89,.5)',
    }),
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 0 1px rgb(16 22 26 / 40%)',
    backgroundColor: '#394b59',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))',
  }),
}));

const BpCheckedIcon = styled(BpIcon)(() => {
  return {
    backgroundColor: 'currentcolor',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&::before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: 'currentcolor',
    },
  };
});

type RootThemeProps = PropsWithChildren;

const theme = extendTheme(
  {
    colorSchemes: {
      light: {
        palette: {
          primary: { main: '#1e40af' },
          secondary: { main: '#00b894' },
          common: {
            black: '#121212',
            white: '#FFFFFF',
          },
          action: {
            disabledBackground: '#c1fe0670',
          },
          background: { paper: 'var(--background)' },
          mode: 'dark',
          Alert: {
            errorColor: '#FF434E',
            successColor: '#1EA031',
            warningColor: '#EEAF00',
            infoColor: '#007AFF',
          },
        },
      },
      dark: {
        palette: {
          primary: { main: '#1e40af' },
          secondary: { main: '#00b894' },
          Alert: {
            errorColor: '#B72B33',
            successColor: '#21A635',
            warningColor: '#C39823',
            infoColor: '#20A0C1',
          },
          background: {
            default: '#0a0a0a',
          },
          text: {
            primary: '#ededed',
          },
        },
      },
    },
    typography() {
      return {
        allVariants: {
          color: 'white',
        },
        fontFamily: 'var(--font-plus-jakarta)',
        h1: {
          lineHeight: 1.4,
          fontWeight: 500,
          fontSize: '1rem',
        },
        h2: {
          lineHeight: 1.6,
          fontWeight: 500,
          fontSize: '1rem',
        },
        h3: {
          lineHeight: 1.6,
          fontWeight: 600,
          fontSize: '1rem',
        },
        h4: {
          lineHeight: 1.75,
          fontWeight: 500,
          fontSize: '1rem',
        },
        body1: {
          lineHeight: 1.6,
          fontSize: '0.813rem',
        },
        body2: {
          lineHeight: 1.4,
          fontWeight: 400,
          fontSize: '0.75rem',
        },
        caption: {
          lineHeight: 1.6,
          fontWeight: 500,
          fontSize: '0.813rem',
        },
        button: {
          lineHeight: 1.6,
          fontWeight: 700,
          textTransform: 'none',
          fontSize: '0.75rem',
        },
      };
    },
    shape: { borderRadius: 8 },
    spacing(abs: number) {
      if (!abs) return 4;
      return 4 * abs;
    },
    components: {
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            borderRadius: 12,
          },
          colorDefault: ({ theme, ownerState }) => {
            if (ownerState.variant === 'outlined')
              return {
                borderColor: theme.palette.common.black,
              };
            return {
              background: theme.palette.common.black,
              color: theme.palette.common.white,
            };
          },
          colorSecondary: () => ({
            position: 'relative',
            background: 'var(--ai-text)',
            borderRadius: 100,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 1,
              left: 1,
              width: 'calc(100% - 2px)',
              height: 'calc(100% - 2px)',
              background: '#fff',
              borderRadius: 100,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 1,
              left: 1,
              width: 'calc(100% - 2px)',
              height: 'calc(100% - 2px)',
              background: 'var(--ai-bg)',
              borderRadius: 100,
            },

            '& > span': {
              background: 'var(--ai-text)',
              position: 'relative',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              zIndex: 2,
            },
          }),
        },
      },
      MuiTooltip: {
        styleOverrides: {
          arrow: ({ theme }) => ({
            '&::before': {
              background: theme.palette.common.black,
            },
          }),
          tooltip: ({ theme }) => ({
            background: theme.palette.common.black,
          }),
        },
        defaultProps: {
          arrow: true,
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            width: 42,
            height: 26,
            padding: 0,
            '& .MuiSwitch-switchBase': {
              padding: 0,
              margin: 2,
              transitionDuration: '300ms',
              '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                  backgroundColor: ownerState.color,
                  opacity: 1,
                  border: 0,
                  ...theme.applyStyles('dark', {
                    backgroundColor: '#2ECA45',
                  }),
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                  opacity: 0.5,
                },
              },
              '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
              },
              '&.Mui-disabled .MuiSwitch-thumb': {
                color: theme.palette.grey[100],
                ...theme.applyStyles('dark', {
                  color: theme.palette.grey[600],
                }),
              },
              '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.7,
                ...theme.applyStyles('dark', {
                  opacity: 0.3,
                }),
              },
            },
            '& .MuiSwitch-thumb': {
              boxSizing: 'border-box',
              width: 22,
              height: 22,
            },
            '& .MuiSwitch-track': {
              borderRadius: 26 / 2,
              backgroundColor: '#000',
              opacity: 1,
              transition: theme.transitions.create(['background-color'], {
                duration: 500,
              }),
              ...theme.applyStyles('dark', {
                backgroundColor: '#39393D',
              }),
            },
          }),
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: ({}) => ({
            '& input, & textarea': {
              fontWeight: 400,
              color: '#fff',
            },
            '& fieldset': {
              borderRadius: 12,
              // border: 'none',
            },
            '& .MuiInputBase-root': {
              background: '#0f1115',
              borderRadius: 12,
            },
            '& .MuiSvgIcon-root': {
              color: '#fff',
            },
          }),
        },
      },
      MuiButton: {
        styleOverrides: {
          sizeMedium: () => ({
            // height: 48,
            borderRadius: 16,
            fontSize: 16,
            fontWeight: 600,
          }),
          sizeSmall: () => ({
            // height: 36,
            borderRadius: 12,
          }),
          root: {
            fontWeight: 500,
            transition: '0.3s ease',
            '&:active': {
              transform: 'scale(0.9)',
            },
          },
          outlined({ ownerState, theme }) {
            return {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              background: `${theme.palette[ownerState.color as never]?.main}20`,
            };
          },
          sizeLarge: {
            height: 64,
            fontSize: 16,
            fontWeight: 600,
          },
        },
        defaultProps: {
          disableElevation: true,
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({}) => {
            return {
              color: '#fff',
              background: '#fff1',
              transition: '0.3s ease',
              '&:active': {
                transform: 'scale(0.9)',
              },
            };
          },
        },
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: 'xl',
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            width: 40,
            height: 40,
            ...(ownerState.variant === 'rounded' ? { borderRadius: 12 } : {}),
          }),
        },
      },
      MuiAccordion: {
        defaultProps: {
          elevation: 0,
        },
      },
    //   MuiPaginationItem: {
    //     styleOverrides: {
    //       outlined({ ownerState, theme }) {
    //         return {
    //           ...(ownerState.selected
    //             ? {
    //                 background: '#101828 !important',
    //                 color: '#fff !important',
    //               }
    //             : {
    //                 background: `#101828`,
    //                 border: 'none',
    //               }),
    //           aspectRatio: 1,
    //           display: 'flex',
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //         };
    //       },
    //     },
    //   },
      MuiCheckbox: {
        // defaultProps: {
        //   icon: React.createElement(BpIcon),
        //   checkedIcon: React.createElement(BpCheckedIcon),
        // },
      },
      MuiSlider: {
        styleOverrides: {
          thumb({ theme, ownerState }) {
            return {
              ...(ownerState.disabled
                ? {}
                : {
                    background: theme.palette.secondary.main,
                  }),
            };
          },
        },
      },
      MuiDialog: {
        defaultProps: {
          slots: { transition: Grow },
        },
      },
      MuiTabs: {
        defaultProps: {
          slotProps: { indicator: { sx: { display: 'none' } } },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            color: 'var(--neutral-1)',
            transition: '0.3s ease',
            borderRadius: 20,
            '&:active': {
              transform: 'scale(0.9)',
            },
            '&.Mui-selected': {
              background: 'var(--positive)',
              color: 'var(--negative)',
            },
          },
        },
      },
      MuiCardActionArea: {
        styleOverrides: {
          root: {
            transition: '0.3s ease',
            '&:active': {
              transform: 'scale(0.9)',
            },
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            background: 'var(--color-background)',
          },
        },
      },
    },
  },
  viVN,
);

const RootTheme: FC<RootThemeProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme} defaultMode='dark'>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='vi'>
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default RootTheme;

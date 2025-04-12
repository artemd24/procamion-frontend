import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material'
import cn from 'classnames'

import {
  AuthProvider,
  DatePickerLocaliztionProvider,
  ErrorBoundary,
  Notifications,
  QueryClientProvider,
  UserProvider
} from '@/app/providers'
import { muiTheme } from '@/shared/config'
import { inter, notoSans, roboto } from '@/shared/assets/fonts'

import '@/app/styles/reset.css'
import '@/app/styles/variables.css'
import '@/app/styles/global.css'
import '@/app/styles/components.css'

export const metadata: Metadata = {
  title: 'Procamion',
  description: ''
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={cn(notoSans.variable, roboto.variable, inter.variable)}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={muiTheme}>
            <DatePickerLocaliztionProvider>
              <QueryClientProvider>
                <AuthProvider>
                  <UserProvider>
                    <ErrorBoundary>{children}</ErrorBoundary>
                  </UserProvider>

                  <Notifications />
                </AuthProvider>
              </QueryClientProvider>
            </DatePickerLocaliztionProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}

import { Header } from '../Header/Header'

import classes from './Auth.module.scss'

type AuthLayoutProps = {
  children: React.ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={classes.pageLayout}>
      <Header />

      <main>
        <div className='wrapper'>{children}</div>
      </main>
    </div>
  )
}

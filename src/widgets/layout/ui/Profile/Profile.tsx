import cn from 'classnames'

import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { Sidebar } from '../Sidebar/Sidebar'

import classes from './Profile.module.scss'

type ProfileLayoutProps = {
  children: React.ReactNode
}

export const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className={classes.profileLayout}>
      <Header />

      <main className={cn(classes.main, 'wrapper')}>
        <Sidebar />

        <div className={classes.content}>{children}</div>
      </main>

      <Footer />
    </div>
  )
}

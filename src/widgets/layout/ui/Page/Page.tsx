import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'

import classes from './Page.module.scss'

type PageLayoutProps = {
  children: React.ReactNode
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className={classes.pageLayout}>
      <Header />

      <main>
        <div className='wrapper'>{children}</div>
      </main>

      <Footer />
    </div>
  )
}

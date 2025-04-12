import Image from 'next/image'

import { Header } from '../Header/Header'

import classes from './Error.module.scss'

type ErrorProps = {
  iconSrc: string
  code: string
  text: string
}

export const ErrorLayout = ({ iconSrc, code, text }: ErrorProps) => {
  return (
    <div className={classes.pageLayout}>
      <Header />

      <main>
        <div className='wrapper'>
          <div className={classes.content}>
            <Image width={155} height={155} src={iconSrc} alt='error' />

            <p className={classes.errorCode}>{code}</p>

            <p className={classes.errorText}>{text}</p>
          </div>
        </div>
      </main>
    </div>
  )
}

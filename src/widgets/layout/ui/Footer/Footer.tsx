import cn from 'classnames'

import { Logo } from '@/shared/ui'

import classes from './Footer.module.scss'
import Link from 'next/link'

type FooterProps = {
  isLanding?: boolean
}

export const Footer = ({ isLanding }: FooterProps) => {
  return (
    <footer
      className={cn(classes.footer, {
        [classes.landingFooter]: isLanding
      })}
    >
      <div className='wrapper'>
        <div className={classes.top}>
          <Logo className={classes.logo} width={432} height={55} />

          <div className={classes.topRight}>
            <div className={classes.links}>
              <p>Procamion</p>

              <ul className={classes.linksList}>
                <li>
                  <Link href='/search'>Home</Link>
                </li>

                <li>
                  <Link href='/search'>Advantages</Link>
                </li>

                <li>
                  <Link href='/search'>Contact us</Link>
                </li>
              </ul>
            </div>

            <div className={classes.links}>
              <p>Shipper & Carrier</p>

              <ul className={classes.linksList}>
                <li>
                  <Link href='/search'>Registration</Link>
                </li>

                <li>
                  <Link href='/search'>For shippers</Link>
                </li>

                <li>
                  <Link href='/search'>Far carriers</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={classes.bottom}>
          <div className={classes.bottomLeft}>
            <Link href='/search'>Site Terms of Use</Link>
            <Link className={classes.privacyPolicyDesktop} href='/search'>
              Personal data processing policy
            </Link>
            <Link className={classes.privacyPolicyMobile} href='/search'>
              Privacy policy
            </Link>
          </div>

          <small>«Procamion» © 2022–2023</small>
        </div>
      </div>
    </footer>
  )
}

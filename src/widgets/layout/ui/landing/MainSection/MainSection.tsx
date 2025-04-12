import cn from 'classnames'
import Image from 'next/image'

import { RouteSearchForm } from '../RouteSearchForm/RouteSearchForm'

import classes from './MainSection.module.scss'
import { FreightIcon } from '../../../../../../public/icons/Freight'

export const MainSection = () => {
  return (
    <section className={classes.section} id='main'>
      <div className={classes.video}>
        <video autoPlay loop muted playsInline controls={false} className={classes.videoPlayer}>
          <source src='/video/hero-video.mp4' type='video/mp4' />
        </video>

        <div className={classes.backdrop} />
      </div>

      <div className={cn('landingWrapper', classes.container)}>
        <div className={classes.contentTop}>
          <div className={classes.textColumn}>
            <h2>
              <span>
                AI-driven{' '}
                <span>
                  freight
                  <FreightIcon />
                </span>
                <br />
                platform
              </span>{' '}
              connecting <br />
              Europe and Africa
            </h2>
            <h3>
              Shippers and carriers can now easily find each other, connect, and coordinate the
              transport of&nbsp;fresh cargo between Europe and Africa
            </h3>
          </div>

          <div className={classes.chooseWay}>
            <Image src='/icons/landing/box-big.svg' width={130} height={142} alt='big package' />
            <p>Choose your way</p>
            <p>
              Improve your shipping income by finding new partners and as a result escape empty
              travelling
            </p>
          </div>
        </div>

        <div className={classes.contentBottomContainer}>
          <div className={classes.contentBottom}>
            <RouteSearchForm />
          </div>
        </div>
      </div>
    </section>
  )
}

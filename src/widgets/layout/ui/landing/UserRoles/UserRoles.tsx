import cn from 'classnames'

import classes from './UserRoles.module.scss'

export const UserRoles = () => {
  return (
    <section className={classes.section}>
      <div className='landingWrapper'>
        <div className={classes.container}>
          <h2>Enhance your transportation experience</h2>

          <div className={classes.userRoles}>
            <div className={cn(classes.userRole, classes.shipper)}>
              <h2>
                If you are the <span>Shipper</span>
              </h2>

              <ul className={classes.featuresList}>
                <li>Any type of loading: FTL or LTL</li>
                <li>Fast search for a carrier</li>
                <li>Dynamic Pricing</li>
                <li>Automated Documentation</li>
                <li>Real-Time Tracking</li>
              </ul>
            </div>

            <div className={classes.or}>OR</div>

            <div className={cn(classes.userRole, classes.carrier)}>
              <h2>
                If you are the <span>Carrier</span>
              </h2>

              <ul className={classes.featuresList}>
                <li>Access to a broader freight exchange market</li>
                <li>Efficient load matching</li>
                <li>Reduced empty miles</li>
                <li>Insured payment</li>
                <li>Latest Road and Weather Updates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { EcologyProgressBar } from '../EcologyProgressBar/EcologyProgressBar'
import classes from './EcologyCare.module.scss'

export const EcologyCare = () => {
  return (
    <section className={classes.section}>
      <div className='landingWrapper'>
        <div className={classes.content}>
          <h2>Up to</h2>

          <div className={classes.circularProgress}>
            <EcologyProgressBar />
          </div>

          <p>environmental care</p>

          <p>
            <span>reduction of CO2 emissions </span>
            into the atmosphere
          </p>
        </div>
      </div>
    </section>
  )
}

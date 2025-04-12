import classes from './ProcessSteps.module.scss'
import StarsDesktop from '../../../../../../public/icons/StarsDesktop'
import StarsMobile from '../../../../../../public/icons/StarsMobile'

type StepCardProps = {
  headline: React.ReactNode
  description?: React.ReactNode
  level: 'first' | 'second'
  step: number
}

const StepCard: React.FC<StepCardProps> = ({ step, level, headline, description }) => {
  return (
    // Card with stack positioning and flexbox, circle on the top, rounded square on the bottom
    <div className={classes.step}>
      <div className={classes.stepHeading}>
        {level === 'first' ? (
          <div className={classes.stepSign} aria-label={`Step ${step === 1 ? 'A' : 'B'}`}>
            {step === 1 ? 'A' : 'B'}
          </div>
        ) : (
          <div className={classes.stepSign} aria-label={`Step ${step}`}>
            {step}
          </div>
        )}
      </div>
      <div className={classes.stepContent}>
        <h2>{headline}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  )
}

export const ProcessSteps = () => {
  return (
    <section className={classes.processSteps}>
      <div className='landingWrapper'>
        <div className={classes.content}>
          <p>A step-by-step approach</p>
          <h2>Trucking without hassle</h2>

          <div className={classes.stepsContainer}>
            <svg
              width='2'
              height='2500'
              viewBox='0 0 2 2500'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='absolute left-1/2 top-0 -z-10 h-full -translate-x-1/2'
            >
              <line
                x1='1'
                y1='0'
                x2='0'
                y2='2500'
                stroke='#F59929'
                strokeWidth='2'
                strokeDasharray='8 8'
              />
            </svg>

            <ul className={classes.stepsList}>
              <li>
                <StepCard
                  headline='Sign up'
                  level='first'
                  description='Register a new account'
                  step={1}
                />
              </li>

              <li>
                <StepCard
                  headline='Post'
                  description='Simply create a new listing whenever you have cargo or an empty truck'
                  level='second'
                  step={2}
                />
              </li>

              <li>
                <StepCard
                  headline='Explore'
                  description='Browse through the available options of recent ads'
                  level='second'
                  step={3}
                />
              </li>

              <li>
                <StepCard
                  headline='Match'
                  description='Let our AI algorithms find the right carrier for the cargo'
                  level='second'
                  step={4}
                />
              </li>

              <li>
                <StepCard
                  headline='Manage'
                  description='Utilize our AI Automated Documentation System for invoicing and regulatory documentation'
                  level='second'
                  step={5}
                />
              </li>

              <li>
                <StepCard
                  headline='Monitor'
                  description='Easily handle your orders, view statistics, and track your cargo — all from your dashboard'
                  level='second'
                  step={6}
                />
              </li>

              <li>
                <StepCard headline='Upcoming features' level='second' step={7} />
              </li>

              <li>
                <StepCard
                  headline='Complete'
                  description='Secure online payment'
                  level='second'
                  step={8}
                />
              </li>

              <li>
                <StarsMobile />

                <StarsDesktop />

                <StepCard
                  headline='Cargo delivered'
                  description='To avoid empty miles, the truck can announce its availability for the return trip.'
                  level={'first'}
                  step={2}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

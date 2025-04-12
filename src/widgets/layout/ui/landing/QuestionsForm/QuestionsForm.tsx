import { DemoRequestForm } from '../DemoRequestForm/DemoRequestForm'

import classes from './QuestionsForm.module.scss'

export const QuestionsForm = () => {
  return (
    <section className={classes.section}>
      <div className='landingWrapper'>
        <div className={classes.container}>
          <h2>Our mission: to provide smart transportation solutions between Europe and Africa</h2>
          <h3>Still have questions? Drop your email for further assistance!</h3>

          <div className={classes.form}>
            <DemoRequestForm variant='black' />
          </div>
        </div>
      </div>
    </section>
  )
}

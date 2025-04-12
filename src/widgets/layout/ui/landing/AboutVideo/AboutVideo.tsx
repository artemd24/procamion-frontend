import classes from './AboutVideo.module.scss'

export const AboutVideo = () => {
  return (
    <section className={classes.section}>
      <div className='landingWrapper'>
        <div className={classes.content}>
          <h2>More about Procamion</h2>

          <video className={classes.video} controls={true}>
            <source src='/video/tutorial.mp4' type='video/mp4' />
          </video>
        </div>
      </div>
    </section>
  )
}

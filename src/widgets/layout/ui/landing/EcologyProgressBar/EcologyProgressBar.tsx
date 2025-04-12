'use client'

import { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useInView } from 'react-intersection-observer'

import useMediaQuery from '@/shared/utils/useMediaQuery'

import classes from './EcologyProgressBar.module.scss'
import 'react-circular-progressbar/dist/styles.css'

export const EcologyProgressBar = () => {
  const [value, setValue] = useState(0)
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5
  })
  const isMobile = useMediaQuery('(max-width: 767px)')

  useEffect(() => {
    if (inView) {
      setValue(50)
    }
  }, [inView])

  return (
    <div className={classes.container} ref={inViewRef}>
      <div className={classes.border} />

      <CircularProgressbar
        styles={buildStyles({
          pathTransitionDuration: 0.5,
          textColor: '#000000',
          textSize: isMobile ? '20px' : '28px',
          pathColor: `#F89C2C`,
          trailColor: '#FFFDF4',
          backgroundColor: '#3e98c7'
        })}
        strokeWidth={7}
        backgroundPadding={3}
        value={value}
        text={`-50%`}
      />
    </div>
  )
}

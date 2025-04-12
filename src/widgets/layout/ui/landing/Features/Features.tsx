'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { SwiperOptions } from 'swiper/types'
import cn from 'classnames'

import 'swiper/css'
import classes from './Features.module.scss'
import SwiperArrow from '../../../../../../public/icons/SwiperArrow'

const slidesData = [
  {
    title: 'AI Load Matching',
    content:
      'Our algorithms speed up the matching process by pairing available shipments with suitable carriers based on cargo type, capacity, equipment, and location.'
  },
  {
    title: 'Real-time Tracking and Visibility',
    content:
      'Monitor shipment status, anticipate delays, and communicate with customers in real-time.'
  },
  {
    title: 'Dynamic Pricing',
    content:
      'Adjust rates in real-time based on demand, capacity, and market conditions, ensuring flexibility and cost efficiency.'
  },
  {
    title: 'AI Automated Documentation',
    content: 'Automated freight document generation, invoicing, and bookkeeping.'
  },
  {
    title: 'Payment Processing',
    content:
      'Our digital payment system ensures secure and efficient payment processing, minimizing administrative overhead.'
  },
  {
    title: 'Trucking Analytics',
    content:
      'Identify potential risks and security threats to shipments and take preemptive measures to prevent disruptions and ensure cargo safety.'
  }
] as const

const swiperOptions = {
  modules: [Navigation],
  slidesPerView: 'auto',
  spaceBetween: 15,
  centeredSlides: true,
  breakpoints: {
    1072: {
      slidesPerView: 3,
      centeredSlides: false
    },
    768: {
      slidesPerView: 2,
      centeredSlides: false
    }
  }
} satisfies SwiperOptions

export const Features = () => {
  return (
    <section className={cn(classes.features)}>
      <div className='landingWrapper'>
        <h2 className={classes.heading}>Innovative Freight Transport Solutions</h2>

        <div className={classes.slider}>
          <Swiper
            {...swiperOptions}
            className={classes.swiperSlider}
            navigation={{
              prevEl: '.btn-prev',
              nextEl: '.btn-next'
            }}
          >
            {slidesData.map((slide) => (
              <SwiperSlide
                className={classes.sliderSlide}
                style={{ height: 'auto' }}
                key={slide.title}
              >
                <article>
                  <h2>{slide.title}</h2>

                  <p>{slide.content}</p>
                </article>
              </SwiperSlide>
            ))}

            <div className={classes.sliderNav}>
              <button className='btn-prev'>
                <SwiperArrow />
              </button>

              <button className='btn-next'>
                <SwiperArrow />
              </button>
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  )
}

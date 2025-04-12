'use client'

import { useState } from 'react'

import { ContactForm } from '../ContactForm/ContactForm'

import classes from './Tagline.module.scss'
import CtaLine from '../../../../../../public/icons/CtaLine'

export const Tagline = () => {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <section className={classes.section}>
      <div className='landingWrapper'>
        <div className={classes.content}>
          <div className={classes.heading}>
            <h2>Procamion</h2>

            <div className={classes.line}>
              <CtaLine />
            </div>
          </div>

          <h3>Connecting continents. Simplifying shipments.</h3>

          <button
            type='button'
            onClick={() => {
              setModalOpen(true)
            }}
          >
            Contact us
          </button>

          {isModalOpen && (
            <div className={classes.modal}>
              <div className={classes.backdrop} />

              <div className={classes.modalContent}>
                <button
                  className={classes.closeButton}
                  type='button'
                  onClick={() => {
                    setModalOpen(false)
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M12.84 11.7793L17.2958 7.32354C17.5887 7.03065 17.5887 6.55578 17.2958 6.26288C17.0029 5.96999 16.528 5.96999 16.2351 6.26288L11.7793 10.7187L7.32354 6.26288C7.03065 5.96999 6.55578 5.96999 6.26288 6.26288C5.96999 6.55578 5.96999 7.03065 6.26288 7.32354L10.7187 11.7793L6.26294 16.2351C5.97005 16.5279 5.97005 17.0028 6.26294 17.2957C6.55584 17.5886 7.03071 17.5886 7.3236 17.2957L11.7793 12.84L16.2351 17.2957C16.5279 17.5886 17.0028 17.5886 17.2957 17.2957C17.5886 17.0028 17.5886 16.5279 17.2957 16.2351L12.84 11.7793Z'
                      fill='#757575'
                    />
                  </svg>
                </button>

                <ContactForm
                  onClose={() => {
                    setModalOpen(false)
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

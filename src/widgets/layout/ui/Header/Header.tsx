'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import cn from 'classnames'
import { Dropdown } from '@mui/base/Dropdown'
import { Menu } from '@mui/base/Menu'
import { MenuButton } from '@mui/base/MenuButton'
import { MenuItem } from '@mui/base/MenuItem'
import { useState } from 'react'
import Backdrop from '@mui/material/Backdrop'

import { LangSelect } from '@/features/lang'
import { UserDropdown, UserEntry } from '@/entities/user'
import { Logo } from '@/shared/ui'

import { ROUTE_NAMES } from '@/shared/config'
import { useAuth } from '@/shared/hooks/useAuth'

import classes from './Header.module.scss'

type HeaderProps = {
  isLanding?: boolean
}

export const Header = ({ isLanding = false }: HeaderProps) => {
  const { isAuth } = useAuth()
  const pathname = usePathname()

  const [isDropdownOpen, setDropdwonOpen] = useState(false)

  return (
    <header
      className={cn(classes.header, {
        [classes.landingHeader]: isLanding
      })}
    >
      <div className='wrapper'>
        <Logo
          className={classes.logo}
          width={isLanding ? 273 : undefined}
          height={isLanding ? 35 : undefined}
        />

        {!isLanding ? (
          <Link
            href={ROUTE_NAMES.SEARCH}
            className={cn(classes.link, {
              [classes.active]: pathname === ROUTE_NAMES.SEARCH
            })}
          >
            Search board
          </Link>
        ) : null}

        <div className={classes.right}>
          <div className={classes.langSelect}>
            <LangSelect />
          </div>

          {isAuth ? (
            <UserDropdown />
          ) : (
            <>
              <div className={classes.userEntry}>
                <UserEntry />
              </div>

              <Dropdown
                open={isDropdownOpen}
                onOpenChange={(_, isOpen) => {
                  setDropdwonOpen(isOpen)
                }}
              >
                <MenuButton
                  className={cn(classes.hamburger, {
                    [classes.open]: isDropdownOpen
                  })}
                >
                  <span />
                  <span />
                  <span />
                </MenuButton>

                <Backdrop
                  sx={{ background: 'rgba(0, 0, 0, 0.7)', zIndex: 500 }}
                  classes={{
                    root: classes.backdrop,
                    invisible: classes.backdrop
                  }}
                  open={isDropdownOpen}
                  onClick={() => {
                    setDropdwonOpen(false)
                  }}
                >
                  <Menu
                    className={classes.menu}
                    slotProps={{
                      root: {
                        placement: 'bottom-end'
                      }
                    }}
                  >
                    <MenuItem>
                      <Link href={ROUTE_NAMES.SEARCH}>Search board</Link>
                    </MenuItem>

                    <MenuItem>
                      <Link href={ROUTE_NAMES.SIGN_UP}>Sign Up</Link>
                    </MenuItem>

                    <MenuItem>
                      <Link href={ROUTE_NAMES.SIGN_IN}>Sign In</Link>
                    </MenuItem>

                    <MenuItem>
                      <LangSelect />
                    </MenuItem>

                    <MenuItem>
                      <button
                        type='button'
                        onClick={() => {
                          setDropdwonOpen(false)
                        }}
                      >
                        Exit
                      </button>
                    </MenuItem>
                  </Menu>
                </Backdrop>
              </Dropdown>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import Typography from '@mui/material/Typography'
import Backdrop from '@mui/material/Backdrop'
import { Dropdown } from '@mui/base/Dropdown'
import { Menu } from '@mui/base/Menu'
import { MenuButton } from '@mui/base/MenuButton'
import { MenuItem } from '@mui/base/MenuItem'

import { UserAvatar } from '../UserAvatar/UserAvatar'

import { ROUTE_NAMES } from '@/shared/config'
import { useAuth } from '@/shared/hooks/useAuth'
import { useUser } from '@/shared/hooks/useUser'
import { LangSelect } from '@/features/lang'

import classes from './UserDropdown.module.scss'

export const UserDropdown = () => {
  const [isDropdownOpen, setDropdwonOpen] = useState(false)
  const { user } = useUser()
  const { logout } = useAuth()

  return (
    <div className={classes.userDropdown}>
      <div className={classes.avatar}>
        <UserAvatar />
      </div>

      <Typography className={classes.fullName}>
        {user.firstName} {user.lastName}
      </Typography>

      <Dropdown
        open={isDropdownOpen}
        onOpenChange={(_, isOpen) => {
          setDropdwonOpen(isOpen)
        }}
      >
        <MenuButton className={classes.avatarMobileMenuButton}>
          <UserAvatar />
        </MenuButton>

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
            <MenuItem className={classes.searchBoardLink}>
              <Link href={ROUTE_NAMES.SEARCH}>Search board</Link>
            </MenuItem>

            <MenuItem>
              <Link href={ROUTE_NAMES.PROFILE}>Profile</Link>
            </MenuItem>

            <MenuItem>
              <Link href={ROUTE_NAMES.PROFILE_APPLICATIONS}>My applications</Link>
            </MenuItem>

            <MenuItem>
              <Link href={ROUTE_NAMES.PROFILE_RESPONSES}>My responses</Link>
            </MenuItem>

            <MenuItem>
              <Link href={ROUTE_NAMES.PROFILE_SETTINGS}>Settings</Link>
            </MenuItem>

            <MenuItem className={classes.langSelect}>
              <LangSelect />
            </MenuItem>

            <MenuItem>
              <button type='button' onClick={logout}>
                Logout
              </button>
            </MenuItem>
          </Menu>
        </Backdrop>
      </Dropdown>
    </div>
  )
}

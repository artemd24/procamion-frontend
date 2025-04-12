'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import cn from 'classnames'

import { ROUTE_NAMES } from '@/shared/config'

import classes from './Sidebar.module.scss'
import { AvatarIcon } from '../../../../../public/icons/sidebar/Avatar'
import { GearIcon } from '../../../../../public/icons/sidebar/Gear'
import { ResponseIcon } from '../../../../../public/icons/sidebar/Response'
import { NotebookIcon } from '../../../../../public/icons/sidebar/Notebook'

export const Sidebar = () => {
  const pathname = usePathname()

  const sections = [
    { label: 'Profile', href: ROUTE_NAMES.PROFILE, icon: <AvatarIcon /> },
    {
      label: 'My applications',
      href: ROUTE_NAMES.PROFILE_APPLICATIONS,
      icon: <NotebookIcon />
    },
    { label: 'My responses', href: ROUTE_NAMES.PROFILE_RESPONSES, icon: <ResponseIcon /> },
    { label: 'Settings', href: ROUTE_NAMES.PROFILE_SETTINGS, icon: <GearIcon /> }
  ]

  return (
    <aside className={classes.sidebar}>
      <ul>
        {sections.map(({ label, href, icon }, idx) => {
          return (
            <li
              key={label}
              className={cn({
                [classes.linkActive]: pathname === href
              })}
            >
              <Link href={href}>
                {icon}
                {label}
              </Link>

              <div
                className={cn(classes.activeLine, {
                  [classes.linkActive]: pathname === href
                })}
                style={{
                  top: `${100 + idx * 67}px`
                }}
              />
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

import cn from 'classnames'

import classes from './UserAvatar.module.scss'
import { AvatarIcon } from '../../../../../public/icons/sidebar/Avatar'

type UserAvatarProps = {
  size?: 'large' | 'small'
}

export const UserAvatar = ({ size = 'small' }: UserAvatarProps) => {
  return (
    <div
      className={cn(classes.userAvatar, {
        [classes.large]: size === 'large'
      })}
    >
      <AvatarIcon width={size === 'large' ? 110 : 29} height={size === 'large' ? 110 : 29} />
    </div>
  )
}

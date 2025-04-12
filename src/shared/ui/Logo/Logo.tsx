import Image from 'next/image'
import Link from 'next/link'

import { ROUTE_NAMES } from '../../config'

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export const Logo = ({ className, width = 169, height = 22.4 }: LogoProps) => {
  return (
    <Link href={ROUTE_NAMES.SEARCH} className={className}>
      <Image
        width={width}
        height={height}
        src='/img/logo.png'
        alt='procamion'
        priority
        quality={100}
      />
    </Link>
  )
}

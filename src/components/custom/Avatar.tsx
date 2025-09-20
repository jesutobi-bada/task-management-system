'use client'
import { Avatar as ArkAvatar, type AvatarRootProps } from '@ark-ui/react/avatar'
import { forwardRef } from 'react'
import { User } from 'iconsax-reactjs'

export interface AvatarProps extends AvatarRootProps {
  firstName?: string
  lastName?: string
  src?: string
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const { firstName, lastName, src, ...rootProps } = props

  return (
    <ArkAvatar.Root ref={ref} {...rootProps} className='w-8 h-8'>
      <ArkAvatar.Fallback className='w-full h-full rounded-full flex items-center justify-center text-secondary bg-primary/20'>
        {getInitials(firstName, lastName) || <User />}
      </ArkAvatar.Fallback>
      <ArkAvatar.Image src={src} alt={`${firstName} ${lastName}`} className='w-full h-full rounded-full object-cover' />
    </ArkAvatar.Root>
  )
})


const getInitials = (firstName?: string, lastName?: string) => {
  if (!firstName && !lastName) return null
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : ''
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : ''
  return `${firstInitial}${lastInitial}`
}

Avatar.displayName = 'Avatar'

export default Avatar

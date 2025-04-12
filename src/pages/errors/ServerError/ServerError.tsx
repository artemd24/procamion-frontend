import { ErrorLayout } from '@/widgets/layout'

export const ServerError = () => {
  return <ErrorLayout iconSrc='./icons/server-error.svg' code='500' text='Server Error' />
}

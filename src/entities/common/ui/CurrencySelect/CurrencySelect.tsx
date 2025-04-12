import { Select } from '@/shared/ui'

import { Currency } from '@/shared/const/local.const'

import classes from './CurrencySelect.module.scss'

type CurrencySelectProps = {}

export const CurrencySelect = ({}: CurrencySelectProps) => {
  const currencies = [
    { label: 'USD', value: Currency.USD },
    { label: 'EUR', value: Currency.EUR },
    { label: 'MAD', value: Currency.MAD }
  ]

  return <Select name='currency' options={currencies} className={classes.currencySelect} />
}

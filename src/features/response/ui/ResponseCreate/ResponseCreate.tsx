'use client'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Textarea } from '@/shared/ui'

import { useResponseCreate } from '../../model/useResponseCreate'

import classes from './ResponseCreate.module.scss'

type ResponseCreateProps = {
  applicationId: string
  onProcessStart: () => void
  onResponseCreate: () => void
}

const schema = z.object({
  comment: z.string()
})

type FormSchema = z.infer<typeof schema>

export const ResponseCreate = ({
  applicationId,
  onProcessStart,
  onResponseCreate
}: ResponseCreateProps) => {
  const [inProcess, setInProcess] = useState(false)
  const { createResponse, inProcess: responseCreatingInProcess } = useResponseCreate({
    onSuccess: onResponseCreate
  })

  const useFormProps = useForm<FormSchema>({
    resolver: zodResolver(schema)
  })
  const { handleSubmit } = useFormProps

  const onFormSubmit = ({ comment }: FormSchema) => {
    createResponse({ applicationId, comment })
  }

  return (
    <div>
      {inProcess ? (
        <FormProvider {...useFormProps}>
          <form className={classes.form} onSubmit={handleSubmit(onFormSubmit)}>
            <FormControl>
              <InputLabel className={classes.label} htmlFor='comment'>
                Comment
              </InputLabel>

              <Textarea
                id='comment'
                className={classes.commentField}
                name='comment'
                placeholder='Enter your comment'
              />
            </FormControl>

            <div className={classes.responseButtonRow}>
              <Button
                type='submit'
                size='small'
                isLoading={responseCreatingInProcess}
                onClick={() => {
                  setInProcess(true)
                  onProcessStart()
                }}
              >
                Create response
              </Button>
            </div>
          </form>
        </FormProvider>
      ) : (
        <div className={classes.responseButtonRow}>
          <Button
            type='button'
            size='small'
            onClick={() => {
              setInProcess(true)
              onProcessStart()
            }}
          >
            Response
          </Button>
        </div>
      )}
    </div>
  )
}

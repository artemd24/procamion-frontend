'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

import { Button, Textarea } from '@/shared/ui'

import { useResponseEdit } from '../../model/useResponseEdit'
import { useResponseDelete } from '../../model/useResponseDelete'

import classes from './ResponseEdit.module.scss'

type ResponseEditProps = {
  responseId: string
  comment: string
  onResponseEdit: () => void
  onEditCancel: () => void
}

const schema = z.object({
  comment: z.string()
})

type FormSchema = z.infer<typeof schema>

export const ResponseEdit = ({
  responseId,
  comment,
  onResponseEdit,
  onEditCancel
}: ResponseEditProps) => {
  const { editResponse, inProcess: editingResponseInProgress } = useResponseEdit({
    onSuccess: onResponseEdit
  })
  const { deleteResponse, inProcess: deletingResponseInProgress } = useResponseDelete({
    onSuccess: onResponseEdit
  })

  const useFormProps = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      comment
    }
  })
  const { handleSubmit } = useFormProps

  const onFormSubmit = ({ comment }: FormSchema) => {
    editResponse({ responseId, comment })
  }

  return (
    <FormProvider {...useFormProps}>
      <form className={classes.form} onSubmit={handleSubmit(onFormSubmit)}>
        <FormControl>
          <InputLabel className={classes.label} htmlFor='comment'>
            Your comment
          </InputLabel>

          <Textarea
            id='comment'
            className={classes.commentField}
            name='comment'
            placeholder='Enter your comment'
          />
        </FormControl>

        <div className={classes.actions}>
          <Button
            type='button'
            color='secondary'
            size='small'
            onClick={() => {
              onEditCancel()
            }}
          >
            Cancel
          </Button>

          <Button isLoading={editingResponseInProgress} type='submit' color='success' size='small'>
            Save
          </Button>

          {/* <Button
            isLoading={deletingResponseInProgress}
            type='button'
            color='error'
            size='small'
            onClick={() => {
              deleteResponse(responseId)
            }}
          >
            Delete
          </Button> */}
        </div>
      </form>
    </FormProvider>
  )
}

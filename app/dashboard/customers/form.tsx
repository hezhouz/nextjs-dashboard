'use client'
 
import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'
import { createToDo } from './actions';
import { z } from 'zod'
import { todo } from 'node:test';

const initialState = {
  message: '',
}

const schema = z.object({
  todo:z.string({ invalid_type_error: 'invalid string', required_error: 'required' })
})
 
function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" aria-disabled={pending}>
      {pending ? 'Adding' : 'Add'}
    </button>
  )
}

export default function AddToDoForm() {
  const [state, formAction] = useActionState(createToDo, initialState)

  return (
    <form action={formAction}>
      <input type="text" name="todo" />
      <SubmitButton />
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
  )
}

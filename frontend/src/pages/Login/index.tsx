import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { Button, Spinner, Form, Container } from 'react-bootstrap'
import { toast } from 'react-toastify'
// import { toast } from 'react-toastify'

import { AuthContext } from '../../context/AuthContext'

function initialFormValues () {
  return {
    email: '',
    password: ''
  }
}

export function Login () {
  const [values, setValues] = useState(initialFormValues)
  const [loginRequestStatus, setLoginRequestStatus] = useState('success')
  const { signIn } = useContext(AuthContext)

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setValues({
      ...values,
      [name]: value
    })
  }

  async function handleSubmit (e: FormEvent) {
    e.preventDefault()

    setLoginRequestStatus('loading')

    await signIn(values).then((res) => {
      if (res) {
        return toast.error('Please check your sign in credentials and try again')
      }
    })

    setLoginRequestStatus('success')
  }

  useEffect(() => {
    // clean the function to fix memory leak
    return () => setLoginRequestStatus('success')
  }, [])

  return (
    <div>
      <h2 className='text-center'>Login</h2>
      <Container className="bg-light border border-dark border-3">

        <Form data-testid="login-form" onSubmit={handleSubmit}>

          <Form.Group className='mb-3' controlId='formEmailLogin'>
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={handleChange} name="email" value={values.email} disabled={loginRequestStatus === 'loading'} required />

          </Form.Group>
          <Form.Group className='mb-3' controlId='formPasswordLogin'>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Enter password" onChange={handleChange} name="password" value={values.password} disabled={loginRequestStatus === 'loading'} required />
        </Form.Group>

          <Container className="align-content-center text-center justify-content-center mb-2 pb-2">

        {loginRequestStatus !== 'loading'
          ? <Button
          type="submit"
          variant="dark"
          disabled={loginRequestStatus === 'loading'}
        > Login
        </Button>
          : <Button variant="dark" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="visually-hidden">Loading...</span>
        </Button>
        }
          </Container>

        </Form>

      </Container>
    </div>
  )
}

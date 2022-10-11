import React, { useState, FormEvent } from 'react'
import { Button, Spinner, Form, Container } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { postNewUser } from '../../services/interceptors'

export function Register () {
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: ''
  })
  const [pendingSubmit, setPendingSubmit] = useState(false)

  const { email, password, passwordConfirm, firstName, lastName } = formInput

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormInput({
      ...formInput,
      [name]: value
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (password !== passwordConfirm) { toast.error('Passwords do not match') } else {
      setPendingSubmit(true)
      postNewUser(email, password, firstName, lastName).then((res) => {
        setPendingSubmit(false)
        toast('Account Created! Please sign in to continue')
      })
      setFormInput({
        email: '',
        password: '',
        passwordConfirm: '',
        firstName: '',
        lastName: ''
      })
    }
  }

  return (
    <div>
      <h1 className="text-center">Register</h1>
      <Container className="bg-light border border-dark border-3">

        <Form onSubmit={handleSubmit}>

        <Form.Group className='mb-3' controlId='formFirstName'>
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" onChange={handleFormChange} name="firstName" value={firstName} required />
          </Form.Group>

        <Form.Group className='mb-3' controlId='formLastName'>
          <Form.Label>Surname:</Form.Label>
          <Form.Control type="text" placeholder="Enter surname" onChange={handleFormChange} name="lastName" value={lastName} required />
          </Form.Group>

        <Form.Group className='mb-3' controlId='formEmail'>
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={handleFormChange} name="email" value={email} required/>
          <Form.Text muted> Your email will never shared with anyone else</Form.Text>
          </Form.Group>

        <Form.Group className='mb-3' controlId='formPassword'>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Enter password" onChange={handleFormChange} name="password" value={password} required />
          </Form.Group>

        <Form.Group className='mb-3' controlId='formPasswordConfirm'>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control type="password" placeholder="Confirm password" onChange={handleFormChange} name="passwordConfirm" value={passwordConfirm} required/>
          </Form.Group>

          <Container className="align-content-center text-center justify-content-center mb-2 pb-2">

        {!pendingSubmit
          ? <Button
          type="submit"
          variant="dark"
          disabled={pendingSubmit}
        > Create Account
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

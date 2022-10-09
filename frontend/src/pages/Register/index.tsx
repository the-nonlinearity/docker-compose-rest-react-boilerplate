import React, { useState, FormEvent } from 'react'
import { Button, Spinner, Form } from 'react-bootstrap'
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
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        {/* <div> */}
        <Form.Group className='mb-3' controlId='formFirstName'>
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" onChange={handleFormChange} value={firstName} />
          {/* <input
            value={firstName}
            type="text"
            name="firstName"
            id="firstName"
            onChange={handleFormChange}
            placeholder='Enter first name'
        /> */}
        </Form.Group>
        {/* </div> */}
        {/* <div>
      <label htmlFor="lastName">Surname</label>
          <input
            value={lastName}
            type="text"
            name="lastName"
            id="lastName"
            onChange={handleFormChange}
            placeholder='Enter surname'
        />
        </div> */}
        <Form.Group className='mb-3' controlId='formLastName'>
          <Form.Label>Surname:</Form.Label>
          <Form.Control type="text" placeholder="Enter surname" onChange={handleFormChange} value={lastName} />
          </Form.Group>
        {/* <div>
      <label htmlFor="email">Email</label>
          <input
            value={email}
            type="email"
            name="email"
            id="email"
            onChange={handleFormChange}
            placeholder='Enter email'
        />
        </div> */}
        <Form.Group className='mb-3' controlId='formEmail'>
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={handleFormChange} value={email} />
          <Form.Text className='text-muted'> Your email will never shared with anyone else</Form.Text>
          </Form.Group>
        {/* <div>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            type="password"
            name="password"
            id="password"
            onChange={handleFormChange}
            placeholder='Enter password'
          />
        </div> */}
        <Form.Group className='mb-3' controlId='formPassword'>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Enter password" onChange={handleFormChange} value={password} />
          </Form.Group>
        {/* <div>
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            value={passwordConfirm}
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            onChange={handleFormChange}
            placeholder='Confirm password'
          />
        </div> */}
        <Form.Group className='mb-3' controlId='formPasswordConfirm'>
          <Form.Label>Confirm Password::</Form.Label>
          <Form.Control type="password" placeholder="Confirm password" onChange={handleFormChange} value={passwordConfirm} />
          </Form.Group>
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
      </Form>
    </div>
  )
}

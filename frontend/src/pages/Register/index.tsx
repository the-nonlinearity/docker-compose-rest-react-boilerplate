import React, { useState, FormEvent } from 'react'
import { Button, Spinner } from 'react-bootstrap'
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
      <form onSubmit={handleSubmit}>
      <div>
      <label htmlFor="firstName">Name</label>
          <input
            value={firstName}
            type="text"
            name="firstName"
            id="firstName"
            onChange={handleFormChange}
            placeholder='Enter first name'
        />
        </div>
        <div>
      <label htmlFor="lastName">Surname</label>
          <input
            value={lastName}
            type="text"
            name="lastName"
            id="lastName"
            onChange={handleFormChange}
            placeholder='Enter surname'
        />
        </div>
        <div>
      <label htmlFor="email">Email</label>
          <input
            value={email}
            type="email"
            name="email"
            id="email"
            onChange={handleFormChange}
            placeholder='Enter email'
        />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            type="password"
            name="password"
            id="password"
            onChange={handleFormChange}
            placeholder='Enter password'
          />
        </div>
        <div>
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            value={passwordConfirm}
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            onChange={handleFormChange}
            placeholder='Confirm password'
          />
        </div>
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
      </form>
    </div>
  )
}

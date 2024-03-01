// Write your tests here
import React from "react"
import { render,fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from "@testing-library/user-event"

import AppFunctional from "./AppFunctional"


let input,user,right,left,up,down,reset
let steps,message,email,coordinates

const allSelectedElements = (document) =>{
  right = document.querySelector("#right")
  left = document.querySelector("#left")
  up = document.querySelector("#up")
  down = document.querySelector("#down")
  reset = document.querySelector("#reset")
  steps = document.querySelector("#steps")
  message = document.querySelector("#message")
  email = document.querySelector('#email')
  coordinates = document.querySelector('#coordinates')
}

describe("AppFunctioneal Component", ()=>{
beforeEach(()=>{
  render(<AppFunctional />)
  user = userEvent.setup()
  input = screen.getByPlaceholderText('type email')
  allSelectedElements(document)
})

  test('input changes correctly', async () => {
  await user.type(input,"lady@gaga.com")
  expect(input).toHaveValue("lady@gaga.com")
  })
  test('button click counter :up', ()=>{
    fireEvent.click(up)
    expect(steps.textContent).toBe("You moved 1 time")  
  })
  test('button click counter: up,left,down,right', ()=>{
    fireEvent.click(up)
    fireEvent.click(left)
    fireEvent.click(down)
    fireEvent.click(right)
    expect(steps.textContent).toBe("You moved 4 times")
})
  test('button click counter: up,up,left,left,left', ()=>{
  fireEvent.click(up)
  fireEvent.click(up)
  fireEvent.click(left)
  fireEvent.click(left)
  fireEvent.click(left)
  expect(steps.textContent).toBe("You moved 2 times")
})
 test('reset button restarts the state', ()=>{
  fireEvent.click(reset)
  expect(message.textContent).toBe('')
  expect(steps.textContent).toBe('You moved 0 times')
  expect(email.textContent).toBe('')
  expect(coordinates.textContent).toBe('Coordinates (2, 2)')

 })
 test('buttons are visible',()=>{
  expect(up).toBeVisible()
  expect(down).toBeVisible()
  expect(left).toBeVisible()
  expect(right).toBeVisible()
  expect(reset).toBeVisible()
  expect(steps).toBeVisible()
  expect(message).toBeVisible()
  expect(coordinates).toBeVisible()
  expect(email).toBeVisible()
  // screen.debug()
 })
})
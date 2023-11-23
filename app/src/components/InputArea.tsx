import React from 'react'
import { DropArea } from './DropArea'
import { DisplayInput } from './DisplayInput'
import { Heading } from './Heading'

export const InputArea: React.FC = () => {
  return (
    <>
      <Heading>Select Files</Heading>
      <DropArea />
      <DisplayInput />
    </>
  )
}

import React from 'react'
import { DropArea } from './DropArea'
import { DisplayInput } from './DisplayInput'
import { Heading } from './Heading'

export const InputArea: React.FC = () => {
  return (
    <>
      <Heading>Input Files</Heading>
      <DropArea />
      <DisplayInput />
    </>
  )
}

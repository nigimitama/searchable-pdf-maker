import { Typography } from "@mui/material";
import React from "react";

type HeadingProps = {
  children: React.ReactNode | string
}


export const Heading: React.FC<HeadingProps> = (props: HeadingProps) => {
  return (
    <Typography variant="h6" style={{color: "#0F0F0F"}}>
      {props.children}
    </Typography>
  )
}

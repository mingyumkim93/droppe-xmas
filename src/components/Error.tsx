import React from "react";

interface ErrorProps {
  message: string;
}

function Error({ message }: ErrorProps) {
  return <div>{message}</div>;
}

export default Error;

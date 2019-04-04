import * as React from "react";
import styled from "styled-components";

const Title = styled.h1`
  color: black;
  font-size: 20px;
`;

const Body = styled.h5`
  color: black;
  font-size: 15px;
`

export default () => (
<div>
  <Title>My page</Title>
  <Body>404 Error!</Body>
</div>);

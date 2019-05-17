import React, { Component } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  closeContact: () => void;
}

export default class Contact extends Component<Props> {
  render() {
    return (
      <WindowContainer onClick={this.props.closeContact}>
        <Container onClick={evt => evt.stopPropagation()}>
          <Header>Contact</Header>
          <ExitButton onClick={this.props.closeContact}>×</ExitButton>

          <NormalText>
            To learn more about Pumpkin Key, please provide your details below:
          </NormalText>
          <Form onSubmit={evt => evt.preventDefault()}>
            <FormGroup>
              <Label>First Name: </Label>
              <Input />
            </FormGroup>
            <FormGroup>
              <Label>Last Name: </Label>
              <Input />
            </FormGroup>
            <FormGroup>
              <Label>Phone: </Label>
              <Input />
            </FormGroup>
            <FormGroup>
              <Label>Email: </Label>
              <Input />
            </FormGroup>
            <SubmitButton onClick={this.props.closeContact}>
              Submit
            </SubmitButton>
          </Form>
          <NormalText>Presented by Ocean Sotheby's</NormalText>
          <AddressContainer>
            <NormalText small>Ocean Sotheby's International Realty</NormalText>
            <NormalText small>
              81888 Overseas Highway, Islamorada, FL 33036
            </NormalText>
            <NormalText small>305.712.8888</NormalText>
          </AddressContainer>
          <Icon src='https://s3.amazonaws.com/sage.pumpkin-key/sothebys.png' />
        </Container>
      </WindowContainer>
    );
  }
}

const WindowContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);

  position: fixed;
  top: 0px;
  left: 0px;
`;

const Icon = styled.img`
  margin-top: 20px;
  width: 100%;
`;

const ExitButton = styled.span`
  font-weight: 300;
  font-size: 48px;
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
  opacity: 0.9;
  color: #003f3a;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }

  position: absolute;
  top: 10px;
  right: 15px;
`;

const AddressContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 7px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  margin-bottom: 10px;
`;

const Header = styled.h2`
  color: #003f3a;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: bold;
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
  position: relative;
  top: -10px;
`;
const NormalText = styled.span`
  color: #003f3a;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 500;

  ${props =>
    props.small &&
    css`
      font-size: 8px;
    `}
`;
const Form = styled.form`
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Label = styled.label`
  color: #003f3a;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 500;
  margin-right: 10px;
`;
const Input = styled.input`
  flex-grow: 1;

  color: #003f3a;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 500;

  outline: none;
  border: none;
  background-color: transparent;
  border-bottom: 0.5px solid #003f3a;
`;
const SubmitButton = styled.button`
  cursor: pointer;
  margin-top: 10px;
  border: none;
  outline: none;
  background-color: transparent;

  color: #003f3a;
  font-family: 'Bodoni Sans', sans-serif;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1.82px;
  line-height: 14px;
  text-align: center;

  text-transform: uppercase;
  border: 0.5px solid #003f3a;

  padding: 4px 8px;
`;
const Container = styled.div`
  width: 340px;
  height: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 40px 40px;
`;

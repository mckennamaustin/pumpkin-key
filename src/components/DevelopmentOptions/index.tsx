import React, { Component } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  option: string;
  receiveOptionChange: (option: string) => void;
}

export default class DevelopmentOptions extends Component<Props> {
  state = {
    isDropped: false
  };
  render() {
    return (
      <Container>
        <DropContainer>
          <Dropper>▼</Dropper>
        </DropContainer>
        <OptionContainer>
          <Option
            bold={this.props.option === 'private-island'}
            onClick={() => this.props.receiveOptionChange('private-island')}
          >
            1. Private Estate
          </Option>
          <Option
            bold={this.props.option === 'residential-island'}
            onClick={() => this.props.receiveOptionChange('residential-island')}
          >
            2. Compound
          </Option>
          <Option
            bold={this.props.option === 'development-island'}
            onClick={() => this.props.receiveOptionChange('development-island')}
          >
            3. Residential Community
          </Option>
        </OptionContainer>
        <DescriptionContainer>
          {this.props.option === 'private-island' && (
            <Paragraph>
              Create your own private sanctuary complete with Helicopter Pad and
              separate guest and staff quarters
            </Paragraph>
          )}
          {this.props.option === 'residential-island' && (
            <Paragraph>
              Design your own private sanctuary with separate guest and staff
              accommodations spread throughout the island
            </Paragraph>
          )}
          {this.props.option === 'development-island' && (
            <Paragraph>
              Develop a collection of prestigious homes each with spectacular
              waterfront views
            </Paragraph>
          )}
        </DescriptionContainer>
      </Container>
    );
  }
}

const DropContainer = styled.div`
  width: 50px;
  margin-left: -25px;
  top: -1px;
  left: 50%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border: 1px solid rgba(255, 255, 255, 0.8);
  border-top: none;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;

  &:hover {
    span {
      opacity: 1;
    }
  }

  &,
  * {
    cursor: pointer;
  }
`;
const Dropper = styled.span`
  color: white;
  font-size: 16px;
  text-align: center;

  transition: all 250ms ease-in-out;
  opacity: 0.7;
  transform: scaleY(0.6);
`;

const DescriptionContainer = styled.div`
  width: 62%;
  opacity: 0.6;
  margin-top: 15px;
`;

const Paragraph = styled.div`
  flex-grow: 1;
  font-family: 'Montserrat', sans-serif;
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
  @media (max-width: 608px) {
    text-align: left;
  }
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 608px) {
    flex-direction: column;
    justify-content: flex-start;

    > span:not(:last-of-type) {
      margin-bottom: 10px;
    }
  }
`;

const Option = styled.span`
  height: 16px;
  color: #ffffff;
  font-family: 'Bodoni Sans', sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 2px;
  line-height: 16px;
  text-transform: uppercase;
  cursor: pointer;

  opacity: 0.5;
  ${props =>
    props.bold &&
    css`
      opacity: 1;
    `};
  transition: all 250ms ease-in-out;
  &:hover {
    opacity: 1;
  }

  &:not(:last-of-type) {
    margin-right: 20px;
  }
`;

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0px;
  padding-top: 25px;
  padding-bottom: 25px;
  border-top: 1px solid rgba(255, 255, 255, 0.8);
  background-color: rgba(0, 0, 0, 0.5);

  transform: translate(0, 75%);
`;

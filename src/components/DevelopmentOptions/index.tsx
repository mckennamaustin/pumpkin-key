import React, { Component } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  option: string;
  receiveOptionChange: (option: string) => void;
}

export default class DevelopmentOptions extends Component<Props> {
  render() {
    return (
      <Container>
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
        {/* <DescriptionContainer>
          <Paragraph>
            The Ocean Reef Club team has explored two potential development
            opportunities for the island. Create your own private sanctuary
            complete with Helicopter Pad and separate guest and staff quarters.
            Custom design a traditional or more modern home that’s your own
            private sanctuary complete with helicopter pad and separate guest
            and staff quarters or develop a prestigious a community of
            independent homes each with spectacular waterfront views. There is
            no limit to the development potential of Pumpkin Key. The unique
            private island offers the opportunity to create a bespoke experience
            in the Florida Keys.
          </Paragraph>
        </DescriptionContainer> */}
      </Container>
    );
  }
}

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
  bottom: 0px;
  left: 0px;
  padding-top: 25px;
  padding-bottom: 25px;
  border-top: 1px solid rgba(255, 255, 255, 0.8);
  background-color: rgba(0, 0, 0, 0.5);
`;

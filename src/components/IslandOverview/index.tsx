import React, { Component } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  closeOverview: () => void;
}

interface State {
  height: number;
}

export default class IslandOverview extends Component<Props, State> {
  private image: HTMLImageElement;

  state = {
    height: 0
  };

  componentDidMount() {
    if (this.image) {
      this.setState({ height: this.image.clientWidth / 2.8 });
    }
  }

  render() {
    return (
      <WindowContainer onClick={this.props.closeOverview}>
        <Container onClick={evt => evt.stopPropagation()}>
          <Title>Island Overview</Title>
          <ExitButton onClick={this.props.closeOverview}>×</ExitButton>
          <Image
            ref={image => {
              this.image = image;
            }}
            height={`${this.state.height}px`}
            src='https://s3.amazonaws.com/sage.pumpkin-key/gallery/24.jpg'
          />
          <OverviewDetailsContainer>
            <TextContainer>
              <TextHeader>About Pumpkin Key</TextHeader>
              <Paragraph>
                A short 3-minute ride via private boat from Ocean Reef Club,
                spectacular Pumpkin Key is a completely private oasis just
                moments from Key Largo. <br />
                <br />
                The island is located in Card Sound Bay and protected on all
                sides, making it an ideal year-round retreat. The existing
                20-slip marina is big enough to accommodate the largest of
                yachts, allowing you to sail in uninterrupted from other
                destinations in the Caribbean and eastern US. <br />
                <br />
                With idyllic waters, the extremely private white-sand beach
                offers swimming, sun bathing and plenty of space to enjoy games
                and fun with family and friends. This island paradise offers
                families an opportunity to enjoy the best that the Florida Keys
                have to offer: Sport Fishing, Snorkeling, Scuba Diving,
                Watersports, Tennis, Golf, and relaxation. <br />
                <br />
                Fueled by a sub-aqueous crossing that brings self-sufficient
                electricity, fiber optics, and fresh water from the mainland,
                Pumpkin Key’s 26 acres of natural paradise has massive potential
                for development. The existing 3-bedroom home and Caretaker’s and
                Dockmaster’s apartments offer an excellent foundation on which
                to build.
              </Paragraph>
            </TextContainer>
            <TextContainer>
              <TextHeader>Ocean Reef Club</TextHeader>
              <Paragraph>
                At the tip of Key Largo, Ocean Reef Club is a members-only golf
                club and community with world-class dining, beaches, and
                amenities. <br />
                <br />
                As part of an assemblage, the purchase of Pumpkin Key includes a
                3-bedroom Harbour House and adjacent vacant lot within the Ocean
                Reef community. This spacious waterfront home on the marina
                features stunning golf and waterway views with direct access to
                Card Sound and the ocean beyond <br /> <br />The invitation-only
                club features two challenging 18-hole golf courses as well. With
                over a dozen restaurants and lounges to enjoy, you’ll find
                gastronomy to excite your palate as you take in the spectacular
                views.
                <br />
                <br /> 10 Minutes via helicopter from Miami and accessible via
                private airport and marina, Ocean Reef Club features 2,500 lush
                tropical acres for your family to enjoy.
              </Paragraph>
            </TextContainer>
          </OverviewDetailsContainer>
        </Container>
      </WindowContainer>
    );
  }
}

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
  top: 21px;
  right: 25px;
`;

const OverviewDetailsContainer = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  > div:first-of-type {
    grid-row: 1/2;
    grid-column: 1/2;
  }

  > div:not(:first-of-type) {
    grid-row: 1/2;
    grid-column: 2/3;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    > div:first-of-type {
      margin-bottom: 20px;
    }
  }
`;

const Paragraph = styled.p`
  font-size: 12px;
  font-weight: 300;
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
  line-height: 25px;
  opacity: 0.9;
`;

const WindowContainer = styled.div`
  width: 100vw;
  min-height: 110vh;

  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0px;
  left: 0px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const TextContainer = styled.div`
  color: #003f3a;

  font-weight: 500;
`;
const TextHeader = styled.h2`
  font-size: 14px;
  font-weight: bold;
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
`;
const Title = styled.h1`
  color: #003f3a;
  font-family: 'Bodoni Sans', sans-serif;
  font-size: 1.4em;
  font-weight: 500;
  letter-spacing: 2.63px;
  text-align: left;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
`;

const Image = styled.div`
  width: 100%;
  ${props =>
    props.height &&
    css`
      height: ${props.height};
    `}
  margin: 20px 0;
  ${props =>
    props.src &&
    css`
      background-image: url(${props.src});
    `}

  background-size: 100%;
  background-position: center;
`;
const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 60vw;
  margin: 50px 0;

  @media (max-width: 640px) {
    width: 100vw;
  }
  box-sizing: border-box;
  padding: 10px 30px;
  border-radius: 4px;
  padding-top: 40px;
  padding-bottom: 60px;

  position: relative;
`;

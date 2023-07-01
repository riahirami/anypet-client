import React from 'react'
import {
Body,Col,ContainerFluid,Figcaption,Figure,Media,Svg
} from './AdVedette.style';
import { styled } from '@mui/material/styles';
import { Typography, Button } from '@mui/material';
import { AdVedetteProps } from './AdVedette.type';
import CustomLink from 'Components/CustomLink/CustomLink';
import { themes } from "Theme/Themes";



const AdVedette = ({ adData, user, mode,
  handleThemeChange, }: AdVedetteProps) => {
  return (
    <ContainerFluid style={{ backgroundColor: themes[mode].vedette.backgroundColor }}>
      <Col className="col-lg-6 col-md-6 hidden-sm hidden-xs">
        <Figure>
          <Media style={{ backgroundImage: `url(${adData?.media?.[0].file_path})` }}>
            <a href="#"></a>
          </Media>
          <Figcaption >
            <Svg viewBox="0 0 200 200" version="1.1" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <mask id="mask" x="0" y="0" width="100%" height="100%">
                  <rect id="alpha" x="0" y="0" width="100%" height="100%" />
                  <text className="title" dx="50%" dy="2.5em">{adData?.title}</text>
                  {/* <text className="title" dx="50%" dy="3.5em">EVERY</text>
              <text className="title" dx="50%" dy="4.5em">MOMENT</text> */}
                </mask>
              </defs>
              <rect id="base" x="0" y="0" width="100%" height="100%" style={{ fill: themes[mode].AdsCard.backgroundColor }}/>
            </Svg>
            <Body >
              <Typography style={{ maxWidth: '90%',color: themes[mode].AdsCard.color  }} >{adData?.description}</Typography>

            </Body>
            <CustomLink to={"/advertise/" + adData?.id}><Button variant={"contained"}>
              Read more
            </Button>
            </CustomLink>
          </Figcaption>
        </Figure>
      </Col>
    </ContainerFluid>
  );
};

export default AdVedette;
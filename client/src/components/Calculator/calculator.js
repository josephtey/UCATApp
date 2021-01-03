import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import ScriptTag from 'react-script-tag';


const Calculator = (props) => {

  return (
    <Container>
      <div id="calc-body">
        <div id="header">
          <div id="screen">
            <p id="output"></p>
          </div>
          <div id="decoration">
            <div id="solar">
              <div class="solarbox"></div>
              <div class="solarbox"></div>
              <div class="solarbox"></div>
              <div class="solarbox"></div>
            </div>
            <p id="logo">TI-108</p>
          </div>
        </div>

        <div id="button-box">
          <div class="col left-buttons">
            <div class="op button" id="sign">+/-</div>
            <div class="op button" id="sqrt">&radic;</div>
            <div class="op button" id="percent">%</div>
            <div class="op button" id="mrc">MRC</div>
            <div class="op button" id="msubtract">M-</div>
            <div class="op button" id="madd">M+</div>
            <div class="number button">7</div>
            <div class="number button">8</div>
            <div class="number button">9</div>
            <div class="number button">4</div>
            <div class="number button">5</div>
            <div class="number button">6</div>
            <div class="number button">1</div>
            <div class="number button">2</div>
            <div class="number button">3</div>
            <div class="op button" id="clear" >ON/C</div>
            <div class="number button">0</div>
            <div class="number button">.</div>
          </div>

          <div class="col right-buttons">
            <div class="op button" id="divide">&divide;</div>
            <div class="op button" id="multiply">&times;</div>
            <div class="op button" id="subtract">-</div>
            <div class="op button" id="add">+</div>
            <div class="op button" id="equals">=</div>
          </div>
        </div>

      </div>

      <ScriptTag isHydrating={false} type="text/javascript" src="/calculate.js" />
    </Container>
  )
}

const Container = styled.div`
/******************************
 BODY
 *******************************/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
 html {
   background-color: #badae5;
 }
 
 body{
   width: 100%;
 }
 
 #calc-body {
   height: 450px;
   width: 300px;
   background-color:#0d57b6;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   font-family: "Courier New", monospace;
   border-top-left-radius: 5px;
   border-top-right-radius: 5px;
   border-bottom-left-radius: 10px;
   border-bottom-right-radius: 10px;
 }
 
 
 
 /******************************
 HEADER
 *******************************/
 
 #header {
   height: 130px;
   width: 300px;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   align-items: center;
   padding-bottom: 5px;
   border-bottom: 2px solid #444;
 }
 
 #screen {
   width: 250px;
   height: 40px;
   background-color: slategrey;
   border-radius: 2px;
 
 }
 
 #screen p {
   text-align: right;
   padding: 10px 10px 0 0; 
   font-size: 24px;
   color: #333;
 }
 
 #decoration {
   width: 250px;
   display: flex; 
   justify-content: space-between;
 }
 
 #solar {
   height: 40px;
   width: 160px;
   background-color: #584237;
   display: flex;
 }
 
 .solarbox {
   height: 100%;
   width: 40px;
   border: 0.1px solid slategrey;
 }
 
 #logo {
   font-size: 20px;
   color: white;
 }
 
 
 /******************************
 BUTTONS
 *******************************/
 
 
 #button-box,
 .col {
   display: flex;
   height: 280px;
 }
 
 #button-box {
   width: 280px;
   margin: 0 auto;
   flex-direction: row;
   justify-content: space-between;
 }
 
 .col {
   flex-flow: wrap;
   justify-content: space-around;
   align-content: space-around;
 }
 
 .left-buttons {
   width: 200px;
 }
 
 .right-buttons {
   width: 60px;
   flex-direction: column;
 }
 
 .button {
   width: 50px;
   height: 30px;
   border-radius: 2px;
   padding-left: 4px;
   padding-top: 4px;
   font-size: 16px;
 }
 
 .number {
   background-color: white;
   color: #0d57b6; 
 }
 
 .op {
   background-color: #db3c32;
   color: white;
 }
 
 #equals {
   height: 80px;
 }
 
 
 
 /*** ANIMATION ***/
 
 .button:hover {
   cursor: pointer;
 }
 
 .button:active {
   transform: translateY(1.5px);
 }
 
 
 
 
`
export default Calculator
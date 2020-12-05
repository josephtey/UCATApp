import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { RiFlag2Fill, RiFlag2Line } from "react-icons/ri";

export const Button = ({ type, label, color, onClick }) => {
  return (
    <Container
      onClick={onClick}
      color={color === "teal" ? '#2ecfb0' : '#f89800'}
    >
      {type === "primary" ?
        <ButtonPrimary
          color={color === "teal" ? '#2ecfb0' : '#f89800'}
        >
          {label}
        </ButtonPrimary>
        : type === "secondary" ?
          <ButtonSecondary
            color={color === "teal" ? '#2ecfb0' : '#f89800'}
          >
            {label}
          </ButtonSecondary>
          : null}
    </Container>
  )
}

export const LinkItem = ({
  onClick,
  children,
  color
}) => {
  return (
    <Link
      onClick={onClick}
      color={color === "teal" ? '#2ecfb0' : '#f89800'}
    >
      {children}
    </Link>
  )
}

export const RadioBox = ({
  options,
  defaultValue,
  onClick
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue ? defaultValue : null)
  return (
    <>
      {options.map((item, i) => {
        return (
          <RadioOption
            onClick={() => {
              setSelectedOption(item)
              onClick(item)
            }}
            key={i}
            selected={selectedOption === item ? true : false}
            className="hvr-forward"
          >
            {item}
          </RadioOption>
        )
      })}
    </>
  )
}

export const RadioBoxAnswer = ({
  options,
  correctValue,
  selectedValue
}) => {
  const [selectedOption, setSelectedOption] = useState(selectedValue ? selectedValue : null)

  return (
    <>
      {options.map((item, i) => {
        return (
          <RadioOption
            key={i}
            selected={item === correctValue ? true : false}
            wrong={item === selectedOption && correctValue !== selectedOption ? true : false}
            className="hvr-forward"
          >
            <OptionLeft>
              {item}
            </OptionLeft>
            <OptionRight>
              {item === selectedOption && correctValue !== selectedOption ?
                "Your answer: Wrong!"
                : item === correctValue && correctValue !== selectedOption ?
                  "Correct Answer"
                  : item === selectedOption && correctValue === selectedOption ?
                    "Your answer: Correct!"
                    : null
              }
            </OptionRight>
          </RadioOption>
        )
      })}

      {!selectedOption ?
        <NoSelectionText>
          You didn't select an option.
        </NoSelectionText>
        : null}

    </>
  )
}

export const FlagButton = ({
  flagged,
  action
}) => {

  const [isFlagged, setFlagged] = useState(flagged)

  return (
    <FlagContainer
      onClick={() => {
        action(!isFlagged)
        setFlagged(!isFlagged)
      }}
    >
      {isFlagged ?
        <RiFlag2Fill color="#f89800" size={32} />
        :
        <RiFlag2Line color="#f89800" size={32} />
      }
    </FlagContainer>
  )
}

const FlagContainer = styled.div`
  cursor: pointer;
`

const OptionLeft = styled.div`

`

const OptionRight = styled.div`

`

const RadioOption = styled.div`
  background: ${props => props.wrong ? 'red' : props.selected ? '#2ecfb0' : 'white'};
  color: ${props => props.selected || props.wrong ? 'white' : 'black'};
  box-shadow: 10px 10px 20px rgba(0,0,0, 0.05);
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;
  max-width: 100%;
  display: flex;
  align-items: center;  
  cursor: pointer;
  justify-content: space-between;
`

const Link = styled.div`
  color: ${props => props.color};
  font-family: Gilroy-Medium;
  opacity: 0.5;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const Container = styled.div`
  cursor: pointer;

  div:hover {
    background: ${props => props.color};
    color: white;
  }
`

const ButtonPrimary = styled.div`
  background: ${props => props.color};
  color: white;
  border-radius: 10px;
  padding: 10px 15px;
  font-family: Gilroy-SemiBold;
  cursor: pointer;
`

const ButtonSecondary = styled.div`
  background: white;
  border: 1.5px solid ${props => props.color};
  color: ${props => props.color};
  border-radius: 10px;
  padding: 10px 15px;
  font-family: Gilroy-SemiBold;
  cursor: pointer;
`

const NoSelectionText = styled.div`
  color: #f89800;
  margin-top: 40px;
  text-align: right;
`
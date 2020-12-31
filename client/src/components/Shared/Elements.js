import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { RiFlag2Fill, RiFlag2Line } from "react-icons/ri";
import { useDrag, useDrop } from 'react-dnd';
import update from "immutability-helper";
import { TiTick, TiTimes } from "react-icons/ti";
import { BsCircle, BsCircleFill } from "react-icons/bs";


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
  onClick,
  images
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue ? defaultValue : null)
  return (
    <RadioElements>
      {options.map((item, i) => {
        return (
          <RadioOption
            onClick={() => {
              setSelectedOption(item)
              onClick(item)
            }}
            key={i}
          >
            <RadioCircle>
              {selectedOption === item ?
                <BsCircleFill />
                :
                <BsCircle />
              }
            </RadioCircle>
            <RadioContent>
              {item}
              {images && images[i] ? <RadioBoxImage src={images[i]} /> : null}
            </RadioContent>

          </RadioOption>
        )
      })}
    </RadioElements>
  )
}

export const Box = ({ name }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { name, type: 'box' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.4 : 1;
  return (<DraggableItem ref={drag} style={{ opacity }}>
    {name}
  </DraggableItem>);
};

export const Dustbin = ({
  lastDroppedItem,
  onDrop
}) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'box',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  return (
    <DragAndDropAnswer
      ref={drop}
      dropped={lastDroppedItem ? true : false}
    >
      {lastDroppedItem ? (
        <>
          {lastDroppedItem}
        </>
      ) : null}
    </DragAndDropAnswer>
  );
};



export const DragAndDrop = ({
  options,
  defaultValue,
  onClick
}) => {
  const generateDustbins = (options, defaultValue) => {
    let dustbins = []

    for (let i = 0; i < options.length; i++) {
      dustbins.push({ lastDroppedItem: defaultValue && defaultValue[i] ? defaultValue[i] : null })
    }

    return dustbins
  }

  const convertDustbinsToString = (dustbins) => {
    let dustbinArr = []
    for (let i = 0; i < dustbins.length; i++) {
      if (dustbins[i]) {
        dustbinArr.push(dustbins[i].lastDroppedItem)
      } else {
        dustbinArr.push(null)
      }
    }
    return dustbinArr.join(";")
  }
  const [dustbins, setDustbins] = useState(generateDustbins(options, defaultValue()));

  const handleDrop = useCallback(
    (index, item) => {
      const updatedDustbins = update(dustbins, {
        [index]: {
          lastDroppedItem: {
            $set: item.name
          }
        }
      })

      onClick(convertDustbinsToString(updatedDustbins))

      setDustbins(
        updatedDustbins
      );
    },
    [dustbins]
  );

  return (
    <>
      <DragAndDropBigContainer>
        <DragAndDropOptions>
          {options.map((item, i) => {
            return (
              <DragAndDropContainer
                key={i}
              >
                <DragAndDropOption>
                  {item}
                </DragAndDropOption>
                <Dustbin
                  lastDroppedItem={dustbins[i].lastDroppedItem}
                  onDrop={(item) => handleDrop(i, item)}
                />
              </DragAndDropContainer>
            )
          })}
        </DragAndDropOptions>
        <DraggableItems>
          <Box name="Yes" />
          <Box name="No" />
        </DraggableItems>
      </DragAndDropBigContainer>
    </>
  )
}

export const DragAndDropReview = ({
  options,
  correctValue,
  selectedValue
}) => {
  return (
    <DragAndDropBigContainer>
      <DragAndDropOptions>
        {options.map((item, i) => {
          return (
            <DragAndDropContainer
              key={i}
            >
              <DragAndDropOption>
                {item}
              </DragAndDropOption>
              <DragAndDropAnswer>
                {selectedValue() && selectedValue()[i]}
              </DragAndDropAnswer>
              <DragAndDropResult>
                {selectedValue() && correctValue[i] === selectedValue()[i] ?
                  <TiTick color="#2ecfaf" size={30} />
                  :
                  <TiTimes color="#f89800" size={30} />
                }
              </DragAndDropResult>
            </DragAndDropContainer>
          )
        })}
      </DragAndDropOptions>
    </DragAndDropBigContainer>
  )
}

export const RadioBoxAnswer = ({
  options,
  correctValue,
  selectedValue,
  images
}) => {
  const [selectedOption, setSelectedOption] = useState(selectedValue ? selectedValue : null)

  return (
    <RadioElements>
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
              {images && images[i] ? <RadioBoxImage src={images[i]} /> : null}
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

    </RadioElements>
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
        <RiFlag2Fill color="white" size={20} />
        :
        <RiFlag2Line color="white" size={20} />
      }
    </FlagContainer>
  )
}

const FlagContainer = styled.div`
  cursor: pointer;
  margin-right: 10px;
`

const OptionLeft = styled.div`
  display: flex;
  flex-direction: column;
`

const OptionRight = styled.div`
`

const RadioOption = styled.div`
  background: ${props => props.wrong ? 'red' : props.selected ? '#2ecfb0' : 'white'};
  color: ${props => props.selected || props.wrong ? 'white' : 'black'};
  padding: 20px;
  margin-bottom: 10px;
  max-width: 100%;
  display: flex;
  align-items: center;  
  cursor: pointer;
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
const DragAndDropOption = styled.div`
  color: black;
  padding: 20px;
  border: 1px solid black;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  align-items: center;  
  cursor: pointer;
  justify-content: space-between;
`

const DragAndDropContainer = styled.div`
  display: flex;
`
const DragAndDropAnswer = styled.div`
  display: flex;
  background: ${props => props.dropped ? "white" : "#BAB1B1"};
  padding: 20px;
  border: 1px solid black;
  margin-bottom: 10px;
  margin-left: 10px;
  width: 30px;
`

const DraggableItem = styled.div`
  background: white;
  padding: 20px;
  border: 1px solid black;
  margin-left: 10px;
  width: 30px; 
  text-align: center;
  cursor: move;
  float: left;
  margin-bottom: 10px;
`

const DragAndDropOptions = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const DraggableItems = styled.div`
  flex: 1;
  display: flex;  
  flex-direction: column;
  justify-content: center;
  padding: 20px;
`

const DragAndDropBigContainer = styled.div`
  display: flex;
`

const DragAndDropResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

const RadioBoxImage = styled.img`
  
`

const RadioElements = styled.div`
 
`

const RadioCircle = styled.div`
  margin-right: 10px;
`

const RadioContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

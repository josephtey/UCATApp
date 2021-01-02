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
              <DragAndDropAnswer
                dropped={selectedValue() && selectedValue()[i] ? true : false}
              >
                {selectedValue() && selectedValue()[i]}
              </DragAndDropAnswer>
              <DragAndDropResult>
                {selectedValue() && correctValue[i] === selectedValue()[i] ?
                  <TiTick color="green" size={30} />
                  :
                  <TiTimes color="red" size={30} />
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

  useEffect(() => {
    console.log(selectedValue, correctValue)
  })


  return (
    <RadioElements>
      {options.map((item, i) => {
        return (
          <RadioOption
            key={i}

          >
            <RadioCircle>
              {selectedValue() == item ?
                <BsCircleFill />
                :
                <BsCircle />
              }
            </RadioCircle>
            <RadioContent>
              <Content>
                {item}
                {images && images[i] ? <RadioBoxImage src={images[i]} /> : null}
              </Content>
              <Result>
                {item === selectedValue() && correctValue !== selectedValue() ?
                  <Text color="red">Your answer: Wrong!</Text>
                  : item === correctValue && correctValue !== selectedValue() ?
                    <Text color="green">Correct Answer</Text>
                    : item === selectedValue() && correctValue === selectedValue() ?
                      <Text color="green">Your answer: Correct!</Text>
                      : null
                }
              </Result>
            </RadioContent>
          </RadioOption>


        )
      })}

      {!selectedValue() ?
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

      Flag for Review
    </FlagContainer>
  )
}

const FlagContainer = styled.div`
  cursor: pointer;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const RadioOption = styled.div`
  margin-bottom: 10px;
  max-width: 100%;
  display: flex;
  align-items: center;  
  cursor: pointer;
  padding: 10px 0;
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
  color: red;
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
  align-items: flex-start;
  width: 100%;
  flex-direction: column;
`

const Content = styled.div`
  justify-content: space-between;
  display: flex;
  width: 100%;
`

const Result = styled.div`

`

const Text = styled.div`
  color: ${props => props.color}
`
import { useEffect, useState } from 'react'
import './App.css'
import Keyboard from '../components/Keyboard'
import TextArea from '../components/TextArea'
import BtnChangeLanguage from '../components/BtnChangeLanguage'
import RadioBtns from '../components/RadioBtns'
import SpecialKey from '../components/SpecialKey'

function App() {
  const [back, setBack] = useState([]);
  const [showBtnUpper, setShowBtnUpper] = useState(false);
  const [showBtnLower, setShowBtnLower] = useState(false);
  const [showBtncolor, setShowBtncolor] = useState(false);
  const [showBtnFont, setShowBtnFont] = useState(false);
  const [showBtnSize, setShowBtnSize] = useState(false);
  const [language, setLanguage] = useState('');
  const [textArea,  setTextArea ] = useState([{
    id: 0,
    text: "",
    font: "Ariel",
    size: 20,
    color: "black",
    upper: false
  }]);
  let color = "";
  let size = "";
  let font = "";
  let colorArry = ["red", "green", "yellow", "black", "orange"];
  let sizeArray = [25, 30, 35, 40];
  let fontArray = ["Helvetica", "Calibri", "Inter"];
  let arr;
  function handleClickKey(chars) {
    if(back.length==0){
      back.push([{
        id: 0,
        text: "",
        font: "Ariel",
        size: 20,
        color: "black",
        upper: false
      }]);
      setBack([...back.slice()]);
    }
    (chars.char !== 'undo' && (textArea[textArea.length-1].text!="")) && back.push([...textArea.map(item => ({ ...item }))]);
    (chars.char !== 'undo' && (textArea[textArea.length-1].text!="")) && setBack([...back.slice()]);
    console.log("back");
    console.log(back);
    console.log("textarea");
    console.log(textArea);
    arr = [...textArea.slice()];
    switch (chars.char) {
      case "space":
        arr[arr.length - 1].text += " ";
        break;
      case "enter":
        arr[arr.length - 1].text += '\n';
        break;
      case "delete":
        arr[arr.length - 1].text = arr[arr.length - 1].text.slice(0, (arr[arr.length - 1].text).length - 1);
        if(textArea[textArea.length-1].text==""){
          back.push([{
            id: 0,
            text: "",
            font: "Ariel",
            size: 20,
            color: "black",
            upper: false
          }]);
          setBack([...back.slice()]);
        }
        // if (arr[arr.length - 1].text == "") {
        //   arr = arr.slice(0, arr.length - 1);
        // }
        // arr[arr.length - 1].text = arr[arr.length - 1].text.slice(0, (arr[arr.length - 1].text).length - 1);
        // if (arr[arr.length - 1].text == "" && arr.length != 1) {
        //   arr = arr.slice(0, arr.length - 1);
        // }
        break;
      case "undo":
        if (back.length > 0) {
          const previousState = back.pop();
          arr=previousState;
          setBack([...back]); 
          console.log(back);
      }
      break;
      default:
        arr[(arr.length - 1)].text += chars.char;
        break;
    }
    setTextArea(arr);
  };
  const showClickUpper = () => { setShowBtnUpper(true); };
  const showClickLower = () => { setShowBtnLower(true); };
  const showClickColor = () => { setShowBtncolor(true); };
  const showClickFont = () => { setShowBtnFont(true); };
  const showClickSize = () => { setShowBtnSize(true); };

  const globalChange = (kind, change) => {
    switch (kind) {
      case "color":
        color = change;
        break;
      case "font":
        font = change;
        break;
      case "size":
        size = change;
        break;
    }
  }
  const changeStyle = (change, event) => {
    back.push([...textArea.map(item => ({ ...item }))]);
    setBack([...back.slice()]);
    console.log("back");
    console.log(back);
    let arr = [...textArea];
    let object = {
      id: arr.length,
      text: "",
      font: arr[arr.length - 1].font,
      size: arr[arr.length - 1].size,
      color: arr[arr.length - 1].color,
      upper: arr[arr.length - 1].upper
    }
    switch (event.target.className) {
      case "font specialKey":
        object.font = change;
        setShowBtnFont(false);
        break;
      case "size specialKey":
        object.size = change;
        setShowBtnSize(false);
        break;
      case "color specialKey":
        object.color = change;
        setShowBtncolor(false);
        break;
      case "upper specialKey":
        object.upper = change;
        setShowBtnUpper(false);
        break;
      case "lower specialKey":
        object.upper = change;
        setShowBtnLower(false);
        break;
    }
    arr.push(object);
    setTextArea(arr);
  }
  const changeAllStyle = (kindChange, change) => {
    back.push([...textArea.map(item => ({ ...item }))]);
    setBack([...back.slice()]);
    console.log("back");
    console.log(back);
    let arr = [...textArea];
    arr.map((object) => {
      object[kindChange] = change;
    })
    switch (kindChange) {
      case "font":
        setShowBtnFont(false);
        break;
      case "size":
        setShowBtnSize(false);
        break;
      case "color":
        setShowBtncolor(false);
        break;
      case "upper":
        if (change) {
          setShowBtnUpper(false);
        }
        else {
          setShowBtnLower(false);
        }
        break;
    }
    setTextArea(arr);
  }
  const handleClickDeleteAll = () => {
    back.push([...textArea.map(item => ({ ...item }))]);
    setBack([...back.slice()]);
    console.log("back");
    console.log(back);
    let arr = [{
      id: 1,
      text: "",
      font: "Ariel",
      size: 20,
      color: "black",
      upper: false
    }];
    setTextArea(arr);
  };

  return (
    <>
      <TextArea textArea={textArea} />
      <BtnChangeLanguage setLanguage={setLanguage} />
      <Keyboard item={language} handleClickKey={handleClickKey}></Keyboard>

      <div className='specialKeys'>
        <button className="specialKey" onClick={handleClickDeleteAll}>delete all</button>

        <button className="specialKey" onClick={showClickUpper}>upper</button>
        {showBtnUpper &&
          (<div>
            <button className='upper specialKey' onClick={(event) => changeStyle(true, event)}>Apply</button>
            <button className="specialKey" onClick={() => changeAllStyle("upper", true)}>Apply All</button>
          </div>)}

        <button className="specialKey" onClick={showClickLower}>lower</button>
        {showBtnLower &&
          (<div>
            <button className='lower specialKey' onClick={(event) => changeStyle(false, event)}>Apply</button>
            <button className="specialKey" onClick={() => changeAllStyle("upper", false)}>Apply All</button>
          </div>)}

        <button className="specialKey" onClick={showClickColor}>color</button>
        {showBtncolor &&
          (<div>
            <button className='color specialKey' onClick={(event) => changeStyle(color ? color : "green", event)}>Apply</button>
            <button className="specialKey" onClick={() => changeAllStyle("color", color ? color : "green")}>Apply All</button>
          </div>)}

        <button className="specialKey" onClick={showClickFont}>font</button>
        {showBtnFont &&
          (<div>
            <button className='font specialKey' onClick={(event) => changeStyle(font ? font : "Ariel", event)}>Apply</button>
            <button className="specialKey" onClick={() => changeAllStyle("font", font ? font : "Ariel")}>Apply All</button>
          </div>)}
        <button className="specialKey" onClick={showClickSize}>size</button>
        {showBtnSize &&
          (<div>
            <button className='size specialKey' onClick={(event) => changeStyle(size ? size : `${20}px`, event)}>Apply</button>
            <button className="specialKey" onClick={() => changeAllStyle("size", size ? size : `${20}px`)}>Apply All</button>
          </div>)}
      </div>
      {showBtncolor && <RadioBtns kind={"color"} arr={colorArry} globalChange={globalChange} />}
      {showBtnFont && <RadioBtns kind={"font"} arr={fontArray} globalChange={globalChange} />}
      {showBtnSize && <RadioBtns kind={"size"} arr={sizeArray} globalChange={globalChange} />}
    </>
  )
}

export default App
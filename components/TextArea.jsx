import React from 'react'
import ChangeStyle from './ChangeStyle';
 
const TextArea = ({ textArea }) => {
  return (
    <div className='textArea'>
      {textArea.map((object) => (
         <ChangeStyle key={object.id} textObject={object}/>
      ))}
    </div>
  )
}

//style={{direction:textObject.text>'a'&&textObject.text<'z'?"ltr":"rtl"}
export default TextArea
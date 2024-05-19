import React from 'react'

const SpecialKey = ({ onClick, buttonText, showBtn, changeStyle, changeAllStyle, style, defaultValue }) => {
  return (
    <>
    <button className="specialKey" onClick={onClick}>
      {buttonText}
    </button>
    {showBtn && (
      <div>
        <button className={style} onClick={(event) => changeStyle(defaultValue, event)}>
          Apply
        </button>
        <button onClick={() => changeAllStyle(style, defaultValue)}>Apply All</button>
      </div>
    )}
  </>
  )
}

export default SpecialKey
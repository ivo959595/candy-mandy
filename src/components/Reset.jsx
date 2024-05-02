import React from 'react'

import { VscDebugRestart } from "react-icons/vsc";


function Reset({reset}) {
  return (
    <div  class="reset"> 
         <VscDebugRestart onClick={reset} />
    </div>
  )
}

export default Reset
import React from 'react'

import "./dual-ring-spinner.styles.css"

export default function DualRing() {
  return (
    <div className={'lds-dual-ring'} style={{ width: 80, height: 80 }}>
      <div
        className={'lds-dual-ring-after'}
        style={{
          borderColor: `#2FD566 transparent`,
          borderWidth: 80 * 0.1,
          width: 80 * 0.7 - 6,
          height: 80 * 0.7 - 6,
        }}
      ></div>
    </div>
  )
}
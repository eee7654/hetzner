import React from 'react'
import dynamic from 'next/dynamic'

const ReactViewer = dynamic(
  () => import('react-viewer'),
  { ssr: false }
)
const Viewer = (props) => {
  return (
    <ReactViewer {...props}/>
  )
}
export default Viewer
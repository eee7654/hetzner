import React, { useState,useEffect,useRef } from "react"
import { MapContainer, Marker, Popup, TileLayer,useMap,useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import styles from './map.module.css'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

function Map(props) {
   const [position, setPosition] = useState(props.coordinates)
   const markerRef = useRef(props.coordinates)
   const oldDefPos = useRef(props.coordinates)
   let [defPosChanged,setDefPosChanged] = useState(true)
   useEffect(() => {
      (async function init() {
         delete L.Icon.Default.prototype._getIconUrl
         L.Icon.Default.mergeOptions({
               iconRetinaUrl: iconRetinaUrl.src,
               iconUrl: iconUrl.src,
               shadowUrl: shadowUrl.src,
         })
      })()
   }, [])
   useEffect(() => {
      let strPosition = `${props.coordinates[0]},${props.coordinates[1]}`
      let strOldPosition = `${oldDefPos.current[0]},${oldDefPos.current[1]}`
      if(strPosition != strOldPosition){
         oldDefPos.current = props.coordinates
         setDefPosChanged(true)
      }else{
         setDefPosChanged(false)
      }
   }, [props.coordinates])
   return (
      <MapContainer className={styles.mapView} center={position} zoom={props.zoom | 20} scrollWheelZoom={false}>
         {defPosChanged & !props.static && (
            <ChangeView zoom={props.zoom | 20} defPos={props.coordinates} />
         )}
         {!props.static && (
            <ChangeMarker setPos={setPosition} mRef={markerRef} setData={props.setData}/>
         )}
         <TileLayer attribution='&copy; <a href="http://jakhoob.com" title="جاخوب">Jakhoob</a> ' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
         <Marker position={markerRef.current}>
            <Popup>
               {props.title}
            </Popup>
         </Marker>
      </MapContainer>
   )
}

const ChangeView = ({zoom,defPos})=>{
   const map = useMap()
   map.setView(defPos, zoom)
   return null
}

const ChangeMarker = ({setPos,mRef,setData})=>{
   const map = useMapEvents({
      dragend: (e) => {
         let centerPos = e.target.getCenter()
         let finalCenter = [centerPos.lat,centerPos.lng]
         setData(`${finalCenter[0]},${finalCenter[1]}`)
         mRef.current = finalCenter
         setPos(finalCenter)
      }
   })
   return null
}

export default Map
import React from "react"
import { useLocation } from "react-router-dom"
import App from "./App"


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Navigation() {
  
  var query = useQuery()

  return (
    <App 
        id={query.get("id")}
        lat={query.get("lat")}
        lng={query.get("lng")}
    />
  )
}
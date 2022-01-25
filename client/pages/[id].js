import React from 'react';
import {useRouter} from "next/router"

export async function getStaticPaths() {
    const res = await fetch("http://localhost:3001/shop")
    const data = await res.json()
    const paths =data.map(shop => {
      return{
        params: {id: shop._id.toString() } 
      }
    })
    return{
      paths,
      fallback: false
    }
}

export async function getStaticProps({params}){
  const id = params.id
  const res = await fetch("http://localhost:3001/shop/" + id)
  const data = await res.json()
  return{
    props:{shop: data}
  }
}


function shop({shop}) {
  
return (
  <div>
      <h1>{shop.name}</h1>
  </div>
  )
}

export default shop;
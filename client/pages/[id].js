import React from 'react';
import {useRouter} from "next/router"

function shop({shop}) {
    const router= useRouter()
    const {id} = router.query
    console.log(shop)
  return (
    <div>
        <h1>Hey {id} </h1>
        <h2>{shop.name} </h2>
    </div>
    )
}

export default shop;

export async function getStaticProps({param}){
  const req = await fetch(`http://localhost:3001/shop/${param.id}`)
  const data = await req.json()
  return{
    props:{shop: data}
  }
}

export async function getStaticPaths() {
    const req = await fetch("http://localhost:3001/shop")
    const data = await req.json()
    const paths =data.map(shop => {
      return{ params: {id: shop.toString()} }
    })
    return{
      paths,
      fallback: false
    }
}

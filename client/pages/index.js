import Head from 'next/head'
import { useState, useEffect } from 'react';
import Link from 'next/link';


export default function Home({data}) {
  
  return(
    <div>
      <div>
        <Link href="/login">Login</Link> 
      </div>
      <div>
        {data.map((info)=> (
          <h1 key={info._id}>
            {info.name}
          </h1>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('http://localhost:3001/shop')
  const data = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data,
    },
  }
}


/*
<div>
<Link href="/user">user</Link>
</div>

*/
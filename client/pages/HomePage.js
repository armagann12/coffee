import Link from 'next/link'

function HomePage({data}) {
  return <div>
    {data.map((data) => (
        <li key={data.id}>
          <Link href={`/shop/${encodeURIComponent(data.slug)}`}>
            <a>{data.title}</a>
          </Link>
        </li>
      ))}

    

    <Link href="/user">
      <a>User</a>
    </Link>

    <Link href="/login">
      <a>Login</a>
    </Link>

  </div>
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default HomePage;

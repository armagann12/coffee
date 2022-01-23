import React from 'react';
import Link from 'next/link'


function shop() {
  return <div>
      <h1>Hey guys</h1>
      <Link href="/hey">
      <a>hey nested in shop</a>
    </Link>
  </div>;
}

export default shop;

import React from 'react';

async function fetchData() {
  const res = await fetch('https://my-strapi-project-j0s0.onrender.com/api/restaurants');
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const json = await res.json();
  return json.data;
}

export default async function BoardPage() {
    const data = await fetchData();

    if (!data || data.length === 0) {
      return <p>No data available or failed to load.</p>;
    }

    return (
      <div>
        <h1>Restaurant Data</h1>
        <ul>
          {data.map((post:any) => (
            <li key={post.id}>
              <h2>{post.Name}</h2>
              {post.Description.map((desc:any, index: number) => (
                <div key={index}>
                  {desc.children.map((child:any, index:number) => (
                    <p key={index}>{child.text}</p>
                  ))}
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    );
}
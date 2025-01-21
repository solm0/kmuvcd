import React from 'react';

async function fetchData() {
  const res = await fetch('https://my-strapi-project-j0s0.onrender.com/api/restaurants', {
    cache: 'no-store', // Prevent caching during development
  });

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

    interface Post {
      id?: number;
      Name?: string;
      Description?: { children?: { text?: string }[] }[];
    }

    return (
      <div>
        <h1>Restaurant Data</h1>
        <ul>
          {data.map((post: Post) => (
            <li key={post.id}>
              <h2>{post.Name}</h2>
              {post.Description?.map((desc, index) => (
                <div key={index}>
                  {desc.children?.map((child, index) => (
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
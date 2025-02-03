"use client";

import { useEffect, useState } from 'react';

export default function UserCard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function fetchUsername() {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUsername(data.username || "Guest");
    }
    fetchUsername();
  }, []);

  return <div>Welcome, {username}!</div>
}
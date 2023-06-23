"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

function MyProfile() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelte = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });
        setPosts((prev) => prev.filter((p) => p._id !== post._id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchPosts = async () => {
    // const res = await fetch(`/api/users/${session?.user.id}/posts`);
    const res = await fetch(`/api/prompt`);
    const data = await res.json();
    setPosts(data);
    console.log(data);
  };

  useEffect(() => {
    if (session?.user.id) fetchPosts();
    // fetchPosts();
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelte}
    />
  );
}

export default MyProfile;

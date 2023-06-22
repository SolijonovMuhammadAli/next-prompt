"use client";

import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { useSession } from "next-auth/react";

function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const fetchPosts = async () => {
    const res = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await res.json();
    setPosts(data);
    console.log(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          text="text"
          placeholder="Search for tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
}

export default Feed;

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt-layout">
      {data.map((post, idx) => (
        <PromptCard key={idx} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

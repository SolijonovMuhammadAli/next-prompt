import React from "react";
import PromptCard from "./PromptCard";

function Profile({ name, desc, data, handleEdit, handleDelete }) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} </span>Profile
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-16 prompt-layout">
        {data.map((post, idx) => (
          <PromptCard
            key={idx}
            post={post}
            handleEdit={() => handleEdit(post)}
            handleDelete={() => handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
}

export default Profile;

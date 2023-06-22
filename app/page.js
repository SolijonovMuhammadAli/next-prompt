import React from "react";
import Feed from "@components/Feed";

function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Dicover & Share <br className="max-md:hidden" />
        <span className="radient orange_gradient text-center">
          AI-Powered Prompts
        </span>
      </h1>
      <p className="desc text-center">
        Promptopia in an open-source AI prompting tool for modern world to
        discoveer
      </p>
      <Feed />
    </section>
  );
}

export default Home;

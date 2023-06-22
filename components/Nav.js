"use client";

import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

function Nav() {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const handleProviders = async () => {
    const response = await getProviders();
    setProviders(response);
  };
  useEffect(() => {
    handleProviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <span className="object-contain">Logo</span>
        <p className="logo_text">Promtopia</p>
      </Link>
      {/* Mobile Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              Sign Out
            </button>
            <Link href="/profile">
              <img
                src={session?.user.image}
                height={37}
                width={37}
                alt="bag"
                className="rounded-full"
                onClick={() => setToggleDropDown(!toggleDropDown)}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider, key) => (
                <button
                  key={key}
                  type="button"
                  className="black_btn"
                  onClick={() => signIn(provider.id)}>
                  Sing In
                </button>
              ))}
          </>
        )}
      </div>
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src="/assets/icons/menu.svg"
              height={25}
              width={25}
              alt="error"
              onClick={() => setToggleDropDown(!toggleDropDown)}
            />

            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}>
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}>
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(!toggleDropDown);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          providers &&
          Object.values(providers).map((provider, key) => (
            <button
              key={key}
              type="button"
              className="black_btn"
              onClick={() => signIn(provider.id)}>
              Sing In
            </button>
          ))
        )}
      </div>
    </nav>
  );
}

export default Nav;

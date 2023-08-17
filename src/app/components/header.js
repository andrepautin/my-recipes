"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import { currentUserContext } from "../context/userContext";
import NavMenu from "./navmenu";
import { useHelper } from "../utils/utils";
import { useRouter } from "next/navigation";

const MENU_OPTIONS = ["Recipes", "Profile", "Logout"];
export default function Header() {
  const [currentUser, setCurrentUser] = useContext(currentUserContext);
  const { handleLogout } = useHelper();
  const router = useRouter();

  const handleMenuItemClicked = (evt) => {
    evt.preventDefault();
    const target = evt.target.innerText;
    if (target === "Logout") {
      handleLogout();
    } else if (target === "Recipes") {
      router.push(`/recipes`);
    } else if (target === "Profile") {
      router.push(`/profile`);
    }
  };
  return (
    <div className="bg-amber-600 text-orange-300 w-full h-16 flex items-center text-2xl">
      <Link href={currentUser ? `/dashboard` : "/"} className="ml-3">
        MyRecipes
      </Link>
      {currentUser && (
        <NavMenu
          menuOptions={MENU_OPTIONS}
          handleMenuItemClicked={handleMenuItemClicked}
        />
      )}
    </div>
  );
}

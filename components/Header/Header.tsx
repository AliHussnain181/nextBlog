"use client";
import HeaderClient from "./HeaderClient";
import useAuthStore from "@/stores/authStore";

const Header = () => {

  const { user } = useAuthStore();

console.log(user);
// console.log(isLoading);


  return (
    <header>
      {/* Pass user data to the client component */}
      <HeaderClient user={user} />
    </header>
  );
};

export default Header;

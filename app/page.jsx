"use client"
import useAuth from "@/src/context/auth.js";

const Home = () => {
  const auth = useAuth((state) => state.auth)
  console.log(auth)
  return (
    <div className="text-3xl font-bold">123</div>
  )
}

export default Home

import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../public/assets/104674-shoes-inline-orange.json";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-[100%] h-screen flex items-center justify-center">
      <Lottie options={defaultOptions} width={400} height={150} />
    </div>
  );
};

export default Loader;
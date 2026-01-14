import Lottie from "lottie-react";
import loadingAnimation from "@/assets/loading.json";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Lottie animationData={loadingAnimation} loop className="w-32 h-32" />
    </div>
  );
};

export default LoadingSpinner;

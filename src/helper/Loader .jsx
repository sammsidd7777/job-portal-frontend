const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-gray-200 bg-white/80 px-10 py-8 shadow-2xl">

        {/* Animated Rings */}
        <div className="relative flex items-center justify-center">
          <div className="h-20 w-20 animate-spin rounded-full border-[5px] border-gray-200 border-t-blue-600"></div>

          <div className="absolute h-12 w-12 animate-pulse rounded-full bg-blue-600"></div>
        </div>

        {/* Brand */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Job Hunt
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Finding opportunities for you...
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-blue-600"></span>
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
            style={{ animationDelay: "0.15s" }}
          ></span>
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
            style={{ animationDelay: "0.3s" }}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
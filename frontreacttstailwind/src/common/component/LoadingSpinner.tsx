
export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <svg className="size-loadingspinner animate-spin" viewBox="0 0 100 100">
        <circle
          fill="none"
          strokeWidth="9"
          className="stroke-loadingspinner opacity-20"
          cx="50"
          cy="50"
          r="40"
        />
        <circle
          fill="none"
          strokeWidth="9"
          className="stroke-loadingspinner"
          strokeDasharray="250"
          strokeDashoffset="210"
          cx="50"
          cy="50"
          r="40"
        />
      </svg>
    </div>
  )
};
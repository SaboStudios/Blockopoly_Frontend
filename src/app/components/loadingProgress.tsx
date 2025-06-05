interface LoadingProgressProps {
  progress: number
}

export default function LoadingProgress({ progress }: LoadingProgressProps) {
  return (
    <div className="w-80 mx-auto">
      <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-[#0abab5] transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>Initializing...</span>
        <span>{progress}%</span>
      </div>
    </div>
  )
}

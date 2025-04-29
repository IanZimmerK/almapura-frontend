
export const LoadingSkeleton = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12 px-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 animate-pulse"></div>
            <div className="p-4 space-y-2">
              <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
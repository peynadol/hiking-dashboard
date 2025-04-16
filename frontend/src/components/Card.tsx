import { Hike } from "@/hike";
type CardProps = {
  hike: Hike,
  onEdit: (id: number) => void,
  onDelete: (id: number) => void,
}


export default function Card({
  hike,
  onEdit,
  onDelete,
}: CardProps) {

  const { id, name, location, distance_metres, hike_date, notes, elevation_gain, duration_minutes } = hike


  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "long" });
    const year = date.getFullYear();
    return `${day}${dateSuffix(day)} ${month} ${year}`;
  };

  const dateSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Format duration to hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-[#8FB996] relative">
      {/* Card header with graphic element */}
      <div className="h-20 bg-[#8FB996] relative">
        <div className="absolute bottom-0 right-0 w-full h-16">
          <svg
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path
              d="M0 40 L100 40 L100 20 C75 30, 50 0, 25 10 L0 25 Z"
              fill="#F2E8CF"
              opacity="0.6"
            />
            <path
              d="M0 40 L100 40 L100 30 C85 20, 70 35, 50 15 L0 30 Z"
              fill="#6B9080"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Distance badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-[#F6BD60] text-[#2C3639] text-xs font-semibold px-3 py-1 rounded-full">
            {(distance_metres / 1000).toFixed(1)} km
          </span>
        </div>
      </div>

      {/* Action buttons - positioned in top left */}
      <div className="absolute top-3 left-3 flex space-x-2">
        {/* Edit button */}
        <button
          onClick={() => onEdit && onEdit()}
          className="bg-white/90 hover:bg-white cursor-pointer text-[#6B9080] rounded-full p-1.5 shadow-sm transition-colors"
          aria-label="Edit hike"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>

        {/* Delete button */}
        <button
          onClick={() => onDelete && onDelete(id)}
          className="bg-white/90 hover:bg-white cursor-pointer text-[#DB5461] rounded-full p-1.5 shadow-sm transition-colors"
          aria-label="Delete hike"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Card content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-[#2C3639] mb-2">{name}</h3>

        <div className="flex items-center mb-3">
          <svg
            className="w-4 h-4 mr-1 text-[#6B9080]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm text-gray-600">{location}</span>
        </div>

        <div className="flex items-center mb-3">
          <svg
            className="w-4 h-4 mr-1 text-[#6B9080]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm text-gray-600">{formatDate(hike_date)}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          {elevation_gain && (
            <div className="bg-[#F7F7F7] p-2 rounded">
              <p className="text-xs text-[#6B9080] font-medium">
                Elevation Gain
              </p>
              <p className="text-sm font-semibold">{elevation_gain}m</p>
            </div>
          )}

          {duration_minutes && (
            <div className="bg-[#F7F7F7] p-2 rounded">
              <p className="text-xs text-[#6B9080] font-medium">Duration</p>
              <p className="text-sm font-semibold">
                {formatDuration(duration_minutes)}
              </p>
            </div>
          )}
        </div>

        {notes && (
          <div className="mt-3 pt-3 border-t border-[#F2E8CF]">
            <p className="text-xs text-[#6B9080] font-medium mb-1">Notes</p>
            <p className="text-sm text-gray-600 line-clamp-3">{notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

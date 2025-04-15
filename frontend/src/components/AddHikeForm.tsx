import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  hikeName: z.string().min(1),
  location: z.string().min(1),
  distance: z
    .number({
      invalid_type_error: "Please enter a number",
    })
    .positive({ message: "Distance must be greater than 0" }),
  hikeDate: z.string().date(),
  elevationGain: z.number(),
  duration: z.number(),
  hikeNotes: z.string(),
});

type FormFields = z.infer<typeof schema>;

export default function AddHikeForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  function transformToBackendFormat(data: FormFields) {
    return {
      name: data.hikeName,
      location: data.location,
      distance_metres: data.distance,
      hike_date: data.hikeDate,
      elevation_gain: data.elevationGain,
      duration_minutes: data.duration,
      notes: data.hikeNotes,
    };
  }

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const payload = transformToBackendFormat(data);
    try {
      const response = await fetch("http://localhost:3000/api/hikes", {
        method: "post",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const err = await response.json();
        setError("hikeName", { message: err.message || "Submission Failed" });
        return;
      }
      const result = await response.json();
      console.log(result);
    } catch {
      setError("hikeName", {
        message: "This hike already exists",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label
            className="text-[#2C3639] mb-1 text-sm font-medium"
            htmlFor="hikeName"
          >
            Hike name
          </label>
          <input
            {...register("hikeName")}
            type="text"
            placeholder="Hike Name"
            className="px-3 py-2 bg-[#F7F7F7] border border-[#8FB996] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B9080]"
          />
          {errors.hikeName?.message && (
            <p className="mt-1 text-red-500 text-xs">
              {errors.hikeName?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            className="text-[#2C3639] mb-1 text-sm font-medium"
            htmlFor="location"
          >
            Location
          </label>
          <input
            {...register("location")}
            type="text"
            placeholder="Location"
            className="px-3 py-2 bg-[#F7F7F7] border border-[#8FB996] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B9080]"
          />
          {errors.location?.message && (
            <p className="mt-1 text-red-500 text-xs">
              {errors.location?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            className="text-[#2C3639] mb-1 text-sm font-medium"
            htmlFor="distance"
          >
            Distance covered (m)
          </label>
          <input
            {...register("distance", { valueAsNumber: true })}
            type="text"
            placeholder="Distance covered"
            className="px-3 py-2 bg-[#F7F7F7] border border-[#8FB996] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B9080]"
          />
          {errors.distance?.message && (
            <p className="mt-1 text-red-500 text-xs">
              {errors.distance?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            className="text-[#2C3639] mb-1 text-sm font-medium"
            htmlFor="hikeDate"
          >
            Date of hike
          </label>
          <input
            {...register("hikeDate")}
            type="date"
            className="px-3 py-2 bg-[#F7F7F7] border border-[#8FB996] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B9080]"
          />
          {errors.hikeDate?.message && (
            <p className="mt-1 text-red-500 text-xs">
              {errors.hikeDate?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            className="text-[#2C3639] mb-1 text-sm font-medium"
            htmlFor="elevationGain"
          >
            Elevation gain (m)
          </label>
          <input
            {...register("elevationGain", { valueAsNumber: true })}
            className="px-3 py-2 bg-[#F7F7F7] border border-[#8FB996] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B9080]"
          />
          {errors.elevationGain?.message && (
            <p className="mt-1 text-red-500 text-xs">
              {errors.elevationGain?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            className="text-[#2C3639] mb-1 text-sm font-medium"
            htmlFor="duration"
          >
            Hike duration (minutes)
          </label>
          <input
            {...register("duration", { valueAsNumber: true })}
            className="px-3 py-2 bg-[#F7F7F7] border border-[#8FB996] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B9080]"
          />
          {errors.duration?.message && (
            <p className="mt-1 text-red-500 text-xs">
              {errors.duration?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            className="text-[#2C3639] mb-1 text-sm font-medium"
            htmlFor="hikeNotes"
          >
            Hike notes
          </label>
          <textarea
            {...register("hikeNotes")}
            className="px-3 py-2 bg-[#F7F7F7] border border-[#8FB996] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B9080] min-h-24"
          />
          {errors.hikeNotes?.message && (
            <p className="mt-1 text-red-500 text-xs">
              {errors.hikeNotes?.message}
            </p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="mt-2 py-2 px-4 bg-[#6B9080] text-white rounded-md hover:bg-[#5a7a6c] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

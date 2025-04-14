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
    <>
      <form className="hike-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="hikeName">Hike name: </label>
          <input
            {...register("hikeName")}
            type="text"
            placeholder="Hike Name"
          />
          <p>{errors.hikeName?.message}</p>
        </div>

        <div>
          <label htmlFor="location">Location: </label>
          <input {...register("location")} type="text" placeholder="Location" />
          <p>{errors.location?.message}</p>
        </div>

        <div>
          <label htmlFor="distance">Distance covered (m): </label>
          <input
            {...register("distance", { valueAsNumber: true })}
            type="text"
            placeholder="Distance covered"
          />
          <p>{errors.distance?.message}</p>
        </div>

        <div>
          <label htmlFor="hikeDate">Date of hike: </label>
          <input {...register("hikeDate")} type="date" />
          <p>{errors.hikeDate?.message}</p>
        </div>

        <div>
          <label htmlFor="elevationGain">Elevation gain (m): </label>
          <input {...register("elevationGain", { valueAsNumber: true })} />
          <p>{errors.elevationGain?.message}</p>
        </div>

        <div>
          <label htmlFor="duration">Hike duration (minutes): </label>
          <input {...register("duration", { valueAsNumber: true })} />
          <p>{errors.duration?.message}</p>
        </div>

        <div>
          <label htmlFor="hikeNotes">Hike notes: </label>
          <textarea {...register("hikeNotes")} />
          <p>{errors.hikeNotes?.message}</p>
        </div>

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </form>
    </>
  );
}

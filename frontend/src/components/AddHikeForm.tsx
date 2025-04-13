import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import "./AddHikeForm.css";

const schema = z.object({
  hikeName: z.string().min(1),
  location: z.string().min(1),
  distance: z
    .number({
      invalid_type_error: "Please enter a number",
    })
    .positive({ message: "Distance must be greater than 0" }),
  hikeDate: z.string().date(),
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

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log(data);
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
          <label htmlFor="distance">Distance covered (km): </label>
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

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  hikeName: z.string(),
  location: z.string(),
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch {
      setError("hikeName", {
        message: "This hike already exists",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("hikeName")} type="text" placeholder="Hike Name" />
        <p>{errors.hikeName?.message}</p>
        <input {...register("location")} type="text" placeholder="Location" />
        <p>{errors.location?.message}</p>
        <input
          {...register("distance", { valueAsNumber: true })}
          type="text"
          placeholder="Distance covered"
        />
        <p>{errors.distance?.message}</p>
        <input {...register("hikeDate")} type="date" />
        <p>{errors.hikeDate?.message}</p>
        <input {...register("hikeNotes")} type="text" />
        <p>{errors.hikeNotes?.message}</p>
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </form>
    </>
  );
}

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define validation schema with Zod
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <form className="hike-form" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          {...register("email")}
          type="email"
          placeholder="your@email.com"
        />
        <p>{errors.email?.message}</p>
      </div>

      <div>
        <label htmlFor="password">Password: </label>
        <input {...register("password")} type="password" placeholder="••••••" />
        <p>{errors.password?.message}</p>
      </div>

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

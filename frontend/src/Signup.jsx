import { Button, TextField, Paper, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add sign-up logic here
    navigate("/signin"); // Redirect to sign-in after registration
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <Paper elevation={6} className="p-10 w-full max-w-md">
        <Typography
          variant="h5"
          className="text-pink-800 font-bold mb-6 text-center"
        >
          Create a New Account
        </Typography>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField label="Full Name" fullWidth required />
          <TextField label="Email" type="email" fullWidth required />
          <TextField label="Password" type="password" fullWidth required />
          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Sign Up
          </Button>
          <Typography className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/signin"
              underline="hover"
              className="text-pink-600 font-medium"
            >
              Sign in here
            </Link>
          </Typography>
        </form>
      </Paper>
    </div>
  );
}

import { Button, TextField, Paper, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add sign-in logic here
    navigate("/"); // Redirect to home after sign-in
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
      <Paper elevation={6} className="p-10 w-full max-w-md">
        <Typography
          variant="h5"
          className="text-purple-800 font-bold mb-6 text-center"
        >
          Sign In to Your Account
        </Typography>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField label="Email" type="email" fullWidth required />
          <TextField label="Password" type="password" fullWidth required />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign In
          </Button>
          <Typography className="text-center mt-4 text-sm text-gray-600">
            First time user?{" "}
            <Link
              href="/signup"
              underline="hover"
              className="text-purple-600 font-medium"
            >
              Sign up here
            </Link>
          </Typography>
        </form>
      </Paper>
    </div>
  );
}

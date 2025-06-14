import { useEffect, useState } from "react";
import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function App() {
  const startingTimeInSeconds = 600;
  const [remainingSeconds, setRemainingSeconds] = useState(
    startingTimeInSeconds
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  // Sample user (replace with real auth logic if needed)
  const user = {
    name: "Karthik",
    avatar: "", // add image url if needed
  };

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleMenuItemClick = (route) => {
    handleClose();
    navigate(route);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex h-screen font-sans bg-gradient-to-br from-purple-100 to-pink-100">
      {/* Left Side */}
      <div className="flex-3 basis-3/4 bg-gradient-to-br from-purple-200 to-pink-200 p-6 flex flex-col gap-5 relative">
        {/* Top-Right Timer and User Icon */}
        <div className="absolute right-6 top-6 z-50 flex items-center gap-4">
          <div className="text-xl font-mono text-purple-900 select-none">
            {formatTime(remainingSeconds)}
          </div>
          <IconButton onClick={handleClick}>
            <Avatar className="bg-purple-900 text-white">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={() => handleMenuItemClick("/signin")}>
              Sign In
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("/signup")}>
              Sign Up
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("/account")}>
              Account
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("/logout")}>
              Logout
            </MenuItem>
          </Menu>
        </div>

        {/* Section 1: Title & Timer */}
        <div className="bg-white shadow-xl rounded-xl p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-purple-900">
              Python Exam - Question 1
            </h2>
            <p className="text-purple-700 mt-1 text-base">
              Answer the following Python question within the allotted time.
            </p>
          </div>
        </div>

        {/* Section 2: Question */}
        <div className="bg-white shadow-xl rounded-xl p-6 overflow-auto">
          <h2 className="text-lg font-semibold text-purple-900 mb-4 leading-relaxed">
            What will be the output of the following Python function when called
            with
            <code className="bg-purple-100 px-1 rounded font-mono">
              {" "}
              mystery(5){" "}
            </code>
            ?
          </h2>
          <pre className="bg-purple-100 text-sm font-mono text-purple-800 p-4 rounded overflow-x-auto mb-4">
            {`def mystery(n):
    if n == 0:
        return 0
    else:
        return n + mystery(n - 1)

print(mystery(5))`}
          </pre>
        </div>

        {/* Section 3: Options */}
        <div className="bg-white shadow-xl rounded-xl p-6">
          <div className="grid grid-cols-2 gap-4">
            {["15", "10", "5", "Error"].map((option) => (
              <button
                key={option}
                className="bg-pink-300 hover:bg-pink-400 text-purple-900 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:text-white hover:scale-105"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Section 4: Navigation Buttons */}
        <div className="bg-white shadow-xl rounded-xl p-4 flex justify-between">
          <button className="bg-purple-400 hover:bg-purple-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out hover:scale-105">
            ⬅ Previous
          </button>
          <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out hover:scale-105">
            Next ➡
          </button>
        </div>
      </div>

      {/* Right Side: Question Palette */}
      <div className="flex-1 basis-1/4 bg-white border-l border-gray-300 p-6 flex flex-col items-center justify-start gap-6">
        <h2 className="text-lg font-semibold text-gray-700">Questions (40)</h2>

        <div className="grid grid-cols-5 gap-y-3 gap-x-2 w-full">
          {[...Array(40)].map((_, idx) => {
            const number = idx + 1;
            let colorClass = "bg-gray-200 text-gray-800"; // Yet to attend

            if ([1, 6, 10].includes(number)) {
              colorClass = "bg-green-500 text-white"; // Attended
            } else if ([2, 3, 9].includes(number)) {
              colorClass = "bg-yellow-400 text-white"; // Skipped
            } else if (number === 10) {
              colorClass = "bg-gray-500 text-white"; // Current
            }

            return (
              <button
                key={idx}
                type="button"
                className={`w-12 h-12 rounded text-sm font-semibold ${colorClass}`}
                disabled
              >
                {number}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 mt-4 w-full text-xs font-medium">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            Attended
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div>
            Skipped
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 border border-gray-400 rounded-sm"></div>
            Yet to attend
          </div>
        </div>
      </div>
    </div>
  );
}

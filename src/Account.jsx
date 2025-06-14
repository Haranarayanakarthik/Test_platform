export default function Account() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center">
        <h1 className="text-2xl font-bold text-purple-700 mb-4">My Account</h1>
        <p className="text-gray-600 mb-2">
          Name: <strong>Karthik</strong>
        </p>
        <p className="text-gray-600 mb-2">
          Email: <strong>karthik@example.com</strong>
        </p>
        <button className="mt-4 px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

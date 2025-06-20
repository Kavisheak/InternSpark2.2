import { MoreHorizontal, User } from "lucide-react";

const UserCard = ({ user }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            {user.type === "Student" ? (
              <User className="w-6 h-6 text-gray-600" />
            ) : (
              <div className="w-6 h-6 flex items-center justify-center">
                <span className="text-lg">🏢</span>
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded ${
                  user.status === "active"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {user.status}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{user.email}</p>

            <div className="grid grid-cols-4 gap-8 text-sm">
              <div>
                <span className="text-gray-500 block">Type:</span>
                <span className="font-medium text-gray-900">{user.type}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Joined:</span>
                <span className="font-medium text-gray-900">{user.joined}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Last Active:</span>
                <span className="font-medium text-gray-900">{user.lastActive}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Applications:</span>
                <span className="font-medium text-gray-900">{user.applications}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="h-8 w-8 p-0 flex items-center justify-center hover:bg-gray-100 rounded"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
        <button
          type="button"
          className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 text-sm"
        >
          🚫 Suspend
        </button>
        <button
          type="button"
          className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default UserCard;

import React, { useState, useEffect } from "react";
import { Edit, Trash, PlusCircle } from "lucide-react";
import { getAllUsers, deleteUser, updateUser } from "../../services/adminApi";
import { useAuth } from "../../contexts/AuthContext";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const AdminDashboard: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  useEffect(() => {
    if (!isLoading && user?.token) {
      fetchUsers(user.token);
    }
  }, [isLoading, user]);

  const fetchUsers = async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllUsers(token);
      console.log("Fetched users:", response.users);
      setUsers(response.users);
    } catch (error) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (_id: string) => {
    if (!user?.token) return;

    if (!_id) {
      setError("User ID tidak valid");
      return;
    }

    try {
      await deleteUser(_id, user.token);
      setUsers((prev) => prev.filter((user) => user._id !== _id));
    } catch (error) {
      setError("Error deleting user");
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setShowModal(true);
  };

  const handleUpdateUser = async () => {
    if (!editUser || !user?.token) return;

    try {
      await updateUser(editUser._id, editUser.name, editUser.email, editUser.role, user.token);
      setUsers((prev) =>
        prev.map((user) =>
          user._id === editUser._id ? { ...user, ...editUser } : user
        )
      );
      setShowModal(false);
      setEditUser(null); 
    } catch (error) {
      setError("Error updating user");
      console.error("Error updating user:", error);
    }
  };

  const handleAddUser = (newUser: User) => {
    setUsers((prev) => [...prev, { ...newUser, status: "active" }]);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard - User Management</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Manage users and monitor their details.</p>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-4 mb-6 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">User List</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Role</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.role}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-2 text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex justify-end mb-8">
          <button
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            onClick={() => setShowModal(true)}
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New User
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {editUser ? "Update User" : "Add New User"}
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                  value={editUser ? editUser.name : ""}
                  onChange={(e) =>
                    setEditUser((prev) => (prev ? { ...prev, name: e.target.value } : null))
                  }
                  placeholder="Enter user name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                  value={editUser ? editUser.email : ""}
                  onChange={(e) =>
                    setEditUser((prev) => (prev ? { ...prev, email: e.target.value } : null))
                  }
                  placeholder="Enter user email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">Role</label>
                <select
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                  value={editUser ? editUser.role : "user"}
                  onChange={(e) =>
                    setEditUser((prev) => (prev ? { ...prev, role: e.target.value } : null))
                  }
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                  onClick={handleUpdateUser}
                >
                  {editUser ? "Update User" : "Add User"}
                </button>
                <button
                  className="ml-4 px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

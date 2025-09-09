"use client"
import Button from "@/components/Button";
import UpdateForm from "@/components/UpdateForm";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const res = await axios.get('http://localhost:3000/api/user');
    setUsers(res.data.users);
    setLoading(false);
  }

  async function handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      await axios.delete(`http://localhost:3000/api/user?id=${id}`);
      fetchUser();
    }
  }

  return (
    <div className="container m-auto pt-5">
      {loading? (
        <div className="h-screen w-full flex justify-center items-center">Loading...</div>
      ) : (
        <div>
          <div className="flex justify-between">
          <h1 className="text-xl font-bold">Registered Users</h1>
          <Link href={'/user/register'}>
            <Button ButtonText="Register" />
          </Link>
        </div>

        <div className="grid grid-cols-5 font-bold text-lg border-b py-1 mb-1">
          <div>Sr. No.</div>
          <div>First Name</div>
          <div>Last Name</div>
          <div>Email</div>
          <div>Actions</div>
        </div>

        {users.map((user: User, index: number) => (
          <div key={user.id} className="grid grid-cols-5 items-center border-b py-2">
            <div>{index + 1}</div> {/* Sequential number */}
            <div>{user.firstName}</div>
            <div>{user.lastName}</div>
            <div>{user.email}</div>

            <div className="flex space-x-4">
              <button
                onClick={() => setEditingUser(user)}
                title="Edit"
                className="text-blue-500 text-xl cursor-pointer"
              >
                ✏️
              </button>

              <button
                onClick={() => handleDelete(user.id)}
                title="Delete"
                className="text-red-500 text-xl cursor-pointer"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}

        {editingUser && (
          <UpdateForm
            user={editingUser}
            onUpdateSuccess={fetchUser}
            onClose={() => setEditingUser(null)}
          />
        )}
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { toast } from 'react-toastify';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface UpdateFormProps {
  user: User;
  onUpdateSuccess: () => void;
  onClose: () => void;
}

export default function UpdateForm({ user, onUpdateSuccess, onClose }: UpdateFormProps) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          firstName,
          lastName,
          email
        })
      });

      const data = await res.json();

      if (res.status === 400) {
        toast.error(data.message || 'Email already registered');
      } else {
        toast.success('User updated successfully');
        onUpdateSuccess();
        onClose();
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md grid gap-4 w-96"
      >
        <h2 className="text-xl font-bold">Update User</h2>

        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
          className="border p-2 rounded"
        />

        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
          className="border p-2 rounded"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="border p-2 rounded"
        />

        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Update
          </button>

          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

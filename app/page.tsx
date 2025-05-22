import Button from "@/components/Button";
import axios from "axios";
import Link from 'next/link';

interface User {
  id: number,
  firstName: string,
  lastName: string,
  email: string
}
export default async function Home() {
  const users = await fetchUser();
  return (
    <div className="container m-auto pt-5">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Registered Users</h1>
        <Link href={'/user/register'}>
          <Button ButtonText='Register'/>
        </Link>
      </div>
      <div className="grid grid-cols-4 font-bold text-lg border-b py-1 mb-1">
          <div>ID</div>
          <div>First Name</div>
          <div>Last Name</div>
          <div>Email</div>
      </div>
      {users.map((user: User ) => {
        return <div className="grid grid-cols-4">
          <div key={user.id}>{user.id}</div>
          <div>{user.firstName}</div>
          <div>{user.lastName}</div>
          <div>{user.email}</div>
        </div>
      })}
    </div>
  );
}

async function fetchUser() {
  const users = await axios.get('http://localhost:3000/api/user')
  return users.data.users
}
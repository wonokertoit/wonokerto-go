import { getAllUsers } from '@/app/actions/users';
import AkunClient from './AkunClient';

export default async function AkunPage() {
  const users = await getAllUsers();

  return <AkunClient users={users} />;
}

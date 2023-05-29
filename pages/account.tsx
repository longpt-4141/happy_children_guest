import * as React from 'react';
import { useSession, signOut } from 'next-auth/react';
export interface IAccountProps {
}

export default function Account (props: IAccountProps) {
const {data : session, status} = useSession({required: true})
    if(status === 'authenticated') {
        return (
            <div>
                welcome {session.user?.name}
            </div>
        )
    }else {
  return (
    <div>
        you are not logged in
    </div>
  );
}
}

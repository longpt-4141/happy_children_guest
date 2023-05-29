import * as React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
export interface ILoginProps {
    
}

export default function Login (props: ILoginProps) {
    const {data: session} = useSession()
    if(session) {
        return (
            <div>
                welcome 
                {session.user?.name}
                {/* <img src={session.user?.image} alt="long" width={60} height={60}/> */}
                <button onClick={() => signOut()}>
                    log out
                </button>
            </div>
          );
    }
    else {
        return (
            <div>
                Login
            <button onClick={() => signIn()}>
                log in
            </button>
            </div>
          );
    }
}

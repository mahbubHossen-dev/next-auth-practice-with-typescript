'use client'   
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

// ✅ `children` এর টাইপ নির্দিষ্ট করার জন্য ইন্টারফেস
interface NextAuthProviderProps {
    children: ReactNode;
}

// ✅ TypeScript-এর জন্য `FC` (Functional Component) ব্যবহার করা হয়েছে
const NextAuthProvider: React.FC<NextAuthProviderProps> = ({ children }) => {
    // const { data: session, status } = useSession();
    
    // console.log(session, status);
    
    return <SessionProvider>{children}</SessionProvider>;
}

export default NextAuthProvider;



// 'use client'  
// import { SessionProvider, useSession } from 'next-auth/react';
// import { ReactNode } from 'react';

// // ✅ ইন্টারফেস তৈরি করা হয়েছে যাতে `children` এর টাইপ নির্দিষ্ট থাকে
// interface NextAuthProviderProps {
//     children: ReactNode;
// }

// // ✅ TypeScript-এর জন্য `FC` (Functional Component) ব্যবহার করা হয়েছে
// const NextAuthProvider: React.FC<NextAuthProviderProps> = ({ children }) => {
//     const {data: session, status} = useSession()
//     console.log(session, status)
//     return <SessionProvider>{children}</SessionProvider>;
// }

// export default NextAuthProvider;

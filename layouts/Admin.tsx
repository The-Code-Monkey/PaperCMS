import {Box} from "@techstack/components";
import Link from "next/link";
import {useRouter} from "next/router";
import {ReactNode, useEffect, useState} from "react";
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import supabase from "../db/supabase";

interface Props {
    children: ReactNode
}

const AdminLayout = ({ children }: Props) => {
    const router = useRouter();
    const [routes, setRoutes] = useState([]);

    const getData = async () => {
        const {data, error} = await supabase.from('products').select()
        console.log(data);
    }

    useEffect(() => {
        getData()
    }, [])

    const handleSignOut = async () => {
        const { error } = await supabaseClient.auth.signOut();
    }

    return (
            <div className='wrapper'>
                <aside>
                    <Box as='ul'>
                        <Box as='li' className={router.pathname == '/' ? 'active' : ''}>
                            <Link href={'/'}>
                                <a>
                                    <span>Dashboard</span>
                                </a>
                            </Link>
                        </Box>
                        <Box
                            as='li'
                            className={router.pathname.startsWith('/users') ? 'active' : ''}
                        >
                            <Link href={'/users'}>
                                <a>
                                    <span>Users</span>
                                </a>
                            </Link>
                        </Box>

                        <Box as='li'>
                            <Link href=''>
                                <a onClick={handleSignOut}>
                                    <span>Logout</span>
                                </a>
                            </Link>
                        </Box>
                    </Box>
                </aside>
                <main>
                    {children}
                </main>
            </div>
    )
}

export default AdminLayout;
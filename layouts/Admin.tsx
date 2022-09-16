import {Box} from "@techstack/components";
import Link from "next/link";
import {useRouter} from "next/router";
import {ReactNode, useEffect, useState} from "react";
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import supabase from "../db/supabase";
import {PostgrestResponse} from "@supabase/postgrest-js/src/lib/types";
import DB from "../db";
import Db from "../db";

interface Props {
    children: ReactNode
}

const capitalizeFirstLetter = ([ first, ...rest ]: any, locale = navigator.language) =>
    first === undefined ? '' : first.toLocaleUpperCase(locale) + rest.join('')

const AdminLayout = ({ children }: Props) => {
    const router = useRouter();
    const [routes, setRoutes] = useState<Array<string>>([]);

    const getData = async () => {
        const {data, error} = await DB<{ tablename: string }>().then(db => db.dbFunction("get_all_table_name"));

        if (error) throw new Error(error);

        const tables: Array<string> = data?.map(table => table.tablename) ?? [];
        setRoutes(tables);
    }

    useEffect(() => {
        getData()
    }, [])

    const handleSignOut = async () => {
    }

    console.log(router)

    return (
            <div className='wrapper'>
                <aside>
                    <Box as='ul'>
                        <Box as='li' className={router.asPath == '/' ? 'active' : ''}>
                            <Link href={'/'}>
                                <a>
                                    <span>Dashboard</span>
                                </a>
                            </Link>
                        </Box>
                        <Box
                            as='li'
                            className={router.asPath.startsWith('/users') ? 'active' : ''}
                        >
                            <Link href={'/users'}>
                                <a>
                                    <span>Users</span>
                                </a>
                            </Link>
                        </Box>
                        {routes.map(route => (
                            <Box key={route} as="li" className={router.asPath.startsWith(`/list/${route}`) ? 'active' : ''}>
                                <Link href={`/list/${route}`}>
                                    <a>
                                        <span>{capitalizeFirstLetter(route)}</span>
                                    </a>
                                </Link>
                            </Box>
                        ))}
                        <Box as='li'>
                            <Link href='/'>
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
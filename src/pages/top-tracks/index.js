//* Import Next.js and React.js Libraries
import Head from 'next/head'
import { useEffect, useState } from "react"
import Image from 'next/image'

//* Import External Libraries
import axios from 'axios'

//* Import Style
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const TopTracks = () => {

    //* State
    const [token, setToken] = useState(null)
    const [userTopTracks, setUserTopTracks] = useState([])

    //* Others
    const TextLimit = ({ text, limit }) => {
        const truncatedText = text.length > limit ? text.slice(0, limit) + '...' : text;

        return <div>{truncatedText}</div>;
    }

    const DurationConverter = ({ durationMs }) => {
        const minutes = Math.floor(durationMs / 60000);
        const seconds = Math.floor((durationMs % 60000) / 1000);

        const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        return <div>{formattedDuration}</div>;
    }

    useEffect(() => {

        //* Get Token
        let token = window.localStorage.getItem("token")
        setToken(token)

        //* Get Current User's Top Artists  
        const fetchUserTopTracks = async () => {
            try {
                const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks/", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                setUserTopTracks(data.items)
            } catch (error) {
                console.error(error)
            }
        }

        fetchUserTopTracks()
    }, [])
    console.log(userTopTracks)
    return (
        <>
            <Head>
                <title>🚀 Your Spotify 6 Top Tracks</title>
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.Appheader} >
                <div>
                    <Link href='/'>
                        <button className='text-white  bg-[#000] hover:bg-[#000]/80 focus:ring-4 space-x-4 focus:ring-[#000]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#09851e]/80 dark:focus:ring-[#09851e]/40 mt-10'>
                            Home
                        </button>
                    </Link>
                </div>
                <div className="items-center justify-center hidden grid-cols-3 gap-4 m-20 lg:grid md:hidden sm:hidden">
                    {
                        userTopTracks.slice(0, 6).map((topTracks) => (
                            <Link href={topTracks.external_urls.spotify}>
                                <div key={topTracks.id} class="bg-black m-5 max-w-sm rounded overflow-hidden shadow-lg">
                                    <Image
                                        src={topTracks.album.images[0].url}
                                        width={300}
                                        height={300}
                                        alt='${userTopTracks.name} Picture'
                                    />
                                    <div class="px-3 pt-3">
                                        <div class="flex flex-row justify-between">
                                            <div class="font-bold text-xl">{topTracks.name}</div>
                                            <div class="text-xs mb-2"><DurationConverter durationMs={topTracks.duration_ms} /></div>
                                        </div>
                                        <div class="text-sm mb-2">by {topTracks.artists[0].name}</div>
                                        <Link href={topTracks.album.external_urls.spotify}>
                                            <div class="text-xs mb-2"><TextLimit text={'from: ' + topTracks.album.name} limit={30} /></div>
                                        </Link>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                <div className="items-center justify-center grid-cols-3 gap-4 m-20 lg:hidden sm:block md:block">
                    {
                        userTopTracks.slice(0, 6).map((topTracks) => (
                            <Link href={topTracks.external_urls.spotify}>
                                <div key={topTracks.id} class="bg-black m-5 max-w-sm rounded overflow-hidden shadow-lg">
                                    <Image
                                        src={topTracks.album.images[0].url}
                                        width={300}
                                        height={300}
                                        alt='${userTopTracks.name} Picture'
                                    />
                                    <div class="px-3 pt-3">
                                        <div class="flex flex-row justify-between">
                                            <div class="font-bold text-xl">{topTracks.name}</div>
                                            <div class="text-xs mb-2"><DurationConverter durationMs={topTracks.duration_ms} /></div>
                                        </div>
                                        <div class="text-sm mb-2">by {topTracks.artists[0].name}</div>
                                        <Link href={topTracks.album.external_urls.spotify}>
                                            <div class="text-xs mb-2"><TextLimit text={'from: ' + topTracks.album.name} limit={30} /></div>
                                        </Link>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </main>
        </>
    )
}
export default TopTracks
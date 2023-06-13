//* Import Next.js and React.js Libraries
import Head from 'next/head'
import { useEffect, useState } from "react"
import Image from 'next/image'

//* Import External Libraries
import axios from 'axios'

//* Import Style
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const TopArtists = () => {

    //* State
    const [token, setToken] = useState(null)
    const [userTopArtists, setUserTopArtists] = useState([])

    useEffect(() => {

        //* Get Token
        let token = window.localStorage.getItem("token")
        setToken(token)

        //* Get Current User's Top Artists  
        const fetchUserTopArtists = async () => {
            try {
                const { data } = await axios.get("https://api.spotify.com/v1/me/top/artists/", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                setUserTopArtists(data.items)
            } catch (error) {
                console.error(error)
            }
        }

        fetchUserTopArtists()
    }, [])
    console.log(userTopArtists);
    return (
        <>
            <Head>
                <title>🚀 Your Spotify Top Artists</title>
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
                <div className="grid items-center justify-center grid-cols-3 gap-4 m-20">
                    {
                        userTopArtists.slice(0, 9).map((topArtists, index) => (
                            <Link href={"https://open.spotify.com/artist/" + topArtists.id}>
                                <div key={topArtists.id} class="bg-black m-5 max-w-sm rounded overflow-hidden shadow-lg">
                                    <Image
                                        src={topArtists.images[1].url}
                                        width={300}
                                        height={300}
                                        alt='${userTopArtists.name} Picture'
                                    />
                                    <div class="px-6 pt-4">
                                        <div class="font-bold text-xl mb-2">{(index + 1) + " " + topArtists.name}</div>
                                    </div>
                                    <div class="px-6 pb-2">
                                        {
                                            topArtists.genres.slice(0, 1).map((topArtistsGenres, index) => (

                                                <span key={index} class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{topArtistsGenres}</span>

                                            ))
                                        }
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
export default TopArtists
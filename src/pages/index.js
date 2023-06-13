//* Import Next.js and React.js Libraries
import Head from 'next/head'
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/router'

//* Import External Libraries
import axios from 'axios'

//* Import Style
import styles from '@/styles/Home.module.css'


//* Function
export default function Home() {

  //* Authentication & Authorization Variables
  const CLIENT_ID = process.env.CLIENT_ID
  const REDIRECT_URI = process.env.REDIRECT_URI
  const AUTH_ENDPOINT = process.env.AUTH_ENDPOINT
  const RESPONSE_TYPE = process.env.RESPONSE_TYPE

  //* State
  const [token, setToken] = useState(null)
  const [userProfile, setUserProfile] = useState(null)

  //* Others
  const router = useRouter()


  useEffect(() => {

    //* Get Token
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }
    setToken(token)

    //* Get Current User's Profile  
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        setUserProfile(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUserProfile()
  }, [])

  //* Logout Button Function
  const Logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
    router.push('/')
    window.location.reload()
  }

  return (
    <>
      <Head>
        <title>🚀 Your Spotify Profile</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.Appheader} >
        <div className="flex flex-col items-center justify-center m-20">
          <br />
          {
            token ?
              userProfile &&
              <div>
                {
                  userProfile.images.length &&
                  userProfile.images[0].url &&
                  <img className='w-full rounded-full' src={userProfile.images[0].url} alt='Avatar' />
                }
                <div className='m-5'></div>
                <h1 className='text-2xl font-bold text-center'>
                  @{userProfile.display_name}
                </h1>
                <div className='m-2'></div>
                <p className='text-lg text-center'>
                  {userProfile.followers.total} Followers
                </p>
              </div>
              :
              <div>
                {/* Empty Div */}
              </div>
          }
          <div className='m-10'></div>
          {
            !token ?
              <button className="text-white bg-[#09851e] space-x-4 hover:bg-[#09851e]/80 focus:ring-4 focus:ring-[#09851e]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center dark:hover:bg-[#09851e]/80 dark:focus:ring-[#09851e]/40 mr-2 mb-2">
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user-top-read&response_type=${RESPONSE_TYPE}`}>
                  <div className='flex space-x-4'>
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" fill='white'>
                      <path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z" />
                    </svg>
                    <p className='text-lg'>Connect Spotify</p>
                  </div>
                </a>
              </button>
              :
              <div className='flex flex-col'>
                <div>
                  <Link href='/top-artists'>
                    <button className="text-white  bg-[#000] hover:bg-[#000]/80 focus:ring-4 space-x-4 focus:ring-[#000]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#09851e]/80 dark:focus:ring-[#09851e]/40 mr-2 mb-2">
                      <div className='flex space-x-4 '>
                        Your Top Artists
                      </div>
                    </button>
                  </Link>
                  <Link href='/top-tracks'>
                    <button className="text-white  bg-[#000] hover:bg-[#000]/80 focus:ring-4 space-x-4 focus:ring-[#000]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#09851e]/80 dark:focus:ring-[#09851e]/40 mr-2 mb-2">
                      <div className='flex space-x-4 '>
                        Your Top Tracks
                      </div>
                    </button>
                  </Link>
                </div>
                <div className='flex justify-center'>
                  <button onClick={Logout} className="text-white  bg-[#a31313] hover:bg-[#a31313]/80 focus:ring-4 space-x-4 focus:ring-[#a31313]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#a31313]/80 dark:focus:ring-[#a31313]/40 mr-2 mb-2">
                    <div className='flex space-x-4 '>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='white'>
                        <path d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-16-7v20h14v-2h-12v-16h12v-2h-14z" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
          }
          <br />
        </div>
      </main>
    </>
  )
}
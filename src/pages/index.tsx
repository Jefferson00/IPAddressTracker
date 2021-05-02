
import styles from '../styles/Home.module.scss'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { GetServerSideProps } from 'next';
import api from '../services/api';
import Load from '../components/Load';
import ReactLoading from 'react-loading';

interface LocationProps{
    country:string;
    region:string;
    city:string;
    lat:number;
    lng:number;
    timezone:string;
}

interface GeoDataProps{
    ip: string;
    location: LocationProps;
    isp:string;
}

export default function Home(geoProps:GeoDataProps) {
    const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY;
    const [ipAddress, setIpAddress] = useState(geoProps.ip);
    const [city, setCity] = useState(geoProps.location.city);
    const [region, setRegion] = useState(geoProps.location.region);
    const [timezone, setTimezone] = useState(geoProps.location.timezone);
    const [lat, setLat] = useState(geoProps.location.lat);
    const [lng, setLng] = useState(geoProps.location.lng);
    const [isp, setIsp] = useState(geoProps.isp);
    const [ipText, setIpText] = useState<string>();
    const [loading, setLoading] = useState(false);


    const Map = useMemo(() => dynamic(
        () => import('../components/Map'), 
        { 
          loading: () => 
            <div style={{
              display:'flex',
              alignItems:'center', 
              justifyContent:'center',
              width:'100%',
              height:'100%'
            }}>
              <ReactLoading type="spin" color="#2b2b2b"/>
            </div>,
          ssr: false 
        }
      ), [lat])


      async function updateGeoProps(){
         
          if (ipText === '') return alert('Type an IP address or domain')

          try {
            setLoading(true);
            const {data} = await api.get(`?apiKey=${GEO_API_KEY}&ipAddress=${ipText}`)

            setIpAddress(data.ip);
            setCity(data.location.city);
            setRegion(data.location.region);
            setLat(data.location.lat);
            setLng(data.location.lng);
            setTimezone(data.location.timezone);
            setIsp(data.isp)

            setLoading(false);
          } catch (error) {
            setLoading(false);
            return alert('Type an valid IP address or domain')
          }
      }

  return (
    <div className={styles.container}>
     <header className={styles.headerContainer}>
       <div className={styles.wrapper}>
        <span>
          IP Address Tracker
        </span>

        <div className={styles.inputContainer}>
            <input 
              type="text" 
              name="iptracker" 
              id="iptracker"
              placeholder="Search for any IP address or domain"
              onChange={e =>setIpText(e.target.value)}
              className={styles.inputTracker}
            />
            <button type="button" onClick={updateGeoProps}>
                <span className={styles.buttonIcon}/>
            </button>
        </div>

        <div className={styles.informationsContainer}>
            <div>
                <p>IP ADDRESS</p>
                <strong>
                    {loading ? <Load/> : ipAddress}
                </strong>
            </div>
            <div>
                <p>LOCATION</p>
                <strong>
                    {loading ? <Load/> :city +', '+region}
                </strong>
            </div>
            <div>
                <p>TIMEZONE</p>
                <strong>
                    {loading ? <Load/> :timezone}
                </strong>
            </div>
            <div>
                <p>ISP</p>
                <strong>
                    {loading ? <Load/> :isp}
                </strong>
            </div>
        </div>
        </div>
     </header>

     <main className={styles.mainContainer} id="mapid">
        <Map lat={lat} lng={lng}/>
     </main>
    </div>
  )
}

export const getServerSideProps : GetServerSideProps = async () =>{
   const {data} = await api.get('?apiKey=at_8LSTGtC5nHNKjO5A7WVzoFq1CA9LQ')

   return {
       props: {
            ip: data.ip,
            location: {
                country: data.location.country,
                region: data.location.region,
                city: data.location.city,
                lat: data.location.lat,
                lng: data.location.lng,
                timezone: data.location.timezone,
            },
            isp: data.isp,
       }
   }
}
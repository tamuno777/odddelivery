
import React, { useRef } from 'react'
import { useState,useEffect  } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SlidingPanel, { PanelType } from 'react-sliding-side-panel';
import { db, auth } from '../firbaseconfig/index'
import 'react-sliding-side-panel/lib/index.css';
import { collection,addDoc ,where, getDocs,serverTimestamp,query, orderBy, limit } from 'firebase/firestore'
import PaystackPop from '@paystack/inline-js'




export default function Tracker() {
  const [lgShow, setLgShow] = useState(false);
  const [openPanel, setOpenPanel] = useState(false);
  const [panelType, setPanelType] = useState('left');
  const [panelSize, setPanelSize] = useState(30);
  const [noBackdrop, setNoBackdrop] = useState(false);
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [pickupgeo, setPickupgeo] = useState({})
  const [dropoffgeo, setDropoffgeo] = useState({})
  const [distance, setDistance] = useState(0)
  const [hmkg, setHmkg] = useState(0)
  const [packagetype, setPackagetype] = useState('')
  const [box, setbox] = useState(0)
  const [reference, setreference] = useState(0)
  const [paid, setPaid] = useState("no")
  const [driver, setdriver] = useState({})


  const handlpickupechange = (e) => {

    setPickup( e.target.value)
    
 }
  const handldropoffchange = (e) => {

    setDropoff( e.target.value)
    
 }
  const handlhmkgchange = (e) => {

    setHmkg( e.target.value)
    
 }
  const handlpackagetypechange = (e) => {

    setPackagetype( e.target.value)
    
 }
  const handlhowmaanyboxchange = (e) => {

    setbox( e.target.value)
    
 }
const getDistance =() => {
  // useEffect(() => {
    (async () => {
      const result = await fetch(`https://geokeo.com/geocode/v1/search.php?q=${pickup}&api=fb299d5dfead5afcf68d84752d25e188`);
      const data = await result.json();
      const pickupdata = data.results[0].geometry.location
      setPickupgeo(pickupdata);
    })();
  // }, []);
  //  useEffect(() => {
    (async () => {
      const result = await fetch(`https://geokeo.com/geocode/v1/search.php?q=${dropoff}&api=fb299d5dfead5afcf68d84752d25e188`);
      const datad = await result.json();
      const dropoffdata = datad.results[0].geometry.location
      setDropoffgeo(dropoffdata);
    })();
  // }, []);

}
// calculate distance
const lat1 = pickupgeo.lat
const lon1 = pickupgeo.lng
const lat2 = dropoffgeo.lat
const lon2 = dropoffgeo.lng
const unit = "K"
  let radlat1 = Math.PI * lat1/180
  let radlat2 = Math.PI * lat2/180
  let theta = lon1-lon2
  let radtheta = Math.PI * theta/180
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  if (unit=="K") { dist = dist * 1.609344 }
  if (unit=="M") { dist = dist * 0.8684 }
  console.log(dist)
  const madist = Math.floor(dist)
 
 //genrate unique id
 const characters = "abcdefghijklmnopqrstuvwxyz1234579";
 let randomPassword = "";
 for (let i = 0; i < 5; i++) {
   const randomIndex = Math.floor(Math.random() * characters.length);
   randomPassword += characters[randomIndex];
 }
 let uniqueId = randomPassword 
 const totalpay = Math.floor((Number(hmkg) * 1000 )  + Number(dist) * Number(box))

 //firbase
 const bookingsRequestRef = collection(db, "Rides");
 const driverRequestRef = collection(db, "driver");

//  useEffect(() => {
  // const getRandomDocument = async () => {
    const d = ["adamu bala","john ola","jude king"]
    const randomIndex = Math.floor(Math.random() * d.length);
  
  const randomString = d[randomIndex];
  //   try {
  // const q = query(driverRequestRef,where("name", "==", randomString), orderBy("name"), limit(3)); 
    //  const filtteredData = q.docs.map((doc) => ({
    //     ...doc.data(),
    //     id: doc.id,
    //   }))
  
      
  
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
 
 
   
//  }, [])
 
 

console.log(randomString)

 const onSubmitbookings = async (e) => {
  e.preventDefault();

  

  const paystack = new PaystackPop()
    paystack.newTransaction({
      key:"pk_test_1cc4d4a48b0391ad1ba1d054524bdda3759c2b3c",
      amount : totalpay * 100,
      email : auth.currentUser.email,
      Name : auth.currentUser.displayName,
      onSuccess (transaction){
        
        alert( `payment sucessful ! refrence ${transaction.reference}`);
        setPaid("yes")
        setreference (transaction.reference)
      },
      onCancle(){
        alert( `you have cancled the transaction`)


      }

    })
    try {
      await addDoc(bookingsRequestRef, {
        userid: uniqueId,
        Name : auth.currentUser.displayName,
        email : auth.currentUser.email,
        pickup: pickup,
        dropoff : dropoff,
        box: box,
        kg : Number(hmkg),
        type : packagetype ,
        distance : madist ,
        reference : totalpay,
        paid: paid,
        totalcost: totalpay,
        driver: randomString,
        createdAt: serverTimestamp(),
        
        
      }); 
      
    } catch (err) {
      console.error(err);
    }


      
 
  
};






 
    const options = [
        {
          value: "Clothing",
          dateName:"Clothing ",
        //   dataPrice: 0,
        },
        {
          value: "Food",
          dateName:"Food",
        //   dataPrice: 3000,
        },
        {
          value: "Electronic",
          dateName:"Electronic",
        //   dataPrice: 5000,
        },
        {
          value: "Glass(fragile)",
          dateName:"Glass(fragile)",
        //   dataPrice: 5000,
        },
        {
          value: "Others",
          dateName:"Others",
        //   dataPrice: 5000,
        },
        {
          value: "Combined package",
          dateName:"Combined package",
        //   dataPrice: 5000,
        },
       
        
       
      ]
    const amount = [
        {
          value: "1",
          dateName:"1 ",
        //   dataPrice: 0,
        },
        {
          value: "2",
          dateName:"2",
        //   dataPrice: 3000,
        },
        {
          value: "3",
          dateName:"3",
        //   dataPrice: 5000,
        },
        {
          value: "4",
          dateName:"4",
        //   dataPrice: 5000,
        },
        {
          value: "5 and more",
          dateName:"5 and more",
        //   dataPrice: 5000,
        },
       
        
       
      ]
  return (
    <div className='banner'>
      <h3 className='my-2 ps-5'>WELLCOME TO ODD-DELIVERY <span>{auth.currentUser.displayName}</span></h3>

    <div className='d-flex pt-3 justify-content-center mainboard  ' >
        <section className='py-2 px-5  sec' > 
         <div className='input-area'>
            <div className='d-flex'>
            <lord-icon
            src="https://cdn.lordicon.com/pjibjvxa.json"
            trigger="hover"
            colors="primary:#f24c00,secondary:#4bb3fd,tertiary:#3a3347"
            style={{"width":"50px","height":"50px"}}>
        </lord-icon>
         <input type="text" name="text" onChange={handlpickupechange} className="input" placeholder="Pick up state"></input>
            </div>
        <div  className='d-flex'>
        <lord-icon
            src="https://cdn.lordicon.com/oaflahpk.json"
            trigger="hover"
            colors="primary:#4bb3fd"
            style={{"width":"50px","height":"50px"}}>
        </lord-icon>
        <input type="text" onChange={handldropoffchange} name="text" className="input" placeholder="Drop off state"></input>
        
        </div>
         </div>


        <section className=' mt-3 d-flex justify-content-center' style={{flexDirection:"column"}}> 
        <div className="form-group ">
                    <label htmlFor="text"><h6>How Many KG (N1000/kg)</h6></label>
                    <input type="text" className='form-in' onChange={handlhmkgchange} />
                  
                  </div>
            <div>
                <form action="" >

                <div className="form-group ">
                    <label htmlFor="text"><h6>Type of package</h6></label>
                    <select 
                    onChange={handlpackagetypechange}

                    name="" className='form-in' required>
                        {/* <option className='bg-dark text-white'  value="0" data-value={0}> select type of ticket </option> */}
                        {options.map((option) => (
                        <option className='bg-dark text-white' key={option.value} value={option.value} data-value={option.dataPrice}>
                          {option.dateName}
                        </option>
                      ))}
                        
                    </select>
                  </div>
                <div className="form-group ">
                    <label htmlFor="text"><h6>How Many boxs</h6></label>
                    <select 
                    onChange={handlhowmaanyboxchange}

                    name="" className='form-in' required>
                        {/* <option className='bg-dark text-white'  value="0" data-value={0}> select type of ticket </option> */}
                        {amount.map((amounts) => (
                        <option className='bg-dark text-white' key={amounts.value} value={amounts.value} data-value={amounts.dataPrice}>
                          {amounts.dateName}
                        </option>
                      ))}
                        
                    </select>
                  </div>
                  <div className="d-flex justify-content-between">
                  <Button  type="button"
            onClick={() => {
              setPanelType('left');
              setOpenPanel(true);
            }}
             className='firstbtn mt-2 bg-dark pt-3'>
                      <span className="circle1"></span>
                      <span className="circle2"></span>
                      <span className="circle3"></span>
                      <span className="circle4"></span>
                      <span className="circle5"></span>
                      <span className="text">Previw</span>
                  </Button>

                  <button  type="button"
            onClick={getDistance}
             className='firstbtn mt-2 bg-dark pt-3'>
                      <span className="circle1"></span>
                      <span className="circle2"></span>
                      <span className="circle3"></span>
                      <span className="circle4"></span>
                      <span className="circle5"></span>
                      <span className="text">Submit Booking</span>
                  </button>
                  </div>
                 
                  
                </form>
            </div>
        </section>
        
        
        </section>
        <section className=' my-2   rounded d-flex justify-content-center' style={{width:"600px",height:"440px"}}>
          {/* <Mapdiv/> */}
          <div className="map">

          </div>
        </section>
        

    </div>
    <SlidingPanel
        type={panelType}
        isOpen={openPanel}
        backdropClicked={() => setOpenPanel(false)}
        size={panelSize}
        panelClassName="additional-class"
        panelContainerClassName=""
        noBackdrop={noBackdrop}
      >
        <div className="panel-container bg-secondary pt-2 px-5 h-100" >
          <div>
            <div className='mb-5'>
              <h6>{randomString} is  ready to run your shipping</h6>
              <p>arriving in 15 day < span className='ms-2'> <strong>KM</strong> : {madist} </span></p>
              <h6>Cargo id   <span className='ms-5 '>{uniqueId}</span> </h6> 
              
            </div>
            <div className='d-flex justify-content-center gap-5'>
              <a href="" className='a'>
                <span className='call'>
                <svg xmlns="http://www.w3.org/2000/svg" width="46" viewBox="0 0 46 46" height="46" fill="none" className="svg-icon"><path strokeWidth="2" strokeLinecap="round" stroke="#fff" fillRule="evenodd" d="m14.5037 27.0715c.819-.634 1.7094-1.1699 2.653-1.597.7621-.3521 1.2557-1.1094 1.2699-1.9488-.0073-1.1346.7466-2.1517 1.8673-2.3279 1.7701-.2782 3.5728-.2785 5.3429-.0005 1.1206.1759 1.8744 1.193 1.8669 2.3274.0206.8307.5066 1.5791 1.257 1.9359.981.4173 1.9093.9489 2.7657 1.5838.8765.5876 2.0467.4715 2.791-.2769l2.2507-2.2507c.4294-.4283.6617-1.0157.6414-1.6219-.0308-.5985-.314-1.1559-.7793-1.5337-2.5842-2.0976-5.6309-3.5496-8.888-4.2357-2.9976-.6659-6.1047-.6655-9.1023.0009-3.2453.7041-6.2835 2.1503-8.87655 4.2253l-.12568.1256c-.38501.38-.60996.8929-.62872 1.4334-.02687.6011.20148 1.1854.62847 1.6092l2.25008 2.2501c.7307.7914 1.9343.9202 2.8162.3015z" clipRule="evenodd"></path></svg>

                </span>
                <p>CALL</p>
              </a>
              <a href=" " className='a'>
                <span className='alertt'>
                <svg viewBox="0 0 448 512" className="bell" width="46"><path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path></svg>

                </span>
                <p>ALERT</p>
              </a>
            </div>
            <div className='mt-4 mb-2'>
              <div className='d-flex'>
                <div className="dot"></div>
                <p className='pb-2 text'>{pickup}</p>
              </div>
              <div className='lines'>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>

              </div>
              
              <div className='d-flex'>
                <div className="dot"></div>
                <p className='text2'>{dropoff}</p>
              </div>
              
            </div>
            <div className='d-flex gap-5'>
              <h6>Charges : </h6>
              <h6>N {totalpay}</h6>
            </div>
            <div className='my-3'>
              <h6>    pay with </h6>
              <div className="d-flex gap-5">
              <button className='firstbtn'type='submit' onSubmit={onSubmitbookings}>card</button>
              <button className='firstbtn' >cash</button>
              </div>

            </div>
          </div>
          <button type="button" className="close-button firstbtn  rounded   " onClick={() => setOpenPanel(false)}>
            close
          </button>
        </div>
      </SlidingPanel>
    
    </div>
  )
}

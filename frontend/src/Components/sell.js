import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import DataSelector from './DataSelector';
import { Country, State, City } from "country-state-city";
import 'react-toastify/dist/ReactToastify.css';
import './sell.css'

export default function () {

  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState();
  const [cityData, setCityData] = useState();

  const [country, setCountry] = useState(countryData[100]);
  const [state, setState] = useState();
  const [city, setCity] = useState();

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  useEffect(() => {
    setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
  }, [state]);

  useEffect(() => {
    stateData && setState(stateData[0]);
  }, [stateData]);

  useEffect(() => {
    cityData && setCity(cityData[0]);
  }, [cityData]);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    console.log(auth)
    if (!auth) {
      navigate("/login");
    }
  }, []);

  // const username = JSON.parse(localStorage.getItem('username'));
  const border = { 'border': '1px solid black' }
  const [cookie, setCookie] = useState({})

  const [disable, setDisable] = useState(true);

  const addToLocalStorage = () => {

    var propertyFor = document.querySelector('input[name="propertyFor"]:checked');
    var selectedValue = null;

    if (propertyFor) {
      selectedValue = propertyFor.value;
    }

    let type = document.getElementById('type').value;
    let Country = document.getElementById('Country').value;
    let State = document.getElementById('State').value;
    let City = document.getElementById('City').value;
    let society = document.getElementById('society').value;
    let zone = document.getElementById('zone').value;
    let pincode = document.getElementById('pincode').value;
    let area = document.getElementById('area').value;
    let price = document.getElementById('price').value;
    let rooms = document.getElementById('rooms').value;
    let seller = JSON.parse(localStorage.getItem("user"));
    let sellerId = seller._id;

    localStorage.setItem('PropertyDetails', JSON.stringify({ selectedValue, type, Country, State, City, society, zone, pincode, area, price, rooms, sellerId }));

    var temp = JSON.parse(localStorage.getItem('PropertyDetails'))

    console.log(temp.selectedValue)
    var selectedValue2 = temp.selectedValue;
    var type2 = temp.type;
    var Country2 = temp.Country;
    var State2 = temp.State;
    var City2 = temp.City;
    var society2 = temp.society;
    var zone2 = temp.zone;
    var pincode2 = temp.pincode;
    var area2 = temp.area;
    var price2 = temp.price;
    var rooms2 = temp.rooms;

    if (selectedValue2 === '' || type2 === '' || Country2 === '' || State2 === '' || City2 === '' || society2 === '' || zone2 === '' || pincode2 === '' || area2 === '' || price2 === '' || rooms2 === '') {
      toast.warning('Attention! Information not Sufficient...', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else if (selectedValue2 !== '' && type2 !== '' && Country2 !== '' && State2 !== '' && City2 !== '' && society2 !== '' && zone2 !== '' && pincode2 !== '' && area2 !== '' && price2 !== '' && rooms2 !== '') {
      setDisable(false)
      toast.success('Congratulations! Information Stored...', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      toast.error('Oops! Information Crashed...', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <div id='mainDiv' className='bg-center bg-no-repeat bg-cover'>
      <div className="main-block">
        <div className="left-part">
          <i className="fa fa-house-laptop text-[7em] text-sellIcon"></i> <br /> <br />
          <h1 id="leftHeading"> Sell Your Property</h1> <br /> <br />
          <p className='sellText'> With this platform you can sell your precious property virtually. Save your time and get high amount of money...</p>
          <div>
            <Link className="btn-item" to="/about">Explore Us</Link>
          </div>
        </div>

        <div id='sellForm'>
          <div className="title">
            <i className="fas fa-pencil-alt text-[1.8em] text-sellIcon"></i>  &ensp;
            <h2 id='rightHeading'>Property Info And Location</h2>
          </div>
          <br />
          <div className="information">
            <div>
              <label id='radio'>Property For:* </label> &emsp;
              <label id='radio'>
                <input
                  type="radio"
                  id='sellFor'
                  name="propertyFor"
                  value="Sell"
                  className='sellField'
                  defaultChecked
                />
                Sell
              </label> &emsp;
              <label id='radio'>
                <input
                  type="radio"
                  id='sellFor'
                  name="propertyFor"
                  value="Rent"
                  className='sellField'
                  required
                />
                Rent
              </label> &emsp;
              <label id='radio'>
                <input
                  type="radio"
                  id='sellFor'
                  name="propertyFor"
                  value="PG"
                  className='sellField'
                  required
                />
                PG
              </label>
              <br />
            </div>

            <div>
              <label>Property Type:* </label>
              <select id="type" required>
                <option id='propOpt' value="Select Type"> Select Type</option>
                <option id='propOpt' value="Flats/Apartments">Flats/Apartments</option>
                <option id='propOpt' value="Residential Plot">Residential Plot</option>
                <option id='propOpt' value="Office Space">Office Space</option>
                <option id='propOpt' value="Farm House">Farm House</option>
                <option id='propOpt' value="Agricultural land">Agricultural land</option>
                <option id='propOpt' value="Commercial plots">Commercial plots</option>
                <option id='propOpt' value="Warehouse & Godown">Warehouse & Godown</option>
                <option id='propOpt' value="Factory">Factory</option>
              </select>
              <br /> <br />
            </div>

            <h1 id='markLabel'> --- Landmark --- </h1> <br />
            
            <div className='flex flex-inline'>
              <label className='inline-block' style={{ width: '100px' }}> Country:* &ensp;
                {/* <input type="text"  className='sellField' name="Country" id="Country" placeholder='Enter Country' required > */}
              </label>
              <DataSelector
                type="select"
                className='sellField inline-block'
                name="Country"
                id="Country"
                data={countryData}
                selected={country}
                setSelected={setCountry}
              />
            </div>
            <br />

            {state && (
              <div className='flex flex-inline'>
                <label className='inline-block' style={{ width: '100px' }}> State:* &ensp;
                  {/* <input type="text"  className='sellField' name="State" id="State" placeholder='Enter State' required > */}
                </label>
                <DataSelector
                  type="select"
                  className='sellField inline-block'
                  name="State"
                  id="State"
                  data={stateData}
                  selected={state}
                  setSelected={setState} />
              </div>
            )}
            <br />

            {city && (
              <div className='flex flex-inline'>
                <label className='inline-block' style={{ width: '100px' }}>City:* &ensp;
                  {/* <input type="text" name="City" className='sellField' id="City" placeholder='Enter City' required /> */}
                </label>
                <DataSelector
                  type="select"
                  className='sellField inline-block'
                  name="City"
                  id="City"
                  data={cityData}
                  selected={city}
                  setSelected={setCity} />
              </div>
            )}
            <br />

            <label>Area:* &ensp;
              <input
                type="text"
                name="zone"
                className='sellField'
                id="zone"
                placeholder='Enter Area/Landmark'
                required />
            </label>

            <label>Apartment/Society:* &ensp;
              <input
                type="text"
                name="society"
                className='sellField'
                id="society"
                placeholder='Name Of Apartment/Society'
                style={{ 'width': '40%' }}
                required />
            </label>

            <label>Pincode:* &ensp;
              <input
                type="number"
                name='pincode'
                className='sellField'
                id="pincode"
                placeholder='Enter 6 digit Pincode'
                required />
            </label>
            <br /><br />

            <h1 id='markLabel'> --- Property Feature & Price --- </h1> <br />
            <label>Plot/Land Area (in m<sup>2</sup>):*  &ensp;
              <input
                type="number"
                name='area'
                className='sellField'
                id="area"
                placeholder='Plot/Land Area in Sq.meter'
                style={{ 'width': '40%' }}
                required />
            </label>

            <div>
              <label>No. of Bedrooms:* &ensp; </label>
              <select id="rooms" required>
                <option id='room' value="1">1</option>
                <option id='room' value="2">2</option>
                <option id='room' value="3">3</option>
                <option id='room' value="4">More</option>
              </select>
            </div>

            <label>Expected Price (&#8377;):* &ensp;
              <input
                type="number"
                name='price'
                className='sellField'
                id="price"
                placeholder='Enter Total Price in INR'
                style={{ 'width': '40%' }}
                required />
            </label>
            <br />
          </div>

          <button id='saveBtn' onClick={addToLocalStorage}> Save </button>

          <Link to="/addProperty">
            <button
              id="btn"
              className={disable ? 'notCon' : 'con'}
              disabled={disable}>
              Continue
            </button>
          </Link>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
    </div>
  )
};
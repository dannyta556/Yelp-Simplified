import { useState, useCallback, useReducer, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { LinkContainer } from 'react-router-bootstrap';
import BusinessIcon from '../images/business.png';
import Rating from '../components/rating.js';
import addressIcon from '../images/address.png';
import MetroIcon from '../images/metro.png';
import yelpIcon from '../images/yelp.png';
import html2canvas from 'html2canvas';
import downloadjs from 'downloadjs';
import LoadingBox from '../components/LoadingBox.js';

import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, restaurant: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function RestaurantScreen() {
  const [query, setQuery] = useState('');
  const [downloaded, setDownloaded] = useState(false);
  const navigate = useNavigate();

  const params = useParams();
  const { slug } = params;
  const [{ loading, error, restaurant }, dispatch] = useReducer(reducer, {
    restaurant: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/restaurants/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err });
      }
    };
    fetchData();
  }, [slug]);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };
  // get image
  const handleCaptureImage = useCallback(async () => {
    const resultsElement = document.querySelector('.restaurant-container');
    if (!resultsElement) return;

    const canvas = await html2canvas(resultsElement, {
      letterRendering: 1,
      useCORS: true,
    });
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, 'restaurant-summary.png', 'image/png');
    setDownloaded(true);
  }, []);

  return loading ? (
    <LoadingBox />
  ) : (
    <div className="App">
      <header className="secondary-header">
        <Navbar>
          <div className="header">
            <LinkContainer to="/">
              <h1 className="title-minimized">
                Yelp Simplified <img src={yelpIcon} alt="yelp" />
              </h1>
            </LinkContainer>

            <Form className="search-box-minimized" onSubmit={submitHandler}>
              <InputGroup>
                <FormControl
                  type="text"
                  name="q"
                  id="q"
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="search for a restaurant"
                  aria-label="Search Products"
                  aria-describedby="button-search"
                  htmlSize="150"
                ></FormControl>
                <Button
                  variant="outline-primary"
                  type="submit"
                  id="button-search"
                  className="search-btn"
                >
                  Go
                </Button>
              </InputGroup>
            </Form>
          </div>
        </Navbar>
      </header>
      <div>
        <div className="box">
          <div className="restaurant-container">
            <div className="top-half">
              <div className="restaurant-img-wrapper">
                <img
                  className="restaurant-icon-img"
                  width="75"
                  height="75"
                  src={yelpIcon}
                  alt="restaurant-icon"
                ></img>
              </div>
              <div className="restaurant-title-wrapper">
                <p className="restaurant-name-title">{restaurant.name}</p>
                <div className="ratings-wrapper">
                  <Rating
                    rating={restaurant.stars}
                    numReviews={restaurant.review_count}
                  />
                </div>
              </div>
              <div className="restaurant-contact-info">
                <div className="contact-bottom-wrapper">
                  <img
                    className="restaurant-address-icon"
                    src={addressIcon}
                    alt="address"
                  />
                  <div className="restaurant-address">
                    {restaurant.address ? restaurant.address : ''}
                    {', '}
                    {restaurant.city ? restaurant.city : ''}
                    {', '}
                    {restaurant.state ? restaurant.state : ''}
                    {', '}
                  </div>
                </div>
              </div>
            </div>
            <div className="body-section">
              <span className="pros-info">
                <p className="pros-header">Pros</p>
                {restaurant.pros.map((pro, index) => (
                  <p key={index}>{pro}</p>
                ))}

                {Object.entries(restaurant.attributes).map(
                  ([key, val], idx) => {
                    if (
                      key !== 'HasTV' &&
                      val === 'True' &&
                      idx < 15 &&
                      restaurant.pros.length < 2
                    ) {
                      var stringArray = key.match(/[A-Z][a-z]+/g);
                      var finalString = '';
                      for (var i = 0; i < stringArray.length; i++) {
                        finalString = finalString.concat(
                          ' ',
                          stringArray[i].toLowerCase()
                        );
                      }
                      return (
                        <p key={`pro-${key}`} className="pro-body">
                          {finalString}
                        </p>
                      );
                    }

                    return <></>;
                  }
                )}
              </span>
              <span className="cons-info">
                <p className="pros-header">Cons</p>
                {restaurant.cons.map((con, index) => (
                  <p key={index}>{con}</p>
                ))}
                {Object.entries(restaurant.attributes).map(
                  ([key, val], idx) => {
                    if (
                      restaurant.attributes !== null &&
                      key !== 'HasTV' &&
                      val === 'False' &&
                      idx < 15 &&
                      restaurant.cons.length < 2
                    ) {
                      var stringArray = key.match(/[A-Z][a-z]+/g);
                      var finalString = '';
                      for (var i = 0; i < stringArray.length; i++) {
                        finalString = finalString.concat(
                          ' ',
                          stringArray[i].toLowerCase()
                        );
                      }
                      return (
                        <p key={`con-${key}`} className="pro-body">
                          {'no '}
                          {finalString}
                        </p>
                      );
                    }

                    return <></>;
                  }
                )}
              </span>
              <span className="images-info">
                <div className="store-image">
                  <img src={BusinessIcon} alt="placeholder" />
                </div>
                <div className="store-image-2">
                  <img src={MetroIcon} alt="placeholder" />
                </div>
              </span>
              <span className="hours-info">
                {restaurant.hours !== null ? (
                  <>
                    <p className="pros-header hours-header">Hours</p>
                    {Object.keys(restaurant.hours).map((key, val) => {
                      let [a, b] = restaurant.hours[key].split('-');
                      a = a + '0';
                      b = b + '0';
                      return (
                        <>
                          <p className="hour-days">
                            {key}
                            {': '}
                          </p>
                          <p className="hour">
                            {a} {' - '} {b}
                          </p>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <p className="pros-header hours-header">No hours found</p>
                  </>
                )}
              </span>
            </div>
            <div className="additional-insights-section">
              {'Categories: '}
              {restaurant.categories}
            </div>
          </div>
        </div>
      </div>
      <button
        className="download-btn btn"
        onClick={handleCaptureImage}
        disabled={downloaded}
      >
        {downloaded === true ? (
          <span> ✓ Downloaded</span>
        ) : (
          <span>Download Image</span>
        )}
      </button>
    </div>
  );
}

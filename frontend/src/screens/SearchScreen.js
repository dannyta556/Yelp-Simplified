import React, { useEffect, useReducer, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import yelpIcon from '../images/yelp.png';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/esm/Stack';
import Rating from '../components/rating';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        restaurants: action.payload.restaurants,
        page: action.payload.page,
        pages: action.payload.pages,
        countRestaurants: action.payload.countRestaurants,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function SearchScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const query = sp.get('query') || 'all';
  const page = sp.get('page') || 1;

  const [{ loading, error, restaurants, pages, countRestaurants }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(querySearch ? `/search/?query=${querySearch}` : '/search');
  };

  const [querySearch, setQuerySearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/restaurants/search?page=${page}&query=${query}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: err,
        });
      }
    };
    fetchData();
  }, [page, query]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterQuery = filter.query || query;

    return `/serach?query=${filterQuery}&page=${filterPage}`;
  };

  return (
    <div>
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
                  onChange={(e) => setQuerySearch(e.target.value)}
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
      <div className="box">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="search-results-box">
            {restaurants.length === 0 ? (
              <MessageBox>No Restaurants Found</MessageBox>
            ) : (
              <Row>
                {restaurants.map((restaurant, index) => (
                  <Col sm={8} lg={6} className="mb-3" key={index}>
                    <Card key={index} className="restaurant-card" border="dark">
                      <Stack direction="vertical" gap={2}>
                        <Link to={`/restaurant/${restaurant.slug}`}>
                          <img
                            src={`/images/${restaurant.slug
                              .replace(/ /g, '_')
                              .replace(/["]/g, '')
                              .replace(/☆/g, '_')
                              .replace(/★/g, '_')
                              .replace(/α/g, 'a')
                              .replace(/☆/g, '_')
                              .replace(/[/]/g, '')
                              .replace(/:/g, '')}.jpg`}
                            className="card-img-top"
                            alt={restaurant.name}
                          />
                        </Link>
                        <Card.Body className="restaurant-card-body">
                          <Link
                            className="restaurant-card-title"
                            to={`/restaurant/${restaurant.slug}`}
                          >
                            <Card.Title className="restaurant-card-title">
                              {restaurant.name}
                            </Card.Title>
                            <Rating
                              rating={restaurant.rating}
                              numReviews={restaurant.numReviews}
                            />
                          </Link>
                        </Card.Body>
                      </Stack>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        )}
      </div>
      <div>
        <div>
          <div>{countRestaurants} results</div>
          {[...Array(pages).keys()].map((x) => (
            <LinkContainer
              key={x + 1}
              className="mx-1"
              to={{
                pathname: '/search',
                search: getFilterUrl({ page: x + 1 }).substring(7),
              }}
            >
              <Button
                className={Number(page) === x + 1 ? 'text-bold' : ''}
                variant="light"
              >
                {x + 1}
              </Button>
            </LinkContainer>
          ))}
        </div>
      </div>
    </div>
  );
}

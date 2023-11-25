import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import yelpIcon from '../images/yelp.png';

function HomeScreen() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
    <div className="App">
      <header className="main-header">
        <h1 className="title">
          Yelp Simplified <img src={yelpIcon} alt="yelp" />
        </h1>
        <div className="box">
          <Form className="search-box" onSubmit={submitHandler}>
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
              >
                Go
              </Button>
            </InputGroup>
          </Form>
        </div>
        <div className="box">
          <div className="info-box">
            <div className="info-header">
              Get a concise view of any restaurant
            </div>
            <div className="info-collection">
              <div className="info-panel">
                <div className="panel-header">Pros & Cons</div>
                <div className="panel-content">
                  A list of pros and cons will be generated from analysis of
                  user reviews. No need to read multiple reviews to understand
                  the consensus of any restaurant.
                </div>
              </div>
              <div className="info-panel">
                <div className="panel-header">Statistics</div>
                <div className="panel-content">
                  Useful statistics about a restaurant, such as average rating
                  of the restaurant compared to others of its type will be
                  calculated by the system.
                </div>
              </div>
              <div className="info-panel">
                <div className="panel-header">Visual Clarity</div>
                <div className="panel-content">
                  All important restaurant information is packed concisely and
                  clearly for users to read. (Phone Numbers, Addresses, Website,
                  Restaurant hours, etc).
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default HomeScreen;

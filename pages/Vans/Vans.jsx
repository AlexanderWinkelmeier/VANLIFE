import React from 'react';
import { Link, useSearchParams, useLoaderData } from 'react-router-dom';
import { getVans } from '../../api';

export function loader() {
  return getVans();
}

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get('type');

  const [error, setError] = React.useState(null);

  const vans = useLoaderData();

  const displayedVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  const vanElements = displayedVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link
        to={van.id}
        state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
      >
        <img src={van.imageUrl} alt={van.name} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-button">
        <button
          onClick={() => setSearchParams({ type: 'simple' })}
          className={` van-type simple ${
            typeFilter === 'simple' ? 'selected' : ''
          }`}
        >
          Simple
        </button>

        <button
          onClick={() => setSearchParams({ type: 'luxury' })}
          className={`van-type luxury ${
            typeFilter === 'luxury' ? 'selected' : ''
          }`}
        >
          Luxury
        </button>

        <button
          onClick={() => setSearchParams({ type: 'rugged' })}
          className={`van-type rugged ${
            typeFilter === 'rugged' ? 'selected' : ''
          }`}
        >
          Rugged
        </button>

        {typeFilter && (
          <button
            onClick={() => setSearchParams({})}
            className="van-type clear-filters"
          >
            Clear filters
          </button>
        )}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}

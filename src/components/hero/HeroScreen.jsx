import React, { useMemo } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { heroImages } from '../../helpers/heroImages'
import { getHeroById } from '../../selectors/getHeroById'

export const HeroScreen = () => {
  const { heroId } = useParams()
  const navigate = useNavigate()

  const hero = useMemo(() =>getHeroById(heroId) , [heroId])
  if (!hero) {
    return <Navigate to='/' />
  }
  const {
    characters,
    first_appearance,
    publisher,
    id,
    alter_ego,
    superhero
  } = hero
  const handleReturn = () => {
    navigate(-1)
  }
  return (
    <div className='row mt-5'>
      <div className='col-4'>
        <img 
        src={ heroImages(`./${heroId}.jpg`)}
        alt={superhero} 
        className="img-thumbnail animate__animated animate__fadeInLeft" />
      </div>
      <div className='col-8'>
        <h3> {superhero}</h3>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'> <b>Alter ego:</b> {alter_ego}</li>
          <li className='list-group-item'> <b>Publisher:</b> {publisher}</li>
          <li className='list-group-item'> <b>First Apperance:</b> {first_appearance}</li>
        </ul>
        <h5 className='mt-3'>Characters</h5>
        <p> {characters}</p>
        <button
          className='btn btn-outline-primary'
          onClick={handleReturn}
        >
          Return</button>
      </div>
    </div>

  )
}

import React, { useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { heroes } from '../../data/heroes'
import { useForm } from '../../hooks/useForm'
import { getHeroesByName } from '../../selectors/getHeroByName'
import { HeroCard } from '../hero/HeroCard'

export const SearchScreen = () => {
  const navigate = useNavigate()
  const {pathname, search} = useLocation()
  const { q = '' } = queryString.parse(search)
  localStorage.setItem('lastPath', pathname + search)
  const [formValues, handleInputChange] = useForm(
    { searchText: q }
  )
  const { searchText } = formValues
  const heroesFileted = useMemo(()=>getHeroesByName(q), [q])
  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`?q=${searchText}`)
  }
  return (
    <>
      <h1>Búsquedas</h1>
      <hr />
      <div className='row'>
        <div className='col-5'>
          <h4>Buscar</h4>
          <hr />
          <form onSubmit={handleSearch} >
            <input
              className='form-control'
              type="text"
              placeholder='Buscar un héroe'
              autoComplete='off'
              name='searchText'
              onChange={handleInputChange}
              value={searchText}
            />
            <div className='d-grid gap-2'>
              <button
                className='btn btn-outline-primary mt-2 btn-block'

              >buscar</button>

            </div>
          </form>
        </div>
        <div className='col-7'>
          <h4>Resultados</h4>
          <hr />
          {
            (q === '') ?
              <div className='alert alert-info'>Buscar un héroe</div>
              : (heroesFileted.length === 0) &&
              <div className='alert alert-danger'>No hay resultados: {q}</div>
          }

          {
            heroesFileted.map(hero => (
              <HeroCard 
                key={hero.id}
                {...hero}
              />
            ))
          }
        </div>
      </div>
    </>
  )
}

import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({match}) => {
//  console.log(match.path)
  return(
    <div className='row col-md-8 menu options'>
      <li className='col-4 option'>
        <div className='v-center'>
          <Link to='/quiz'>
            <img src="public/img/quiz.png" alt=""/>
            quiz
          </Link>
      </div>
      </li>
      <li className='col-4 option'>
        <div className='v-center'>
          <Link to='/games'>+</Link>
      </div>
    </li>
    </div>
  )
}

export default Home

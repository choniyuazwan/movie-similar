import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class MovieItem extends Component {
  render() {
    const { id, title, release_date, poster_path } = this.props.movie
    const urlImage = 'https://image.tmdb.org/t/p/w500'
    return (
      <>
          <div className='row align-items-center' style={{cursor:'pointer'}} onClick={() => {
            this.props.history.push({
              pathname: `/detail/${id}`
            })
          }}>
            <div className='col col-sm-2 col-md-2 col-lg-1 col-xl-1'>
              <div className='image-list d-flex m-2'>
                <img className='rounded mx-auto d-block' src={urlImage + poster_path} alt='movie'/>
              </div>
            </div>
            <div className='col col-sm-10 col-md-10 col-lg-11 col-xl-11' style={{padding: '5'}}>
              <b>{title}</b>  <br/>
              {release_date}
            </div>
          </div>
        <hr style={{margin:0}} />
      </>
    );
  }
}

export default withRouter(MovieItem);

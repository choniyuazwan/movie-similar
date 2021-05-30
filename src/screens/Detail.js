import React from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import Layout from '../components/Layout';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/movie';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      similar: []
    };
  }

  async componentDidMount() {
    this.loadData(this.props.match.params.id);
    window.addEventListener("popstate", () => {
      this.loadData(this.props.match.params.id);
    });
  }

  loadData = (id) => {
    const url = `/${id}?api_key=0367823daa53e69944b298dd8be277f4`;
    axios
      .get(url)
      .then((res) => {
        const result = res.data;
        this.setState({
          detail: result
        });
      })
      .catch((error) => {
        console.error(error);
      });

    const urlSimilar = `/${id}/similar?api_key=0367823daa53e69944b298dd8be277f4`;
    axios
      .get(urlSimilar)
      .then((res) => {
        const result = res.data.results;
        this.setState({
          similar: result
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { title, release_date, overview, vote_average, poster_path } = this.state.detail;
    const urlImage = 'https://image.tmdb.org/t/p/w500';
    return (
        <Layout>
          <article>
            <div className='row align-items-center'>
              <div className='col col-sm-5 col-md-4 col-lg-3 col-xl-2'>
                <div className='image-detail d-flex justify-content-start m-3'>
                  <img className='rounded mx-auto d-block' src={urlImage + poster_path} alt='movie'/>
                </div>
              </div>
              <div className='col col-sm-7 col-md-8 col-lg-9 col-xl-10' style={{padding: '25px'}}>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"><i>Release Date : </i>{release_date}</Card.Subtitle>
                <Card.Text>
                  {overview}
                </Card.Text>
                <Card.Text>
                  Rating : {vote_average}
                </Card.Text>
              </div>
            </div>

            <div className='container-fluid movie-app'>
              <div className='row d-flex align-items-center mt-4'>
                <div className='col'>
                  <h5>Similar Movies</h5>
                </div>
              </div>
              <div className='row'>
                {this.state.similar !== undefined && this.state.similar.map((movie, index) => (
                  <div className='image-container d-flex justify-content-start m-3' id={index} key={index}
                       onClick={() => {
                         this.props.history.push(`/detail/${movie.id}`)
                         this.loadData(movie.id);
                       }}>
                    <img className='rounded' src={urlImage + movie.poster_path} alt='movie'/>
                    <div className='overlay d-flex align-items-center justify-content-center'>
                      <span className='mr-2' style={{color: 'white'}}>{movie.title}</span>
                      <svg
                        width='1em'
                        height='1em'
                        viewBox='0 0 16 16'
                        className='bi bi-heart-fill'
                        fill='red'
                        xmlns='http://www.w3.org/2000/svg'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </Layout>
    );
  }
}

export default Detail;

import React from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Loading from '../assets/loading.gif';
import InfiniteScroll from 'react-infinite-scroller';
import { withRouter } from 'react-router-dom';
import JumbotronComponent from '../components/JumbotronComponent';
import MovieItem from '../components/MovieItem';
import Layout from '../components/Layout';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/movie';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      movies: [],
      page: 1,
      search: '',
      isMax: false,
      isLoadingLoad: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const { page, movies } = this.state;
    const url = `/now_playing?api_key=0367823daa53e69944b298dd8be277f4&page=${page}`;
    axios
      .get(url)
      .then((res) => {
        let result = res.data.results;
        setTimeout(() => {
          this.setState({
            movies: movies.concat(result),
            page: page + 1,
            isMax: result.length === 0,
            isLoading: false,
            isLoadingLoad: false,
          });
        }, 2000)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { movies, isMax, isLoading, isLoadingLoad } = this.state;
    return (
      <Layout>
        <Container>
          <JumbotronComponent />
          {movies.length === 0 && !isLoading ? (
            'Maaf, Data yang anda cari belum tersedia'
          ) : (
            <InfiniteScroll
              initialLoad={false}
              loadMore={!isMax ? this.loadData : null}
              hasMore={!isMax}
              loader={!isLoadingLoad && !isLoading ? <img src={Loading} alt="loading" key={0} />
                : ''}
            >
              {isLoading ? (
                <img src={Loading} alt="loading" />
              ) : (
                <>
                  {this.state.movies.map((movie) => (
                    <div key={movie.id}>
                      <MovieItem movie={movie} />
                    </div>
                  ))}
                </>
              )}
            </InfiniteScroll>
          )}
        </Container>
      </Layout>
    );
  }
}

export default withRouter(Home);

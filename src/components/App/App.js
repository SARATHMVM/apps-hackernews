import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import List from 'components/List';
import Loader from 'components/Loader';
import { colorsDark } from 'styles/palette';

import { Wrapper, Title } from './styles';

class App extends Component {
  componentDidMount() {
    this.props.fetchStoriesFirstPage();
  }

  fetchStories = () => {
    const { storyIds, page, fetchStories, isFetching } = this.props;
    if (!isFetching) {
      fetchStories({ storyIds, page });
    }
  };

  render() {
    const { stories, hasMoreStores } = this.props;
    return (
      <ThemeProvider theme={colorsDark}>
        <div>
          <Wrapper>
            <Title>Hacker News Reader <a href='https://news.ycombinator.com/front'> top </a> <span> | </span><a href='https://news.ycombinator.com/newest'>new</a></Title>
            <InfiniteScroll
              dataLength={stories.length}
              next={this.fetchStories}
              hasMore={hasMoreStores}
              loader={<Loader />}
              style={{
                height: '100%',
                overflow: 'visible',
              }}
            >
              <List stories={stories} />
            </InfiniteScroll>
          </Wrapper>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;

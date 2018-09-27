import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import AudioContainer from './AudioContainer/AudioContainer';

import styles from './List.module.styl';

export default class List extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    audio: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    uiState: PropTypes.object.isRequired,
    setPage: PropTypes.func.isRequired,
    pickAudio: PropTypes.func.isRequired,
  };

  scrollList = () => {
    const { list, setPage, uiState } = this.props;
    if (list.hasNextPage && !uiState.isFetchingList &&
      this.list.scrollHeight - this.list.scrollTop === this.list.clientHeight) {
      setPage();
    }
  };

  render() {
    const { user, audio, list, uiState, pickAudio } = this.props;
    const containerClassName = cx(styles.container, {
      [styles.fetching]: uiState.isFetchingList
    });

    return (
      <div className={containerClassName} onScroll={this.scrollList} ref={node => (this.list = node)}>
        <div className={styles.content}>
          {list.items.length > 0 &&
          list.items.map((item, i) =>
            <AudioContainer
              key={`${item.id}++${i}`}
              user={user}
              item={item}
              active={audio}
              onPickAudio={pickAudio}
            />)}
          {!uiState.isFetchingList && !uiState.isFetchingUser && list.items.length < 1 &&
          <div className={styles.empty}>Не найдено ни одной аудиозаписи</div>}
        </div>
        <div className={styles.loader_wrapper}>
          <div className={styles.loader} />
        </div>
      </div>
    );
  }
}

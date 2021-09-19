import React from 'react';
import Field from '../Field';
import useMinesGame from '../../hooks/useMinesGame';
import {GameState, Settings} from '../../types';

import style from './style.module.css';

export default function Game() {
  const {
    fields,
    formattedTimer,
    gameState,
    freeFlagsCount,
    play,
    continuePlaying,
    pause,
    openField,
    setFlag,
    deleteFlag,
  } = useMinesGame();

  // Button labels getters
  function getPlayButtonLabel(): string {
    switch (gameState) {
      case GameState.Idle:
        return 'Play';
      default:
        return 'Play again';
    }
  }

  function getPauseButtonLabel(): string {
    switch (gameState) {
      case GameState.Pause:
        return 'Continue';
      default:
        return 'Pause';
    }
  }

  // Event handlers
  function handlePlayButtonClick(): void {
    play();
  }

  function handlePauseButtonClick() {
    if (gameState === GameState.Pause) {
      continuePlaying();
    } else {
      pause();
    }
  }

  return (
    <div className={style.Game}>
      <section className={style.fields}>
        {fields.map((field) => (
          <Field
            key={field.id}
            field={field}
            gameState={gameState}
            onOpen={openField}
            onSetFlag={setFlag}
            onDeleteFlag={deleteFlag}
          />
        ))}
      </section>
      <aside className={style.aside}>
        <div className={style.stats}>
          <p>Time: {formattedTimer}</p>
          <p>
            Flags: {freeFlagsCount}/{Settings.BombsCount}
          </p>
        </div>
        <div className={style.buttonWrapper}>
          {gameState === GameState.Playing || (
            <button className={style.button} onClick={handlePlayButtonClick}>
              {getPlayButtonLabel()}
            </button>
          )}
          {(gameState === GameState.Playing || gameState === GameState.Pause) && (
            <button className={style.button} onClick={handlePauseButtonClick}>
              {getPauseButtonLabel()}
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}

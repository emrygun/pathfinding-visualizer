import React, { useState, useEffect } from 'react';

import { Table } from './table/Table';
import './visualizer.scss';

export const Visualizer = () => {
    const [DrawMode, setDrawMode] = useState(0);

    useEffect(() => {
    }, [])
    return (
        <div className="visualizer-container">
            <div className="options-container">
                <Navbar />
                <DrawModeSelect 
                    DrawMode={DrawMode}
                    setDrawMode={setDrawMode}
                />
            </div>
            <Table DrawMode={DrawMode}/>
        </div>
    );
}

const DrawModeSelect = ({DrawMode, setDrawMode}) => {
    return (
      <div className="DrawModeSelect-container columns">
        <div className="buttons column">
            <button class="button is-small is-success is-outlined"
                onClick={() => setDrawMode(1)}>Start</button>
            <button class="button is-small is-danger is-outlined"
                onClick={() => setDrawMode(2)}>Goal</button>
            <button class="button is-small is-dark is-outlined"
                onClick={() => setDrawMode(0)}>Wall</button>
        </div>
        <div class="is-divider-vertical" data-content="OR"></div>
        <div className="buttons column">
            <button class="button is-small is-dark is-outlined"
                onClick={() => setDrawMode(0)}>Run Simulation</button>
            <button class="button is-small is-dark is-outlined"
                onClick={() => setDrawMode(0)}>Select Algorithm</button>
        </div>
        <div className="algoSelector">
        </div>
      </div>
    );
}

const Navbar = () => {
    return (
        <div class="bd-example is-paddingless">
          <nav class="navbar is-light">
            <div class="navbar-brand">
              <a class="navbar-item" href="https://bulma.io">
                <img
                  src="https://bulma.io/images/bulma-logo.png"
                  alt="Bulma: a modern CSS framework based on Flexbox"
                  width="112"
                  height="28"
                />
              </a>
              <div
                class="navbar-burger"
                data-target="navMenuColorlight-example"
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <div id="navMenuColorlight-example" class="navbar-menu">
              <div class="navbar-start">
                <a class="navbar-item" href="https://bulma.io/">
                  Home
                </a>
                <div class="navbar-item has-dropdown is-hoverable">
                  <a
                    class="navbar-link"
                    href="https://bulma.io/documentation/overview/start/"
                  >
                    Docs
                  </a>
                  <div class="navbar-dropdown">
                    <a
                      class="navbar-item"
                      href="https://bulma.io/documentation/overview/start/"
                    >
                      Overview
                    </a>
                    <a
                      class="navbar-item"
                      href="https://bulma.io/documentation/overview/modifiers/"
                    >
                      Modifiers
                    </a>
                  </div>
                </div>
              </div>

              <div class="navbar-end">
                <div class="navbar-item">
                  <div class="field is-grouped">
                    <p class="control">
                    </p>
                    <p class="control">
                      <a
                        class="button is-primary"
                        href="https://github.com/jgthms/bulma/releases/download/0.9.2/bulma-0.9.2.zip"
                      >
                        <span class="icon">
                          <i class="fas fa-download"></i>
                        </span>
                        <span>Download</span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
    )
}

/*
 * Copyright ©2019 Dan Grossman.  All rights reserved.  Permission is
 * hereby granted to students registered for University of Washington
 * CSE 331 for use solely during Autumn Quarter 2019 for purposes of
 * the course.  No other use, copying, distribution, or modification
 * is permitted without prior written consent. Copyrights for
 * third-party components of this work must be honored.  Instructors
 * interested in reusing these course materials should contact the
 * author.
 */

import React, {Component} from 'react';
import EdgeList from "./EdgeList";
import Grid from "./Grid";
import GridSizePicker from "./GridSizePicker";

// Allows us to write CSS styles inside App.css, any any styles will apply to all components inside <App />
import "./App.css";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gridSize: 0,  // The number of points in the grid
            edges: "", // The user's raw input of edges
            edgeArray: [] // an array that represents the input edges
        };
    }

    updateGridSize = (input) => {
        // Every event handler with JS can optionally take a single parameter that
        // is an "event" object - contains information about an event. For mouse clicks,
        // it'll tell you thinks like what x/y coordinates the click was at. For text
        // box updates, it'll tell you the new contents of the text box, like we're using
        // below:
        this.setState({
            gridSize: parseInt(input)
        });
    };

    updateEdgeInput = (event) => {
        // get the user's input of edges to draw
        this.setState({
            edges: event.target.value
        });
    };

    // a callback function from app's child EdgeList
    updateEdgeArray = (array) => {
        // get the array of edges parsed by EdgeList
        this.setState({
            edgeArray: array
        });
    };

    clearButton = () => {
        // set the edgeArray to empty when the user clears the edges
        this.setState({
            edgeArray: []
        });
    };

    render() {
        const canvas_size = 500;
        return (
            <div>
                <p id="app-title">Connect the Dots!</p>
                <GridSizePicker value={this.state.gridSize} onChange={this.updateGridSize}/>
                <Grid size={this.state.gridSize} width={canvas_size} height={canvas_size}
                      edgeArray={this.state.edgeArray}/>
                <EdgeList value={this.state.edges} onChange={this.updateEdgeInput}
                          updateEdgeArray={this.updateEdgeArray}
                          clearButton={this.clearButton}/>
            </div>
        );
    }
}

export default App;
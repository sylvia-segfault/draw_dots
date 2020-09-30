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

/*
 * A Textfield that allows the user to enter the list of edges.
 * Also contains the buttons that the user will use to interact with the app.
 */

import React, {Component} from 'react';

/**
 * Props:
 *
 * onChange - a listener for when the edge text area has a keyboard event
 * value - the value to display in the text area
 */
class EdgeList extends Component {

    parseEdgeInput = () => {
        let edges = this.props.value; // get the raw string of edges from the user
        let line = edges.split('\n'); // split by new lines
        let countLine = 0; // count the line number of the user's input
        let temp = []; // an array which stores the user's input edges
        for (let i = 0; i < line.length; i++) {
            countLine++;
            let chunkOfEdges = line[i].split(' '); // split each line by spaces
            // If the first element is an empty string, that means we don't need to parse
            // this line. We immediately know that this line of input is not valid
            if (chunkOfEdges[0] !== "") {
                // make sure that we have from grid point, to grid point, and a color.
                // After each line being spitted by spaces, we know that the user's input
                // is invalid if we don't have at least 3 elements. If this is the case, alert
                // the user.
                if (chunkOfEdges.length < 3) {
                    alert("There was an error with some of your line input.\nFor reference, " +
                        "the correct form for each line is: x1,y1 x2,y2 color");
                } else {
                    let edge = {
                        // get x1 by splitting by "," of the first chunk
                        x1: chunkOfEdges[0].split(',')[0],
                        // get y1 by splitting by "," of the first chunk
                        y1: chunkOfEdges[0].split(',')[1],
                        // get x2 by splitting by "," of the second chunk
                        x2: chunkOfEdges[1].split(',')[0],
                        // get y2 by splitting by "," of the second chunk
                        y2: chunkOfEdges[1].split(',')[1],
                        // get color by getting the third chunk of this array
                        color: chunkOfEdges[2]
                    };
                    // Alert the user if their input grid points exceed the grid size
                    if (edge.x1 >= this.props.size || edge.y1 >= this.props.size ||
                        edge.x2 >= this.props.size || edge.y2 >= this.props.size) {
                        alert("Line " + countLine + ": Cannot draw edges, grid point cannot " +
                            "exceed the grid size.")
                        // Alert the user if their input has an extra portion of the line or an extra space
                    } else if (edge.x1 === "" || edge.y1 === "" || edge.x2 === "" ||
                        edge.y2 === "") {
                        alert("There was an error with some of your line input.\n For reference," +
                            "the correct form for each line is: x1,y1 x2,y2 color \n\n"
                            + "Line " + countLine + ": Extra portion of the line, or an extra space")
                        // Alert the user if their input grid points are negative
                    } else if (edge.x1 < 0 || edge.y1 < 0 || edge.x2 < 0 || edge.y2 < 0) {
                        alert("Line " + countLine + ": Grid points shouldn't be negative")
                        // Alert the user if their input grid points are not integer values
                    } else if (!Number.isInteger(Number(edge.x1)) || !Number.isInteger(Number(edge.y1))
                        || !Number.isInteger(Number(edge.x2)) || !Number.isInteger(Number(edge.y2))) {
                        alert("Line " + countLine + ": Grid points have to be integer values")
                        // Otherwise save this edge object to our edge array
                    } else {
                        temp.push(edge)
                    }
                }
            }
        }
        // a callback function to send the edge array to its parent App
        this.props.updateEdgeArray(temp)
    };

    render() {
        return (
            <div id="edge-list">
                Edges <br/>
                <textarea
                    rows={5}
                    cols={30}
                    onChange={this.props.onChange}
                    value={this.props.value}
                /> <br/>
                <button onClick={this.parseEdgeInput}>Draw
                </button>
                <button onClick={this.props.clearButton}>Clear
                </button>
            </div>
        );
    }
}

export default EdgeList;
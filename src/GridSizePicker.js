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

/* A simple TextField that only allows numerical input */

import React, {Component} from 'react';

/**
 * Props:
 *
 * onChange - a listener for when the size text area has a keyboard event
 * value - the value to display in the text area
 */
class GridSizePicker extends Component {

    // input validation for user's input of grid size
    inputValidation = (event) => {
        let input = event.target.value; // get the user's input
        // Alert the user if the input grid size is not in between 0-200
        if (input < 0 || input > 200) {
            alert("invalid input! The range should be from 0 to 200")
            // otherwise, get the user's input and sent it to its parent App so that
            // the App component can update its state gridSize and reflect the changes.
        } else {
            this.props.onChange(input);
        }
    };

    render() {
        return (
            <div id="grid-size-picker">
                <label>
                    Grid Size:
                    <input
                        value={this.props.size}
                        onChange={this.inputValidation}
                        type="number"
                        min={0}
                        max={200}
                    />
                </label>
            </div>
        );
    }
}

export default GridSizePicker;
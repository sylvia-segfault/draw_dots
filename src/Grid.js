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

/* A simple grid with a variable size */
/* Most of the assignment involves changes to this class */

import React, {Component} from 'react';

/**
 * Props:
 *
 * width - the desired width of the grid area
 * height - the desired height of the grid area
 * size - the number of points along a single axis in the grid
 */
class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundImage: null  // An image object to render into the canvas.
        };
        this.canvasReference = React.createRef();
    }

    componentDidMount() {
        // Since we're saving the image in the state and re-using it any time we
        // redraw the canvas, we only need to load it once, when our component first mounts.
        this.fetchAndSaveImage();
        this.redraw();
    }

    componentDidUpdate() {
        this.redraw()
    }

    fetchAndSaveImage() {
        // Creates an Image object, and sets a callback function
        // for when the image is done loading (it might take a while).
        let background = new Image();
        background.onload = () => {
            let newState = {
                backgroundImage: background
            };
            this.setState(newState);
        };
        // Once our callback is set up, we tell the image what file it should
        // load from. This also triggers the loading process.
        background.src = "./image.jpg";
    }

    redraw = () => {
        let ctx = this.canvasReference.current.getContext('2d');
        ctx.clearRect(0, 0, this.props.width, this.props.height);
        // Once the image is done loading, it'll be saved inside our state.
        // Otherwise, we can't draw the image, so skip it.
        if (this.state.backgroundImage !== null) {
            ctx.drawImage(this.state.backgroundImage, 0, 0);
        }
        // Draw all the dots.
        let coordinates = this.getCoordinates();
        for (let coordinate of coordinates) {
            this.drawCircle(ctx, coordinate);
        }
        // Draw all the edges
        let distance = this.props.width / (this.props.size + 1);
        for (let chunkOfEdge of this.props.edgeArray) {
            this.drawEdge(ctx, chunkOfEdge, distance);
        }
    };

    getCoordinates = () => {
        const result = []; // an array to save the results of all the grid points
        let gridSize = this.props.size; // the grid size
        // the chunk of distance that is evenly divided
        let distance = this.props.width / (gridSize + 1);
        for (let i = 1; i <= gridSize; i++) {
            for (let j = 1; j <= gridSize; j++) {
                result.push([i * distance, j * distance]); // push each grid point onto the array
            }
        }
        return result;
    };

    drawCircle = (ctx, coordinate) => {
        ctx.fillStyle = "white";
        // Generally use a radius of 4, but when there are lots of dots on the grid (> 50)
        // we slowly scale the radius down so they'll all fit next to each other.
        let radius = Math.min(4, 100 / this.props.size);
        ctx.beginPath();
        ctx.arc(coordinate[0], coordinate[1], radius, 0, 2 * Math.PI);
        ctx.fill();
    };

    drawEdge = (ctx, segment, distance) => {
        ctx.beginPath(); // begin a path
        ctx.strokeStyle = segment.color; // specify the color of the brush
        ctx.lineWidth = 2; // specify the line width
        // define a point (x1, y1)
        ctx.moveTo(segment.x1 * distance + distance, segment.y1 * distance + distance);
        // define a line from the last specified point(x1, y1) to (x2, y2)
        ctx.lineTo(segment.x2 * distance + distance, segment.y2 * distance + distance);
        ctx.stroke(); // draw the defined line
        ctx.closePath(); // close the path
    };

    render() {
        // This takes care of the case when the user clears the input for grid size,
        // Current Grid Size below the image should indicate that grid size is 0 in that case.
        let showVal = this.props.size;
        if (isNaN(showVal)) {
            showVal = "0";
        }
        return (
            <div id="grid">
                <canvas ref={this.canvasReference} width={this.props.width} height={this.props.height}/>
                <p>Current Grid Size: {showVal} </p>
            </div>
        );
    }
}

export default Grid;
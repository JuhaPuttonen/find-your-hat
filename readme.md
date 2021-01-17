# Find Your Hat

## Table of contents

* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info

This is a solution to the CodeCademy project 'Find Your Hat'. At runtime it displays the game field and prompts the user for direction in which to move the hero, represented by a '@'. The valid inputs are 'u', 'd', 'l', and 'r'. The goal is to reach the hat, represented by a '^'. The game
ends also if the hero moves out of the game field or falls down a hole, represented by 'o'.
The game can be started in either normal or hard mode. In normal mode, the game field stays constant except for player movements. In hard mode, one new hole is
created in the empty field tiles during each turn.

## Technologies

This program is written in Javascript.

## Setup

To run the program, use node. You can activate hard mode through a command line argument. Example command and output:

``` sh
$ node main.js --hard
@░░░░░░░░░
░░^░OO░░░░
░░░░░░░OO░
░O░░O░O░O░
░░░░OO░░O░
░░░░░OO░░░
░░░░░░O░░░
░O░O░░░░░░
░░░░░░O░░░
░░O░░░░░OO
Which way?
```

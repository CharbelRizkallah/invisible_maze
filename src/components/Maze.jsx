import React, { useEffect, useRef, useState } from 'react'
import mazes from './mazes.json';
import Celebrate from '../imgs/celebrate.gif';

const Maze = () => {

    const [won, setWon] = useState(false);
    const input = useRef(null);
    const messageContainer = useRef(null);
    const [maze, setMaze] = useState([]);
    const [place, setPlace] = useState({i:0, j:0});
    useEffect(() => {
        setMaze(mazes[Math.floor(Math.random() * mazes.length)]);
    }, [])
    
    const getData = (e) => {
        e.preventDefault();
        var direction = input.current.value.toLowerCase().trim();  
        // console.log(direction)
        movePlayer(direction);
        input.current.value = '';
    }

    const movePlayer = (direction) => {
        if(won){
            return;
        }
        const TOP = 0;
        const RGT = 1;
        const BTM = 2;
        const LFT = 3;
        var rows = 5;
        // if(direction==='test'){
        //     writeDiv("You won!");
        //     setWon(true);
        // }
        if(direction === 'up'){
            if(!maze[place.j*rows+place.i].walls[TOP]){
                writeDiv("You moved up!");
                if(place.i === maze[maze.length-1].i && place.j-1 === maze[maze.length-1].j){
                    writeDiv("You won!");
                    setWon(true);
                    writeDiv("whitespace");
                }
                setPlace({i: place.i, j: place.j-1});

            }else{
                writeDiv("You tried to move up, there is a wall!");
            }

        }else if(direction === 'down'){
            if(!maze[place.j*rows+place.i].walls[BTM]){
                writeDiv("You moved down!");
                if(place.i === maze[maze.length-1].i && place.j+1 === maze[maze.length-1].j){
                    writeDiv("You won!");
                    setWon(true);
                    writeDiv("whitespace");
                }
                setPlace({i: place.i, j: place.j+1});
                
            }else{
                writeDiv("You tried to move down, there is a wall!");
            }

        }else if(direction === 'right'){
            if(!maze[place.j*rows+place.i].walls[RGT]){
                writeDiv("You moved right!");
                if(place.i+1 === maze[maze.length-1].i && place.j === maze[maze.length-1].j){
                    writeDiv("You won!");
                    setWon(true);
                    writeDiv("whitespace");
                }
                setPlace({i: place.i+1, j: place.j});
                
            }else{
                writeDiv("You tried to move right, there is a wall!");
            }

        }else if (direction === 'left'){
            if(!maze[place.j*rows+place.i].walls[LFT]){
                writeDiv("You moved left!");
                if(place.i-1 === maze[maze.length-1].i && place.j === maze[maze.length-1].j){
                    writeDiv("You won!");
                    setWon(true);
                    writeDiv("whitespace");
                }
                setPlace({i: place.i-1, j: place.j});
                
            }else{
                writeDiv("You tried to move left, there is a wall!");
            }

        }
    }

    const writeDiv = (message) => {
        var div = document.createElement('div');
        if(message === 'You won!'){
            div.innerHTML = `<p>${message}</p>`;
            var elem = document.createElement("img");
            elem.src = Celebrate;
            elem.className='w-[50px]'
            elem.setAttribute("alt", "Yay!");
            div.appendChild(elem);
            div.className = 'm-2';
            
        }else if(message === "whitespace"){
            div.className ='m-2 p-5';
        }else{
            div.innerHTML = `<p>${message}</p>`;
            div.className = 'm-2';
        }
        messageContainer.current.appendChild(div);
        messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
    }


  return (
    <div>
        <div className='m-5'>
            <h1 className='text-5xl text-center font-semibold text-cSix'>INVISIBLE MAZE</h1>
        </div>
        <div className='md:grid md:grid-cols-4 md:gap-4'>
            <div className='hidden md:block m-auto text-center text-cFour my-5'>
                <h1 className='text-xl mb-3 mx-5'> HOW TO PLAY</h1>
                <p className='mx-5'>{"You have to get out of the maze, to move you type up, down, left or right, if you can not go that way, the website will tell you there is a wall, if you can, it will say you went [direction you put in]. Tip: The maze is a 5x5 grid."}
                </p>
            </div>
            <div ref={messageContainer} className='overflow-y-scroll m-auto bg-cTwo border col-span-2 border-4 border-cFive w-5/6 md:w-full h-[300px] rounded-lg'>
                
            </div>
        </div>
        <div className='flex justify-center m-3'>
            <form className='w-3/4 md:w-1/2 flex'>
                <input className='bg-cTwo px-2 border border-4 border-cFive rounded-full focus:outline-none text-cSix font-bold w-full h-[40px]' type="text" ref={input}/>
                <button className='bg-cThree rounded-full px-3 py-2 text-cOne' onClick={getData}>Submit</button>
            </form>
        </div>
        <div className='md:hidden m-auto text-center text-cFour my-5'>
                <h1 className='text-xl mb-3 mx-5'> HOW TO PLAY</h1>
                <p className='mx-5'>{"You have to get out of the maze, to move you type up, down, left or right, if you can not go that way, the website will tell you there is a wall, if you can, it will say you went [direction you put in]. Tip: The maze is a 5x5 grid."}
                </p>
        </div>
    </div>
  )
}

export default Maze
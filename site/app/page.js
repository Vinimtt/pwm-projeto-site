"use client";
import { useState, useEffect } from 'react';
import Parse from './services/parse.js';
import NavBar from './components/navBar.js';

const Page = () => {


    return (
        <div>
            <NavBar />
            <div>
                {/* API dos preços mais recentes */}
            </div>
        </div>
    );

}

export default Page
import fetch from 'node-fetch';
import React, { useState } from 'react';

export default function Home({ address }) {
    const [summary, setSummary] = useState("");

    async function getHarpie(address) {
        setSummary(data);
    }
    return (
        <>{data}</>
    )};  
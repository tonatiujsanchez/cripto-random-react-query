import { useState, useEffect } from 'react'
import './App.css'


const getRandomNumberFromApi = async():Promise<number> => {
    const resp = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new')
    const numberString = await resp.text()
    return +numberString
}

export const App = () => {

    const [number, setNumber] = useState<number>()

    useEffect(() => {
        getRandomNumberFromApi()
            .then( num => setNumber(num))
    }, [])


    return (
        <>
            <div>
                <h1>Numero aleatorio:{number}</h1>
            </div>

        </>
    )
}



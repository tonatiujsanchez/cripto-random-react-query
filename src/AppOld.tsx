import { useState, useEffect, useReducer } from 'react'
import './App.css'


const getRandomNumberFromApi = async():Promise<number> => {
    const resp = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new')
    const numberString = await resp.text()

    // throw new Error('Hubo un error!!')
    return +numberString
}

export const App = () => {

    const [number, setNumber] = useState<number>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>()

    const [key, forceRefetch] = useReducer( (x:number) => x+1, 0)

    useEffect(() => {
        setIsLoading(true)
        getRandomNumberFromApi()
            .then( num => setNumber(num))
            .catch( error => setError(error.message) )
    }, [key])

    useEffect(() => {
        if( number ) setIsLoading(false)
    }, [number])
    
    useEffect(() => {
        if( error ) setIsLoading(false)   
    }, [ error ])
    


    return (
        <>
            <div>
                { isLoading
                    ? <p>Cargando...</p> 
                    : !error && <h1>Numero aleatorio:{number}</h1>
                }
                
                {
                    !isLoading && error && (
                        <p>{ error }</p>
                    )

                }
                <button onClick={ forceRefetch } disabled={ isLoading }>
                    { isLoading ? '...' : 'Reload' }
                </button>
            </div>

        </>
    )
}



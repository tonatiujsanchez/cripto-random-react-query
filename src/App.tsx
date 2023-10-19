import { useQuery } from '@tanstack/react-query'
import './App.css'


const getRandomNumberFromApi = async():Promise<number> => {
    const resp = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new')
    const numberString = await resp.text()

    // throw new Error('Hubo un error!!')
    return +numberString
}

export const App = () => {

    const query = useQuery({
        queryKey: ['randomNumber'],
        queryFn : getRandomNumberFromApi
    }
    )


    return (
        <>
            <div>
                { query.isFetching
                    ? <p>Cargando...</p> 
                    : !query.isError && <h1>Número aleatorio:{ query.data }</h1>
                }
                
                {
                    !query.isLoading && query.isError && (
                        <p>{`${query.error}`}</p>
                    )

                }
                <button onClick={ ()=> query.refetch() } disabled={ query.isFetching }>
                    { query.isFetching ? '...' : 'Reload' }
                </button>
            </div>

        </>
    )
}



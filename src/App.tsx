import { useRandom } from './hooks'
import './App.css'


export const App = () => {

    const { query } = useRandom()

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



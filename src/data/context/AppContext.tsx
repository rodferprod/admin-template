import { createContext, useEffect, useState } from "react";

// Aqui estamos definindo dois tipos possíveis de tema
// claro ou escuro. "dark" é a classe que o Tailwind usa
// para ativar todos os estilos precedidos com "dark:<estilo>"
// type Tema = 'dark' | '' // tema?: Tema  // useState<Tema>({})

// Podemos disponibilizar itens para toda aplicação:
// 1) Uma variável "tema" com a classe CSS a ser aplicada no Layout da aplicação
// 2) Uma função "alternarTema" para poder trocar o tema configurado na aplicação 
interface AppContextProps {
    tema?: string
    alternarTema?: () => void
}

const AppContext = createContext<AppContextProps>({})

export function AppProvider(props: any) {
    // Controla o tema do site e "dark" é o valor inicial
    const [tema, setTema] = useState('dark')

    // Altera e persiste o tema selecionado
    function alternarTema(){
        const novoTema = tema === '' ? 'dark' : ''
        setTema(novoTema)
        localStorage.setItem('tema', novoTema)
    }

    // Executar no primeiro acesso e refreshs
    useEffect(() => {
        const temaSalvo = localStorage.getItem('tema')
        setTema(`${temaSalvo}`)
    }, [])

    return (
        <AppContext.Provider
            value={{
                tema,
                alternarTema
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext

// export const AppConsumer = AppContext.Consumer


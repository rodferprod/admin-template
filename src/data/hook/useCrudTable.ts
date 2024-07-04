import { useState } from "react";

export default function useCrudTable(){
    const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')

    const exibirFormulario = () => setVisivel('form')
    const exibirListagem = () => setVisivel('tabela')

    return {
        formularioVisivel: visivel === 'form',
        listagemVisivel: visivel === 'tabela',
        exibirListagem,
        exibirFormulario
    }    
}
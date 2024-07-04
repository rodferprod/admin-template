import { useState } from "react";
import Input from "./Input";
import Cliente from "@/core/Cliente";
import BotaoAcao from "./BotaoAcao";

interface FormularioPros {
    cliente: Cliente
    salvandoCliente?: (cliente: Cliente) => void
    cancelarAcao?: () => void
}

export default function Formulario(props: FormularioPros) {
    
    const id = props.cliente?.id
    const [nome, setNome] = useState(props.cliente?.nome ?? '')
    const [idade, setIdade] = useState(props.cliente?.idade ?? 0)

    console.log('Formulario:', props)

    return (
        <div className={`flex flex-col`}>
            {id ? (
                <Input
                    texto="Código"
                    valor={id}
                    somenteLeitura
                    className="mb-5" />
            ) : false}
            <Input
                texto="Nome"
                valor={nome}
                onChange={setNome}
                className="mb-5" />
            <Input
                texto="Idade"
                tipo="number"
                valor={idade}
                onChange={setIdade} />
            <div
                className="flex justify-end gap-3 pt-5">
                <BotaoAcao cor="blue"
                    onClick={() => props.salvandoCliente?.(new Cliente(id, nome, +idade))}>
                    {id ? 'Alterar' : 'Salvar'}
                </BotaoAcao>
                <BotaoAcao
                    onClick={props?.cancelarAcao}
                    cor="red">
                    Cancelar
                </BotaoAcao>
            </div>
        </div>
    )
}
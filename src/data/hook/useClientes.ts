import Cliente from "@/core/Cliente"
import ClienteRepositorio from "@/core/ClienteRepositorio"
import TabelaCliente from "@/firebase/db/TabelaCliente"
import { useEffect, useState } from "react"
import useCrudTable from "./useCrudTable"

export default function useClientes() {
    /* const clientes = [
        new Cliente('1', 'Ana', 23),
        new Cliente('2', 'Roger', 41),
        new Cliente('1', 'Tereza', 56)
    ] */
    const repo: ClienteRepositorio = new TabelaCliente()

    const { formularioVisivel,
            listagemVisivel,
            exibirListagem,
            exibirFormulario
    } = useCrudTable()
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())

    useEffect(listar, [])

    function listar() {
        repo.listar().then(clientes => {
            setClientes(clientes)
            exibirListagem()
        })
    }

    function editarCliente(cliente: Cliente) {
        //console.log('Editar cliente ' + cliente.nome)
        setCliente(cliente)
        exibirFormulario()
    }

    async function excluirCliente(cliente: Cliente) {
        //console.log('Excluir cliente ' + cliente.nome)
        await repo.excluir(cliente)
        listar()
    }

    async function salvandoCliente(cliente: Cliente) {
        //console.log('salvandoCliente:', cliente)
        await repo.salvar(cliente)
        listar()
    }

    function novoCliente() {
        //console.log('novoCliente')
        setCliente(Cliente.vazio)
        exibirFormulario()
    }

    return {
        listagemVisivel,
        exibirListagem,
        cliente,
        clientes,
        editarCliente,
        excluirCliente,
        salvandoCliente,
        novoCliente
    }
}
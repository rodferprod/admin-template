import BotaoAcao from "@/components/template/BotaoAcao";
import Formulario from "@/components/template/Formulario";
import Layout from "@/components/template/Layout";
import Tabela from "@/components/template/Tabela";
import useClientes from "@/data/hook/useClientes";

export default function Clientes() {

    const {
        exibirListagem,
        listagemVisivel,
        cliente,
        clientes,
        editarCliente,
        excluirCliente,
        salvandoCliente,
        novoCliente
    } = useClientes()

    return (
        <Layout
            titulo="Clientes"
            subtitulo="Manutenção de clientes"
        >
            {listagemVisivel ?
                (<>
                    <div className="flex justify-end">
                        <BotaoAcao
                            cor="blue"
                            className="mb-4"
                            onClick={novoCliente}>
                            Novo Cliente
                        </BotaoAcao>
                    </div>
                    <Tabela
                        clientes={clientes}
                        editarCliente={editarCliente}
                        excluirCliente={excluirCliente} />
                </>) : (
                    <Formulario
                        salvandoCliente={salvandoCliente}
                        cancelarAcao={exibirListagem}
                        cliente={cliente} />
                )}
        </Layout>
    )
}
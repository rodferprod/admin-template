import Cliente from "@/core/Cliente"
import { IconEdit, IconRemove } from "../icons"

// Funções de editar e excluir usuário são opcionais
interface TabelaProps {
    clientes: Cliente[]
    editarCliente?: (cliente: Cliente) => void
    excluirCliente?: (cliente: Cliente) => void
}

export default function Tabela(props: TabelaProps) {

    // Apenas vou exibir os botões de ação se as funções forem passadas para o componente
    const exibirAcoes = props.editarCliente || props.excluirCliente
    
    function renderTableHeader(){
        return  <tr>
                    <th className="text-left p-4">Código</th>
                    <th className="text-left p-4">Nome</th>
                    <th className="text-left p-4">Idade</th>
                    {exibirAcoes && <th className="p-4">Ações</th>}
                </tr>
    }
    
    function renderData(){
        return props.clientes?.map((cliente, i) => {
            return (
                <tr key={i}
                    className={`${i % 2 === 0 ? 'bg-purple-800' : 'bg-purple-700'}`}>
                    <td className="text-left p-4">{cliente.id}</td>
                    <td className="text-left p-4">{cliente.nome}</td>
                    <td className="text-left p-4">{cliente.idade}</td>
                    {exibirAcoes && renderActions(cliente)}
                </tr>
            )
        })
    }
    
    function renderActions(cliente: Cliente){
        return (
            <td className="flex justify-center">
                {props.editarCliente ? (
                    <button onClick={() => props.editarCliente?.(cliente)} className="
                        flex justify-center items-center
                        text-green-600 rounded-full
                        hover:bg-purple-50 p-2 m-1
                    ">
                        {IconEdit(6)}
                    </button>
                ) : false}
                {props.excluirCliente ? (
                    <button onClick={() => props.excluirCliente?.(cliente)} className="
                        flex justify-center items-center
                        text-red-500 rounded-full
                        hover:bg-purple-50 p-2 m-1
                    ">
                        {IconRemove(6)}
                    </button>
                ) : false}
            </td>
        )
    }
    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className="
                bg-gradient-to-r from-purple-950 via-purple-900 to-purple-950
            ">
                {renderTableHeader()}
            </thead>
            <tbody>
                {renderData()}
            </tbody>
        </table>
    )
}
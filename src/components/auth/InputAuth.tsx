interface InputAuthProps{
    label: string
    valor: any
    obrigatorio?: boolean
    tipo: 'text' | 'email' | 'password'
    valorMudou: (novoValor: any) => void
}

export default function InputAuth(props: InputAuthProps){
    return (
        <div className="flex flex-col mt-4">
            <label className="cursor-pointer" htmlFor={props.label.toLowerCase().replace(/\W/g, '')}>{props.label}</label>
            <input
                className="
                    px-4 py-3 rounded-lg bg-gray-200 mt-2
                    border focus:border-blue-500 focus:outline-none
                    focus:bg-white"
                type={props.tipo ?? 'text'}
                name={props.label.toLowerCase().replace(/\W/g, '')}
                value={props.valor}
                onChange={e => props.valorMudou?.(e.target.value)}
                required={props.obrigatorio} />
        </div>
    )
}
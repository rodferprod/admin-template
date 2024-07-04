import firebase from '../config' 
import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";

export default class TabelaCliente implements ClienteRepositorio {
    
    #conversor = {
        toFirestore(cliente: Cliente) {
            console.log('conversor (toFirestore):', cliente)
            return {
                nome: cliente.nome,
                idade: cliente.idade,
            }
        },
        fromFirestore(
            snapshot: firebase.firestore.QueryDocumentSnapshot,
            options: firebase.firestore.SnapshotOptions
        ){
            const dados = snapshot.data(options)
            console.log('conversor (fromFirestore):', dados)
            return new Cliente(snapshot?.id, dados.nome, dados.idade, )
        }
    }
    
    async salvar(cliente: Cliente): Promise<Cliente> {
        // Se existe cliente, alterar...
        if(cliente?.id) {
            console.log('alterar (existe id):', cliente)
            await this.colecao().doc(cliente.id).set(cliente)
            console.log('retornando cliente após alterar:', cliente)
            return cliente
        } else {
            // Novo cliente...
            console.log('salvar novo cliente:', cliente)
            const docRef = await this.colecao().add(cliente)
            console.log('docRef:', docRef)
            const doc = await docRef.get()
            console.log('doc:', doc)
            const res = doc.data()
            console.log('res:', res)
            if(res){
                return res
            } else {
                return Cliente.vazio()
            }
        }
    }

    async excluir(cliente: Cliente): Promise<void> {
        return this.colecao().doc(cliente.id).delete()
    }

    async listar(): Promise<Cliente[]> {
        const query = await this.colecao().get()
        console.log('listar (query):', query)
        const docs = query.docs.map(doc => doc.data()) ?? []
        console.log('listar (docs):', docs)
        return docs
    }

    private colecao() {
        return firebase.firestore()
                .collection('clientes')
                .withConverter(this.#conversor)
    }
}
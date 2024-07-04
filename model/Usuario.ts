// Independente do provedor de acesso (email/senha ou Google)
// vamos sempre retornar um usuário com essas características
export default interface Usuario {
    uid: string
    email: string
    nome: string
    token: string
    provedor: string
    imagemURL: string
}
// Esta função é segura para rodar no servidor e no cliente,
// pois não usa nenhuma API exclusiva do navegador.
export function load({ params }) {
    return {
        noteId: params.id
    };
}
import type { Note } from "./db/db";

/**
 * Extrai apenas o texto de conteúdo HTML do TipTap, removendo tags e limitando o tamanho
 * @param htmlContent - Conteúdo HTML do editor TipTap
 * @param maxLength - Número máximo de caracteres (padrão: 150)
 * @returns Texto limpo e limitado para preview
 */
export function extractTextPreview(htmlContent: string | undefined, maxLength: number = 150): string {
    if (!htmlContent || htmlContent.trim() === '') {
        return 'No content';
    }

    try {
        // Cria um parser DOM para processar o HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');

        // Remove todas as imagens e outros elementos não textuais
        const imagesToRemove = doc.querySelectorAll('img, video, audio, iframe, object, embed');
        imagesToRemove.forEach(element => element.remove());

        // Extrai apenas o texto, preservando quebras de linha básicas
        const textContent = doc.body.textContent || doc.body.innerText || '';

        // Remove quebras de linha excessivas e espaços extras
        const cleanText = textContent
            .replace(/\s+/g, ' ') // Substitui múltiplos espaços por um único
            .replace(/\n\s*\n/g, '\n') // Remove linhas vazias extras
            .trim();

        // Limita o tamanho e adiciona reticências se necessário
        if (cleanText.length <= maxLength) {
            return cleanText;
        }

        // Corta no último espaço antes do limite para não quebrar palavras
        const truncated = cleanText.substring(0, maxLength);
        const lastSpaceIndex = truncated.lastIndexOf(' ');

        if (lastSpaceIndex > maxLength * 0.8) { // Se o último espaço está próximo do limite
            return truncated.substring(0, lastSpaceIndex) + '...';
        }

        return truncated + '...';

    } catch (error) {
        console.warn('Erro ao processar conteúdo HTML:', error);
        // Fallback: remove tags HTML básicas com regex
        const textOnly = htmlContent
            .replace(/<[^>]*>/g, '') // Remove todas as tags HTML
            .replace(/\s+/g, ' ')
            .trim();

        return textOnly.length > maxLength
            ? textOnly.substring(0, maxLength) + '...'
            : textOnly || 'No content';
    }
}

export function extractImages(notes: Note[])
    : string[] {
    const imageType = notes
        .filter((note) => note.type === 'image')
        .map((note) => note.content)
        .filter((src): src is string => typeof src === 'string');
    const allIamgesInsideNote = notes.flatMap((note) => {
        if (note.content) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(note.content, 'text/html');
            return Array.from(doc.querySelectorAll('img')).map((img) => img.src);
        }
        return [];
    });
    return [...imageType, ...allIamgesInsideNote];
}


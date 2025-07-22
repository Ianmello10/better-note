import { Extension } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import { suggestion } from '$lib/components/edtior/slashcommand/suggestion';

/**
 * Extensão customizada do Tiptap para integrar o plugin de sugestão
 * como um comando de barra (slash command).
 */
export const SlashCommand = Extension.create({
	name: 'slashCommand',

	addProseMirrorPlugins() {
		return [
			Suggestion({
				editor: this.editor,
				char: '/', // ✅ Caractere que ativa o slash command
				allowSpaces: false, // ✅ Não permite espaços na query
				startOfLine: false, // ✅ Permite em qualquer posição da linha
				...suggestion
			})
		];
	}
});

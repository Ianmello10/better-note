// src/lib/tiptap/extensions/CustomImage.ts
import Image from '@tiptap/extension-image';
import { mount, unmount } from 'svelte';
import ImageView from '$lib/components/edtior/nodes/ImageView.svelte';

/**
 * Estende a extensão de imagem padrão do Tiptap para usar um
 * componente Svelte customizado para a renderização (NodeView).
 */
export const CustomImage = Image.extend({
    addNodeView() {
        return ({ node, view, getPos, decorations }) => {
            const dom = document.createElement('div');
            dom.className = 'svelte-image-wrapper';

            // Controle de estado para seleção
            let isSelected = false;

            // Monta o componente Svelte no DOM
            let component = mount(ImageView, {
                target: dom,
                props: {
                    node,
                    selected: isSelected
                }
            });

            // Função para verificar se o nó está selecionado
            const updateSelection = () => {
                const { selection } = view.state;
                const pos = getPos();
                const wasSelected = isSelected;
                isSelected = pos !== undefined && selection.from <= pos && selection.to >= pos + node.nodeSize;

                if (wasSelected !== isSelected) {
                    // Re-monta o componente com o novo estado
                    unmount(component);
                    component = mount(ImageView, {
                        target: dom,
                        props: {
                            node,
                            selected: isSelected
                        }
                    });
                }
            };

            // Atualiza a seleção inicialmente
            updateSelection();

            return {
                dom,
                update: (updatedNode: any) => {
                    if (updatedNode.type !== node.type) {
                        return false;
                    }

                    // Re-monta o componente com o nó atualizado
                    unmount(component);
                    component = mount(ImageView, {
                        target: dom,
                        props: {
                            node: updatedNode,
                            selected: isSelected
                        }
                    });

                    updateSelection();
                    return true;
                },
                selectNode: () => {
                    isSelected = true;
                    updateSelection();
                },
                deselectNode: () => {
                    isSelected = false;
                    updateSelection();
                },
                destroy: () => {
                    // Desmonta o componente quando o NodeView é destruído
                    unmount(component);
                }
            };
        };
    }
});
